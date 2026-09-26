import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { displayFont } from "@/lib/fonts";
import { site } from "@/lib/site";

/**
 * Issued certificate.
 *
 * What: The graduation PDF from `public/certificates`, plus a PNG of that same page.
 * Why: The PDF is the file that was issued. A browser PDF plugin often hides the
 *      page inside its own viewer, so the resume shows a render of that page and
 *      the open link still serves the original PDF.
 */
const certificatePdf = site.certificatePath;
const certificatePreview = "/certificates/fes-certificate.png";

const experiences = [
  {
    title: "Practical internship",
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

const honors = [
  "Team Captain, University of Michigan football (2025), chosen by teammates",
  "National Champion (2023), part of the 15-0 postseason run and the NCAA Division I Football National Championship",
  "Third-team All-Big Ten (2025) and honorable mention (2024 and 2025)",
  "Roger Zatkoff Award (2024), Michigan's most outstanding linebacker, after leading the team in tackles (89)",
  "Blue Collar Award (2024), for work ethic, consistency, and preparation",
  "Jason Witten Collegiate Man of the Year semifinalist (2025), for community impact and personal integrity",
  "Big Ten Media Days representative (2025), selected by the coaching staff",
  "True freshman starter and Blackshirt recipient, University of Nebraska (2022), with a varsity letter",
];

const service = [
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

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Redux",
  "User experience",
  "AI-assisted workflow",
  "Linux administration",
  "Python",
  "Security gateways",
  "Network switch configuration",
  "Endpoint provisioning",
  "Risk assessment",
  "Compliance support",
  "Inventory management",
  "Workflow organization",
  "Project coordination",
];

export function ResumeView() {
  return (
    <article className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <header className="max-w-3xl">
        <p className="text-xs tracking-[0.28em] text-primary uppercase">{site.role}</p>
        <h1 className={`${displayFont.className} mt-4 text-5xl leading-none md:text-7xl`}>
          {site.name}
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Columbus, NE 68601
          <span className="px-2 text-border">/</span>
          <a className="hover:text-foreground" href="tel:+17346803501">
            734-680-3501
          </a>
          <span className="px-2 text-border">/</span>
          <a className="hover:text-foreground" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          I am moving into frontend engineering. I care about what a person sees,
          how they move through a screen, and how AI tools can speed the work
          without replacing the judgment. The years before this were operations,
          infrastructure, and team leadership. I am bringing that discipline with
          me, and I am still a student of the craft.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild className="h-10 px-4">
            <a href={site.linkedInUrl} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </Button>
          <Button asChild variant="outline" className="h-10 px-4">
            <a href={site.foundationUrl} target="_blank" rel="noreferrer">
              Light Beneath the Well
            </a>
          </Button>
          <Button asChild variant="ghost" className="h-10 px-4">
            <Link href="/#contact">Contact form</Link>
          </Button>
        </div>
      </header>

      <section className="mt-16" aria-labelledby="education-heading">
        <h2 id="education-heading" className={`${displayFont.className} text-4xl`}>
          Education
        </h2>
        <ul className="mt-6 space-y-5 text-muted-foreground">
          <li>
            <p className="text-foreground">Central Community College — Columbus, NE</p>
            <p className="text-sm text-primary">Certificate in Cybersecurity, expected May 2027</p>
            <p className="mt-1 leading-relaxed">
              Coursework in network security, compliance, digital risk, Python, and Linux server administration.
            </p>
          </li>
          <li>
            <p className="text-foreground">University of Michigan — Ann Arbor, MI</p>
            <p className="text-sm text-primary">Undergraduate studies, attended until January 2026</p>
          </li>
          <li>
            <p className="text-foreground">University of Nebraska — Lincoln, NE</p>
            <p className="text-sm text-primary">Undergraduate coursework, attended until January 2023</p>
          </li>
        </ul>
      </section>

      <section className="mt-20 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start" aria-labelledby="fes-heading">
        <div>
          <p className="text-xs tracking-[0.22em] text-primary uppercase">Training</p>
          <h2 id="fes-heading" className={`${displayFont.className} mt-3 text-4xl md:text-5xl`}>
            FES Institute
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            I completed the Frontend Development Bootcamp and a practical internship
            at the FES Institute, founded by David Bragg. The certificate shown here
            is the one I was issued. The skills I use from it are HTML, CSS,
            JavaScript, React, Next.js, Node.js, TypeScript, and Redux.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="h-10 px-4">
              <a href={certificatePdf} target="_blank" rel="noreferrer">
                Open certificate
              </a>
            </Button>
            <Button asChild variant="outline" className="h-10 px-4">
              <a href={site.fesUrl} target="_blank" rel="noreferrer">
                FES Institute
              </a>
            </Button>
          </div>
        </div>
        <a
          href={certificatePdf}
          target="_blank"
          rel="noreferrer"
          aria-label="Open the FES Institute certificate of graduation"
          className="block overflow-hidden rounded-2xl ring-1 ring-primary/30 transition hover:ring-primary/70"
        >
          <Image
            src={certificatePreview}
            width={1685}
            height={1191}
            unoptimized
            alt="Certificate of graduation for Ernest Hausmann, Frontend Development Bootcamp and practical internship at the FES Institute, founded by David Bragg."
            className="h-auto w-full bg-[#f7f4ee]"
          />
        </a>
      </section>

      <section className="mt-20" aria-labelledby="experience-heading">
        <h2 id="experience-heading" className={`${displayFont.className} text-4xl md:text-5xl`}>
          Experience
        </h2>
        <ol className="mt-10 space-y-10 border-l border-border pl-8">
          {experiences.map((item) => (
            <li key={item.title} className="relative">
              <span className="absolute top-1.5 -left-[2.4rem] size-3 rounded-full bg-primary ring-4 ring-background" />
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="mt-1 text-sm text-primary">
                {item.org}
                <span className="text-muted-foreground"> · {item.when}</span>
              </p>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{item.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20" aria-labelledby="leadership-heading">
        <h2 id="leadership-heading" className={`${displayFont.className} text-4xl md:text-5xl`}>
          Leadership
        </h2>
        <div className="mt-8 max-w-3xl">
          <h3 className="text-lg font-medium">Founder and executive director</h3>
          <p className="mt-1 text-sm text-primary">
            <a href={site.foundationUrl} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
              Light Beneath the Well
            </a>
            <span className="text-muted-foreground"> · 2023 – present</span>
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            The foundation exists so a community can drink clean water. I coordinate
            resources for education and public-health work, help plan well projects
            from a site assessment through equipment and maintenance, follow the rules
            that govern a registered nonprofit, and watch the budget so money lands
            on the work. I am grateful to be trusted with that, and I try to keep
            the focus on the community the well is meant to serve.
          </p>
        </div>
        <div className="mt-10 max-w-3xl">
          <h3 className="text-lg font-medium">University of Michigan and University of Nebraska football</h3>
          <p className="mt-1 text-sm text-primary">2022 – 2025</p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            It was an honor to be chosen captain by my teammates. Most of that
            work was making the plan clear and holding the standard when the day
            was hard. I hope to bring that same care into a product, so people
            know what is being asked of them.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
            {honors.map((honor) => (
              <li key={honor}>{honor}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-20" aria-labelledby="service-heading">
        <h2 id="service-heading" className={`${displayFont.className} text-4xl`}>
          Community
        </h2>
        <ul className="mt-8 space-y-6">
          {service.map((item) => (
            <li key={item.title}>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-primary">
                {item.org}
                {item.when ? <span className="text-muted-foreground"> · {item.when}</span> : null}
              </p>
              <p className="mt-1 max-w-3xl leading-relaxed text-muted-foreground">{item.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20" aria-labelledby="skills-heading">
        <h2 id="skills-heading" className={`${displayFont.className} text-4xl`}>
          Skills
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li key={skill}>
              <Badge variant="outline" className="h-7 px-3">
                {skill}
              </Badge>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
