/**
 * Curated project catalog.
 *
 * What: The stories shown on the Projects page.
 * Why: A Vercel account list is a set of deployment names. Recruiters need
 *      a sentence about what the product does and which skills it proves.
 *      This file is that sentence. `getProjects()` can later attach the live
 *      URL and GitHub link from the Vercel API without rewriting the copy.
 * How: A card is listed here only after its live URL has been checked in a
 *      browser and matched to this codebase. Summarist qualifies because
 *      virtual-internship-umber.vercel.app is an authorized domain in that
 *      app's Firebase config and the live page includes copy from the local
 *      source. Other builds stay off this list until their own deployment
 *      can be checked the same way.
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
];
