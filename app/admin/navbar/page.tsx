import { NavbarForm } from "@/components/admin/section-forms";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function NavbarPage() {
  const content = await getSiteContent();
  return <NavbarForm initial={content} />;
}
