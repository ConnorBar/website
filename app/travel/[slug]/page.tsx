import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllTrips, getTrip } from "@/lib/travel";
import { mdxComponents } from "@/components/mdx/components";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const trips = getAllTrips();
  return trips.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTrip(slug);
  if (!trip) return {};
  return {
    title: `${trip.title} | Connor Barnsley`,
    description: trip.summary,
  };
}

export default async function TripPage({ params }: Props) {
  const { slug } = await params;
  const trip = getTrip(slug);
  if (!trip) notFound();

  const trips = getAllTrips();
  const currentIdx = trips.findIndex((t) => t.slug === slug);
  // trips are sorted newest-first; left arrow = more recent (lower index), right = older (higher index)
  const newer = trips[currentIdx - 1] ?? null;
  const older = trips[currentIdx + 1] ?? null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Back */}
      <Link
        href="/travel"
        className="mono text-xs text-gray-400 hover:text-gray-700 transition-colors mb-10 inline-block"
      >
        ← All trips
      </Link>

      {/* Cover — photo if provided, otherwise emoji + color fallback */}
      <div className="rounded-xl overflow-hidden mb-10" style={{ height: "280px" }}>
        {trip.coverImage ? (
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src={trip.coverImage}
              alt={`${trip.title} cover photo`}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 960px"
              priority
            />
          </div>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: trip.coverColor }}
          >
            <span className="text-7xl">{trip.emoji}</span>
          </div>
        )}
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="mono text-xs text-gray-400">{trip.country}</span>
          <span className="text-gray-200">·</span>
          <span className="mono text-xs text-gray-400">
            {new Date(trip.date).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-3">
          {trip.title}
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">{trip.summary}</p>
      </div>

      <hr className="border-gray-100 mb-10" />

      {/* Content */}
      <article className="prose">
        <MDXRemote source={trip.content} components={mdxComponents} />
      </article>

      {/* Prev / next */}
      {(newer || older) && (
        <div className="flex items-center justify-between mt-16 pt-8 border-t border-gray-100">
          {newer ? (
            <Link
              href={`/travel/${newer.slug}`}
              className="group flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <span>←</span>
              <span>
                {newer.emoji} {newer.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {older ? (
            <Link
              href={`/travel/${older.slug}`}
              className="group flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <span>
                {older.emoji} {older.title}
              </span>
              <span>→</span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      )}
    </div>
  );
}
