"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * One place that turns GSAP plugins on.
 *
 * What: Registers ScrollTrigger and the React hook before any timeline runs.
 * Why: GSAP plugins are inert until `registerPlugin` runs. Doing it here
 *      means every animation file imports one module and cannot forget a
 *      plugin. The hook also ties tweens to the React tree so they are
 *      killed when a route unmounts — that is what prevents a timeline from
 *      the Home page still running after you open Resume.
 * How: Import `{ gsap, useGSAP }` from this file instead of from the
 *      packages directly.
 */
gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, useGSAP };
