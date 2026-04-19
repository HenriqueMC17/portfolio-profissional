import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Project } from "../../../core/domain/entities/project.entity";

interface ProjectCardProps {
  project: Project;
}

/**
 * 🎨 UI LAYER - UI-UX-Pro-Max Engine
 * Componente estrito de apresentação. Regras aplicadas:
 * 1. Zero CLS (next/image com proporção fixa)
 * 2. Acessibilidade (HTML Semântico, aria-labels para leitores de tela)
 * 3. Micro-interações (Framer Motion na rolagem e hover)
 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm transition-colors hover:border-zinc-700/50"
    >
      {/* Imagem Otimizada com skeleton de fallback (LCP Otimizado) */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
        <Image
          src={project.imageUrl}
          alt={`Capa visual do projeto: ${project.title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {project.featured && (
          <div className="absolute top-4 right-4 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 backdrop-blur-md border border-emerald-500/20">
            Destaque
          </div>
        )}
      </div>

      {/* Conteúdo Semântico */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-zinc-100 mb-2 tracking-tight">
          {project.title}
        </h3>
        <p className="text-sm text-zinc-400 mb-6 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        <ul className="flex flex-wrap gap-2 mb-6 mt-auto" aria-label="Tecnologias utilizadas">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-md bg-zinc-800/40 border border-zinc-700/40 px-2.5 py-1 text-xs font-medium text-zinc-300">
              {tag}
            </li>
          ))}
        </ul>

        {/* Footer / Ações com navegação focável para teclado (a11y) */}
        <div className="flex items-center gap-4 pt-5 border-t border-zinc-800/50">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md ring-offset-zinc-900" aria-label={`Ver código-fonte do projeto ${project.title} no GitHub`}>
              <Github className="h-4 w-4" />
              <span>Repositório</span>
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md ring-offset-zinc-900" aria-label={`Acessar projeto ${project.title} em ambiente de produção`}>
              <ExternalLink className="h-4 w-4" />
              <span>Acessar Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}