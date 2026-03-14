"use client";

import { SlideUp } from "@/components/motion/slide-up";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-end pb-24 px-5 md:px-12 xl:px-24">
      {/* Cinematic Gradient Mask on the background */}
      <div className="absolute inset-0 bg-gradient-to-t from-background-primary via-background-primary/40 to-transparent pointer-events-none z-0" />

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
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-12 w-full">
              <button aria-label="Ver Projetos no Portfólio" className="group relative inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-medium text-background-primary transition-all duration-300 ease-out hover:scale-105 hover:bg-cyber-cyan hover:shadow-[0_0_30px_rgba(57,208,255,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary">
                Ver Projetos
                <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" aria-hidden="true" />
              </button>

              <button aria-label="Iniciar Conversa e Contato" className="group relative inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-[24px] border border-white/10 bg-surface-glass backdrop-blur-[15px] px-8 text-sm font-medium text-white transition-all duration-300 ease-out hover:bg-white/10 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary">
                Iniciar Conversa
              </button>
            </div>
          </SlideUp>
        </StaggerGroup>
      </div>
    </section>
  );
}
