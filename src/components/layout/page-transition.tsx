"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion";

/**
 * Route entrance.
 *
 * What: A short fade when App Router mounts a new template.
 * Why: `template.tsx` remounts on every navigation, which gives us a fresh
 *      element to animate without tracking the previous pathname ourselves.
 * How: The timeline is scoped to this wrapper. When you leave the route,
 *      React unmounts the template and `useGSAP` kills the tween.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        rootRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.4, ease: "power2.out" },
      );
    },
    { scope: rootRef },
  );

  return <div ref={rootRef}>{children}</div>;
}
