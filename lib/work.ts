
export type Job = {
  role: string;
  org: string;
  period: string;
  notes: string;
  tags?: string[]
  featured?: boolean;
  current?: boolean;
};


export const now = ["Finishing my Data Science degree",
  "Looking for positions in Boston",
  "Building this site",
  "Studying for HSK 5 (Mandarin proficiency exam)",
  "Reading: 《狂人日記》",
];

export const experience: Job[] = [
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
    current: true,
  },
  {
    role: "Undergraduate Researcher — CDC PROTECT Initiative",
    org: "The Data Mine, Purdue University",
    period: "August 2023 – December 2023",
    notes:
      "Analyzed accidental drug exposure data from the Indiana Poison Center. Built large-scale Pandas pipelines to process and clean the dataset; trained ML models in Python to predict reaction severity and symptoms based on consumed substances.",
  },
  {
    role: "Tree & Stump Removal Technician",
    org: "Roots Professional Tree and Stump Removal",
    period: "May 2023 – August 2023",
    notes:
      "Two-person autonomous crew handling residential and commercial tree and stump removals across IL and neighboring states. Managed on-site client negotiations and closed new jobs in the field.",
  },
  {
    role: "Undergraduate Researcher — XENONnT Dark Matter Experiment",
    org: "The Data Mine, Purdue University",
    period: "August 2022 – May 2023",
    notes:
      "Designed neural networks (including inception nets) to distinguish nuclear from electron recoil events in XENONnT detector data. Achieved 95.49% precision at half NR recall.",
  },
];
