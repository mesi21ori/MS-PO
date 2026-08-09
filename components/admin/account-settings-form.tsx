"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Field, SectionCard, inputClass } from "@/components/admin/admin-ui";

export default function AccountSettingsForm({
  initialEmail,
}: {
  initialEmail: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState(initialEmail);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/auth/account", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          currentPassword,
          newPassword: newPassword || undefined,
          confirmPassword: confirmPassword || undefined,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Update failed");
      }

      setMessage(data.message || "Account updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      if (data.email) setEmail(data.email);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <SectionCard
      title="Account Settings"
      description="Change the admin login email and password. Current password is required."
    >
      <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-5">
        <Field label="Admin email">
          <input
            type="email"
            required
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
          />
        </Field>

        <Field label="Current password">
          <input
            type="password"
            required
            className={inputClass}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
          />
        </Field>

        <div className="border-t border-white/10 pt-5">
          <p className="mb-4 text-sm text-zinc-400">
            Leave new password blank if you only want to change the email.
          </p>
          <div className="space-y-5">
            <Field label="New password">
              <input
                type="password"
                className={inputClass}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                minLength={8}
              />
            </Field>
            <Field label="Confirm new password">
              <input
                type="password"
                className={inputClass}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                minLength={8}
              />
            </Field>
          </div>
        </div>

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

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-[#ff6b3d] px-6 py-3 text-sm font-semibold transition hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Update account"}
        </button>
      </form>
    </SectionCard>
  );
}
