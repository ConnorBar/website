"use client";

import { useState } from "react";
import Link from "next/link";
import { MediaViewer } from "@/components/MediaViewer";

type Award = {
  title: string;
  org: string;
  year: string;
  slug?: string;
  image?: string;
};

type Props = {
  awards: Award[];
};

export function AwardsList({ awards }: Props) {
  const [viewer, setViewer] = useState<{ src: string; title: string } | null>(null);

  return (
    <>
      <div className="space-y-3">
        {awards.map((a) => (
          <div
            key={a.title + a.year}
            className="flex items-start gap-4 p-4 rounded-lg border border-gray-100"
          >
            <span
              className="mono text-xs font-medium shrink-0 mt-0.5"
              style={{ color: "var(--accent)" }}
            >
              {a.year}
            </span>
            <div>
              {a.image ? (
                <button
                  onClick={() => setViewer({ src: a.image!, title: a.title })}
                  className="block text-sm font-medium text-gray-900 hover:text-gray-500 transition-colors text-left"
                >
                  {a.title} ↗
                </button>
              ) : a.slug ? (
                <Link
                  href={`/travel/${a.slug}`}
                  rel="noopener noreferrer"
                  className="block text-sm font-medium text-gray-900 hover:text-gray-500 transition-colors"
                >
                  {a.title} ↗
                </Link>
              ) : (
                <p className="text-sm font-medium text-gray-900">{a.title}</p>
              )}
              <p className="text-xs text-gray-500 mt-0.5">{a.org}</p>
            </div>
          </div>
        ))}
      </div>

      {viewer && (
        <MediaViewer
          src={viewer.src}
          title={viewer.title}
          onClose={() => setViewer(null)}
        />
      )}
    </>
  );
}
