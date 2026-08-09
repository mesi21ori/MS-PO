"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/site-content";
import type { CompanyExperience, SkillItem } from "@/types/portfolio";
import {
  AdminModal,
  Field,
  Pagination,
  SectionCard,
  inputClass,
  saveSiteContentPartial,
  uploadAdminFile,
  usePagination,
} from "@/components/admin/admin-ui";

function Status({ error, message }: { error: string; message: string }) {
  return (
    <>
      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}
      {message && (
        <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          {message}
        </p>
      )}
    </>
  );
}

function useSectionSave() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function save(
    updater: (content: SiteContent) => SiteContent,
    success = "Saved successfully."
  ) {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      await saveSiteContentPartial(updater);
      setMessage(success);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function upload(
    file: File | null,
    kind: "image" | "cv",
    onUrl: (url: string) => void
  ) {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadAdminFile(file, kind);
      onUrl(url);
      setMessage(kind === "cv" ? "CV uploaded." : "Image uploaded.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return { saving, uploading, error, message, setError, setMessage, save, upload };
}

export function BrandingForm({ initial }: { initial: SiteContent }) {
  const [form, setForm] = useState(initial.platform);
  const { saving, uploading, error, message, save, upload } = useSectionSave();

  return (
    <SectionCard
      title="Branding"
      description="Site name, logo/icon, and brand colors used across the website."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Brand name">
          <input
            className={inputClass}
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />
        </Field>
        <Field label="Primary color">
          <input
            type="color"
            className="h-12 w-full rounded-xl border border-white/10 bg-transparent p-1"
            value={form.brandColors.primary}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                brandColors: { ...p.brandColors, primary: e.target.value },
              }))
            }
          />
        </Field>
        <Field label="Secondary color">
          <input
            type="color"
            className="h-12 w-full rounded-xl border border-white/10 bg-transparent p-1"
            value={form.brandColors.secondary}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                brandColors: { ...p.brandColors, secondary: e.target.value },
              }))
            }
          />
        </Field>
        <Field label="Background color">
          <input
            type="color"
            className="h-12 w-full rounded-xl border border-white/10 bg-transparent p-1"
            value={form.brandColors.background || "#05040f"}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                brandColors: { ...p.brandColors, background: e.target.value },
              }))
            }
          />
        </Field>
        <div className="sm:col-span-2 space-y-3">
          <p className="text-sm text-zinc-400">Logo / icon</p>
          {form.logo && (
            <img src={form.logo} alt="Logo" className="h-16 w-16 rounded-full object-cover" />
          )}
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-[#ff6b3d] px-5 py-3 text-sm font-semibold">
              {uploading ? "Uploading..." : "Upload logo"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={(e) =>
                  upload(e.target.files?.[0] ?? null, "image", (url) =>
                    setForm((p) => ({ ...p, logo: url }))
                  )
                }
              />
            </label>
            <input
              className={inputClass}
              value={form.logo}
              onChange={(e) => setForm((p) => ({ ...p, logo: e.target.value }))}
            />
          </div>
        </div>
      </div>
      <Status error={error} message={message} />
      <button
        type="button"
        disabled={saving || uploading}
        className="mt-5 rounded-xl bg-[#ff6b3d] px-6 py-3 text-sm font-semibold disabled:opacity-50"
        onClick={() =>
          save((content) => ({
            ...content,
            platform: form,
            navbar: { ...content.navbar, logo: form.logo },
            footer: { ...content.footer, name: form.name },
          }))
        }
      >
        {saving ? "Saving..." : "Save branding"}
      </button>
    </SectionCard>
  );
}

