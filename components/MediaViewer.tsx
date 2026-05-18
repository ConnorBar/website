"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";

type Props = {
  src: string;
  title: string;
  onClose: () => void;
};

function isPdf(src: string) {
  return src.toLowerCase().endsWith(".pdf");
}

export function MediaViewer({ src, title, onClose }: Props) {
  const close = useCallback(() => onClose(), [onClose]);

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
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      onClick={close}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden mx-4"
        style={{ maxWidth: "900px", width: "100%", maxHeight: "92vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between gap-4 px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-medium text-gray-800 leading-snug">{title}</h2>
          <button
            onClick={close}
            aria-label="Close"
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-4" style={{ minHeight: 0 }}>
          {isPdf(src) ? (
            <iframe
              src={src}
              title={title}
              className="w-full rounded"
              style={{ height: "75vh", border: "none" }}
            />
          ) : (
            <div className="relative w-full" style={{ maxHeight: "75vh" }}>
              <Image
                src={src}
                alt={title}
                width={1200}
                height={900}
                className="rounded-lg object-contain w-full h-auto"
                style={{ maxHeight: "75vh", objectFit: "contain" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
