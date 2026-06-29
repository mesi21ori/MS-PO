import Footer from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import AboutSection from "@/components/school/about-section";
import HeroSection from "@/components/school/hero-section";
import ProjectsSection from "@/components/school/ProjectsSection";
import WorkExperienceSection from "@/components/school/WorkExperienceSection";

export default function HomePage() {
  return (
    <>
      <main className="bg-black text-white overflow-x-hidden">
        <SiteHeader />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <WorkExperienceSection />
      </main>

      <Footer />
    </>
  );
}