"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { ProjectCard, ProjectCardSkeleton } from "./ProjectCard";
import { motion } from "framer-motion";
import { ProjectEntity } from "../../../../core/domain/entities/project.entity";

export function ProjectsSection({ isPt }: { isPt: boolean }) {
  const projects = useQuery(api.projects.getFeatured);

  return (
    <section id="projects" className="w-full py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-14 text-center"
      >
        <span className="text-xs font-semibold tracking-widest text-primary-400/80 uppercase mb-4">
          {isPt ? "Portfólio" : "Portfolio"}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          {isPt ? "Projetos em Destaque" : "Featured Projects"}
        </h2>
        <p className="text-white/45 max-w-2xl text-lg leading-relaxed">
          {isPt
            ? "Uma seleção dos meus projetos de maior impacto, combinando design moderno com arquitetura robusta."
            : "A selection of my most impactful projects, combining modern design with robust architecture."}
        </p>
      </motion.div>

      {projects === undefined ? (
        // Skeleton loading state
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
          {projects.map((project: ProjectEntity, idx: number) => (
            <ProjectCard key={project._id} project={project} index={idx} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-20 gap-4">
          <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
            <span className="text-2xl" aria-hidden="true">🚀</span>
          </div>
          <p className="text-white/30 text-sm">
            {isPt ? "Projetos chegando em breve." : "Projects coming soon."}
          </p>
        </div>
      )}
    </section>
  );
}
