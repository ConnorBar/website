// Server-only — uses fs/path. Never import from a client component.
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export function getProjectContent(slug: string): { content: string } | null {
  const filepath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, "utf8");
  const { content } = matter(raw);
  return { content };
}
