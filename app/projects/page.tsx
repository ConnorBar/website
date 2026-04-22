import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Connor Barnsley",
  description: "Software and data science projects by Connor Barnsley.",
};

type Project = {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "Query Optimizer",
    description:
      "Cost-based query optimizer built on top of a custom relational engine. Implements join reordering, predicate pushdown, and index selection. Benchmarked on TPC-H — achieved 3× average speedup over a naive plan.",
    tags: ["C++", "PostgreSQL", "Database Systems", "Algorithms"],
    github: "https://github.com",
    featured: true,
  },
  {
    title: "ML Pipeline Framework",
    description:
      "End-to-end framework for training and serving tabular ML models. Automated feature engineering, cross-validation, hyperparameter search, and model registry integration via MLflow. Designed to be dropped into any data team's workflow.",
    tags: ["Python", "scikit-learn", "Pandas", "MLflow", "FastAPI"],
    github: "https://github.com",
    featured: true,
  },
  {
    title: "Full-Stack Analytics Dashboard",
    description:
      "Real-time analytics platform backed by a custom data warehouse. Ingests event streams, materializes aggregates on write, and serves dashboards with sub-100ms query response at scale.",
    tags: ["Next.js", "TypeScript", "ClickHouse", "SQL", "React"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: true,
  },
  {
    title: "Distributed Key-Value Store",
    description:
      "A fault-tolerant key-value store implementing the Raft consensus protocol for leader election and log replication. Supports linearizable reads and writes across a cluster of nodes.",
    tags: ["Go", "Raft", "Distributed Systems"],
    github: "https://github.com",
  },
  {
    title: "Chinese Vocabulary SRS",
    description:
      "Spaced-repetition flashcard app tuned for Mandarin learners. Uses an SM-2 variant with tone-awareness — wrong tone on a correct character is tracked separately from a full miss.",
    tags: ["TypeScript", "React", "SQLite", "NLP"],
    github: "https://github.com",
  },
  {
    title: "Travel Log Static Site",
    description:
      "A lightweight static site generator for travel journals. Reads MDX files from a directory, generates a map with stop markers, and exports a fully static HTML bundle.",
    tags: ["Node.js", "MDX", "Mapbox", "Static Site"],
    github: "https://github.com",
  },
];

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
