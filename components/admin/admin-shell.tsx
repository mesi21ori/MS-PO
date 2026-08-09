"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Briefcase,
  FolderKanban,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Navigation,
  Palette,
  PanelBottom,
  UserRound,
  X,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/branding", label: "Branding", icon: Palette },
  { href: "/admin/navbar", label: "Navbar", icon: Navigation },
  { href: "/admin/hero", label: "Hero", icon: ImageIcon },
  { href: "/admin/about", label: "About", icon: UserRound },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/contact", label: "Contact", icon: Mail },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/footer", label: "Footer", icon: PanelBottom },
];

export default function AdminShell({
  children,
  email,
  unreadMessages = 0,
}: {
  children: React.ReactNode;
  email: string;
  unreadMessages?: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
    return (
      <nav className="flex flex-col gap-1 px-3">
        {navItems.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : item.href === "/admin/projects"
                ? pathname.startsWith("/admin/projects")
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-[#ff6b3d] text-white"
                  : "text-zinc-300 hover:bg-white/5"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.href === "/admin/messages" && unreadMessages > 0 && (
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px]">
                  {unreadMessages}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#07060f] text-white">
      {/* Desktop sidebar — fixed while page scrolls */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/10 bg-[#07060f] lg:flex">
        <div className="px-6 py-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#ff6b3d]">
            Admin
          </p>
          <h1 className="mt-2 text-xl font-semibold">Portfolio CMS</h1>
          <p className="mt-1 truncate text-sm text-zinc-400">{email}</p>
        </div>

        <div className="flex-1 overflow-y-auto pb-4">
          <NavLinks />
        </div>

        <div className="border-t border-white/10 px-3 py-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-white/5"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
          <Link
            href="/"
            className="mt-2 block px-4 text-sm text-zinc-500 hover:text-zinc-300"
          >
            ← View website
          </Link>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-h-screen min-w-0 flex-col lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-white/10 bg-[#07060f]/95 px-4 py-4 backdrop-blur lg:hidden">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#ff6b3d]">
              Admin
            </p>
            <p className="font-semibold">Portfolio CMS</p>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-xl border border-white/10 p-2"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>

        <main className="w-full flex-1 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
          {children}
        </main>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[900] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 flex h-full w-[280px] flex-col bg-[#0b0a14] shadow-2xl">
            <div className="flex items-start justify-between px-5 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#ff6b3d]">
                  Admin
                </p>
                <p className="mt-1 font-semibold">Portfolio CMS</p>
                <p className="mt-1 truncate text-sm text-zinc-400">{email}</p>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg border border-white/10 p-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <NavLinks onNavigate={() => setMobileOpen(false)} />
            </div>
            <div className="border-t border-white/10 px-3 py-4">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-sm text-zinc-300"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
