import { featuredProjects } from "@/lib/projects";
import {
  education,
  experiences,
  honors,
  leadership,
  resumeSummary,
  service,
  skills,
} from "@/lib/resume";
import { site } from "@/lib/site";

/**
 * System prompt for the portfolio assistant.
 *
 * What: One string that tells the model who it speaks for and gives it the
 *       full portfolio as reference material.
 * Why: The assistant should only repeat what the site already says. Building
 *      the prompt from the same modules the pages render means a copy edit
 *      reaches the assistant on the next deploy, with nothing to sync.
 * How: Built once at module load. The string never changes between requests,
 *      so it is a stable prefix the API can cache.
 */

function section(title: string, lines: string[]) {
  return `<${title}>\n${lines.join("\n")}\n</${title}>`;
}

const projectLines = featuredProjects.map((project) =>
  [
    `## ${project.title}`,
    `Context: ${project.context}`,
    `Summary: ${project.summary}`,
    `Description: ${project.description}`,
    `Stack: ${project.stack.join(", ")}`,
    project.liveUrl ? `Live: ${project.liveUrl}` : null,
    project.repoUrl ? `Repository: ${project.repoUrl}` : null,
  ]
    .filter(Boolean)
    .join("\n"),
);

const experienceLines = experiences.map(
  (item) => `## ${item.title} — ${item.org} (${item.when})\n${item.detail}`,
);

const reference = [
  section("profile", [
    `Name: ${site.name}`,
    `Role: ${site.role}`,
    `Summary: ${resumeSummary}`,
    `Email: ${site.email}`,
    `GitHub: ${site.githubUrl}`,
    `LinkedIn: ${site.linkedInUrl}`,
  ]),
  section("projects", projectLines),
  section("experience", experienceLines),
  section(
    "education",
    education.map((item) =>
      [item.school, item.credential, item.detail].filter(Boolean).join(" — "),
    ),
  ),
  section("leadership", [
    `${leadership.foundation.title}, ${leadership.foundation.org} (${leadership.foundation.when}): ${leadership.foundation.detail}`,
    `${leadership.football.title} (${leadership.football.when}): ${leadership.football.detail}`,
    ...honors.map((honor) => `- ${honor}`),
  ]),
  section(
    "community",
    service.map((item) => `${item.title}, ${item.org}${item.when ? ` (${item.when})` : ""}: ${item.detail}`),
  ),
  section("skills", [skills.join(", ")]),
].join("\n\n");

export const assistantSystemPrompt = `You are the assistant on ${site.name}'s portfolio website. Visitors are mostly recruiters and hiring managers deciding whether to interview ${site.name} for AI engineering or software development roles. Answer their questions about his projects, technical stack, experience, and background.

Ground every answer in the reference material below. It is the same content the website shows. If the answer is not in it, say you don't have that detail and suggest emailing ${site.email} — never invent employers, dates, metrics, or technologies. Speak about ${site.name} in the third person.

Keep answers short: two to five sentences, or a brief list when comparing several items. Use plain text with light Markdown (bold, short lists, links). When a project has a live URL, include it. If someone asks for something unrelated to ${site.name}'s work, briefly redirect them to what you can help with.

<reference>
${reference}
</reference>`;
