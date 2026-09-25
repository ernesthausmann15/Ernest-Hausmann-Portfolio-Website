import type { Metadata } from "next";
import { ProjectGrid } from "@/components/projects/project-grid";
import { displayFont } from "@/lib/fonts";
import { site } from "@/lib/site";
import { getProjects } from "@/lib/vercel-projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected frontend projects by Ernest Hausmann, including live Vercel deployments.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <p className="text-xs tracking-[0.22em] text-primary uppercase">Work</p>
      <h1 className={`${displayFont.className} mt-3 max-w-3xl text-5xl leading-none md:text-7xl`}>
        Projects
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Each card opens a live Vercel deployment. The account home is{" "}
        <a
          href={site.vercelUrl}
          target="_blank"
          rel="noreferrer"
          className="text-primary underline-offset-4 hover:underline"
        >
          vercel.com/ernest-hausmann
        </a>
        .
      </p>
      <div className="mt-12">
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
