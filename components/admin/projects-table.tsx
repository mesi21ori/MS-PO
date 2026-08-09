"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { ProjectDTO } from "@/lib/projects";
import ProjectForm from "@/components/admin/project-form";
import {
  AdminModal,
  Pagination,
  usePagination,
} from "@/components/admin/admin-ui";

export default function ProjectsTable({ projects }: { projects: ProjectDTO[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<ProjectDTO | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (project) =>
        project.name.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q) ||
        (project.role || "").toLowerCase().includes(q)
    );
  }, [projects, query]);

  const { page, setPage, totalPages, pageItems, pageSize } =
    usePagination(filtered);

  async function handleDelete(id: string, name: string) {
    const confirmed = window.confirm(`Delete "${name}"? This cannot be undone.`);
    if (!confirmed) return;

    setDeletingId(id);
    setError("");

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  function closeModal() {
    setModalMode(null);
    setEditing(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search projects..."
          className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-[#ff6b3d]"
        />
        <button
          type="button"
          onClick={() => {
            setEditing(null);
            setModalMode("add");
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-[#ff6b3d] px-5 py-2.5 text-sm font-semibold"
        >
          <Plus className="h-4 w-4" />
          Add project
        </button>
      </div>

      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center">
          <p className="text-lg font-medium">No projects found</p>
          <p className="mt-2 text-sm text-zinc-400">
            Add a project to show it on the website.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <div className="hidden grid-cols-[1.4fr_0.8fr_0.6fr_0.5fr_auto] gap-4 border-b border-white/10 bg-white/[0.03] px-5 py-3 text-xs uppercase tracking-wider text-zinc-500 md:grid">
            <span>Project</span>
            <span>Category</span>
            <span>Status</span>
            <span>Order</span>
            <span>Actions</span>
          </div>

          <div className="divide-y divide-white/10">
            {pageItems.map((project) => (
              <div
                key={project.id}
                className="grid gap-4 px-5 py-4 md:grid-cols-[1.4fr_0.8fr_0.6fr_0.5fr_auto] md:items-center"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={project.image || "/project-placeholder.png"}
                    alt={project.name}
                    className="h-14 w-20 rounded-lg object-cover bg-zinc-800"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-medium">{project.name}</p>
                    <p className="line-clamp-1 text-sm text-zinc-500">
                      {project.role || "No role"}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-zinc-300">{project.category}</p>

                <span
                  className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                    project.published
                      ? "bg-emerald-500/15 text-emerald-300"
                      : "bg-zinc-500/20 text-zinc-300"
                  }`}
                >
                  {project.published ? "Published" : "Draft"}
                </span>

                <p className="text-sm text-zinc-400">{project.sortOrder}</p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(project);
                      setModalMode("edit");
                    }}
                    className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 text-sm text-zinc-200 transition hover:bg-white/5"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </button>
                  <button
                    type="button"
                    disabled={deletingId === project.id}
                    onClick={() => handleDelete(project.id, project.name)}
                    className="inline-flex items-center gap-1 rounded-lg border border-red-500/30 px-3 py-2 text-sm text-red-300 transition hover:bg-red-500/10 disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {deletingId === project.id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        totalItems={filtered.length}
        pageSize={pageSize}
      />

      <AdminModal
        open={modalMode !== null}
        title={modalMode === "edit" ? "Edit project" : "Add project"}
        onClose={closeModal}
        wide
      >
        <ProjectForm
          key={editing?.id || "new"}
          project={editing}
          embedded
          onSuccess={closeModal}
          onCancel={closeModal}
        />
      </AdminModal>
    </div>
  );
}