export function NavbarForm({ initial }: { initial: SiteContent }) {
  const [form, setForm] = useState(initial.navbar);
  const { saving, error, message, save } = useSectionSave();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState({ name: "", link: "" });
  const { page, setPage, totalPages, pageItems, pageSize } = usePagination(
    form.menuItems
  );

  function openAdd() {
    setEditingIndex(-1);
    setDraft({ name: "", link: "" });
    setModalOpen(true);
  }

  function openEdit(index: number) {
    setEditingIndex(index);
    setDraft(form.menuItems[index]);
    setModalOpen(true);
  }

  function commitItem() {
    if (!draft.name.trim() || !draft.link.trim()) return;
    if (editingIndex === -1) {
      const menuItems = [...form.menuItems, draft];
      setForm((p) => ({ ...p, menuItems }));
      setPage(Math.ceil(menuItems.length / pageSize));
    } else if (editingIndex !== null) {
      const menuItems = [...form.menuItems];
      menuItems[editingIndex] = draft;
      setForm((p) => ({ ...p, menuItems }));
    }
    setModalOpen(false);
    setEditingIndex(null);
  }

  return (
    <SectionCard
      title="Navbar"
      description="Menu links and header CTA button."
      action={
        <button
          type="button"
          onClick={openAdd}
          className="rounded-xl bg-[#ff6b3d] px-5 py-2.5 text-sm font-semibold"
        >
          Add item
        </button>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Button text">
          <input
            className={inputClass}
            value={form.buttonName}
            onChange={(e) => setForm((p) => ({ ...p, buttonName: e.target.value }))}
          />
        </Field>
        <Field label="Button link">
          <input
            className={inputClass}
            value={form.buttonLink}
            onChange={(e) => setForm((p) => ({ ...p, buttonLink: e.target.value }))}
          />
        </Field>
      </div>
      <div className="mt-6 space-y-3">
        <p className="text-sm text-zinc-400">Menu items</p>
        <div className="overflow-hidden rounded-xl border border-white/10">
          {form.menuItems.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-zinc-500">
              No menu items yet.
            </p>
          )}
          {pageItems.map((item, localIndex) => {
            const index = (page - 1) * pageSize + localIndex;
            return (
              <div
                key={`${item.name}-${index}`}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 last:border-b-0"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-zinc-500">{item.link}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(index)}
                    className="rounded-lg border border-white/10 px-3 py-1.5 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-red-500/30 px-3 py-1.5 text-sm text-red-300"
                    onClick={() =>
                      setForm((p) => ({
                        ...p,
                        menuItems: p.menuItems.filter((_, i) => i !== index),
                      }))
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalItems={form.menuItems.length}
          pageSize={pageSize}
        />
      </div>

      <AdminModal
        open={modalOpen}
        title={editingIndex === -1 ? "Add menu item" : "Edit menu item"}
        onClose={() => setModalOpen(false)}
      >
        <div className="space-y-4">
          <Field label="Label">
            <input
              className={inputClass}
              value={draft.name}
              onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
            />
          </Field>
          <Field label="Link">
            <input
              className={inputClass}
              value={draft.link}
              onChange={(e) => setDraft((p) => ({ ...p, link: e.target.value }))}
            />
          </Field>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={commitItem}
              className="rounded-xl bg-[#ff6b3d] px-5 py-2.5 text-sm font-semibold"
            >
              {editingIndex === -1 ? "Add item" : "Update item"}
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-xl border border-white/15 px-5 py-2.5 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </AdminModal>

      <Status error={error} message={message} />
      <button
        type="button"
        disabled={saving}
        className="mt-5 rounded-xl bg-[#ff6b3d] px-6 py-3 text-sm font-semibold disabled:opacity-50"
        onClick={() => save((content) => ({ ...content, navbar: form }))}
      >
        {saving ? "Saving..." : "Save navbar"}
      </button>
    </SectionCard>
  );
}

export function HeroForm({ initial }: { initial: SiteContent }) {
  const [form, setForm] = useState(initial.heroSection);
  const { saving, uploading, error, message, save, upload } = useSectionSave();

  return (
    <SectionCard
      title="Hero"
      description="Hero text, image, social icons, and CV download button."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Greeting name">
          <input
            className={inputClass}
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />
        </Field>
        <Field label="Title">
          <input
            className={inputClass}
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Description">
            <textarea
              rows={4}
              className={inputClass}
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
            />
          </Field>
        </div>
        <Field label="Button text">
          <input
            className={inputClass}
            value={form.buttonName}
            onChange={(e) =>
              setForm((p) => ({ ...p, buttonName: e.target.value }))
            }
          />
        </Field>
        <div className="space-y-3">
          <p className="text-sm text-zinc-400">CV file (upload from PC)</p>
          <label className="inline-flex w-full cursor-pointer items-center justify-center rounded-xl bg-[#ff6b3d] px-5 py-3 text-sm font-semibold">
            {uploading ? "Uploading CV..." : "Upload CV (PDF)"}
            <input
              type="file"
              accept=".pdf,.doc,.docx,application/pdf"
              className="hidden"
              disabled={uploading}
              onChange={(e) =>
                upload(e.target.files?.[0] ?? null, "cv", (url) =>
                  setForm((p) => ({ ...p, buttonLink: url }))
                )
              }
            />
          </label>
          <input
            className={inputClass}
            value={form.buttonLink}
            onChange={(e) =>
              setForm((p) => ({ ...p, buttonLink: e.target.value }))
            }
            placeholder="CV URL"
          />
        </div>
        <div className="sm:col-span-2 space-y-3">
          <p className="text-sm text-zinc-400">Hero image</p>
          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="Hero"
              className="h-40 w-full rounded-xl object-cover"
            />
          )}
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm">
              {uploading ? "Uploading..." : "Upload image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={(e) =>
                  upload(e.target.files?.[0] ?? null, "image", (url) =>
                    setForm((p) => ({ ...p, imageUrl: url }))
                  )
                }
              />
            </label>
            <input
              className={inputClass}
              value={form.imageUrl || ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, imageUrl: e.target.value }))
              }
            />
          </div>
        </div>
      </div>
      <SocialList
        items={form.socialMedia}
        onChange={(socialMedia) => setForm((p) => ({ ...p, socialMedia }))}
      />
      <Status error={error} message={message} />
      <button
        type="button"
        disabled={saving || uploading}
        className="mt-5 rounded-xl bg-[#ff6b3d] px-6 py-3 text-sm font-semibold disabled:opacity-50"
        onClick={() =>
          save((content) => ({
            ...content,
            heroSection: form,
            workExperience: {
              ...content.workExperience,
              buttonLink: form.buttonLink,
            },
          }))
        }
      >
        {saving ? "Saving..." : "Save hero"}
      </button>
    </SectionCard>
  );
}

