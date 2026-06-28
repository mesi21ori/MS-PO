import Footer from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import AboutSection from "@/components/school/about-section";
import ServicesSection from "@/components/school/admission-section";
import ClientsSection from "@/components/school/CEOSection";
import HeroSection from "@/components/school/hero-section";
import Image from "next/image";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navbar */}
      <SiteHeader />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ClientsSection />
      <Footer />
    </main>
  );
}