import { featuredProjects } from "@/lib/projects";

/**
 * Resume content.
 *
 * What: The written resume, as data.
 * Why: Two readers need the same words — the Resume page and the AI
 *      assistant's system prompt. Keeping them in one module means the
 *      assistant can never describe a job that the page does not show.
 * How: `resume-view.tsx` renders these lists. `assistant-context.ts`
 *      serializes them for the model. Edit copy here, never in two places.
 */

export const resumeSummary =
  "AI Engineer and Full-Stack Developer specializing in intelligent agent orchestration, robust LLM integrations, and scalable React architectures. Combines hands-on production experience in building dependable data pipelines with a disciplined approach to backend stability and system reliability. Rapidly turns advanced technical concepts into high-performance, user-ready applications.";

export const location = "Columbus, NE 68601";

export const phone = {
  display: "734-680-3501",
  href: "tel:+17346803501",
} as const;

export const education: {
  school: string;
  credential: string;
  detail?: string;
}[] = [
  {
    school: "Central Community College — Columbus, NE",
    credential: "Certificate in Cybersecurity, expected May 2027",
    detail:
      "Coursework in network security, compliance, digital risk, Python, and Linux server administration.",
  },
  {
    school: "University of Michigan — Ann Arbor, MI",
    credential: "Undergraduate studies, attended until January 2026",
  },
  {
    school: "University of Nebraska — Lincoln, NE",
    credential: "Undergraduate coursework, attended until January 2023",
  },
];

export const experiences: {
  title: string;
  org: string;
  when: string;
  detail: string;
  liveUrl?: string;
}[] = [
  {
    // Names the product, then the part Ernest built. The lists are what the
    // AI returns, so an employer does not have to infer it from a job title.
    title: "Software Engineering Intern",
    org: "Skinstric",
    when: "2026 – Present",
    detail:
      "I built the screens for Skinstric's onboarding AI. A person starts with a short setup, takes a photo, and the AI returns ranked estimates for age, sex, and race. My work was the camera step and the result screens: the strongest estimate appears first, and the person can tell what to look at next.",
    liveUrl: featuredProjects.find((project) => project.slug === "skinstric")
      ?.liveUrl,
  },

  {
    title: "Frontend Development Bootcamp",
    org: "FES Institute",
    when: "Founded by David Bragg",
    detail:
      "I learned HTML, CSS, JavaScript, React, Next.js, Node.js, TypeScript, and Redux by making interfaces, not by collecting notes. The question I kept was simple: can someone tell what this screen is for, and what they should do next? I use AI tools to draft and debug, then I read the result and walk the path myself.",
  },
  {
    title: "IT Systems & Infrastructure Intern",
    org: "Loup Power District",
    when: "Columbus, NE · June 2026 – Present",
    detail:
      "The work is infrastructure, and the part I carry into frontend engineering is what a person can see and trust. I help test tasks through deployment, configure and deploy Schweitzer Engineering Laboratories SEL-3620 and SEL-3622 security gateways, sit in on design reviews for operational network communication, assist with rack installs, cable organization, and switch maintenance, and prepare workstations from standard procedures. A gateway or a workstation is only useful if the operator can tell what state it is in and what to do next. That is the same standard I want an interface to meet.",
  },
];

export const leadership = {
  foundation: {
    title: "Founder and executive director",
    org: "Light Beneath the Well",
    when: "2023 – Present",
  },
  football: {
    title: "University of Michigan and University of Nebraska football",
    when: "2022 – 2025",
  },
} as const;

export const honors = [
  "Team Captain, University of Michigan football (2025), chosen by teammates",
  "National Champion (2023)",
];

export const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Supabase",
  "LLM Orchestration",
  "Data Pipelines",
  "Vercel / Render",
  "Linux Administration",
  "Full-Stack Development",
];
