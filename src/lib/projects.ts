/**
 * Curated project catalog.
 *
 * What: The stories shown on the Projects page.
 * Why: A Vercel account list is a set of deployment names. Recruiters need
 *      a sentence about what the product does and which skills it proves.
 *      This file is that sentence. `getProjects()` can later attach the live
 *      URL and GitHub link from the Vercel API without rewriting the copy.
 * How: `liveUrl` is the published deployment for that product. `vercelName`
 *      is the project slug from that same hostname, so a later API lookup
 *      can refresh the link without changing the written story.
 */

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  context: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  vercelName?: string;
};

export const featuredProjects: Project[] = [
  {
    slug: "vrymnox-liquidation-hub",
    vercelName: "vrymnox-liquidation-hub",
    title: "Vrymnox — Staged Portfolio Liquidation & Flash Sale Hub",
    context:
      "Full-Stack Architecture, Security Hardening & Concurrency Engineering",
    summary:
      "An industrial-grade asset liquidation command center featuring zero-credential employer demo modes, real-time engagement analytics, and robust atomic concurrency controls.",
    description:
      "Vrymnox is a production-ready full-stack showcase engineered to demonstrate rigorous software architecture and security best practices. Built with Next.js, Express, and PostgreSQL 18, it features granular role-based access control (RBAC), secure session handling, and atomic database transactions to eliminate race conditions during high-stakes flash sales. To deliver a seamless interactive experience, it includes frictionless dual demo modes (Manager and Viewer) supported by a privacy-first salted IP hash analytics pipeline. The system is fully hardened with proxy-aware rate limiting, error sanitization, and automated self-healing data routines to ensure 24/7 reliability for all visitors.",
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL 18",
      "Tailwind CSS",
      "Render",
      "AI / LLM Integration",
    ],
    liveUrl: "https://www.vrymnox.com",
  },

  {
    slug: "skinstric",
    vercelName: "skinstric-internship-nu-nine",
    title: "Skinstric",
    context: "Software engineering internship",
    summary:
      "An onboarding AI that reads a photo and ranks age, sex, and race.",
    description:
      "A short setup leads into a camera step, then a result screen. The photo goes to the AI, and the answer comes back as three lists: age, sex, and race, strongest estimate first. The same path stays readable on a phone.",
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    liveUrl: "https://skinstric-internship-nu-nine.vercel.app",
  },

  {
    slug: "movie-grab",
    vercelName: "movie-grab-typescript",
    title: "Movie Grab",
    context: "FES project",
    summary: "A film search app with a saved theme and a stable detail URL.",
    description:
      "Search a film catalogue, scan results behind a loading skeleton, and open one movie on its own route. The light or dark theme is stored in the browser so it is still there after a refresh. Shared chrome — navigation and footer — reads that theme from the app root.",
    stack: ["React", "JavaScript", "React Router"],
    liveUrl: "https://movie-grab-typescript.vercel.app/",
  },
];
