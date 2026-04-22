import Link from "next/link";

const skills = [
  "Python", "SQL", "TypeScript", "React", "Machine Learning",
  "PostgreSQL", "Data Engineering", "普通话 (Mandarin)",
];

const featuredProjects = [
  {
    title: "Query Optimizer",
    description:
      "Implemented cost-based query optimization over a custom relational engine. Achieved 3× average speedup on TPC-H benchmarks.",
    tags: ["C++", "PostgreSQL", "Database Systems"],
    href: "/projects",
  },
  {
    title: "ML Pipeline Framework",
    description:
      "End-to-end pipeline for training and serving tabular ML models, with automated feature engineering and experiment tracking.",
    tags: ["Python", "scikit-learn", "Pandas", "MLflow"],
    href: "/projects",
  },
  {
    title: "Full-Stack Analytics Dashboard",
    description:
      "Real-time analytics board backed by a custom data warehouse, with sub-100ms query response at scale.",
    tags: ["Next.js", "TypeScript", "ClickHouse", "SQL"],
    href: "/projects",
  },
];

const recentTrips = [
  { name: "Tokyo", emoji: "🗾", slug: "tokyo" },
  { name: "Taipei", emoji: "🌏", slug: "taipei" },
  { name: "Seoul", emoji: "🇰🇷", slug: "seoul" },
];

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* Hero */}
      <section className="pt-20 pb-16 border-b border-gray-100">
        <p className="mono text-sm mb-4" style={{ color: "var(--accent)" }}>
          // data scientist & engineer
        </p>
        <h1 className="text-5xl font-semibold tracking-tight text-gray-900 leading-tight mb-6">
          Connor Barnsley
        </h1>
        <p className="text-xl text-gray-500 max-w-xl leading-relaxed mb-10">
          I build things with data. Currently studying Data Science, working on
          database systems and ML pipelines, learning Mandarin, and trying to
          see as much of the world as I can.
        </p>

        {/* Skill pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {skills.map((s) => (
            <span
              key={s}
              className="mono text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 bg-gray-50"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/projects"
            className="px-5 py-2.5 rounded text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--accent)" }}
          >
            See my work
          </Link>
          <Link
            href="/about"
            className="px-5 py-2.5 rounded text-sm font-medium text-gray-700 border border-gray-200 hover:border-gray-400 transition-colors"
          >
            About me
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 border-b border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest mono">
            Featured Projects
          </h2>
          <Link
            href="/projects"
            className="text-sm hover:underline underline-offset-4 transition-colors"
            style={{ color: "var(--accent)" }}
          >
            All projects →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredProjects.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="group block border border-gray-100 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <h3 className="font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="mono text-xs px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: "var(--accent-muted)",
                      color: "#1d4ed8",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Travel teaser */}
      <section className="py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest mono">
            Recent Travels
          </h2>
          <Link
            href="/travel"
            className="text-sm hover:underline underline-offset-4 transition-colors"
            style={{ color: "var(--accent)" }}
          >
            All trips →
          </Link>
        </div>
        <div className="flex gap-4">
          {recentTrips.map((t) => (
            <Link
              key={t.slug}
              href={`/travel/${t.slug}`}
              className="flex-1 border border-gray-100 rounded-lg p-5 hover:border-gray-300 transition-all text-center group"
            >
              <div className="text-3xl mb-2">{t.emoji}</div>
              <div className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                {t.name}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
