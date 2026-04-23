// Server-only — uses fs/path. Never import this from a client component.
// For types and constants, import from lib/travel-types instead.
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { TripMeta, Trip, TripCategory } from "./travel-types";

export type { TripMeta, Trip, TripCategory } from "./travel-types";
export { CATEGORY_LABELS } from "./travel-types";

const TRAVEL_DIR = path.join(process.cwd(), "content/travel");

/** Read all MDX files from category subdirectories. Category = folder name. */
export function getAllTrips(): TripMeta[] {
  const subdirs = fs
    .readdirSync(TRAVEL_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name as TripCategory);

  const trips: TripMeta[] = [];

  for (const category of subdirs) {
    const dirPath = path.join(TRAVEL_DIR, category);
    const files = fs
      .readdirSync(dirPath)
      .filter((f) => f.endsWith(".mdx"));

    for (const filename of files) {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dirPath, filename), "utf8");
      const { data } = matter(raw);
      trips.push({
        slug,
        title: data.title as string,
        date: data.date as string,
        country: data.country as string,
        emoji: data.emoji as string,
        summary: data.summary as string,
        coverColor: (data.coverColor as string) ?? "#f9fafb",
        coverImage: data.coverImage as string | undefined,
        category,
        favorite: (data.favorite as boolean) ?? false,
      });
    }
  }

  return trips.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** Find a trip by slug, searching across all category subdirectories. */
export function getTrip(slug: string): Trip | null {
  const subdirs = fs
    .readdirSync(TRAVEL_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name as TripCategory);

  for (const category of subdirs) {
    const filepath = path.join(TRAVEL_DIR, category, `${slug}.mdx`);
    if (!fs.existsSync(filepath)) continue;

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
      category,
      favorite: (data.favorite as boolean) ?? false,
      content,
    };
  }

  return null;
}
