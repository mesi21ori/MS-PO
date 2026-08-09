import { BrandingForm } from "@/components/admin/section-forms";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function BrandingPage() {
  const content = await getSiteContent();
  return <BrandingForm initial={content} />;
}
