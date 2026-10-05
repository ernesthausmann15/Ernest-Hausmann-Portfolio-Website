"use client";

import { ArrowUp, RotateCcw, Sparkles, Square, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { RichText } from "./rich-text";

/**
 * The assistant conversation.
 *
 * What: Message log, suggested questions, composer, and the streaming fetch
 *       to `/api/chat`.
 * Why: This is the heavy half of the widget. `floating-dock.tsx` loads it on
 *      first open, so visitors who never use the assistant never download it.
 * How: Each send POSTs the conversation and reads the response body as a
 *      text stream, appending chunks to the last message. An AbortController
 *      backs the Stop button and is also fired on unmount. Errors keep the
 *      visitor's question in place and offer Retry instead of losing it.
 */

type Message = { id: string; role: "user" | "assistant"; content: string };

const STORAGE_KEY = "eh-assistant-v1";
const MAX_INPUT = 2000;

const suggestions = [
  "What has Ernest built with AI?",
  "Walk me through the Vrymnox architecture.",
  "What's his strongest tech stack?",
  "Tell me about his internship experience.",
];

function loadHistory(): Message[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as Message[]) : [];
  } catch {
    return [];
  }
}

function saveHistory(messages: Message[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // Storage can be full or blocked (private mode). The chat still works.
  }
}

class ChatRequestError extends Error {}

