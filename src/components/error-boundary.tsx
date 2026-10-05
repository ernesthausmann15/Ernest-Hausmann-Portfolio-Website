"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

/**
 * Contains a crash to one widget.
 *
 * What: Catches render errors below it and shows `fallback` (nothing, by
 *       default) instead of unmounting the whole page.
 * Why: The WebGL hero and the chat widget are optional extras. If a GPU
 *      driver or a browser extension breaks one of them, the visitor should
 *      still be able to read the resume. `app/error.tsx` only catches at the
 *      route level, which would replace the entire page.
 * How: React still requires a class component for `getDerivedStateFromError`.
 *      `name` labels the console entry so the failing widget is obvious.
 */
export class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode; name: string },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[${this.props.name}] crashed and was hidden`, error, info.componentStack);
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
