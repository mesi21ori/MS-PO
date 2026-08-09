import { AboutForm } from "@/components/admin/section-forms";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const content = await getSiteContent();
  return <AboutForm initial={content} />;
}
