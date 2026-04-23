// Shared types and constants — no Node.js imports, safe for client components

export type TripCategory = "international" | "domestic" | "day-trip" | "concert";

export const CATEGORY_LABELS: Record<TripCategory, string> = {
  international: "International",
  domestic: "Domestic",
  "day-trip": "Day trip",
  concert: "Concerts",
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
  favorite?: boolean;
};

export type Trip = TripMeta & {
  content: string;
};
