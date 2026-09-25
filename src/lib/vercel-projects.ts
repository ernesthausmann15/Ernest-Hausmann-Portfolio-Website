import { featuredProjects, type Project } from "@/lib/projects";

/**
 * Optional live enrichment from the Vercel account.
 *
 * What: Returns the curated catalog, with production and repository URLs
 *       filled in when `VERCEL_ACCESS_TOKEN` is present.
 * Why: A Vercel dashboard is behind login, so the browser cannot read it.
 *      The REST API is the supported way to attach production links. The
 *      catalog still renders if the token is missing or the request fails —
 *      the page should never depend on a secret to tell the story.
 * How: Match each curated card to a project by `vercelName` or `slug`.
 *      Keep the written description. Only the links are replaced.
 */

type VercelProject = {
  name: string;
  link?: { type?: string; org?: string; repo?: string } | null;
  targets?: {
    production?: {
      alias?: string[];
    } | null;
  } | null;
};

function toHttps(host: string): string {
  return host.startsWith("http") ? host : `https://${host}`;
}

function liveUrlFrom(project: VercelProject): string | undefined {
  const alias = project.targets?.production?.alias?.find((value) =>
    value.endsWith(".vercel.app"),
  );
  return alias ? toHttps(alias) : undefined;
}

function repoUrlFrom(project: VercelProject): string | undefined {
  const link = project.link;
  if (link?.type === "github" && link.org && link.repo) {
    return `https://github.com/${link.org}/${link.repo}`;
  }
  return undefined;
}

export async function getProjects(): Promise<Project[]> {
  const token = process.env.VERCEL_ACCESS_TOKEN;
  if (!token) return featuredProjects;

  const endpoint = new URL("https://api.vercel.com/v9/projects");
  endpoint.searchParams.set("limit", "24");
  if (process.env.VERCEL_TEAM_ID) {
    endpoint.searchParams.set("teamId", process.env.VERCEL_TEAM_ID);
  }

  try {
    const response = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(4000),
    });

    if (!response.ok) return featuredProjects;

    const payload = (await response.json()) as { projects?: VercelProject[] };
    const remote = new Map(
      (payload.projects ?? []).map((project) => [project.name.toLowerCase(), project]),
    );

    return featuredProjects.map((project) => {
      const match =
        remote.get(project.vercelName?.toLowerCase() ?? "") ??
        remote.get(project.slug.toLowerCase());
      if (!match) return project;

      return {
        ...project,
        liveUrl: liveUrlFrom(match) ?? project.liveUrl,
        repoUrl: repoUrlFrom(match) ?? project.repoUrl,
      };
    });
  } catch {
    return featuredProjects;
  }
}
