"use client";

import { motion } from "framer-motion";
import { SlideUp } from "@/components/motion/slide-up";

// Simulando logotipos de tecnologias via texto monospace para manter o estilo clean hacker.
const TECHNOLOGIES = [
  "NEXT.JS", "REACT", "TYPESCRIPT", "TAILWIND CSS", "FRAMER MOTION",
  "SUPABASE", "POSTGRESQL", "NODE.JS", "GOLANG", "DOCKER", "AWS",
  "THREE.JS", "WEBGL", "FIGMA"
];

export function StackModule() {
  return (
    <section className="relative py-16 md:py-24 bg-background-primary border-t border-white/5 overflow-hidden">
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-12 xl:px-24 mb-12">
        <SlideUp yOffset={20}>
          <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-text-muted">
            [ Core Stack & Capabilities ]
          </h2>
        </SlideUp>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-background-primary via-transparent to-background-primary z-10 pointer-events-none" />
        
        {/* Usando uma animação simples de CSS/Framer para rodar infinito */}
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
        >
          {/* Renderizando duas vezes para o efeito infinito perfeito */}
          {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-8 md:px-12"
            >
              <span className="font-heading text-4xl md:text-6xl lg:text-8xl font-black text-transparent text-stroke-white opacity-20 hover:opacity-100 hover:text-white transition-opacity duration-300">
                {tech}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
