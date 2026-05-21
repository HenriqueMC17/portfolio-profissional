import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  tags: string[];
}

function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl bg-white/[0.02] border border-white/[0.05] p-6 overflow-hidden animate-pulse">
      <div className="h-48 w-full rounded-xl bg-white/[0.04] mb-6" />
      <div className="h-5 w-3/4 rounded-md bg-white/[0.04] mb-3" />
      <div className="h-3 w-full rounded-md bg-white/[0.03] mb-1.5" />
      <div className="h-3 w-5/6 rounded-md bg-white/[0.03] mb-6" />
      <div className="flex gap-2">
        <div className="h-5 w-16 rounded-full bg-white/[0.04]" />
        <div className="h-5 w-20 rounded-full bg-white/[0.04]" />
        <div className="h-5 w-14 rounded-full bg-white/[0.04]" />
      </div>
    </div>
  );
}

export { ProjectCardSkeleton };

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white/[0.025] border border-white/[0.06] backdrop-blur-sm hover:border-primary-500/40 hover:bg-white/[0.04] transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay with links on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start gap-3 p-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors text-white text-xs font-medium"
              aria-label={`GitHub repository for ${project.title}`}
            >
              <Github className="w-3.5 h-3.5" aria-hidden="true" />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-600/80 hover:bg-primary-600 rounded-full backdrop-blur-md transition-colors text-white text-xs font-medium"
              aria-label={`Live demo of ${project.title}`}
            >
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              Live Demo
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-lg font-bold text-white group-hover:text-primary-300 transition-colors mb-2 leading-snug">
          {project.title}
        </h3>
        <p className="text-sm text-white/45 leading-relaxed line-clamp-3 mb-5 flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-primary-900/25 text-primary-300/80 border border-primary-800/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
