import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import { getContactMessages, getUnreadMessageCount } from "@/lib/messages";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [projects, unread, messages, content] = await Promise.all([
    getAllProjects(),
    getUnreadMessageCount(),
    getContactMessages(),
    getSiteContent(),
  ]);

  const published = projects.filter((p) => p.published).length;

  const stats = [
    { label: "Projects", value: projects.length, href: "/admin/projects" },
    { label: "Published", value: published, href: "/admin/projects" },
    { label: "Messages", value: messages.length, href: "/admin/messages" },
    { label: "Unread", value: unread, href: "/admin/messages" },
  ];

  const quickLinks = [
    { href: "/admin/branding", label: "Branding" },
    { href: "/admin/hero", label: "Hero + CV" },
    { href: "/admin/about", label: "About skills" },
    { href: "/admin/experience", label: "Experience" },
    { href: "/admin/contact", label: "Contact" },
    { href: "/admin/messages", label: "Messages" },
    { href: "/admin/footer", label: "Footer" },
    { href: "/admin/settings", label: "Account settings" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold">Dashboard</h2>
        <p className="mt-2 text-zinc-400">
          Managing {content.platform.name} — branding, sections, projects, and
          inbox.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-5 transition hover:border-[#ff6b3d]/40"
          >
            <p className="text-sm text-zinc-400">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 p-6">
        <h3 className="mb-4 text-lg font-medium">Quick links</h3>
        <div className="flex flex-wrap gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
