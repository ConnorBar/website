import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { projects } from "@/lib/projects";
import { getProjectContent } from "@/lib/projects-content";
import { ProjectsList } from "@/components/ProjectsList";
import { ProjectModal } from "@/components/ProjectModal";
import { mdxComponents } from "@/components/mdx/components";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | Connor Barnsley`,
    description: project.short_desc ?? project.description,
  };
}

export default async function ProjectSlugPage({ params }: Props) {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const contentData = getProjectContent(slug);
  if (!contentData) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const prevSlug = projects[idx - 1]?.slug ?? null;
  const nextSlug = projects[idx + 1]?.slug ?? null;

  return (
    <>
      <ProjectsList />
      <ProjectModal
        title={project.title}
        tags={project.tags}
        github={project.github}
        demo={project.demo}
        prevSlug={prevSlug}
        nextSlug={nextSlug}
      >
        <MDXRemote source={contentData.content} components={mdxComponents} />
      </ProjectModal>
    </>
  );
}
