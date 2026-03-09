"use client";

import { SlideUp } from "@/components/motion/slide-up";
import { ArrowUpRight } from "lucide-react";

export function FooterModule() {
  return (
    <footer className="relative bg-[#05070a] pt-32 pb-12 px-5 md:px-12 xl:px-24 mt-24 rounded-t-[4rem] border-t border-white/5 overflow-hidden">
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <SlideUp yOffset={40}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
            
            <div className="max-w-2xl">
              <h2 className="font-heading text-4xl md:text-6xl text-white font-bold leading-tight mb-6">
                Pronto para <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-white">
                  elevar sua marca?
                </span>
              </h2>
              <div className="flex items-center gap-4 text-text-muted">
                {/* Blinking Dot SVG */}
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cobalt-blue opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cobalt-blue"></span>
                </div>
                <span className="font-mono text-sm tracking-widest uppercase">
                  Available for new challenges
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <a href="mailto:contato@henriquemonteiro.com.br" aria-label="Enviar e-mail para contato" className="group flex items-center gap-3 text-xl font-medium text-white hover:text-cyber-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070a] rounded-xl px-2 py-1 transition-all">
                Vamos conversar
                <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
              </a>
              <div className="flex gap-6 mt-4 md:mt-0 px-2">
                <a href="#" aria-label="Visitar perfil no LinkedIn" className="text-text-muted hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded transition-colors">LinkedIn</a>
                <a href="#" aria-label="Visitar perfil no GitHub" className="text-text-muted hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded transition-colors">GitHub</a>
                <a href="#" aria-label="Visitar perfil no Twitter" className="text-text-muted hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded transition-colors">Twitter</a>
              </div>
            </div>

          </div>
        </SlideUp>

        <SlideUp yOffset={20} delay={0.2}>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted font-mono">
            <p>
              © {new Date().getFullYear()} Henrique Monteiro Cardoso. All rights reserved.
            </p>
            <p className="flex items-center gap-2">
              <span>Engineered with Next.js & Framer Motion</span>
            </p>
          </div>
        </SlideUp>
      </div>
    </footer>
  );
}
