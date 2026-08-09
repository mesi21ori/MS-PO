import { ContactSettingsForm } from "@/components/admin/section-forms";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function ContactAdminPage() {
  const content = await getSiteContent();
  return <ContactSettingsForm initial={content} />;
}
