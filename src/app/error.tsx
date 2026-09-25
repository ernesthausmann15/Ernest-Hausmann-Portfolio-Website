"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-xl flex-col items-start justify-center px-6">
      <h1 className="text-3xl">This page did not load.</h1>
      <p className="mt-3 text-muted-foreground">Try again. If it keeps failing, use the contact email in the footer.</p>
      <Button type="button" onClick={reset} className="mt-6 h-10 px-4">
        Try again
      </Button>
    </div>
  );
}
