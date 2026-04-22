"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { TripMeta, TripCategory } from "@/lib/travel-types";
import { CATEGORY_LABELS } from "@/lib/travel-types";

type Filter = "all" | TripCategory;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "international", label: CATEGORY_LABELS.international },
  { value: "domestic", label: CATEGORY_LABELS.domestic },
  { value: "day-trip", label: CATEGORY_LABELS["day-trip"] },
];

export function TripGrid({ trips }: { trips: TripMeta[] }) {
  const [active, setActive] = useState<Filter>("all");

  const visible =
    active === "all" ? trips : trips.filter((t) => t.category === active);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        {FILTERS.map((f) => {
          const isActive = active === f.value;
          const count =
            f.value === "all"
              ? trips.length
              : trips.filter((t) => t.category === f.value).length;
          return (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className="mono text-xs px-3 py-1.5 rounded-full border transition-colors"
              style={{
                backgroundColor: isActive ? "var(--nav-bg)" : "transparent",
                color: isActive ? "#fff" : "#6b7280",
                borderColor: isActive ? "var(--nav-bg)" : "#e5e7eb",
              }}
            >
              {f.label}
              <span
                className="ml-1.5"
                style={{ opacity: isActive ? 0.6 : 0.5 }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {visible.length === 0 ? (
        <p className="text-sm text-gray-400 mono">No trips in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((trip) => (
            <Link
              key={trip.slug}
              href={`/travel/${trip.slug}`}
              className="group block rounded-lg border border-gray-100 overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all"
            >
              {/* Cover */}
              <div className="h-36 relative overflow-hidden">
                {trip.coverImage ? (
                  <Image
                    src={trip.coverImage}
                    alt={`${trip.title} cover`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 360px"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: trip.coverColor }}
                  >
                    <span className="text-5xl">{trip.emoji}</span>
                  </div>
                )}
              </div>

              {/* Meta */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {trip.title}
                  </h2>
                  <span className="mono text-xs text-gray-400 ml-3 shrink-0">
                    {trip.country}
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">
                  {trip.summary}
                </p>
                <div className="flex items-center justify-between">
                  <p className="mono text-xs text-gray-400">
                    {new Date(trip.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <span
                    className="mono text-xs px-2 py-0.5 rounded-full border"
                    style={{ color: "#9ca3af", borderColor: "#f3f4f6" }}
                  >
                    {CATEGORY_LABELS[trip.category]}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
