import type { Metadata } from "next";
import { projects, type Project } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects | Connor Barnsley",
  description: "Software and data science projects by Connor Barnsley.",
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-14">
        <p className="mono text-sm mb-3" style={{ color: "var(--accent)" }}>
          // projects
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-4">
          Things I&apos;ve built
        </h1>
        <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
          A mix of database systems work, ML engineering, and side projects.
          Most have public repos — click GitHub to dig in.
        </p>
      </div>

      {/* Featured */}
      <section className="mb-14">
        <h2 className="mono text-xs text-gray-400 uppercase tracking-widest mb-6">
          Featured
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </section>

      {/* Other */}
      <section>
        <h2 className="mono text-xs text-gray-400 uppercase tracking-widest mb-6">
          Other Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {rest.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  return (
    <div className="flex flex-col border border-gray-100 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
      <h3 className="font-medium text-gray-900 mb-2">{p.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
        {p.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {p.tags.map((t) => (
          <span
            key={t}
            className="mono text-xs px-2 py-0.5 rounded"
            style={{ backgroundColor: "var(--accent-muted)", color: "#1d4ed8" }}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
        {p.github && (
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mono text-xs text-gray-500 hover:text-gray-900 transition-colors"
          >
            GitHub ↗
          </a>
        )}
        {p.demo && (
          <a
            href={p.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="mono text-xs transition-colors"
            style={{ color: "var(--accent)" }}
          >
            Live demo ↗
          </a>
        )}
      </div>
    </div>
  );
}
