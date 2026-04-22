// Shared types and constants — no Node.js imports, safe for client components

export type TripCategory = "international" | "domestic" | "day-trip";

export const CATEGORY_LABELS: Record<TripCategory, string> = {
  international: "International",
  domestic: "Domestic",
  "day-trip": "Day trip",
};

export type TripMeta = {
  slug: string;
  title: string;
  date: string;
  country: string;
  emoji: string;
  summary: string;
  coverColor: string;
  coverImage?: string;
  category: TripCategory;
};

export type Trip = TripMeta & {
  content: string;
};
