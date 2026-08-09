import { FooterForm } from "@/components/admin/section-forms";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function FooterPage() {
  const content = await getSiteContent();
  return <FooterForm initial={content} />;
}
