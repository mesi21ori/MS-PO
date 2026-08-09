"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ProjectDTO } from "@/lib/projects";

type FormState = {
  name: string;
  category: string;
  image: string;
  link: string;
  role: string;
  smallDescription: string;
  technologies: string;
  keyFeatures: string;
  published: boolean;
  sortOrder: number;
};

const CATEGORIES = ["Full Stack", "Frontend", "Backend", "AI / Learning", "Web & Mobile"];

function toFormState(project?: ProjectDTO | null): FormState {
  return {
    name: project?.name ?? "",
    category: project?.category ?? "Full Stack",
    image: project?.image ?? "",
    link: project?.link ?? "",
    role: project?.role ?? "",
    smallDescription: project?.smallDescription ?? "",
    technologies: (project?.technologies ?? []).join(", "),
    keyFeatures: (project?.keyFeatures ?? []).join("\n"),
    published: project?.published ?? true,
    sortOrder: project?.sortOrder ?? 0,
  };
}

export default function ProjectForm({
  project,
  onSuccess,
  onCancel,
  embedded = false,
}: {
  project?: ProjectDTO | null;
  onSuccess?: () => void;
  onCancel?: () => void;
  embedded?: boolean;
}) {
  const router = useRouter();
  const isEdit = Boolean(project);
  const [form, setForm] = useState<FormState>(() => toFormState(project));
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleUpload(file: File | null) {
    if (!file) return;
    setUploading(true);
    setError("");

    try {
      const body = new FormData();
      body.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      updateField("image", data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      name: form.name.trim(),
      category: form.category.trim(),
      image: form.image.trim(),
      link: form.link.trim() || "#",
      role: form.role.trim() || null,
      smallDescription: form.smallDescription.trim(),
      technologies: form.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      keyFeatures: form.keyFeatures
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      links: form.link.trim()
        ? [{ name: "View Project", url: form.link.trim() }]
        : [],
      published: form.published,
      sortOrder: Number(form.sortOrder) || 0,
    };

    try {
      const res = await fetch(
        isEdit ? `/api/projects/${project!.id}` : "/api/projects",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Save failed");
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/admin/projects");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-6 ${embedded ? "w-full" : "mx-auto max-w-3xl"}`}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 sm:col-span-2">
          <span className="text-sm text-zinc-400">Project name</span>
          <input
            required
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#ff6b3d]"
            placeholder="Heritage Hub"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm text-zinc-400">Category</span>
          <select
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#11111d] px-4 py-3 outline-none focus:border-[#ff6b3d]"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm text-zinc-400">Role</span>
          <input
            value={form.role}
            onChange={(e) => updateField("role", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#ff6b3d]"
            placeholder="Full Stack Developer"
          />
        </label>

        <label className="space-y-2 sm:col-span-2">
          <span className="text-sm text-zinc-400">Project link</span>
          <input
            value={form.link}
            onChange={(e) => updateField("link", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#ff6b3d]"
            placeholder="https://..."
          />
        </label>

        <label className="space-y-2 sm:col-span-2">
          <span className="text-sm text-zinc-400">Short description</span>
          <textarea
            required
            rows={4}
            value={form.smallDescription}
            onChange={(e) => updateField("smallDescription", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#ff6b3d]"
            placeholder="What this project does..."
          />
        </label>

        <label className="space-y-2 sm:col-span-2">
          <span className="text-sm text-zinc-400">
            Technologies (comma separated)
          </span>
          <input
            value={form.technologies}
            onChange={(e) => updateField("technologies", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#ff6b3d]"
            placeholder="Next.js, TypeScript, Prisma"
          />
        </label>

        <label className="space-y-2 sm:col-span-2">
          <span className="text-sm text-zinc-400">
            Key features (one per line)
          </span>
          <textarea
            rows={4}
            value={form.keyFeatures}
            onChange={(e) => updateField("keyFeatures", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#ff6b3d]"
            placeholder={"Admin dashboard\nImage uploads\nCRUD operations"}
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm text-zinc-400">Sort order</span>
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) => updateField("sortOrder", Number(e.target.value))}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#ff6b3d]"
          />
        </label>

        <label className="flex items-center gap-3 pt-8">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => updateField("published", e.target.checked)}
            className="h-4 w-4 accent-[#ff6b3d]"
          />
          <span className="text-sm text-zinc-300">Published on website</span>
        </label>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="mb-3 text-sm text-zinc-400">Project image (Cloudinary)</p>

        {form.image ? (
          <img
            src={form.image}
            alt="Project preview"
            className="mb-4 h-48 w-full rounded-xl object-cover"
          />
        ) : (
          <div className="mb-4 flex h-48 items-center justify-center rounded-xl border border-dashed border-white/15 text-sm text-zinc-500">
            No image uploaded
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-[#ff6b3d] px-5 py-3 text-sm font-semibold transition hover:opacity-90">
            {uploading ? "Uploading..." : "Upload image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={(e) => handleUpload(e.target.files?.[0] ?? null)}
            />
          </label>

          <input
            value={form.image}
            onChange={(e) => updateField("image", e.target.value)}
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[#ff6b3d]"
            placeholder="Or paste image URL"
          />
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving || uploading || !form.image}
          className="rounded-xl bg-[#ff6b3d] px-6 py-3 text-sm font-semibold transition hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving..." : isEdit ? "Update project" : "Create project"}
        </button>
        <button
          type="button"
          onClick={() =>
            onCancel ? onCancel() : router.push("/admin/projects")
          }
          className="rounded-xl border border-white/15 px-6 py-3 text-sm text-zinc-300 transition hover:bg-white/5"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
