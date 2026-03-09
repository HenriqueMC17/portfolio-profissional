"use client";

import { SlideUp } from "@/components/motion/slide-up";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { ArrowRight, Github, ExternalLink } from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "Plataforma de IA Generativa",
    description: "Sistema SaaS B2B para geração de conteúdo em larga escala. Arquitetura serverless utilizando Next.js App Router e OpenAI embeddings.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "Supabase", "OpenAI"],
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Gateway de Pagamentos Fintech",
    description: "Microsserviço de alta disponibilidade capaz de processar 1k+ transações por segundo com Go, gRPC e integração bancária direta.",
    tags: ["Golang", "gRPC", "PostgreSQL", "Kafka", "Docker"],
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Dashboard de Dados em Tempo Real",
    description: "Painel de telemetria IoT com websockets bidirecionais, otimizado para não bloquear a thread principal em alto volume de throughput.",
    tags: ["React", "Zustand", "Framer Motion", "WebSockets"],
    link: "#",
    github: "#",
  }
];

export function ProjectsModule() {
  return (
    <section id="projects" className="relative py-24 md:py-32 px-5 md:px-12 xl:px-24 bg-[#05070a]">
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <SlideUp yOffset={20}>
          <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-text-muted mb-4">
            [ 02 — Work ]
          </h2>
          <h3 className="font-heading text-3xl md:text-5xl text-white font-bold mb-16">
            Projetos Selecionados
          </h3>
        </SlideUp>

        <StaggerGroup staggerDelay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {PROJECTS.map((project) => (
              <SlideUp key={project.id} yOffset={30}>
                {/* Cartão de Projetos com Background Glow sutil e estilo Glass */}
                <div className="group relative flex flex-col h-full bg-surface-glass border border-white/5 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:border-cyber-cyan/30 hover:bg-white/[0.03]">
                  {/* Subtle Glow on hover - using CSS approach inside Next */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/0 to-cobalt-blue/0 group-hover:from-cyber-cyan/10 group-hover:to-cobalt-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <h4 className="text-xl md:text-2xl font-bold text-white mb-4 relative z-10">
                    {project.title}
                  </h4>
                  <p className="text-text-secondary leading-relaxed mb-8 flex-grow relative z-10">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-xs font-mono text-text-muted bg-white/5 border border-white/5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-auto relative z-10">
                    <button className="flex items-center gap-2 text-sm font-medium text-white hover:text-cyber-cyan transition-colors">
                      <ExternalLink className="size-4" /> Live Demo
                    </button>
                    <button className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-white transition-colors">
                      <Github className="size-4" /> Source
                    </button>
                  </div>
                </div>
              </SlideUp>
            ))}
          </div>
        </StaggerGroup>

        <SlideUp yOffset={20}>
          <div className="mt-16 flex justify-center">
            <button className="group relative inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border-soft bg-transparent px-8 text-sm font-medium text-white transition-all hover:bg-white/5">
              Ver Arquivo Completo
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
