import type { Metadata } from "next";
import { ProjectsList } from "@/components/ProjectsList";

export const metadata: Metadata = {
  title: "Projects | Connor Barnsley",
  description: "Software and data science projects by Connor Barnsley.",
};

export default function ProjectsPage() {
  return <ProjectsList />;
}
