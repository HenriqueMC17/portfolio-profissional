"use client";

import { SlideUp } from "@/components/motion/slide-up";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { ArrowRight } from "lucide-react";

import Image from "next/image";
import { TextSplitReveal } from "@/components/motion/text-split-reveal";
export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-end pb-32 px-6 md:px-12 xl:px-24 overflow-hidden">
      {/* HD Background from Unsplash optimized by Next */}
      <div className="absolute inset-0 scale-105 opacity-30 mix-blend-luminosity">
        <Image 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
          alt="Abstract tech background"
          fill
          priority
          className="object-cover"
        />
      </div>
      
      {/* Cinematic Gradient Masks */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1280px]">
        <StaggerGroup staggerDelay={0.15}>
          {/* HOOK (Pré-título) */}
          <SlideUp yOffset={30}>
            <p className="font-mono text-xs sm:text-sm tracking-[0.4em] uppercase text-[#22D3EE] mb-6 font-bold">
              {"// Henrique Monteiro Cardoso"}
            </p>
          </SlideUp>

          {/* CORE STATEMENT (Grande Promessa) - Tipografia Hero Massiva (Reduzida para Legibilidade) */}
          <SlideUp yOffset={50}>
            <h1 className="font-heading text-5xl sm:text-7xl lg:text-[clamp(4.5rem,8vw,7.5rem)] font-black leading-[0.85] tracking-tighter text-white uppercase flex flex-col items-start">
              <span className="flex items-center gap-2">
                <TextSplitReveal text="Arquitetura de" wordMode={true} staggerDelay={0.08} />
              </span>
              <span className="flex items-center gap-3">
                <TextSplitReveal text="Software &" wordMode={true} staggerDelay={0.08} />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#22D3EE]">
                  <TextSplitReveal text="Design." wordMode={true} staggerDelay={0.1} />
                </span>
              </span>
            </h1>
          </SlideUp>

          {/* Subtítulo Tecnológico (Surface Glass Box minimal) */}
          <SlideUp yOffset={40}>
            <p className="mt-10 text-xl sm:text-2xl text-zinc-400 max-w-3xl font-sans font-light leading-relaxed tracking-wide">
              Desenvolvo interfaces de <strong className="text-white font-medium">alto impacto</strong> e sistemas escaláveis,
              combinando engenharia de performance com direção de arte e UX
              mobile-first.
            </p>
          </SlideUp>

          {/* CTA Group */}
          <SlideUp yOffset={30}>
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-14 w-full">
              <button aria-label="Ver Projetos no Portfólio" className="group relative inline-flex h-16 w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-white px-10 text-sm font-bold text-black uppercase tracking-wider transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-105 hover:bg-[#22D3EE] hover:text-black hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]">
                Ver Projetos
                <ArrowRight className="size-5 transition-transform duration-300 ease-out group-hover:translate-x-2" aria-hidden="true" />
              </button>

              <button aria-label="Iniciar Conversa e Contato" className="group relative inline-flex h-16 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-10 text-sm font-bold text-white uppercase tracking-wider transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/10 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                Iniciar Conversa
              </button>
            </div>
          </SlideUp>
        </StaggerGroup>
      </div>
    </section>
  );
}
