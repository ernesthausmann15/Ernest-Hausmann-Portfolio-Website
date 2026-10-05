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
    slug: "vrymnox-liquidation-engine",
    vercelName: "vrymnox-liquidation-hub",
    title: "Vrymnox — AI-Powered Liquidation & Flash Sale Engine",
    context: "Full-Stack Architecture & AI Integration",
    summary:
      "A high-concurrency industrial clearance platform featuring atomic database transactions, enterprise-grade security, and an AI-driven command assistant.",
    description:
      "Vrymnox bridges rigorous software engineering with AI orchestration. It features a secure FastAPI backend communicating with a Next.js 16 frontend styled with an industrial Google Stitch design system. Built to solve high-stakes flash sale concurrency challenges, the architecture implements atomic database transactions to eliminate race conditions, double-submit CSRF protection, and role-based access control. An integrated AI command utility enables inventory managers to execute natural language stock queries and rapid adjustments seamlessly.",
    stack: [
      "FastAPI",
      "Python",
      "Next.js",
      "TypeScript",
      "Tailwind CSS v4",
      "PostgreSQL",
      "SQLAlchemy",
      "Vercel",
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
    slug: "summarist",
    vercelName: "virtual-internship-umber",
    title: "Summarist",
    context: "FES project",
    summary:
      "A book-summary product for reading, listening, and saving titles.",
    description:
      "Landing, a personal feed, book detail, an audio player, a saved library, and subscription plans. Search waits briefly before it calls the API. Covers move from the feed to the detail page to the player so the person always knows which book they opened. Auth and the library sit on Firebase. Checkout uses Stripe.",
    stack: [
      "Next.js",
      "TypeScript",
      "Redux",
      "Firebase",
      "Stripe",
      "Tailwind CSS",
    ],
    liveUrl: "https://virtual-internship-umber.vercel.app",
  },
  {
    slug: "ultraverse",
    vercelName: "web-murex-one-99",
    title: "Ultraverse",
    context: "FES project",
    summary: "A Next.js marketplace for browsing a live NFT catalog.",
    description:
      "The home page shows a collections carousel, new items, and a ranked seller list. Explore sorts and searches the catalog. A creator route and an item route each load one record. Those sections request data on their own, so a slow response in one area does not blank the rest of the page.",
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    liveUrl: "https://web-murex-one-99.vercel.app",
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
