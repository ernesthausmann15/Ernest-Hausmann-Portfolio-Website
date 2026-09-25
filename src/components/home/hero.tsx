"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { displayFont } from "@/lib/fonts";
import { gsap, useGSAP } from "@/lib/motion";
import { site } from "@/lib/site";

/**
 * The canvas is a separate client chunk.
 *
 * What: Loads Three.js only in the browser, after the headline is ready.
 * Why: The WebGL library is large. Keeping it out of the server render
 *      means the name and the call to action paint first. `ssr: false` is
 *      required because WebGL has no document to draw into on the server.
 */
const HeroCanvas = dynamic(
  () => import("@/components/home/hero-canvas").then((module) => module.HeroCanvas),
  { ssr: false },
);

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return reduced;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [canvasActive, setCanvasActive] = useState(true);

  useGSAP(
    () => {
      if (reducedMotion) return;

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .from("[data-hero='logo']", { scale: 0.86, autoAlpha: 0, duration: 0.7 })
        .from("[data-hero='eyebrow']", { y: 16, autoAlpha: 0, duration: 0.55 }, "-=0.35")
        .from("[data-hero='title']", { y: 28, autoAlpha: 0, duration: 0.8 }, "-=0.3")
        .from("[data-hero='copy']", { y: 18, autoAlpha: 0, duration: 0.65 }, "-=0.45")
        .from("[data-hero='actions']", { y: 12, autoAlpha: 0, duration: 0.5 }, "-=0.35");
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setCanvasActive(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="hero-atmosphere relative isolate min-h-[100svh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {reducedMotion ? null : <HeroCanvas active={canvasActive} />}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-end px-6 pt-28 pb-20 md:justify-center md:pb-16">
        <div data-hero="logo" className="mb-6">
          <Image
            src="/brand/hero-logo.svg"
            alt="Ernest Hausmann monogram"
            width={96}
            height={96}
            priority
            unoptimized
            className="size-24 rounded-2xl shadow-[0_0_40px_oklch(0.86_0.14_96_/_0.45)]"
          />
        </div>
        <p
          data-hero="eyebrow"
          className="text-xs font-medium tracking-[0.28em] text-primary uppercase"
        >
          {site.role}
        </p>
        <h1
          data-hero="title"
          className={`${displayFont.className} mt-4 max-w-4xl text-6xl leading-[0.95] text-balance text-foreground sm:text-7xl md:text-8xl`}
        >
          {site.name}
        </h1>
        <p
          data-hero="copy"
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          I build interfaces people can understand quickly. My focus is frontend
          development, the details of user experience, and using AI tools to
          move carefully and faster.
        </p>
        <div data-hero="actions" className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="h-10 px-4">
            <Link href="/projects">View projects</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-10 px-4">
            <Link href="/resume">Read resume</Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="h-10 px-4">
            <a href="#contact">Contact</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
