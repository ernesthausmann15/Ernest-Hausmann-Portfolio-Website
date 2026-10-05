"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { FileText, Sparkles, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ErrorBoundary } from "@/components/error-boundary";
import { GitHubMark } from "@/components/icons/github-mark";
import { LinkedInMark } from "@/components/icons/linkedin-mark";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Recruiter quick actions + the AI assistant launcher.
 *
 * What: A fixed pill in the bottom-right corner with Resume, GitHub,
 *       LinkedIn, and the button that opens the assistant panel.
 * Why: Whatever page a recruiter lands on, the three links they came for
 *      and a way to ask a question are one click away.
 * How: The pill is tiny and ships with every page. The chat panel is a
 *      separate chunk loaded on first open (and warmed on hover/focus so it
 *      is usually ready by the click). Escape closes the panel and returns
 *      focus to the launcher.
 */

const loadPanel = () => import("./chat-panel");

const ChatPanel = dynamic(() => loadPanel().then((module) => module.ChatPanel), {
  ssr: false,
  loading: () => (
    <div className="flex h-full flex-col gap-3 p-4" aria-hidden="true">
      <div className="h-8 w-40 animate-pulse rounded-md bg-muted" />
      <div className="h-10 animate-pulse rounded-lg bg-muted/70" />
      <div className="h-10 animate-pulse rounded-lg bg-muted/70" />
      <div className="mt-auto h-12 animate-pulse rounded-xl bg-muted/70" />
    </div>
  ),
});

const linkClass =
  "inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm text-foreground/90 transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none";

export function FloatingDock() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const titleId = useId();

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  return (
    <>
      {open ? (
        <section
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          className={cn(
            "fixed inset-x-3 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-50 h-[min(36rem,calc(100svh-7rem))] overflow-hidden rounded-2xl border border-border bg-popover/95 shadow-2xl shadow-black/40 backdrop-blur-xl",
            "sm:inset-x-auto sm:right-5 sm:w-[24rem]",
            "origin-bottom-right animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 duration-200 motion-reduce:animate-none",
          )}
        >
          <ErrorBoundary
            name="chat-panel"
            fallback={
              <div className="flex h-full flex-col items-start justify-center gap-3 p-6 text-sm">
                <p>The assistant failed to load.</p>
                <a className="text-primary underline-offset-4 hover:underline" href={`mailto:${site.email}`}>
                  Email {site.email}
                </a>
              </div>
            }
          >
            <ChatPanel titleId={titleId} onClose={close} />
          </ErrorBoundary>
        </section>
      ) : null}

      <nav
        aria-label="Quick actions"
        className="fixed right-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-50 flex items-center gap-0.5 rounded-full border border-border bg-background/85 p-1 shadow-lg shadow-black/30 backdrop-blur-md sm:right-5 sm:bottom-5"
      >
        <Link href="/resume" className={linkClass} aria-label="Resume">
          <FileText className="size-4 text-primary" aria-hidden="true" />
          <span className="hidden sm:inline">Resume</span>
        </Link>
        <a
          href={site.githubUrl}
          target="_blank"
          rel="noreferrer"
          className={linkClass}
          aria-label="Ernest Hausmann on GitHub"
        >
          <GitHubMark className="size-4 text-primary" />
          <span className="hidden sm:inline">GitHub</span>
        </a>
        <a
          href={site.linkedInUrl}
          target="_blank"
          rel="noreferrer"
          className={linkClass}
          aria-label="Ernest Hausmann on LinkedIn"
        >
          <LinkedInMark className="size-4 text-primary" />
          <span className="hidden sm:inline">LinkedIn</span>
        </a>
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          aria-haspopup="dialog"
          onClick={() => (open ? close() : setOpen(true))}
          onPointerEnter={() => void loadPanel()}
          onFocus={() => void loadPanel()}
          className="group ml-0.5 inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground shadow-[0_0_24px_oklch(0.86_0.14_96_/_0.35)] transition-[transform,box-shadow,background-color] hover:bg-primary/90 hover:shadow-[0_0_32px_oklch(0.86_0.14_96_/_0.5)] focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none active:scale-[0.97] motion-reduce:transition-none"
        >
          {open ? (
            <X className="size-4" aria-hidden="true" />
          ) : (
            <Sparkles className="size-4 transition-transform group-hover:rotate-12 motion-reduce:transition-none" aria-hidden="true" />
          )}
          <span>{open ? "Close" : "Ask AI"}</span>
        </button>
      </nav>
    </>
  );
}
