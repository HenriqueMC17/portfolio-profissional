"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { ProjectCard } from "./ProjectCard";

import { ProjectEntity } from "../../../../core/domain/entities/project.entity";

export function ProjectsSection({ isPt }: { isPt: boolean }) {
  const projects = useQuery(api.projects.getFeatured);

  return (
    <section id="projects" className="w-full py-24 md:py-32">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          {isPt ? "Projetos em Destaque" : "Featured Projects"}
        </h2>
        <p className="text-muted-foreground max-w-2xl text-lg">
          {isPt
            ? "Uma seleção dos meus projetos de maior impacto, combinando design moderno com arquitetura robusta."
            : "A selection of my most impactful projects, combining modern design with robust architecture."}
        </p>
      </div>

      {projects === undefined ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
          {projects.map((project: ProjectEntity, idx: number) => (
            <ProjectCard key={project._id} project={project} index={idx} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          {isPt ? "Nenhum projeto encontrado." : "No projects found."}
        </div>
      )}
    </section>
  );
}
