import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { displayFont } from "@/lib/fonts";
import {
  education,
  experiences,
  honors,
  leadership,
  location,
  phone,
  resumeSummary,
  service,
  skills,
} from "@/lib/resume";
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

export function ResumeView() {
  return (
    <article className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <header className="max-w-3xl">
        <p className="text-xs tracking-[0.28em] text-primary uppercase">{site.role}</p>
        <h1 className={`${displayFont.className} mt-4 text-5xl leading-none md:text-7xl`}>
          {site.name}
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          {location}
          <span className="px-2 text-border" aria-hidden="true">/</span>
          <a className="hover:text-foreground" href={phone.href}>
            {phone.display}
          </a>
          <span className="px-2 text-border" aria-hidden="true">/</span>
          <a className="hover:text-foreground" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{resumeSummary}</p>
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
          {education.map((item) => (
            <li key={item.school}>
              <p className="text-foreground">{item.school}</p>
              <p className="text-sm text-primary">{item.credential}</p>
              {item.detail ? <p className="mt-1 leading-relaxed">{item.detail}</p> : null}
            </li>
          ))}
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
              <h3 className="text-lg font-medium text-balance">{item.title}</h3>
              <p className="mt-1 text-sm text-primary">
                {item.org}
                <span className="text-muted-foreground"> · {item.when}</span>
              </p>
              <p className="mt-3 max-w-3xl leading-relaxed break-words text-muted-foreground">{item.detail}</p>
              {item.liveUrl ? (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm text-primary underline-offset-4 hover:underline"
                >
                  Live site
                </a>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20" aria-labelledby="leadership-heading">
        <h2 id="leadership-heading" className={`${displayFont.className} text-4xl md:text-5xl`}>
          Leadership
        </h2>
        <div className="mt-8 max-w-3xl">
          <h3 className="text-lg font-medium">{leadership.foundation.title}</h3>
          <p className="mt-1 text-sm text-primary">
            <a href={site.foundationUrl} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
              {leadership.foundation.org}
            </a>
            <span className="text-muted-foreground"> · {leadership.foundation.when}</span>
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">{leadership.foundation.detail}</p>
        </div>
        <div className="mt-10 max-w-3xl">
          <h3 className="text-lg font-medium">{leadership.football.title}</h3>
          <p className="mt-1 text-sm text-primary">{leadership.football.when}</p>
          <p className="mt-3 leading-relaxed text-muted-foreground">{leadership.football.detail}</p>
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
