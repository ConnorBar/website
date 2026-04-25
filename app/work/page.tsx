import type { Metadata } from "next";
import Image from "next/image";


export const metadata: Metadata = {
  title: "About | Connor Barnsley",
  description: "A bit about Connor Barnsley — data scientist, engineer, Mandarin learner, traveler.",
};

const experience = [
  {
    role: "Data Engineer Intern",
    org: "US Space Force — Space Launch Delta 45, The Forge",
    period: "June 2025 – August 2026",
    notes:
      "Designed a modular ETL pipeline framework consolidating 9+ ingestion scripts into a configurable scheduled system. Implemented Slowly Changing Dimension upserts with content-hash deduplication in PostgreSQL; added logging, centralized configs, Docker, and tests. Integrated Warpcore API ingestion and analyzed existing Envision/Warpcore data flows to support pipeline integration.",
  },
  {
    role: "Full Stack Engineer Intern",
    org: "Stealth Startup",
    period: "June 2024 – May 2025",
    notes:
      "Built an interactive graph to model dynamic workload requests for EC2 VMs with comparative pricing analysis across cloud providers. Developed a dockerized microservice with secure API routing between dashboard and optimizer components. Refactored genetic algorithm control flow for seamless front-end integration.",
  },
  {
    role: "Head Teaching Assistant — The Data Mine",
    org: "Purdue University",
    period: "August 2023 – Present",
    notes:
      "Led weekly team meetings and coordinated operations across 7 course sections serving 2,400+ students. Designed curriculum for upper-level ML and introductory data analytics courses; created and taught a data analytics bootcamp for 20+ students. Promoted from Grading TA to Administrative Head TA.",
  },
];

const now = [
  "Finishing my Data Science degree",
  "Looking for positions in Boston",
  "Building this site",
  "Studying for HSK 5 (Mandarin proficiency exam)",
  "Reading: 《狂人日記》",
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-16">
        <p className="mono text-sm mb-3" style={{ color: "var(--accent)" }}>
          // work
        </p>
        {/* Float photo right — text wraps around it regardless of photo size */}
        <div className="float-right ml-8 mb-4">
          <Image
            src="/images/headshot.jpg"
            alt="Connor Barnsley"
            width={250}
            height={280}
            className="rounded-full border-2 border-gray-100"
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
          />
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-6">
          Hi, I&apos;m Connor.
        </h1>
        <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
          <p>
            I&apos;m a Data Science student focused on the engineering side — building
            reliable data pipelines, training ML models end-to-end, and designing systems
            that hold up under real-world constraints. My work spans reinforcement learning,
            multimodal ML, and data infrastructure.
          </p>
          <p>
            I&apos;m drawn to the defense space because of where I come from. I was raised
            in a military household — my father spent 12 years as a navigator before
            spending the last 24 at the 618th AOC as a flight manager, and my mother served
            active duty for 6 years before retiring as a Lt. Colonel after 22 years in the
            AMC PA reserves. Serving in some capacity has always felt less like a choice and
            more like a direction, and building tools that matter in high-stakes environments
            is where I want to put my work.

          </p>



        </div>
        <div className="clear-both" />
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

        </div>

        {/* Right column */}
        <div className="space-y-10">
          {/* Education */}
          <section>
            <h2 className="mono text-xs text-gray-400 uppercase tracking-widest mb-5">
              Education
            </h2>
            <div className="border border-gray-100 rounded-lg p-5">
              <p className="font-medium text-gray-900 mb-0.5">B.S. Data Science</p>
              <p className="text-xs text-gray-400 mono mb-1">Minor in Chinese &amp; Computer Science</p>
              <p className="text-sm text-gray-500 mb-3">Purdue University · May 2026</p>
              <div className="space-y-1">
                {["Machine Learning", "Data Mining", "Algorithms", "Database Systems", "Software Engineering"].map((c) => (
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
            <div className="flex items-center gap-2 mt-3 px-1">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: "#16a34a" }}
              />
              <span className="mono text-xs text-gray-500">Active T3 Secret Security Clearance</span>
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
                href="mailto:ctbarnsley@icloud.com"
                className="flex items-center gap-2 text-sm hover:underline underline-offset-4 transition-colors"
                style={{ color: "var(--accent)" }}
              >
                ctbarnsley@icloud.com ↗
              </a>
              <a
                href="https://github.com/ConnorBar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com/in/connor-barnsley"
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
