import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { displayFont } from "@/lib/fonts";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full bg-card/80 transition duration-300 hover:-translate-y-1 hover:ring-primary/40">
      <CardHeader>
        <p className="text-xs tracking-[0.18em] text-primary uppercase">{project.context}</p>
        <CardTitle className={`${displayFont.className} text-3xl font-normal`}>{project.title}</CardTitle>
        <CardDescription className="text-base leading-relaxed text-foreground/80">
          {project.summary}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5">
        <p className="leading-relaxed text-muted-foreground">{project.description}</p>
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li key={item}>
              <Badge variant="outline">{item}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="gap-3">
        {project.liveUrl ? (
          <Button asChild className="h-9 px-3">
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              Live deployment
              <ArrowUpRight />
            </a>
          </Button>
        ) : null}
        {project.repoUrl ? (
          <Button asChild variant="outline" className="h-9 px-3">
            <a href={project.repoUrl} target="_blank" rel="noreferrer">
              Repository
              <ArrowUpRight />
            </a>
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
