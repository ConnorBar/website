import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Connor Barnsley",
  description: "A bit about Connor Barnsley — data scientist, engineer, Mandarin learner, traveler.",
};

const awards = [
  {
    title: "National Chinese Language Competition — 1st Place",
    org: "Chinese Language Association",
    year: "2024",
  },
  {
    title: "Regional Mandarin Proficiency Award",
    org: "Confucius Institute",
    year: "2023",
  },
  {
    title: "University Chinese Language Excellence Award",
    org: "Department of Asian Studies",
    year: "2023",
  },
];

const experience = [
  {
    role: "Software Engineering Intern",
    org: "Backend Systems",
    period: "Summer 2024",
    notes:
      "Worked on distributed service infrastructure, query optimization, and developer tooling.",
  },
  {
    role: "Research Assistant — Database Systems",
    org: "University Research Lab",
    period: "2023–present",
    notes:
      "Query optimization research under faculty supervision. Working on cost-based plan selection for analytical workloads.",
  },
  {
    role: "Teaching Assistant — Data Structures",
    org: "University",
    period: "2023",
    notes:
      "Held office hours, graded assignments, led weekly review sessions for ~80 students.",
  },
];

const now = [
  "Finishing my Data Science degree",
  "Studying for HSK 5 (Mandarin proficiency exam)",
  "Building this site",
  "Planning a trip to Chengdu and Chongqing",
  "Reading: *The Dream of the Red Chamber* (慢慢来)",
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-16">
        <p className="mono text-sm mb-3" style={{ color: "var(--accent)" }}>
          // about
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-6">
          Hi, I&apos;m Connor.
        </h1>
        <div className="max-w-2xl space-y-4 text-lg text-gray-600 leading-relaxed">
          <p>
            I&apos;m a Data Science student with a serious interest in the systems
            side of things — database internals, query optimization, and how you
            build infrastructure that actually holds up at scale.
          </p>
          <p>
            Outside of work, I study Mandarin Chinese (aiming for fluency, not
            just proficiency), and I travel as much as I can. I&apos;m most
            comfortable in East Asia but trying to broaden that.
          </p>
          <p>
            I built this site because I wanted one place that holds all of it —
            the technical work, the language stuff, the travel writing — without
            pretending they&apos;re separate things.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-14">
          {/* Experience */}
          <section>
            <h2 className="mono text-xs text-gray-400 uppercase tracking-widest mb-6">
              Experience
            </h2>
            <div className="space-y-8">
              {experience.map((e) => (
                <div key={e.role} className="flex gap-4">
                  <div
                    className="w-2 h-2 rounded-full mt-2 shrink-0"
                    style={{ backgroundColor: "var(--accent)" }}
                  />
                  <div>
                    <div className="flex items-baseline gap-2 flex-wrap mb-1">
                      <span className="font-medium text-gray-900">{e.role}</span>
                      <span className="text-gray-400">·</span>
                      <span className="text-sm text-gray-500">{e.org}</span>
                    </div>
                    <p className="mono text-xs text-gray-400 mb-1.5">{e.period}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{e.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Chinese & Awards */}
          <section>
            <h2 className="mono text-xs text-gray-400 uppercase tracking-widest mb-6">
              Mandarin Chinese
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              I&apos;ve been studying Mandarin for several years and have competed
              in language proficiency competitions. My goal is genuine fluency —
              I want to read literature and argue in meetings, not just order
              food. Currently targeting HSK 5.
            </p>
            <div className="space-y-3">
              {awards.map((a) => (
                <div
                  key={a.title}
                  className="flex items-start gap-4 p-4 rounded-lg border border-gray-100"
                >
                  <span
                    className="mono text-xs font-medium shrink-0 mt-0.5"
                    style={{ color: "var(--accent)" }}
                  >
                    {a.year}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{a.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{a.org}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-10">
          {/* Education */}
          <section>
            <h2 className="mono text-xs text-gray-400 uppercase tracking-widest mb-5">
              Education
            </h2>
            <div className="border border-gray-100 rounded-lg p-5">
              <p className="font-medium text-gray-900 mb-1">B.S. Data Science</p>
              <p className="text-sm text-gray-500 mb-3">University (in progress)</p>
              <div className="space-y-1">
                {["Machine Learning", "Database Systems", "Algorithms", "Statistics", "Software Engineering"].map((c) => (
                  <span
                    key={c}
                    className="mono text-xs px-2 py-0.5 rounded inline-block mr-1.5 mb-1.5"
                    style={{
                      backgroundColor: "var(--accent-muted)",
                      color: "#1d4ed8",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Now */}
          <section>
            <h2 className="mono text-xs text-gray-400 uppercase tracking-widest mb-5">
              Now
            </h2>
            <ul className="space-y-3">
              {now.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: "var(--accent)" }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Contact */}
          <section>
            <h2 className="mono text-xs text-gray-400 uppercase tracking-widest mb-5">
              Get in touch
            </h2>
            <div className="space-y-2">
              <a
                href="mailto:barnsleyc04@gmail.com"
                className="flex items-center gap-2 text-sm hover:underline underline-offset-4 transition-colors"
                style={{ color: "var(--accent)" }}
              >
                barnsleyc04@gmail.com ↗
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                LinkedIn ↗
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
