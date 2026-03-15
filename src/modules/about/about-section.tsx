"use client";

import { SlideUp } from "@/components/motion/slide-up";

export function AboutModule() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-6 md:px-12 xl:px-24 border-t border-white/5 bg-black overflow-hidden">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none" style={{ backgroundImage: "url('/noise.svg')" }} />

      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          <div className="lg:col-span-4">
            <SlideUp yOffset={20}>
              <h2 className="font-mono text-xs tracking-[0.3em] font-bold uppercase text-[#22D3EE] mb-4">
                [ 01 — Manifesto ]
              </h2>
              <h3 className="font-heading text-4xl md:text-6xl text-white font-black leading-tight tracking-tighter uppercase">
                Filosofia &<br />Engenharia.
              </h3>
            </SlideUp>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-10">
            <SlideUp yOffset={30} delay={0.1}>
              <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
                &quot;O modelo antigo foca em:&quot; <br />
                Páginas estáticas genéricas e acoplamento frágil construído sem pensar no futuro da aplicação. Interfaces comuns que não convertem ou comunicam sofisticação.
              </p>
            </SlideUp>

            <SlideUp yOffset={30} delay={0.2}>
              <p className="text-2xl md:text-5xl text-white font-serif italic leading-tight">
                &quot;A nossa missão converge para arquiteturas escaláveis e <span className="text-[#2563EB] not-italic font-bold font-heading uppercase tracking-tighter">design impulsionado.</span>&quot;
              </p>
            </SlideUp>

            <SlideUp yOffset={30} delay={0.3}>
              <div className="flex flex-col gap-6 mt-4">
                <p className="text-lg text-zinc-400 leading-relaxed font-light">
                  Trato cada produto digital como uma obra de arte viva. Utilizo tecnologias do mercado (Next.js, React, Tailwind, Convex) para construir plataformas rápidas e resilientes, enquanto injeto Motion Design fluido com Framer Motion.
                </p>
                <p className="text-lg text-zinc-300 leading-relaxed font-medium">
                  Não é apenas código. É engenharia de experiência.
                </p>
              </div>
            </SlideUp>
          </div>
          
        </div>
      </div>
    </section>
  );
}
