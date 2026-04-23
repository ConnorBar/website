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
  { value: "concert", label: CATEGORY_LABELS.concert },
];

function cardStyle(isUpcoming: boolean, isFavorite: boolean) {
  if (isUpcoming) return {
    border: "1px solid #3b82f6",
    boxShadow: "0 0 0 2px #dbeafe",
    borderRadius: "8px",
  };
  if (isFavorite) return {
    border: "2px solid #d97706",
    boxShadow: "0 0 0 4px #fef3c7",
    borderRadius: "8px",
  };
  return {
    border: "1px solid #f3f4f6",
    borderRadius: "8px",
  };
}

export function TripGrid({ trips }: { trips: TripMeta[] }) {
  const [active, setActive] = useState<Filter>("all");
  const now = new Date();

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
              <span className="ml-1.5" style={{ opacity: isActive ? 0.6 : 0.5 }}>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((trip) => {
            const isUpcoming = new Date(trip.date) > now;
            const isFavorite = !!trip.favorite;

            return (
              <Link
                key={trip.slug}
                href={`/travel/${trip.slug}`}
                className="group block overflow-hidden hover:shadow-md transition-all"
                style={cardStyle(isUpcoming, isFavorite)}
              >
                {/* Cover */}
                <div className="h-36 relative overflow-hidden" style={{ borderRadius: "6px 6px 0 0" }}>
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
                    <p className="mono text-xs" style={{ color: isUpcoming ? "#2563eb" : "#9ca3af" }}>
                      {isUpcoming
                        ? "upcoming"
                        : new Date(trip.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </p>
                    <span
                      className="mono text-xs px-2 py-0.5 rounded-full border"
                      style={
                        isFavorite
                          ? { color: "#92400e", borderColor: "#fde68a", backgroundColor: "#fffbeb" }
                          : isUpcoming
                          ? { color: "#1d4ed8", borderColor: "#bfdbfe", backgroundColor: "#eff6ff" }
                          : { color: "#9ca3af", borderColor: "#f3f4f6" }
                      }
                    >
                      {isFavorite ? "★ favorite" : CATEGORY_LABELS[trip.category]}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
