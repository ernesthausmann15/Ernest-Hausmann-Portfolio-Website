"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion";

/**
 * Fades a block in when it enters the viewport.
 *
 * What: A scroll-triggered entrance used under the hero.
 * Why: The hero already has its own timeline. Lower sections should arrive
 *      as you reach them, not all at once on load.
 * How: ScrollTrigger watches the wrapper. `once: true` means the tween does
 *      not reverse when you scroll back up, which keeps the page calm.
 *      `autoAlpha` sets both visibility and opacity so a hidden block cannot
 *      be focused before it appears. Reduced motion skips the tween entirely.
 */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const node = rootRef.current;
      if (!node) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(node, {
        y: 24,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: node,
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
