"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { NowPlaying } from "@/components/NowPlaying";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/work", label: "Work" },
  { href: "/travel", label: "Travel" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header style={{ backgroundColor: "var(--nav-bg)" }} className="sticky top-0 z-50">
      {/* Desktop */}
      <div className="hidden md:grid max-w-5xl mx-auto px-6 h-14 items-center" style={{ gridTemplateColumns: "auto 1fr auto" }}>
        <Link
          href="/"
          className="mono text-white text-sm font-medium tracking-tight hover:opacity-80 transition-opacity"
        >
          cobars.space
        </Link>
        <div className="flex justify-center">
          <NowPlaying />
        </div>
        <nav className="flex items-center gap-7 justify-end">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="mailto:ctbarnsley@icloud.com"
            className="mono text-xs px-3 py-1.5 rounded"
            style={{ backgroundColor: "var(--accent)", color: "#fff" }}
          >
            Contact
          </a>
        </nav>
      </div>

      {/* Mobile */}
      <div className="md:hidden" ref={menuRef}>
        <div className="px-4 h-14 flex items-center justify-between gap-2">
          <Link
            href="/"
            className="mono text-white text-sm font-medium tracking-tight hover:opacity-80 transition-opacity shrink-0"
          >
            cobars.space
          </Link>
          <div className="flex-1 flex justify-center min-w-0">
            <NowPlaying />
          </div>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="shrink-0 w-8 h-8 flex flex-col items-center justify-center gap-[5px] rounded hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <span
              className="block w-4 h-[2px] bg-gray-400 rounded transition-all duration-200"
              style={menuOpen ? { transform: "translateY(7px) rotate(45deg)" } : {}}
            />
            <span
              className="block w-4 h-[2px] bg-gray-400 rounded transition-all duration-200"
              style={menuOpen ? { opacity: 0 } : {}}
            />
            <span
              className="block w-4 h-[2px] bg-gray-400 rounded transition-all duration-200"
              style={menuOpen ? { transform: "translateY(-7px) rotate(-45deg)" } : {}}
            />
          </button>
        </div>

        {menuOpen && (
          <nav
            className="border-t border-white/10 px-4 py-3 flex flex-col gap-1"
            style={{ backgroundColor: "var(--nav-bg)" }}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-gray-400 hover:text-white transition-colors py-2 px-2 rounded hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="mailto:ctbarnsley@icloud.com"
              onClick={() => setMenuOpen(false)}
              className="mono text-xs px-3 py-2 rounded mt-1 text-center"
              style={{ backgroundColor: "var(--accent)", color: "#fff" }}
            >
              Contact
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

