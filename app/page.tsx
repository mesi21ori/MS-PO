import Footer from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteContentProvider } from "@/components/providers/site-content-provider";
import AboutSection from "@/components/school/about-section";
import HeroSection from "@/components/school/hero-section";
import ProjectsSection from "@/components/school/ProjectsSection";
import WorkExperienceSection from "@/components/school/WorkExperienceSection";
import { getPublishedProjects, type ProjectDTO } from "@/lib/projects";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let projects: ProjectDTO[] = [];
  const content = await getSiteContent();

  try {
    projects = await getPublishedProjects();
  } catch (error) {
    console.error("Failed to load projects from database:", error);
  }

  return (
    <SiteContentProvider content={content}>
      <main className="bg-black text-white overflow-x-hidden">
        <SiteHeader />
        <HeroSection />
        <AboutSection />
        <ProjectsSection projects={projects} />
        <WorkExperienceSection />
      </main>

      <Footer />
    </SiteContentProvider>
  );
}
