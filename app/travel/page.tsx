import type { Metadata } from "next";
import { getAllTrips } from "@/lib/travel";
import { TripGrid } from "@/components/travel/TripGrid";

export const metadata: Metadata = {
  title: "Travel | Connor Barnsley",
  description: "Places I've been and notes from the road.",
};

export default function TravelPage() {
  const trips = getAllTrips();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <p className="mono text-sm mb-3" style={{ color: "var(--accent)" }}>
          // travel
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-4">
          Places I&apos;ve been
        </h1>
        <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
          Notes and reflections from the road — what surprised me, what I ate,
          what I&apos;d do differently.
        </p>
      </div>

      <TripGrid trips={trips} />
    </div>
  );
}
