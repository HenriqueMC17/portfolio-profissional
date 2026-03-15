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
    <section id="projects" className="relative py-32 md:py-48 px-6 md:px-12 xl:px-24">
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <SlideUp yOffset={20}>
          <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-[#22D3EE] mb-4 font-bold">
            [ 02 — Work ]
          </h2>
          <h3 className="font-heading text-4xl md:text-6xl text-white font-black mb-20 uppercase tracking-tighter">
            Projetos Selecionados
          </h3>
        </SlideUp>

        <StaggerGroup staggerDelay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {PROJECTS.map((project) => (
              <SlideUp key={project.id} yOffset={30}>
                {/* Cartão de Projetos com Background Glow sutil e estilo Glass */}
                <div className="group relative flex flex-col h-full bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-2 hover:border-[#22D3EE]/30 hover:bg-white/[0.04] hover:shadow-[0_10px_40px_-10px_rgba(34,211,238,0.15)]">
                  {/* Subtle Glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#22D3EE]/0 to-[#2563EB]/0 group-hover:from-[#22D3EE]/10 group-hover:to-[#2563EB]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <h4 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4 relative z-10 tracking-tight">
                    {project.title}
                  </h4>
                  <p className="text-zinc-400 font-sans font-light leading-relaxed mb-10 flex-grow relative z-10">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10 relative z-10">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 text-[10px] sm:text-xs font-mono font-medium text-zinc-300 bg-white/5 border border-white/10 rounded-full uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 mt-auto relative z-10">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Ver a demonstração ao vivo do projeto ${project.title}`} className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider transition-all duration-300 ease-out hover:text-[#22D3EE]">
                      <ExternalLink className="size-4" /> Live Demo
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`Ver o código base do projeto ${project.title} no Github`} className="flex items-center gap-2 text-sm font-bold text-zinc-500 uppercase tracking-wider transition-all duration-300 ease-out hover:text-white">
                      <Github className="size-4" /> Source
                    </a>
                  </div>
                </div>
              </SlideUp>
            ))}
          </div>
        </StaggerGroup>

        <SlideUp yOffset={20}>
          <div className="mt-20 flex justify-center">
            <button className="group relative inline-flex h-14 items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-10 text-sm font-bold text-white uppercase tracking-wider transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/10 hover:border-white/30 hover:scale-105">
              Ver Arquivo Completo
              <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-2" />
            </button>
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
