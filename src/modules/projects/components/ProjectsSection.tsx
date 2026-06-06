"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { ProjectCard, ProjectCardSkeleton } from "./ProjectCard";
import { motion } from "framer-motion";
import { ProjectEntity } from "@/core/domain/entities/project.entity";

interface ProjectsSectionProps {
  dict: {
    sectionTitle: string;
    title: string;
    subtitle: string;
    loading: string;
    comingSoon: string;
    viewCode: string;
    viewDemo: string;
  };
}

export function ProjectsSection({ dict }: ProjectsSectionProps) {
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
          {dict.sectionTitle}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          {dict.title}
        </h2>
        <p className="text-white/45 max-w-2xl text-lg leading-relaxed">
          {dict.subtitle}
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
            <ProjectCard
              key={project._id}
              project={project}
              index={idx}
              viewCode={dict.viewCode}
              viewDemo={dict.viewDemo}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-20 gap-4">
          <div className="w-16 h-16 rounded-full bg-white/3 border border-white/6 flex items-center justify-center">
            <span className="text-2xl" aria-hidden="true">💡</span>
          </div>
          <p className="text-white/30 text-sm">
            {dict.comingSoon}
          </p>
        </div>
      )}
    </section>
  );
}