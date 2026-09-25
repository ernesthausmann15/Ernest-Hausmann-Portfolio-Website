import { Reveal } from "@/components/motion/reveal";
import { displayFont } from "@/lib/fonts";

const areas = [
  {
    title: "Frontend development",
    copy: "HTML, CSS, JavaScript, TypeScript, React, Next.js, and Redux. I like components that are small enough to explain out loud and sturdy enough to change.",
  },
  {
    title: "User experience",
    copy: "Clear hierarchy, honest loading states, and a next step that does not have to be guessed. A screen should stay calm when something is slow or missing.",
  },
  {
    title: "AI-assisted workflow",
    copy: "I use AI tools to explore options, draft, and debug. I still read the result, walk the path, and take responsibility for what ships.",
  },
];

export function FocusAreas() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28" aria-labelledby="focus-heading">
      <Reveal>
        <p className="text-xs tracking-[0.22em] text-primary uppercase">Focus</p>
        <h2 id="focus-heading" className={`${displayFont.className} mt-3 max-w-xl text-4xl md:text-5xl`}>
          What I want to get better at every week
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {areas.map((area) => (
          <Reveal key={area.title}>
            <article className="h-full rounded-2xl bg-card p-6 ring-1 ring-foreground/10">
              <h3 className={`${displayFont.className} text-3xl`}>{area.title}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{area.copy}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