export function AboutForm({ initial }: { initial: SiteContent }) {
  const [paragraphs, setParagraphs] = useState({
    paragraph1: initial.aboutMe.paragraph1,
    paragraph2: initial.aboutMe.paragraph2,
    paragraph3: initial.aboutMe.paragraph3,
  });
  const [skills, setSkills] = useState<SkillItem[]>(initial.aboutMe.skills);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState<SkillItem>({ name: "", icon: "code" });
  const [modalOpen, setModalOpen] = useState(false);
  const { saving, error, message, save, setError, setMessage } = useSectionSave();
  const { page, setPage, totalPages, pageItems, pageSize } =
    usePagination(skills);

  function startAdd() {
    setEditingIndex(-1);
    setDraft({ name: "", icon: "code" });
    setModalOpen(true);
  }

  function startEdit(index: number) {
    setEditingIndex(index);
    setDraft(skills[index]);
    setModalOpen(true);
  }

  function commitSkill() {
    if (!draft.name.trim()) {
      setError("Skill name is required");
      return;
    }
    setError("");
    if (editingIndex === -1) {
      setSkills((prev) => [...prev, draft]);
      setPage(Math.ceil((skills.length + 1) / pageSize));
    } else if (editingIndex !== null) {
      setSkills((prev) =>
        prev.map((skill, i) => (i === editingIndex ? draft : skill))
      );
    }
    setEditingIndex(null);
    setModalOpen(false);
    setMessage("Skill updated in list. Click Save about to publish.");
  }

  return (
    <SectionCard
      title="About"
      description="About paragraphs and skills list with add/edit modal."
      action={
        <button
          type="button"
          onClick={startAdd}
          className="rounded-xl bg-[#ff6b3d] px-5 py-2.5 text-sm font-semibold"
        >
          Add skill
        </button>
      }
    >
      <div className="space-y-4">
        {(["paragraph1", "paragraph2", "paragraph3"] as const).map((key, i) => (
          <Field key={key} label={`Paragraph ${i + 1}`}>
            <textarea
              rows={3}
              className={inputClass}
              value={paragraphs[key]}
              onChange={(e) =>
                setParagraphs((p) => ({ ...p, [key]: e.target.value }))
              }
            />
          </Field>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-medium">Skills</h3>

        <div className="overflow-hidden rounded-xl border border-white/10">
          {skills.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-zinc-500">
              No skills yet.
            </p>
          )}
          {pageItems.map((skill, localIndex) => {
            const index = (page - 1) * pageSize + localIndex;
            return (
              <div
                key={`${skill.name}-${index}`}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 last:border-b-0"
              >
                <div>
                  <p className="font-medium">{skill.name}</p>
                  <p className="text-sm text-zinc-500">icon: {skill.icon}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(index)}
                    className="rounded-lg border border-white/10 px-3 py-1.5 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSkills((prev) => prev.filter((_, i) => i !== index))
                    }
                    className="rounded-lg border border-red-500/30 px-3 py-1.5 text-sm text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalItems={skills.length}
          pageSize={pageSize}
        />
      </div>

      <AdminModal
        open={modalOpen}
        title={editingIndex === -1 ? "Add skill" : "Edit skill"}
        onClose={() => {
          setModalOpen(false);
          setEditingIndex(null);
        }}
      >
        <div className="space-y-4">
          <Field label="Skill name">
            <input
              className={inputClass}
              value={draft.name}
              onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
            />
          </Field>
          <Field label="Icon key">
            <input
              className={inputClass}
              placeholder="react, nextjs, typescript..."
              value={draft.icon}
              onChange={(e) => setDraft((p) => ({ ...p, icon: e.target.value }))}
            />
          </Field>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={commitSkill}
              className="rounded-xl bg-[#ff6b3d] px-5 py-2.5 text-sm font-semibold"
            >
              {editingIndex === -1 ? "Add skill" : "Update skill"}
            </button>
            <button
              type="button"
              onClick={() => {
                setModalOpen(false);
                setEditingIndex(null);
              }}
              className="rounded-xl border border-white/15 px-5 py-2.5 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </AdminModal>

      <Status error={error} message={message} />
      <button
        type="button"
        disabled={saving}
        className="mt-5 rounded-xl bg-[#ff6b3d] px-6 py-3 text-sm font-semibold disabled:opacity-50"
        onClick={() =>
          save((content) => ({
            ...content,
            aboutMe: { ...paragraphs, skills },
          }))
        }
      >
        {saving ? "Saving..." : "Save about"}
      </button>
    </SectionCard>
  );
}

export function ExperienceForm({ initial }: { initial: SiteContent }) {
  const [meta, setMeta] = useState({
    headline: initial.workExperience.headline,
    smallDescription: initial.workExperience.smallDescription,
    buttonName: initial.workExperience.buttonName,
    buttonLink: initial.workExperience.buttonLink,
  });
  const [companies, setCompanies] = useState<CompanyExperience[]>(
    initial.workExperience.companies
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState<CompanyExperience>({
    name: "",
    role: "",
    smallTextDescription: "",
    startDate: "",
    endDate: "",
  });
  const { saving, uploading, error, message, save, upload, setError, setMessage } =
    useSectionSave();
  const { page, setPage, totalPages, pageItems, pageSize } =
    usePagination(companies);

  function startAdd() {
    setEditingIndex(-1);
    setDraft({
      name: "",
      role: "",
      smallTextDescription: "",
      startDate: "",
      endDate: "",
    });
    setModalOpen(true);
  }

  function startEdit(index: number) {
    setEditingIndex(index);
    setDraft(companies[index]);
    setModalOpen(true);
  }

  function commitCompany() {
    if (!draft.name.trim() || !draft.smallTextDescription.trim()) {
      setError("Company name and description are required");
      return;
    }
    setError("");
    if (editingIndex === -1) {
      setCompanies((prev) => [...prev, draft]);
      setPage(Math.ceil((companies.length + 1) / pageSize));
    } else if (editingIndex !== null) {
      setCompanies((prev) =>
        prev.map((company, i) => (i === editingIndex ? draft : company))
      );
    }
    setEditingIndex(null);
    setModalOpen(false);
    setMessage("Experience updated in list. Click Save experience to publish.");
  }

  return (
    <SectionCard
      title="Experience"
      description="Work experience list with modal add/edit, plus CV upload."
      action={
        <button
          type="button"
          onClick={startAdd}
          className="rounded-xl bg-[#ff6b3d] px-5 py-2.5 text-sm font-semibold"
        >
          Add experience
        </button>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Headline">
          <input
            className={inputClass}
            value={meta.headline}
            onChange={(e) => setMeta((p) => ({ ...p, headline: e.target.value }))}
          />
        </Field>
        <Field label="Button text">
          <input
            className={inputClass}
            value={meta.buttonName}
            onChange={(e) =>
              setMeta((p) => ({ ...p, buttonName: e.target.value }))
            }
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Short description">
            <textarea
              rows={3}
              className={inputClass}
              value={meta.smallDescription}
              onChange={(e) =>
                setMeta((p) => ({ ...p, smallDescription: e.target.value }))
              }
            />
          </Field>
        </div>
        <div className="sm:col-span-2 space-y-3">
          <p className="text-sm text-zinc-400">CV file (upload from PC)</p>
          <label className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-[#ff6b3d] px-5 py-3 text-sm font-semibold">
            {uploading ? "Uploading CV..." : "Upload CV (PDF)"}
            <input
              type="file"
              accept=".pdf,.doc,.docx,application/pdf"
              className="hidden"
              disabled={uploading}
              onChange={(e) =>
                upload(e.target.files?.[0] ?? null, "cv", (url) =>
                  setMeta((p) => ({ ...p, buttonLink: url }))
                )
              }
            />
          </label>
          <input
            className={inputClass}
            value={meta.buttonLink}
            onChange={(e) =>
              setMeta((p) => ({ ...p, buttonLink: e.target.value }))
            }
            placeholder="CV URL"
          />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-medium">Companies / Experience</h3>

        <div className="overflow-hidden rounded-xl border border-white/10">
          {companies.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-zinc-500">
              No experience yet.
            </p>
          )}
          {pageItems.map((company, localIndex) => {
            const index = (page - 1) * pageSize + localIndex;
            return (
              <div
                key={`${company.name}-${index}`}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 last:border-b-0"
              >
                <div className="min-w-0">
                  <p className="font-medium">{company.name}</p>
                  <p className="text-sm text-zinc-500">
                    {company.role || "No role"} · {company.startDate || "?"} -{" "}
                    {company.endDate || "current"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(index)}
                    className="rounded-lg border border-white/10 px-3 py-1.5 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCompanies((prev) => prev.filter((_, i) => i !== index))
                    }
                    className="rounded-lg border border-red-500/30 px-3 py-1.5 text-sm text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalItems={companies.length}
          pageSize={pageSize}
        />
      </div>

      <AdminModal
        open={modalOpen}
        title={editingIndex === -1 ? "Add experience" : "Edit experience"}
        onClose={() => {
          setModalOpen(false);
          setEditingIndex(null);
        }}
        wide
      >
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Company">
              <input
                className={inputClass}
                value={draft.name}
                onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
              />
            </Field>
            <Field label="Role">
              <input
                className={inputClass}
                value={draft.role || ""}
                onChange={(e) => setDraft((p) => ({ ...p, role: e.target.value }))}
              />
            </Field>
            <Field label="Start year">
              <input
                className={inputClass}
                value={draft.startDate || ""}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, startDate: e.target.value }))
                }
              />
            </Field>
            <Field label="End year">
              <input
                className={inputClass}
                value={draft.endDate || ""}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, endDate: e.target.value }))
                }
              />
            </Field>
          </div>
          <Field label="Description">
            <textarea
              rows={3}
              className={inputClass}
              value={draft.smallTextDescription}
              onChange={(e) =>
                setDraft((p) => ({
                  ...p,
                  smallTextDescription: e.target.value,
                }))
              }
            />
          </Field>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={commitCompany}
              className="rounded-xl bg-[#ff6b3d] px-5 py-2.5 text-sm font-semibold"
            >
              {editingIndex === -1 ? "Add experience" : "Update experience"}
            </button>
            <button
              type="button"
              onClick={() => {
                setModalOpen(false);
                setEditingIndex(null);
              }}
              className="rounded-xl border border-white/15 px-5 py-2.5 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </AdminModal>

      <Status error={error} message={message} />
      <button
        type="button"
        disabled={saving || uploading}
        className="mt-5 rounded-xl bg-[#ff6b3d] px-6 py-3 text-sm font-semibold disabled:opacity-50"
        onClick={() =>
          save((content) => ({
            ...content,
            workExperience: { ...meta, companies },
            heroSection: {
              ...content.heroSection,
              buttonLink: meta.buttonLink,
            },
          }))
        }
      >
        {saving ? "Saving..." : "Save experience"}
      </button>
    </SectionCard>
  );
}

export function ContactSettingsForm({ initial }: { initial: SiteContent }) {
  const [form, setForm] = useState(initial.contact);
  const { saving, error, message, save } = useSectionSave();

  return (
    <SectionCard
      title="Contact"
      description="Contact page details, education, and social links."
    >
      <div className="space-y-5">
        <Field label="Description">
          <textarea
            rows={3}
            className={inputClass}
            value={form.description}
            onChange={(e) =>
              setForm((p) => ({ ...p, description: e.target.value }))
            }
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Phone">
            <input
              className={inputClass}
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            />
          </Field>
          <Field label="Email">
            <input
              className={inputClass}
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            />
          </Field>
          <Field label="Form button text">
            <input
              className={inputClass}
              value={form.contactForm.buttonName}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  contactForm: {
                    ...p.contactForm,
                    buttonName: e.target.value,
                  },
                }))
              }
            />
          </Field>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-400">Education</p>
          <button
            type="button"
            className="text-sm text-[#ff6b3d]"
            onClick={() =>
              setForm((p) => ({
                ...p,
                education: [
                  ...p.education,
                  {
                    schoolName: "School",
                    degree: "",
                    fieldOfStudy: "",
                    startDate: "",
                    endDate: "",
                  },
                ],
              }))
            }
          >
            + Add education
          </button>
        </div>
        {form.education.map((item, index) => (
          <div
            key={index}
            className="grid gap-3 rounded-xl border border-white/10 p-4 sm:grid-cols-2"
          >
            <input
              className={inputClass}
              value={item.schoolName}
              placeholder="School"
              onChange={(e) => {
                const education = [...form.education];
                education[index] = {
                  ...education[index],
                  schoolName: e.target.value,
                };
                setForm((p) => ({ ...p, education }));
              }}
            />
            <input
              className={inputClass}
              value={item.degree || ""}
              placeholder="Degree"
              onChange={(e) => {
                const education = [...form.education];
                education[index] = {
                  ...education[index],
                  degree: e.target.value,
                };
                setForm((p) => ({ ...p, education }));
              }}
            />
            <input
              className={inputClass}
              value={item.fieldOfStudy || ""}
              placeholder="Field"
              onChange={(e) => {
                const education = [...form.education];
                education[index] = {
                  ...education[index],
                  fieldOfStudy: e.target.value,
                };
                setForm((p) => ({ ...p, education }));
              }}
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                className={inputClass}
                value={item.startDate || ""}
                placeholder="Start"
                onChange={(e) => {
                  const education = [...form.education];
                  education[index] = {
                    ...education[index],
                    startDate: e.target.value,
                  };
                  setForm((p) => ({ ...p, education }));
                }}
              />
              <input
                className={inputClass}
                value={item.endDate || ""}
                placeholder="End"
                onChange={(e) => {
                  const education = [...form.education];
                  education[index] = {
                    ...education[index],
                    endDate: e.target.value,
                  };
                  setForm((p) => ({ ...p, education }));
                }}
              />
            </div>
            <button
              type="button"
              className="text-left text-sm text-red-300 sm:col-span-2"
              onClick={() =>
                setForm((p) => ({
                  ...p,
                  education: p.education.filter((_, i) => i !== index),
                }))
              }
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <SocialList
        items={form.socialMedia}
        onChange={(socialMedia) => setForm((p) => ({ ...p, socialMedia }))}
      />
      <Status error={error} message={message} />
      <button
        type="button"
        disabled={saving}
        className="mt-5 rounded-xl bg-[#ff6b3d] px-6 py-3 text-sm font-semibold disabled:opacity-50"
        onClick={() => save((content) => ({ ...content, contact: form }))}
      >
        {saving ? "Saving..." : "Save contact"}
      </button>
    </SectionCard>
  );
}

export function FooterForm({ initial }: { initial: SiteContent }) {
  const [form, setForm] = useState(initial.footer);
  const { saving, error, message, save } = useSectionSave();
  const [addSignal, setAddSignal] = useState(0);

  return (
    <SectionCard
      title="Footer"
      description="Footer name, copyright, and social icons."
      action={
        <button
          type="button"
          onClick={() => setAddSignal((n) => n + 1)}
          className="rounded-xl bg-[#ff6b3d] px-5 py-2.5 text-sm font-semibold"
        >
          Add link
        </button>
      }
    >
      <div className="grid gap-5">
        <Field label="Footer name">
          <input
            className={inputClass}
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />
        </Field>
        <Field label="Copyright text">
          <input
            className={inputClass}
            value={form.copyrightText || ""}
            onChange={(e) =>
              setForm((p) => ({ ...p, copyrightText: e.target.value }))
            }
          />
        </Field>
      </div>
      <SocialList
        items={form.socialMedia}
        onChange={(socialMedia) => setForm((p) => ({ ...p, socialMedia }))}
        hideAddButton
        openAddSignal={addSignal}
      />
      <Status error={error} message={message} />
      <button
        type="button"
        disabled={saving}
        className="mt-5 rounded-xl bg-[#ff6b3d] px-6 py-3 text-sm font-semibold disabled:opacity-50"
        onClick={() => save((content) => ({ ...content, footer: form }))}
      >
        {saving ? "Saving..." : "Save footer"}
      </button>
    </SectionCard>
  );
}

export function ProjectsMetaForm({ initial }: { initial: SiteContent }) {
  const [form, setForm] = useState(initial.projects);
  const { saving, error, message, save } = useSectionSave();

  return (
    <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="mb-4 text-lg font-medium">Projects section text</h3>
      <div className="grid gap-4">
        <Field label="Section title">
          <input
            className={inputClass}
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          />
        </Field>
        <Field label="Section description">
          <textarea
            rows={2}
            className={inputClass}
            value={form.description || ""}
            onChange={(e) =>
              setForm((p) => ({ ...p, description: e.target.value }))
            }
          />
        </Field>
      </div>
      <Status error={error} message={message} />
      <button
        type="button"
        disabled={saving}
        className="mt-4 rounded-xl bg-[#ff6b3d] px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
        onClick={() => save((content) => ({ ...content, projects: form }))}
      >
        {saving ? "Saving..." : "Save section text"}
      </button>
    </div>
  );
}

function SocialList({
  items,
  onChange,
  hideAddButton = false,
  openAddSignal = 0,
}: {
  items: { name: string; icon: string; link: string }[];
  onChange: (items: { name: string; icon: string; link: string }[]) => void;
  hideAddButton?: boolean;
  openAddSignal?: number;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState({ name: "", icon: "github", link: "" });
  const { page, setPage, totalPages, pageItems, pageSize } =
    usePagination(items);

  function openAdd() {
    setEditingIndex(-1);
    setDraft({ name: "", icon: "github", link: "" });
    setModalOpen(true);
  }

  useEffect(() => {
    if (openAddSignal > 0) openAdd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAddSignal]);

  function openEdit(index: number) {
    setEditingIndex(index);
    setDraft(items[index]);
    setModalOpen(true);
  }

  function commit() {
    if (!draft.name.trim() || !draft.link.trim()) return;
    if (editingIndex === -1) {
      onChange([...items, draft]);
      setPage(Math.ceil((items.length + 1) / pageSize));
    } else if (editingIndex !== null) {
      const next = [...items];
      next[editingIndex] = draft;
      onChange(next);
    }
    setModalOpen(false);
    setEditingIndex(null);
  }

  const addButton = (
    <button
      type="button"
      onClick={openAdd}
      className="rounded-xl bg-[#ff6b3d] px-5 py-2.5 text-sm font-semibold"
    >
      Add link
    </button>
  );

  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-zinc-400">Social links</p>
        {!hideAddButton && addButton}
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10">
        {items.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-zinc-500">
            No social links yet.
          </p>
        )}
        {pageItems.map((item, localIndex) => {
          const index = (page - 1) * pageSize + localIndex;
          return (
            <div
              key={`${item.name}-${index}`}
              className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 last:border-b-0"
            >
              <div className="min-w-0">
                <p className="font-medium">{item.name}</p>
                <p className="truncate text-sm text-zinc-500">
                  {item.icon} · {item.link}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(index)}
                  className="rounded-lg border border-white/10 px-3 py-1.5 text-sm"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onChange(items.filter((_, i) => i !== index))}
                  className="rounded-lg border border-red-500/30 px-3 py-1.5 text-sm text-red-300"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        totalItems={items.length}
        pageSize={pageSize}
      />

      <AdminModal
        open={modalOpen}
        title={editingIndex === -1 ? "Add social link" : "Edit social link"}
        onClose={() => setModalOpen(false)}
      >
        <SocialModalFields
          draft={draft}
          setDraft={setDraft}
          onSave={commit}
          onCancel={() => setModalOpen(false)}
          isAdd={editingIndex === -1}
        />
      </AdminModal>
    </div>
  );
}

function SocialModalFields({
  draft,
  setDraft,
  onSave,
  onCancel,
  isAdd,
}: {
  draft: { name: string; icon: string; link: string };
  setDraft: React.Dispatch<
    React.SetStateAction<{ name: string; icon: string; link: string }>
  >;
  onSave: () => void;
  onCancel: () => void;
  isAdd: boolean;
}) {
  return (
    <div className="space-y-4">
      <Field label="Name">
        <input
          className={inputClass}
          value={draft.name}
          onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
        />
      </Field>
      <Field label="Icon key">
        <input
          className={inputClass}
          placeholder="github, linkedin, telegram..."
          value={draft.icon}
          onChange={(e) => setDraft((p) => ({ ...p, icon: e.target.value }))}
        />
      </Field>
      <Field label="URL">
        <input
          className={inputClass}
          value={draft.link}
          onChange={(e) => setDraft((p) => ({ ...p, link: e.target.value }))}
        />
      </Field>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onSave}
          className="rounded-xl bg-[#ff6b3d] px-5 py-2.5 text-sm font-semibold"
        >
          {isAdd ? "Add link" : "Update link"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-white/15 px-5 py-2.5 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
