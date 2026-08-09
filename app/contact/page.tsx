import Footer from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteContentProvider } from "@/components/providers/site-content-provider";
import ContactPage from "@/components/school/contact-page";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function ContactRoutePage() {
  const content = await getSiteContent();

  return (
    <SiteContentProvider content={content}>
      <main className="flex min-h-screen flex-col bg-black text-white overflow-x-hidden">
        <SiteHeader />
        <ContactPage />
        <Footer />
      </main>
    </SiteContentProvider>
  );
}
