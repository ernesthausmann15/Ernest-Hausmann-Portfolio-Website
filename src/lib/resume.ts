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

export const phone = { display: "734-680-3501", href: "tel:+17346803501" } as const;

export const education: { school: string; credential: string; detail?: string }[] = [
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
    liveUrl: featuredProjects.find((project) => project.slug === "skinstric")?.liveUrl,
  },
  {
    title: "Virtual internship",
    org: "FES Institute",
    when: "Frontend development",
    detail:
      "I built screens people actually move through. On Summarist, a reader lands, opens a book, chooses read or listen, saves it, and can subscribe. The cover stays recognizable from the feed to the player so they never lose the title they picked. On Ultraverse, collections, new items, search, a creator page, and an item page each load on their own, so one slow request does not blank what the person is already looking at.",
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
    when: "Columbus, NE · June 2026 – December 2026",
    detail:
      "The work is infrastructure, and the part I carry into frontend engineering is what a person can see and trust. I help test tasks through deployment, configure and deploy Schweitzer Engineering Laboratories SEL-3620 and SEL-3622 security gateways, sit in on design reviews for operational network communication, assist with rack installs, cable organization, and switch maintenance, and prepare workstations from standard procedures. A gateway or a workstation is only useful if the operator can tell what state it is in and what to do next. That is the same standard I want an interface to meet.",
  },
  {
    title: "Frozen & Dairy Operations Specialist",
    org: "Hy-Vee Foods",
    when: "Columbus, NE · March 2020 – June 2026",
    detail:
      "I kept frozen and dairy stock organized, tracked inventory, and ran audits so a shopper could find the product without a hunt. When someone was stuck, I helped them directly. It is ordinary work, and it trained the habit I use on screens: put the thing where a person expects it, and make the next step obvious.",
  },
];

export const leadership = {
  foundation: {
    title: "Founder and executive director",
    org: "Light Beneath the Well",
    when: "2023 – present",
    detail:
      "The foundation exists so a community can drink clean water. I coordinate resources for education and public-health work, help plan well projects from a site assessment through equipment and maintenance, follow the rules that govern a registered nonprofit, and watch the budget so money lands on the work. I am grateful to be trusted with that, and I try to keep the focus on the community the well is meant to serve.",
  },
  football: {
    title: "University of Michigan and University of Nebraska football",
    when: "2022 – 2025",
    detail:
      "It was an honor to be chosen captain by my teammates. Most of that work was making the plan clear and holding the standard when the day was hard. I hope to bring that same care into a product, so people know what is being asked of them.",
  },
} as const;

export const honors = [
  "Team Captain, University of Michigan football (2025), chosen by teammates",
  "National Champion (2023), part of the 15-0 postseason run and the NCAA Division I Football National Championship",
  "Third-team All-Big Ten (2025) and honorable mention (2024 and 2025)",
  "Roger Zatkoff Award (2024), Michigan's most outstanding linebacker, after leading the team in tackles (89)",
  "Blue Collar Award (2024), for work ethic, consistency, and preparation",
  "Jason Witten Collegiate Man of the Year semifinalist (2025), for community impact and personal integrity",
  "Big Ten Media Days representative (2025), selected by the coaching staff",
  "True freshman starter and Blackshirt recipient, University of Nebraska (2022), with a varsity letter",
];

export const service: { title: string; org: string; when?: string; detail: string }[] = [
  {
    title: "Adoption ambassador",
    org: "Samaritas, Michigan",
    when: "2025 – present",
    detail:
      "Support child-welfare awareness and speak up for foster-care networks. The work is outreach: helping a person understand a program and decide to take part.",
  },
  {
    title: "Youth mentor and speaker",
    org: "Juvenile detention facilities, Detroit and Ann Arbor",
    detail:
      "Join mentorship sessions on personal development, goal-setting, and decisions. I try to leave a clear next step, not a speech.",
  },
  {
    title: "Patient engagement volunteer",
    org: "C.S. Mott Children's Hospital, Ann Arbor",
    detail: "Visit pediatric patients and families during hospital stays.",
  },
  {
    title: "Community event volunteer",
    org: "Special Olympics and youth camps",
    detail: "Help with logistics so athletes and campers can take part without friction.",
  },
];

export const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Redux",
  "Render",
  "Vercel",
  "Github",
  "Supabase",
  "PostgreSQL",
  "LLM orchestration",
  "Data pipelines",
  "Backend stability",
  "System reliability",
  "Full-stack development",
  "Frontend development",
  "User experience",
  "AI-assisted workflow",
  "Linux administration",
  "Security gateways",
  "Network switch configuration",
  "Endpoint provisioning",
  "Risk assessment",
  "Compliance support",
  "Inventory management",
  "Workflow organization",
  "Project coordination",
];