export function ChatPanel({
  titleId,
  onClose,
}: {
  titleId: string;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>(loadHistory);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const stickToBottom = useRef(true);
  const descriptionId = useId();

  useEffect(() => {
    inputRef.current?.focus();
    return () => abortRef.current?.abort();
  }, []);

  // Persist only settled conversations, never a half-streamed reply.
  useEffect(() => {
    if (!pending) saveHistory(messages);
  }, [messages, pending]);

  // Follow the stream, unless the visitor scrolled up to reread something.
  useEffect(() => {
    const log = logRef.current;
    if (log && stickToBottom.current) log.scrollTop = log.scrollHeight;
  }, [messages, pending, error]);

  const onScroll = () => {
    const log = logRef.current;
    if (!log) return;
    stickToBottom.current = log.scrollHeight - log.scrollTop - log.clientHeight < 48;
  };

  const run = useCallback(async (history: Message[]) => {
    const controller = new AbortController();
    abortRef.current = controller;
    const replyId = crypto.randomUUID();

    setError(null);
    setPending(true);
    stickToBottom.current = true;
    setMessages([...history, { id: replyId, role: "assistant", content: "" }]);

    const appendToReply = (text: string) =>
      setMessages((current) =>
        current.map((message) =>
          message.id === replyId ? { ...message, content: message.content + text } : message,
        ),
      );

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new ChatRequestError(data?.error ?? "The assistant is unavailable right now.");
      }

      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        if (value) appendToReply(value);
      }
    } catch (caught) {
      const stopped = controller.signal.aborted;
      setMessages((current) => {
        const reply = current.find((message) => message.id === replyId);
        // Keep a partial answer the visitor already started reading; drop an
        // empty one so the next request does not carry a blank turn.
        if (reply && reply.content.trim()) return current;
        return current.filter((message) => message.id !== replyId);
      });
      if (!stopped) {
        setError(
          caught instanceof ChatRequestError
            ? caught.message
            : "The connection dropped before the answer finished.",
        );
      }
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setPending(false);
      inputRef.current?.focus();
    }
  }, []);

  const send = (text: string) => {
    const content = text.trim();
    if (!content || pending) return;
    setInput("");
    void run([...messages, { id: crypto.randomUUID(), role: "user", content }]);
  };

  const retry = () => {
    // Drop a partial reply (if any) so the question is answered from scratch.
    const lastUser = messages.findLastIndex((message) => message.role === "user");
    if (lastUser === -1) return;
    void run(messages.slice(0, lastUser + 1));
  };

  const reset = () => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    inputRef.current?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      send(input);
    }
  };

  const last = messages.at(-1);
  const waitingForFirstToken = pending && last?.role === "assistant" && last.content === "";

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
          <Sparkles className="size-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id={titleId} className="text-sm font-medium">
            Ask {site.name.split(" ")[0]}&apos;s AI
          </h2>
          <p id={descriptionId} className="truncate text-xs text-muted-foreground">
            Answers come from this portfolio&apos;s content.
          </p>
        </div>
        {messages.length > 0 ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={reset}
            aria-label="Start a new conversation"
            title="New conversation"
          >
            <RotateCcw />
          </Button>
        ) : null}
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          aria-label="Close assistant"
          title="Close (Esc)"
        >
          <X />
        </Button>
      </header>

      <div
        ref={logRef}
        onScroll={onScroll}
        role="log"
        aria-live="polite"
        aria-busy={pending}
        aria-describedby={descriptionId}
        tabIndex={0}
        className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 focus-visible:outline-none"
      >
        {messages.length === 0 ? (
          <div className="space-y-3">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Ask about projects, the tech stack, or experience. Try one of these:
            </p>
            <ul className="flex flex-col gap-2">
              {suggestions.map((suggestion) => (
                <li key={suggestion}>
                  <button
                    type="button"
                    onClick={() => send(suggestion)}
                    className="w-full rounded-lg border border-border bg-background/40 px-3 py-2 text-left text-sm transition-colors hover:border-primary/50 hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                  >
                    {suggestion}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {messages.map((message) =>
          message.role === "user" ? (
            <div key={message.id} className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-sm whitespace-pre-wrap break-words text-primary-foreground">
                <span className="sr-only">You: </span>
                {message.content}
              </p>
            </div>
          ) : message.content ? (
            <div
              key={message.id}
              className="max-w-[92%] rounded-2xl rounded-bl-md bg-muted px-3.5 py-2.5 text-sm leading-relaxed break-words"
            >
              <span className="sr-only">Assistant: </span>
              <RichText text={message.content} />
            </div>
          ) : null,
        )}

        {waitingForFirstToken ? (
          <div className="flex w-16 items-center gap-1 rounded-2xl rounded-bl-md bg-muted px-3.5 py-3" role="status">
            <span className="sr-only">The assistant is writing</span>
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                aria-hidden="true"
                className="size-1.5 animate-bounce rounded-full bg-muted-foreground motion-reduce:animate-pulse"
                style={{ animationDelay: `${dot * 140}ms` }}
              />
            ))}
          </div>
        ) : null}

        {error ? (
          <div
            role="alert"
            className="flex flex-col gap-2 rounded-xl border border-destructive/40 bg-destructive/10 px-3.5 py-3 text-sm"
          >
            <p>{error}</p>
            <div className="flex flex-wrap items-center gap-2">
              <Button type="button" size="sm" variant="outline" onClick={retry}>
                <RotateCcw />
                Retry
              </Button>
              <a
                href={`mailto:${site.email}`}
                className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Or email {site.email}
              </a>
            </div>
          </div>
        ) : null}
      </div>

      <form
        className="border-t border-border p-3"
        onSubmit={(event) => {
          event.preventDefault();
          send(input);
        }}
      >
        <div className="flex items-end gap-2 rounded-xl border border-input bg-background/60 p-1.5 transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30">
          <label htmlFor={`${titleId}-input`} className="sr-only">
            Your question
          </label>
          <textarea
            id={`${titleId}-input`}
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value.slice(0, MAX_INPUT))}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder="Ask about a project or skill…"
            className="field-sizing-content max-h-32 min-h-9 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
          />
          {pending ? (
            <Button
              type="button"
              size="icon"
              variant="secondary"
              onClick={() => abortRef.current?.abort()}
              aria-label="Stop generating"
            >
              <Square className="size-3.5 fill-current" />
            </Button>
          ) : (
            <Button type="submit" size="icon" disabled={!input.trim()} aria-label="Send message">
              <ArrowUp />
            </Button>
          )}
        </div>
        <p className="mt-1.5 px-1 text-[0.7rem] text-muted-foreground">
          <kbd className="font-sans">Enter</kbd> to send · <kbd className="font-sans">Shift</kbd>+
          <kbd className="font-sans">Enter</kbd> for a new line · <kbd className="font-sans">Esc</kbd> to close
        </p>
      </form>
    </div>
  );
}
