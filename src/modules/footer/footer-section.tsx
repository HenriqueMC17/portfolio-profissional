"use client";

import { SlideUp } from "@/components/motion/slide-up";
import { ArrowUpRight } from "lucide-react";

export function FooterModule() {
  return (
    <footer className="relative bg-[#050505] pt-32 pb-12 px-6 md:px-12 xl:px-24 mt-24 rounded-t-[4rem] border-t border-white/5 overflow-hidden">
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <SlideUp yOffset={40}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
            
            <div className="max-w-2xl">
              <h2 className="font-heading text-5xl md:text-7xl text-white font-black leading-tight mb-6 tracking-tighter uppercase">
                Pronto para <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] to-[#2563EB]">
                  elevar sua marca?
                </span>
              </h2>
              <div className="flex items-center gap-4 text-zinc-400">
                {/* Blinking Dot SVG */}
                <div className="relative flex h-3 w-3">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22D3EE] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#22D3EE]"></span>
                </div>
                <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#22D3EE]">
                  Available for new challenges
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <a href="mailto:hmonteiro.hc@gmail.com" aria-label="Enviar e-mail para contato" className="group flex items-center justify-center gap-3 text-sm font-bold tracking-widest uppercase bg-white text-black hover:bg-[#22D3EE] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full px-8 py-4 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                Vamos conversar
                <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
              </a>
              <div className="flex justify-center md:justify-end gap-6 px-2 font-mono text-xs uppercase tracking-widest font-bold">
                <a href="https://www.linkedin.com/in/henrique-monteiro-cardoso-ba3716229/" target="_blank" rel="noopener noreferrer" aria-label="Visitar perfil no LinkedIn" className="text-zinc-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded transition-colors duration-300">LinkedIn</a>
                <a href="https://github.com/HenriqueMC17" target="_blank" rel="noopener noreferrer" aria-label="Visitar perfil no GitHub" className="text-zinc-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded transition-colors duration-300">GitHub</a>
                <a href="http://wa.me/15988027261" target="_blank" rel="noopener noreferrer" aria-label="Chamar no WhatsApp" className="text-zinc-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded transition-colors duration-300">WhatsApp</a>
              </div>
            </div>

          </div>
        </SlideUp>

        <SlideUp yOffset={20} delay={0.2}>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wider text-zinc-500 font-mono">
            <p>
              © {new Date().getFullYear()} Henrique Monteiro Cardoso. All rights reserved.
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#2563EB]">Engineered with</span> Next.js & Framer Motion
            </p>
          </div>
        </SlideUp>
      </div>
    </footer>
  );
}
