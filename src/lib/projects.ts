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
  slug: "liquidation-hub",
  vercelName: "liquidation-hub",
  title: "Liquidation Hub — High-Throughput E-Commerce & Flash Sale Marketplace",
  context:
    "Full-Stack Architecture, Real-Time State Simulation & Enterprise Security",
  summary:
    "A high-concurrency liquidation marketplace featuring automated real-time order/inventory stream simulation, zero-credential recruiter demo modes, and zero-trust security hardening.",
  description:
    "Liquidation Hub is a production-ready e-commerce showcase built to simulate high-concurrency flash sales and real-time inventory dynamics. Built on a decoupled full-stack architecture with Tailwind CSS, it features an event-driven engine that updates live orders and stock levels in real time, backed by an automated 60-minute memory reset to prevent storage bloat.",
  stack: [
    "JavaScript (ES6+)",
    "Node.js",
    "Tailwind CSS",
    "Render Blueprint",
    "Cloudflare DNS",
    "RESTful APIs",
    "State Simulation Engines"
  ],
  liveUrl: "https://liquidation-hub-d3g9.onrender.com",
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
