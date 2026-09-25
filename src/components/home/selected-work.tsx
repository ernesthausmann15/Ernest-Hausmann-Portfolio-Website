import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { ProjectGrid } from "@/components/projects/project-grid";
import { Button } from "@/components/ui/button";
import { displayFont } from "@/lib/fonts";
import type { Project } from "@/lib/projects";

export function SelectedWork({ projects }: { projects: Project[] }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-8" aria-labelledby="work-heading">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.22em] text-primary uppercase">Selected work</p>
            <h2 id="work-heading" className={`${displayFont.className} mt-3 text-4xl md:text-5xl`}>
              Interfaces with a job to do
            </h2>
          </div>
          <Button asChild variant="outline" className="h-10 px-4">
            <Link href="/projects">All projects</Link>
          </Button>
        </div>
      </Reveal>
      <div className="mt-10">
        <ProjectGrid projects={projects} />
      </div>
    </section>
  );
}
