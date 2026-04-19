"use client";

import { useFeaturedProjects } from "../model/use-projects";
import { ProjectCard } from "./project-card";

/**
 * 🧩 UI LAYER (Smart Component)
 * Lida de forma resiliente com o ciclo de vida dos dados injetados pela Application Layer.
 */
export function ProjectList() {
  // Consumo abstrato (Não sabe que é Convex por baixo, apenas entende o Domínio)
  const { projects, isLoading, error } = useFeaturedProjects();

  // 1. Estado de Carregamento (Skeleton moderno)
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse" aria-busy="true">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[420px] rounded-2xl bg-zinc-800/30 border border-zinc-800/50" />
        ))}
      </div>
    );
  }

  // 2. Fail Fast graceful recovery (Tratamento de erro visível mas silencioso pro sistema)
  if (error) {
    return (
      <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-400 text-sm text-center">
        <p>Não foi possível carregar os projetos no momento. A equipe já foi notificada.</p>
      </div>
    );
  }

  // 3. Empty State Elegante
  if (projects.length === 0) {
    return (
      <div className="p-12 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 text-zinc-500 text-center border-dashed">
        <p>Nenhum projeto em destaque encontrado no momento. Volte em breve!</p>
      </div>
    );
  }

  // 4. Renderização do Domínio Otimizado
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}