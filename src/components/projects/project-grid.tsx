import { ProjectCard } from "@/components/projects/project-card";
import type { Project } from "@/lib/projects";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
