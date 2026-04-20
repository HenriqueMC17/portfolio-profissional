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

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-secondary/50 border border-white/5 backdrop-blur-sm p-6 hover:border-primary-500/50 transition-colors"
    >
      <div className="relative h-48 w-full overflow-hidden rounded-lg mb-6">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 hover:bg-primary-600 rounded-full backdrop-blur-md transition-colors"
            >
              <Github className="w-6 h-6 text-white" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 hover:bg-primary-600 rounded-full backdrop-blur-md transition-colors"
            >
              <ExternalLink className="w-6 h-6 text-white" />
            </a>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-muted-foreground line-clamp-3 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full bg-primary-900/30 text-primary-300 border border-primary-800/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
