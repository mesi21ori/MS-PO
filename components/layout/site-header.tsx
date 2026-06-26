"use client";

import Image from "next/image";
import { useState } from "react";
import { portfolioContent } from "@/lib/portfolioContent";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const { platform, navbar } = portfolioContent;
  const colors = platform.brandColors;

  return (
    <header className="fixed top-0 left-0 z-50 w-full px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center shadow-lg overflow-hidden">
            {navbar.logo ? (
              <Image
                src={navbar.logo}
                alt={platform.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm font-bold text-white">
                {platform.name.slice(0, 2)}
              </span>
            )}
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 bg-zinc-900/90 border border-zinc-700 rounded-2xl px-8 py-3 text-sm text-zinc-300 shadow-lg">
          {navbar.menuItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="hover:text-white transition"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Desktop Button */}
        <a
          href={navbar.buttonLink}
          className="hidden md:inline-flex border border-zinc-700 text-white text-sm px-5 py-3 rounded-xl transition"
          style={{
            backgroundColor: colors.primary,
          }}
        >
          {navbar.buttonName}
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <span className="text-2xl leading-none">×</span>
          ) : (
            <span className="text-2xl leading-none">☰</span>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-zinc-900/95 border border-zinc-700 rounded-2xl p-4 shadow-xl">
          <nav className="flex flex-col gap-4 text-zinc-300 text-sm">
            {navbar.menuItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                onClick={() => setIsOpen(false)}
                className="hover:text-white transition px-3 py-2 rounded-lg hover:bg-zinc-800"
              >
                {item.name}
              </a>
            ))}

            <a
              href={navbar.buttonLink}
              onClick={() => setIsOpen(false)}
              className="text-center text-white text-sm px-5 py-3 rounded-xl transition mt-2"
              style={{
                backgroundColor: colors.primary,
              }}
            >
              {navbar.buttonName}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}