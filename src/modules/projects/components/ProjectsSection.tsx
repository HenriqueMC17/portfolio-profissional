"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { ProjectCard, ProjectCardSkeleton } from "./ProjectCard";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ProjectEntity } from "@/core/domain/entities/project.entity";
import { useState, useRef, useEffect } from "react";
import { LayoutGrid, List, Github, ExternalLink } from "lucide-react";
import Image from "next/image";

interface ProjectsSectionProps {
  dict: {
    sectionTitle: string;
    title: string;
    subtitle: string;
    loading: string;
    comingSoon: string;
    viewCode: string;
    viewDemo: string;
    toggleGrid?: string;
    toggleList?: string;
  };
}

export function ProjectsSection({ dict }: ProjectsSectionProps) {
  const projects = useQuery(api.projects.getFeatured);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  // Force grid on mobile screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setLayout("grid");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridText = dict.toggleGrid || "Grid";
  const listText = dict.toggleList || "List";

  return (
    <section id="projects" className="w-full py-24 md:py-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start text-left max-w-2xl"
        >
          <span className="text-xs font-semibold tracking-widest text-primary-400/80 uppercase mb-4">
            {dict.sectionTitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {dict.title}
          </h2>
          <p className="text-white/45 text-lg leading-relaxed">
            {dict.subtitle}
          </p>
        </motion.div>

        {/* Layout Switcher - Only visible on desktop/md+ */}
        {projects && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden md:inline-flex items-center gap-1 p-1 border border-white/8 bg-surface-l1/80 rounded-full backdrop-blur-sm self-end"
          >
            <button
              onClick={() => setLayout("grid")}
              data-cursor-hover
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                layout === "grid"
                  ? "bg-white/10 text-white"
                  : "text-white/45 hover:text-white/80"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{gridText}</span>
            </button>
            <button
              onClick={() => setLayout("list")}
              data-cursor-hover
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                layout === "list"
                  ? "bg-white/10 text-white"
                  : "text-white/45 hover:text-white/80"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>{listText}</span>
            </button>
          </motion.div>
        )}
      </div>

      {projects === undefined ? (
        // Skeleton loading state
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : projects && projects.length > 0 ? (
        layout === "grid" ? (
          // Grid layout
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
          // List/Gallery layout
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full max-w-7xl mx-auto flex flex-col border-b border-white/10"
          >
            {projects.map((project: ProjectEntity, idx: number) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="relative border-t border-white/10 py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 group transition-colors duration-300"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6 flex-1">
                  {/* Year or Number index */}
                  <span className="font-mono text-xs text-primary-400/80 tracking-widest">
                    0{idx + 1}
                  </span>

                  {/* Title & Description */}
                  <div className="flex flex-col gap-1.5 max-w-xl">
                    <motion.h3
                      className="text-2xl md:text-3xl font-bold text-white group-hover:text-white/70 transition-colors"
                      animate={{
                        x: hoveredIndex === idx ? 12 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {project.title}
                    </motion.h3>
                    <p className="text-sm text-white/45 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 max-w-xs md:justify-end">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-[10px] font-mono rounded-full bg-white/3 text-white/50 border border-white/5 whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 md:pl-6">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-hover
                      className="p-2 bg-white/5 hover:bg-white/10 border border-white/8 text-white rounded-full transition-colors cursor-pointer"
                      title={dict.viewCode}
                      aria-label={`${dict.viewCode} - ${project.title}`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-hover
                      className="p-2 bg-primary-500/10 hover:bg-primary-500/20 border border-primary-500/20 text-primary-400 rounded-full transition-colors cursor-pointer"
                      title={dict.viewDemo}
                      aria-label={`${dict.viewDemo} - ${project.title}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Floating Easing Image Container */}
            <motion.div
              className="absolute pointer-events-none z-55 w-64 h-40 md:w-80 md:h-48 overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-black/80"
              style={{
                x: springX,
                y: springY,
                translateX: "-50%",
                translateY: "-110%",
              }}
              animate={{
                opacity: hoveredIndex !== null ? 1 : 0,
                scale: hoveredIndex !== null ? 1 : 0.85,
              }}
              transition={{ duration: 0.2 }}
            >
              {hoveredIndex !== null && (
                <div className="relative w-full h-full">
                  <Image
                    src={projects[hoveredIndex].imageUrl}
                    alt={projects[hoveredIndex].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover"
                    style={{
                      filter: "grayscale(25%) contrast(1.05)",
                    }}
                  />
                  {/* Overlay blend tint */}
                  <div className="absolute inset-0 bg-primary-600/10 mix-blend-overlay" />
                </div>
              )}
            </motion.div>
          </div>
        )
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