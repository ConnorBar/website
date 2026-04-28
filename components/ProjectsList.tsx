import Link from "next/link";
import { projects, type Project } from "@/lib/projects";

function ProjectCard({ project: p }: { project: Project }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      scroll={false}
      className="group flex flex-col border border-gray-100 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
    >
      <h3 className="font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {p.title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
        {p.short_desc ?? p.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {(p.short_tags ?? p.tags).map((t) => (
          <span
            key={t}
            className="mono text-xs px-2 py-0.5 rounded"
            style={{ backgroundColor: "var(--accent-muted)", color: "#1d4ed8" }}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="pt-3 border-t border-gray-100">
        <span className="mono text-xs" style={{ color: "var(--accent)" }}>
          Read more →
        </span>
      </div>
    </Link>
  );
}

export function ProjectsList() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-14">
        <p className="mono text-sm mb-3" style={{ color: "var(--accent)" }}>
          // projects
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-4">
          Things I&apos;ve built
        </h1>
        <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
          A mix of database systems work, ML engineering, and side projects.
          Most have public repos — click to read more.
        </p>
      </div>

      <section className="mb-14">
        <h2 className="mono text-xs text-gray-400 uppercase tracking-widest mb-6">
          Featured
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mono text-xs text-gray-400 uppercase tracking-widest mb-6">
          Other Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {rest.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
