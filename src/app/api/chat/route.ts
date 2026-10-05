import Anthropic from "@anthropic-ai/sdk";
import { assistantSystemPrompt } from "@/lib/assistant-context";

/**
 * Portfolio assistant endpoint.
 *
 * What: POST a conversation, get the assistant's reply back as a plain-text
 *       stream. Failures before the stream opens come back as JSON
 *       `{ error, code }` with a matching HTTP status.
 * Why: The API key stays on the server — the browser only ever talks to this
 *      route. Streaming lets the first words appear in well under a second
 *      instead of after the whole answer is written.
 * How: Validate and cap the input, apply a per-IP rate limit, then pipe the
 *      SDK's text deltas into a ReadableStream. If the visitor closes the
 *      widget mid-answer, the request signal aborts the upstream call so we
 *      stop paying for tokens nobody will read.
 */

// Claude Sonnet 3.5 was retired in October 2025; this is the current Sonnet.
const MODEL = "claude-sonnet-5-5";
const MAX_TOKENS = 4096;
const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2000;

// Give long answers room to finish streaming on serverless platforms.
export const maxDuration = 60;

type ErrorCode =
  | "bad_request"
  | "rate_limited"
  | "not_configured"
  | "upstream_unavailable"
  | "upstream_error";

function errorResponse(status: number, code: ErrorCode, error: string, headers?: HeadersInit) {
  return Response.json({ error, code }, { status, headers });
}

/* ------------------------------------------------------------------ */
/* Rate limiting                                                       */
/* ------------------------------------------------------------------ */

/**
 * Fixed-window limiter, per IP.
 *
 * In-memory, so each server instance counts on its own. That is enough to
 * stop a single tab from looping the endpoint; a shared store (Redis, KV)
 * would be the next step if the site ever needs a hard global cap.
 */
const WINDOW_MS = 10 * 60 * 1000;
const WINDOW_LIMIT = 20;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(key: string): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();

  // Opportunistic sweep so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [ip, entry] of hits) if (entry.resetAt <= now) hits.delete(ip);
  }

  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }
  if (entry.count >= WINDOW_LIMIT) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count += 1;
  return { ok: true };
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

/* ------------------------------------------------------------------ */
/* Input validation                                                    */
/* ------------------------------------------------------------------ */

function parseMessages(body: unknown): Anthropic.Beta.BetaMessageParam[] | string {
  if (!body || typeof body !== "object" || !("messages" in body)) {
    return "Expected a JSON body with a `messages` array.";
  }
  const { messages } = body as { messages: unknown };
  if (!Array.isArray(messages) || messages.length === 0) {
    return "`messages` must be a non-empty array.";
  }
  if (messages.length > MAX_MESSAGES) {
    return `This conversation is long. Start a new one to keep asking (limit ${MAX_MESSAGES} messages).`;
  }

  const parsed: Anthropic.Beta.BetaMessageParam[] = [];
  for (const [index, message] of messages.entries()) {
    if (!message || typeof message !== "object") return `Message ${index} is not an object.`;
    const { role, content } = message as { role?: unknown; content?: unknown };
    // Consecutive user turns are allowed (the API merges them) — that is what
    // the client sends after a failed reply is dropped and the visitor asks again.
    if (role !== "user" && role !== "assistant") {
      return `Message ${index} must have role "user" or "assistant".`;
    }
    if (index === 0 && role !== "user") return "The first message must come from the user.";
    if (typeof content !== "string" || content.trim().length === 0) {
      return `Message ${index} must have non-empty text content.`;
    }
    if (content.length > MAX_MESSAGE_CHARS) {
      return `Messages are limited to ${MAX_MESSAGE_CHARS} characters.`;
    }
    parsed.push({ role, content });
  }

  if (parsed.at(-1)?.role !== "user") return "The last message must come from the user.";
  return parsed;
}

/* ------------------------------------------------------------------ */
/* Handler                                                             */
/* ------------------------------------------------------------------ */

// Created lazily so a missing key is a clean 503, not a crash at import time.
let client: Anthropic | null = null;
function getClient() {
  client ??= new Anthropic({ maxRetries: 2, timeout: 55_000 });
  return client;
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return errorResponse(503, "not_configured", "The assistant is not configured on this deployment.");
  }

  const limit = rateLimit(clientIp(request));
  if (!limit.ok) {
    return errorResponse(
      429,
      "rate_limited",
      "You've sent a lot of questions in a short time. Please wait a few minutes and try again.",
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse(400, "bad_request", "Request body must be valid JSON.");
  }

  const messages = parseMessages(body);
  if (typeof messages === "string") return errorResponse(400, "bad_request", messages);

  const stream = getClient().beta.messages.stream(
    {
      model: MODEL,
      max_tokens: MAX_TOKENS,
      // The system prompt never changes between requests, so cache it.
      system: [{ type: "text", text: assistantSystemPrompt, cache_control: { type: "ephemeral" } }],
      messages,
      // Conversational Q&A over a fixed reference — low effort keeps latency down.
      output_config: { effort: "low" },
      // If a safety classifier declines, the API retries on a recommended model
      // inside the same stream instead of returning an empty answer.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
    },
    { signal: request.signal },
  );

  // Surface connection/auth/rate-limit failures as JSON before committing to a
  // 200 stream. The first event (message_start) proves the upstream call
  // succeeded; anything after that is reported in-band.
  const iterator = stream[Symbol.asyncIterator]();
  let first: IteratorResult<Anthropic.Beta.BetaRawMessageStreamEvent>;
  try {
    first = await iterator.next();
  } catch (error) {
    return upstreamErrorResponse(error);
  }

  const encoder = new TextEncoder();
  const body$ = new ReadableStream<Uint8Array>({
    async start(controller) {
      let wroteText = false;
      const handle = (event: Anthropic.Beta.BetaRawMessageStreamEvent) => {
        if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
          wroteText = true;
          controller.enqueue(encoder.encode(event.delta.text));
        }
      };

      try {
        if (!first.done) handle(first.value);
        for (let next = await iterator.next(); !next.done; next = await iterator.next()) {
          handle(next.value);
        }

        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal" && !wroteText) {
          controller.enqueue(
            encoder.encode(
              "I can't help with that one. Ask me about Ernest's projects, stack, or experience instead.",
            ),
          );
        }
        controller.close();
      } catch (error) {
        if (request.signal.aborted) return; // visitor closed the widget
        console.error("[api/chat] stream failed", error);
        controller.error(error);
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body$, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function upstreamErrorResponse(error: unknown) {
  if (error instanceof Anthropic.RateLimitError) {
    return errorResponse(
      503,
      "upstream_unavailable",
      "The assistant is busy right now. Please try again in a moment.",
    );
  }
  if (error instanceof Anthropic.APIConnectionError) {
    return errorResponse(503, "upstream_unavailable", "Couldn't reach the AI service. Please try again.");
  }
  if (error instanceof Anthropic.APIError) {
    console.error("[api/chat] Anthropic API error", error.status, error.requestID, error.message);
    const status = error.status && error.status >= 500 ? 503 : 502;
    return errorResponse(status, "upstream_error", "The assistant hit an error. Please try again.");
  }
  console.error("[api/chat] unexpected error", error);
  return errorResponse(500, "upstream_error", "Something went wrong. Please try again.");
}
