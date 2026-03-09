"use client";

import { SlideUp } from "@/components/motion/slide-up";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-end pb-24 px-5 md:px-12 xl:px-24">
      {/* Cinematic Gradient Mask on the background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/40 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1280px]">
        <StaggerGroup staggerDelay={0.15}>
          {/* HOOK (Pré-título) */}
          <SlideUp yOffset={30}>
            <p className="font-mono text-[11px] sm:text-xs tracking-[0.3em] uppercase text-cyber-cyan mb-6">
              {"// Henrique Monteiro Cardoso"}
            </p>
          </SlideUp>

          {/* CORE STATEMENT (Grande Promessa) - Tipografia Hero Massiva */}
          <SlideUp yOffset={50}>
            <h1 className="font-heading text-5xl sm:text-7xl lg:text-[clamp(5rem,8vw,8rem)] font-bold leading-[0.9] tracking-tighter text-white">
              Arquitetura de <br className="hidden md:block" />
              Software &{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-cobalt-blue to-cyber-cyan">
                Design.
              </span>
            </h1>
          </SlideUp>

          {/* Subtítulo Tecnológico (Surface Glass Box minimal) */}
          <SlideUp yOffset={40}>
            <p className="mt-8 text-lg sm:text-xl text-text-secondary max-w-2xl font-sans font-light leading-relaxed">
              Desenvolvo interfaces de alto impacto e sistemas escaláveis,
              combinando engenharia de performance com direção de arte e UX
              mobile-first.
            </p>
          </SlideUp>

          {/* CTA Group */}
          <SlideUp yOffset={30}>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-12">
              <button aria-label="Ver Projetos no Portfólio" className="group relative inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-medium text-[#05070a] transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070a]">
                Ver Projetos
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>

              <button aria-label="Iniciar Conversa e Contato" className="group relative inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-border-soft bg-surface-glass px-8 text-sm font-medium text-white transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070a]">
                Iniciar Conversa
              </button>
            </div>
          </SlideUp>
        </StaggerGroup>
      </div>
    </section>
  );
}
