import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import ProjectDetail from "@/components/sections/ProjectDetail";
import { mshot } from "@/lib/mshot";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  const title = `${project.name} — Joshua Mmbando`;
  const ogImage = mshot(project.liveUrl, 1200, 630);

  return {
    title,
    description: project.description,
    openGraph: {
      title,
      description: project.description,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${project.name} — live preview` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
      images: [ogImage],
    },
  };
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
