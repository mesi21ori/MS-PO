import ProjectsTable from "@/components/admin/projects-table";
import { ProjectsMetaForm } from "@/components/admin/section-forms";
import { getAllProjects } from "@/lib/projects";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const [projects, content] = await Promise.all([
    getAllProjects(),
    getSiteContent(),
  ]);

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-3xl font-semibold">Projects</h2>
        <p className="mt-2 text-zinc-400">
          Paginated project list. Use Add project to create or edit in a modal.
        </p>
      </div>

      <ProjectsMetaForm initial={content} />
      <ProjectsTable projects={projects} />
    </div>
  );
}
