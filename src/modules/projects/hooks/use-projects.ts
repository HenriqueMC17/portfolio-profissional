import { useQuery } from "convex/react";
import { z } from "zod";
import { api } from "../../../../convex/_generated/api";
import { ProjectSchema, ProjectEntity } from "../../../core/domain/entities/project.entity";

/**
 * ⚙️ APPLICATION LAYER (Feature Sliced Design)
 * Orquestra a lógica de obtenção de projetos e aplica o Socratic Gate de Fail Fast.
 */

export function useFeaturedProjects(): { projects: ProjectEntity[]; isLoading: boolean; error: Error | null } {
  // Chamada de infraestrutura abstraída
  const data = useQuery(api.projects.getFeatured);

  // Fail Fast & Guard Clause: Estado de carregamento
  if (data === undefined) {
    return { projects: [], isLoading: true, error: null };
  }

  // Validação em Tempo de Execução (Sem Mágica)
  // Se o Convex retornar algo que quebre o contrato do Domínio, a aplicação não explode
  // em tela branca de erro React, mas captura o erro elegantemente.
  try {
    const validProjects = z.array(ProjectSchema).parse(data);
    return { projects: validProjects, isLoading: false, error: null };
  } catch (error) {
    console.error("🚨 Quebra de contrato de domínio (Zod Validation Failed):", error);
    // Resiliência em produção conforme 01-coding-standards.md
    return { projects: [], isLoading: false, error: error instanceof Error ? error : new Error("Unknown Error") };
  }
}