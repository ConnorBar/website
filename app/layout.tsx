import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Connor Barnsley",
  description: "Data scientist, engineer, and explorer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Nav() {
  const links = [
    { href: "/projects", label: "Projects" },
    { href: "/travel", label: "Travel" },
    { href: "/about", label: "About" },
  ];

  return (
    <header
      style={{ backgroundColor: "var(--nav-bg)" }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="mono text-white text-sm font-medium tracking-tight hover:opacity-80 transition-opacity"
        >
          cb.dev
        </Link>
        <nav className="flex items-center gap-7">
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
            href="mailto:barnsleyc04@gmail.com"
            className="mono text-xs px-3 py-1.5 rounded"
            style={{
              backgroundColor: "var(--accent)",
              color: "#fff",
            }}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
        <span className="mono text-xs text-gray-400">
          © {new Date().getFullYear()} Connor Barnsley
        </span>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/ConnorBar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/connor-barnsley/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
