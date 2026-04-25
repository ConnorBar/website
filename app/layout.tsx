import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Nav } from "@/components/Nav"
import "./globals.css";

export const metadata: Metadata = {
  title: "Connor Barnsley",
  description: "Data scientist, engineer, and explorer.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Connor Barnsley",
    description: "Data scientist, engineer, and explorer.",
    url: "https://cobars.space",
    images: [{ url: "https://cobars.space/og-image.png", width: 1200, height: 630 }]
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        {/* honeypot — invisible to humans, logged when bots follow it */}
        <a href="/trap" style={{ display: "none" }} aria-hidden="true" tabIndex={-1}>sitemap</a>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
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
