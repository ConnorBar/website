"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  title: string;
  tags: string[];
  github?: string;
  demo?: string;
  prevSlug?: string | null;
  nextSlug?: string | null;
  children: React.ReactNode;
};

export function ProjectModal({
  title,
  tags,
  github,
  demo,
  prevSlug,
  nextSlug,
  children,
}: Props) {
  const router = useRouter();

  const close = useCallback(() => router.push("/projects", { scroll: false }), [router]);

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // ESC to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
      onClick={close}
    >
      {/* Panel — full screen on mobile, centered card on desktop */}
      <div
        className="
          relative bg-white w-full flex flex-col
          rounded-t-2xl sm:rounded-2xl
          h-[92dvh] sm:h-auto sm:max-h-[92vh]
          sm:max-w-4xl sm:mx-4
          overflow-hidden
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header */}
        <div className="shrink-0 flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 leading-snug">
            {title}
          </h2>
          <button
            onClick={close}
            aria-label="Close"
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors mt-0.5"
          >
            ✕
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((t) => (
              <span
                key={t}
                className="mono text-xs px-2 py-0.5 rounded"
                style={{ backgroundColor: "var(--accent-muted)", color: "#1d4ed8" }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          {(github || demo) && (
            <div className="flex gap-5 mb-6">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono text-xs text-gray-500 hover:text-gray-900 transition-colors"
                >
                  GitHub ↗
                </a>
              )}
              {demo && (
                <a
                  href={demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono text-xs transition-colors"
                  style={{ color: "var(--accent)" }}
                >
                  Live demo ↗
                </a>
              )}
            </div>
          )}

          {/* MDX content */}
          <article className="prose" style={{ maxWidth: "none" }}>{children}</article>
        </div>

        {/* Sticky footer nav */}
        {(prevSlug || nextSlug) && (
          <div className="shrink-0 flex items-center justify-between px-6 py-4 border-t border-gray-100">
            {prevSlug ? (
              <Link
                href={`/projects/${prevSlug}`}
                scroll={false}
                className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
              >
                ← prev
              </Link>
            ) : (
              <span />
            )}
            {nextSlug ? (
              <Link
                href={`/projects/${nextSlug}`}
                scroll={false}
                className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
              >
                next →
              </Link>
            ) : (
              <span />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
