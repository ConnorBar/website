// Server-only — uses fs/path. Never import this from a client component.
// For types and constants, import from lib/travel-types instead.
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { TripMeta, Trip, TripCategory } from "./travel-types";

export type { TripMeta, Trip, TripCategory } from "./travel-types";
export { CATEGORY_LABELS } from "./travel-types";

const TRAVEL_DIR = path.join(process.cwd(), "content/travel");

export function getAllTrips(): TripMeta[] {
  const files = fs.readdirSync(TRAVEL_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(TRAVEL_DIR, filename), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        country: data.country as string,
        emoji: data.emoji as string,
        summary: data.summary as string,
        coverColor: (data.coverColor as string) ?? "#f9fafb",
        coverImage: data.coverImage as string | undefined,
        category: (data.category as TripCategory) ?? "international",
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getTrip(slug: string): Trip | null {
  const filepath = path.join(TRAVEL_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    country: data.country as string,
    emoji: data.emoji as string,
    summary: data.summary as string,
    coverColor: (data.coverColor as string) ?? "#f9fafb",
    coverImage: data.coverImage as string | undefined,
    category: (data.category as TripCategory) ?? "international",
    content,
  };
}
