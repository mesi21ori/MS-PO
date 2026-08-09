"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";

export const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#ff6b3d]";

export const PAGE_SIZE = 5;

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm text-zinc-400">{label}</span>
      {children}
    </label>
  );
}

export function SectionCard({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-3xl font-semibold">{title}</h2>
          {description && <p className="mt-2 text-zinc-400">{description}</p>}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 lg:p-8">
        {children}
      </div>
    </div>
  );
}

export function AdminModal({
  open,
  title,
  onClose,
  children,
  wide = false,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close modal backdrop"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-white/10 bg-[#0d0c16] p-5 shadow-2xl sm:rounded-3xl sm:p-6 ${
          wide ? "sm:max-w-3xl" : "sm:max-w-xl"
        }`}
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/10 p-2 text-zinc-300 transition hover:bg-white/5"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  totalItems,
  pageSize = PAGE_SIZE,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  pageSize?: number;
}) {
  if (totalItems <= pageSize) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
      <p className="text-sm text-zinc-500">
        Showing {start}-{end} of {totalItems}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-sm disabled:opacity-40"
        >
          Prev
        </button>
        <span className="text-sm text-zinc-400">
          {page} / {totalPages}
        </span>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-sm disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export function usePagination<T>(items: T[], pageSize = PAGE_SIZE) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  return { page, setPage, totalPages, pageItems, pageSize };
}

export async function uploadAdminFile(
  file: File,
  kind: "image" | "cv" = "image"
) {
  const body = new FormData();
  body.append("file", file);
  body.append("kind", kind);

  const res = await fetch("/api/upload", { method: "POST", body });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return data.url as string;
}

export async function saveSiteContentPartial(
  updater: (
    content: import("@/lib/site-content").SiteContent
  ) => import("@/lib/site-content").SiteContent
) {
  const currentRes = await fetch("/api/site-content");
  const currentData = await currentRes.json();
  if (!currentRes.ok) {
    throw new Error(currentData.error || "Failed to load content");
  }

  const next = updater(currentData.content);
  const res = await fetch("/api/site-content", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: next }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Save failed");
  return data.content as import("@/lib/site-content").SiteContent;
}
