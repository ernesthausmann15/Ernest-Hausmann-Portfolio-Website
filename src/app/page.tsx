import { ContactSection } from "@/components/home/contact-section";
import { Hero } from "@/components/home/hero";
import { SelectedWork } from "@/components/home/selected-work";
import { getProjects } from "@/lib/vercel-projects";

export default async function HomePage() {
  const projects = await getProjects();

  // Home previews the published products. The same catalog is on /projects.
  return (
    <>
      <Hero />
      <SelectedWork projects={projects} />
      <ContactSection />
    </>
  );
}
