import { ContactSection } from "@/components/home/contact-section";
import { FocusAreas } from "@/components/home/focus-areas";
import { Hero } from "@/components/home/hero";
import { SelectedWork } from "@/components/home/selected-work";
import { getProjects } from "@/lib/vercel-projects";

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <>
      <Hero />
      <FocusAreas />
      <SelectedWork projects={projects.slice(0, 2)} />
      <ContactSection />
    </>
  );
}
