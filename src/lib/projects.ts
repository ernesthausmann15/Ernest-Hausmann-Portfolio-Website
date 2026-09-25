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
    slug: "summarist",
    vercelName: "virtual-internship-umber",
    title: "Summarist",
    context: "FES virtual internship",
    summary: "A book-summary product for reading, listening, and saving titles.",
    description:
      "Landing, a personal feed, book detail, an audio player, a saved library, and subscription plans. Search waits briefly before it calls the API. Covers move from the feed to the detail page to the player so the person always knows which book they opened. Auth and the library sit on Firebase. Checkout uses Stripe.",
    stack: ["Next.js", "TypeScript", "Redux", "Firebase", "Stripe", "Tailwind CSS"],
    liveUrl: "https://virtual-internship-umber.vercel.app",
  },
  {
    slug: "ultraverse",
    vercelName: "web-murex-one-99",
    title: "Ultraverse",
    context: "FES practical internship",
    summary: "A Next.js marketplace for browsing a live NFT catalog.",
    description:
      "The home page shows a collections carousel, new items, and a ranked seller list. Explore sorts and searches the catalog. A creator route and an item route each load one record. Those sections request data on their own, so a slow response in one area does not blank the rest of the page.",
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    liveUrl: "https://web-murex-one-99.vercel.app",
  },
  {
    slug: "movie-grab",
    vercelName: "movie-grab-typescript-x7d7",
    title: "Movie Grab",
    context: "Frontend project",
    summary: "A film search app with a saved theme and a stable detail URL.",
    description:
      "Search a film catalogue, scan results behind a loading skeleton, and open one movie on its own route. The light or dark theme is stored in the browser so it is still there after a refresh. Shared chrome — navigation and footer — reads that theme from the app root.",
    stack: ["React", "JavaScript", "React Router"],
    liveUrl: "https://movie-grab-typescript-x7d7.vercel.app",
  },
  {
    slug: "library",
    title: "Library",
    context: "Frontend project",
    summary: "A bookstore interface with featured titles and a working cart.",
    description:
      "A landing page leads into highlights, featured books, and an explore view. Each book has a detail page. The cart lives in the app shell, so adding a title, changing a quantity, or removing a line updates every route that can see it.",
    stack: ["React", "JavaScript", "React Router"],
  },
];
