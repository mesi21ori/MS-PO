import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/project-form";
import { getProjectById } from "@/lib/projects";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold">Edit project</h2>
        <p className="mt-2 text-zinc-400">{project.name}</p>
      </div>
      <ProjectForm project={project} />
    </div>
  );
}
