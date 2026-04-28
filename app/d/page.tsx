import Link from "next/link";
import Image from "next/image";
import { getAllTrips } from "@/lib/travel";
import { getFeaturedProjects } from "@/lib/projects";

const skills = [
  "Python", "SQL", "TypeScript", "React", "Machine Learning",
  "PostgreSQL", "Data Engineering",
];

export default function DefensePage() {
  const featuredProjects = getFeaturedProjects();

  const now = new Date();
  const allTrips = getAllTrips();
  const pastTrips = allTrips.filter((t) => new Date(t.date) <= now).slice(0, 2);
  const nextTrip = allTrips.filter((t) => new Date(t.date) > now).at(-1) ?? null;
  const recentTrips = [
    ...(nextTrip ? [nextTrip] : []),
    ...pastTrips,
  ];

  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* Hero */}
      <section className="pt-10 pb-8 border-b border-gray-100">
        <div className="flex flex-col-reverse md:flex-row md:items-start gap-10 md:gap-16">
          <div className="flex-1 min-w-0">
            <p className="mono text-sm mb-4" style={{ color: "var(--accent)" }}>
              // data scientist & engineer
            </p>
            <h1 className="text-5xl font-semibold tracking-tight text-gray-900 leading-tight mb-2">
              Connor Barnsley
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: "#16a34a" }}
              />
              <span className="mono text-sm text-gray-400">Active T3 Secret Security Clearance</span>
            </div>
            <p className="text-xl text-gray-500 leading-relaxed mb-10">
              I build things with data. Currently studying Data Science, working on
              database systems and ML pipelines, and trying to
              see as much of the world as I can.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
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
                See my projects
              </Link>
              <Link
                href="/work"
                className="px-5 py-2.5 rounded text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--accent)" }}
              >
                Work Experience
              </Link>
              <Link
                href="/travel"
                className="px-5 py-2.5 rounded text-sm font-medium text-gray-700 border border-gray-200 hover:border-gray-400 transition-colors"
              >
                See where I&apos;ve been
              </Link>
            </div>
            <p className="mono text-xs text-gray-400 mt-4 mb-2">// right now</p>
            <ul className="space-y-1.5">
              {[
                "learning rust",
                "making this site - constantly rolling out changes...",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="shrink-0 md:pt-2">
            <Image
              src="/images/hero.jpg"
              alt="Connor Barnsley"
              width={256}
              height={320}
              className="rounded-xl border border-gray-100"
              style={{ objectFit: "cover", objectPosition: "center top", width: "100%", maxWidth: "256px" }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-10 border-b border-gray-100">
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
                    style={{ backgroundColor: "var(--accent-muted)", color: "#1d4ed8" }}
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
      <section className="py-10">
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
          {recentTrips.map((t) => {
            const isUpcoming = new Date(t.date) > now;
            return (
              <Link
                key={t.slug}
                href={`/travel/${t.slug}`}
                className="flex-1 overflow-hidden rounded-lg transition-all group"
                style={
                  isUpcoming
                    ? { border: "1px solid #3b82f6", boxShadow: "0 0 0 2px #dbeafe" }
                    : { border: "1px solid #f3f4f6" }
                }
              >
                <div className="h-24 relative">
                  {t.coverImage ? (
                    <Image
                      src={t.coverImage}
                      alt={t.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="33vw"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: t.coverColor }}
                    >
                      <span className="text-3xl">{t.emoji}</span>
                    </div>
                  )}
                </div>
                <div className="p-3 text-center">
                  <div className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                    {t.title}
                  </div>
                  <div className="mono text-xs mt-0.5" style={{ color: isUpcoming ? "var(--accent)" : "#9ca3af" }}>
                    {isUpcoming ? "upcoming" : t.country}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
