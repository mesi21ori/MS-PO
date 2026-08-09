import { ExperienceForm } from "@/components/admin/section-forms";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function ExperiencePage() {
  const content = await getSiteContent();
  return <ExperienceForm initial={content} />;
}
