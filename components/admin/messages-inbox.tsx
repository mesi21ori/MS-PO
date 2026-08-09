"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pagination, usePagination } from "@/components/admin/admin-ui";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string | Date;
};

export default function MessagesInbox({ messages }: { messages: Message[] }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(
    messages[0]?.id ?? null
  );
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const { page, setPage, totalPages, pageItems, pageSize } =
    usePagination(messages, 8);

  const selected = messages.find((item) => item.id === selectedId) ?? null;

  async function markRead(id: string, read = true) {
    setBusyId(id);
    setError("");
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setBusyId(null);
    }
  }

  async function removeMessage(id: string) {
    if (!window.confirm("Delete this message?")) return;
    setBusyId(id);
    setError("");
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      if (selectedId === id) setSelectedId(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBusyId(null);
    }
  }

  if (messages.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center">
        <p className="text-lg font-medium">No messages yet</p>
        <p className="mt-2 text-sm text-zinc-400">
          Contact form submissions will appear here and also be emailed to you.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <div className="space-y-3">
          <div className="overflow-hidden rounded-2xl border border-white/10">
            {pageItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedId(item.id);
                  if (!item.read) markRead(item.id, true);
                }}
                className={`block w-full border-b border-white/10 px-4 py-3 text-left transition last:border-b-0 ${
                  selectedId === item.id ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={`truncate ${
                      item.read ? "text-zinc-300" : "font-semibold"
                    }`}
                  >
                    {item.name}
                  </p>
                  {!item.read && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#ff6b3d]" />
                  )}
                </div>
                <p className="truncate text-sm text-zinc-500">{item.email}</p>
                <p className="mt-1 line-clamp-1 text-xs text-zinc-600">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </button>
            ))}
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            totalItems={messages.length}
            pageSize={pageSize}
          />
        </div>

        {selected && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold">{selected.name}</h3>
                <a
                  href={`mailto:${selected.email}`}
                  className="text-sm text-[#ff6b3d] hover:underline"
                >
                  {selected.email}
                </a>
                <p className="mt-1 text-xs text-zinc-500">
                  {new Date(selected.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`mailto:${selected.email}`}
                  className="rounded-xl bg-[#ff6b3d] px-4 py-2 text-sm font-semibold"
                >
                  Reply by email
                </a>
                <button
                  type="button"
                  disabled={busyId === selected.id}
                  onClick={() => markRead(selected.id, !selected.read)}
                  className="rounded-xl border border-white/15 px-4 py-2 text-sm"
                >
                  {selected.read ? "Mark unread" : "Mark read"}
                </button>
                <button
                  type="button"
                  disabled={busyId === selected.id}
                  onClick={() => removeMessage(selected.id)}
                  className="rounded-xl border border-red-500/30 px-4 py-2 text-sm text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="mt-6 whitespace-pre-wrap text-zinc-300 leading-relaxed">
              {selected.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
