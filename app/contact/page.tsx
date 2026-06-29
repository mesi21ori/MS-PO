import Footer from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import ContactPage from "@/components/school/contact-page";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white overflow-x-hidden">
      {/* Navbar */}
      <SiteHeader />
      <ContactPage />
      <Footer />
    </main>
  );
}