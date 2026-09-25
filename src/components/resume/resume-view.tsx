import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { displayFont } from "@/lib/fonts";
import { site } from "@/lib/site";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Redux",
  "Python",
  "Linux",
];

const experiences = [
  {
    title: "Practical internship",
    org: "FES Institute",
    detail:
      "Shipped frontend work on real product surfaces: a book-summary app with authentication, a saved library, and subscriptions, and a marketplace with collections, search, creator profiles, and item pages. The habit I practiced was keeping each screen understandable when the data was slow or missing.",
  },
  {
    title: "Frontend Development Bootcamp",
    org: "FES Institute",
    detail:
      "Completed the bootcamp founded by David Bragg. The coursework built working proficiency in HTML, CSS, JavaScript, React, Next.js, Node.js, TypeScript, and Redux, then asked me to use those tools on interfaces other people could click through.",
  },
  {
    title: "IT Systems & Infrastructure Internship",
    org: "Loup Power District",
    detail:
      "Worked with security gateways, Python, and Linux. That season taught me to treat access, configuration, and the systems underneath an application with the same care as the screen a person sees.",
  },
];

const leadership = [
  {
    title: "Team captain and national champion",
    org: "University of Michigan football",
    detail:
      "Captaining a team is mostly preparation and accountability. I learned to show up ready, speak clearly when the plan changed, and hold a standard without making the work about me. I want that same discipline in how I write software and how I work with other engineers.",
  },
  {
    title: "Founder",
    org: "Light Beneath the Well",
    href: site.foundationUrl,
    detail:
      "I started a foundation focused on clean drinking water in Uganda. The useful part of that work is operational: follow through with partners, keep the mission specific, and care about whether a community actually has water.",
  },
];

export function ResumeView() {
  const certificateHref =
    process.env.NEXT_PUBLIC_FES_CERTIFICATE_URL || site.certificatePath;

  return (
    <article className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <header className="max-w-3xl">
        <p className="text-xs tracking-[0.28em] text-primary uppercase">{site.role}</p>
        <h1 className={`${displayFont.className} mt-4 text-5xl leading-none md:text-7xl`}>
          {site.name}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          I am transitioning into a junior software engineering role. I care
          about frontend development, about making an interface feel obvious,
          and about using AI tools well — as a way to explore and draft, while
          I stay responsible for what actually ships.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          The work before software taught me to prepare, to be accountable to a
          group, and to finish. I am bringing that with me, quietly, into code.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild className="h-10 px-4">
            <a href={site.linkedInUrl} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </Button>
          <Button asChild variant="outline" className="h-10 px-4">
            <a href={`mailto:${site.email}`}>Email</a>
          </Button>
          <Button asChild variant="ghost" className="h-10 px-4">
            <Link href="/#contact">Contact form</Link>
          </Button>
        </div>
      </header>

      <section className="mt-20 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center" aria-labelledby="fes-heading">
        <div>
          <p className="text-xs tracking-[0.22em] text-primary uppercase">Training</p>
          <h2 id="fes-heading" className={`${displayFont.className} mt-3 text-4xl md:text-5xl`}>
            FES Institute
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            I completed the Frontend Development Bootcamp and a practical
            internship at the FES Institute, founded by David Bragg. The
            certificate below records that work. The skills I use from it are
            HTML, CSS, JavaScript, React, Next.js, Node.js, TypeScript, and
            Redux.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="h-10 px-4">
              <a href={certificateHref} target="_blank" rel="noreferrer">
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
          href={certificateHref}
          target="_blank"
          rel="noreferrer"
          aria-label="Open the FES Institute credential"
          className="block overflow-hidden rounded-2xl ring-1 ring-primary/30 transition hover:ring-primary/70"
        >
          {/* The SVG is a credential summary rendered on the page. Swap the
              file, or set NEXT_PUBLIC_FES_CERTIFICATE_URL, when the issued
              PDF should be the thing this link opens. */}
          <Image
            src="/fes-certificate.svg"
            width={1200}
            height={820}
            unoptimized
            alt="Credential summary for Ernest Hausmann, Frontend Development Bootcamp and practical internship at the FES Institute, founded by David Bragg."
            className="h-auto w-full bg-[#f7f1e4]"
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
              <p className="mt-1 text-sm text-primary">{item.org}</p>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{item.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20" aria-labelledby="leadership-heading">
        <h2 id="leadership-heading" className={`${displayFont.className} text-4xl md:text-5xl`}>
          Leadership
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          These roles are not a substitute for engineering experience. They are
          where I learned work ethic, team accountability, operational
          follow-through, and discipline.
        </p>
        <ol className="mt-10 space-y-10 border-l border-border pl-8">
          {leadership.map((item) => (
            <li key={item.title} className="relative">
              <span className="absolute top-1.5 -left-[2.4rem] size-3 rounded-full bg-primary ring-4 ring-background" />
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="mt-1 text-sm text-primary">
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                    {item.org}
                  </a>
                ) : (
                  item.org
                )}
              </p>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{item.detail}</p>
            </li>
          ))}
        </ol>
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
