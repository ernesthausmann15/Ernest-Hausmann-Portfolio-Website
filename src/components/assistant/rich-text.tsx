import { Fragment, type ReactNode } from "react";

/**
 * Minimal Markdown for assistant replies.
 *
 * What: Paragraphs, `-`/`1.` lists, **bold**, `code`, [links](https://…) and
 *       bare URLs. Nothing else.
 * Why: The model is asked for light Markdown. A full parser would add weight
 *      to a widget most visitors open once, and rendering HTML from model
 *      output would be an injection risk. This builds React elements only,
 *      so the output can never contain markup the model wrote.
 * How: Split into blocks on blank lines, group list lines, then tokenize
 *      inline spans with one regex. Only http(s) and mailto links render as
 *      anchors. Works on partial text, so it can re-render on every chunk.
 */

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\)|https?:\/\/[^\s)]+)/g;

function safeHref(href: string) {
  return /^(https?:|mailto:)/i.test(href) ? href : null;
}

function inline(text: string): ReactNode[] {
  return text.split(INLINE).map((part, index) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="rounded bg-background/60 px-1 py-0.5 font-mono text-[0.85em]">
          {part.slice(1, -1)}
        </code>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    const label = link ? link[1] : part;
    const href = safeHref(link ? link[2] : part);
    if (href && (link || /^https?:\/\//.test(part))) {
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-primary underline underline-offset-2 hover:opacity-80"
        >
          {label}
        </a>
      );
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export function RichText({ text }: { text: string }) {
  const blocks = text.trim().split(/\n{2,}/);

  return (
    <div className="space-y-2">
      {blocks.map((block, blockIndex) => {
        const lines = block.split("\n");
        const bullet = /^\s*[-*]\s+/;
        const numbered = /^\s*\d+[.)]\s+/;

        if (lines.every((line) => bullet.test(line))) {
          return (
            <ul key={blockIndex} className="list-disc space-y-1 pl-4">
              {lines.map((line, index) => (
                <li key={index}>{inline(line.replace(bullet, ""))}</li>
              ))}
            </ul>
          );
        }
        if (lines.every((line) => numbered.test(line))) {
          return (
            <ol key={blockIndex} className="list-decimal space-y-1 pl-4">
              {lines.map((line, index) => (
                <li key={index}>{inline(line.replace(numbered, ""))}</li>
              ))}
            </ol>
          );
        }
        return (
          <p key={blockIndex}>
            {lines.map((line, index) => (
              <Fragment key={index}>
                {index > 0 ? <br /> : null}
                {inline(line.replace(/^#{1,6}\s+/, ""))}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
