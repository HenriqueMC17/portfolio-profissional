"use client";

import { motion } from "framer-motion";
import { SlideUp } from "@/components/motion/slide-up";

// Simulando logotipos de tecnologias via texto monospace para manter o estilo clean hacker.
const TECHNOLOGIES = [
  "NEXT.JS", "REACT", "TYPESCRIPT", "TAILWIND CSS", "FRAMER MOTION",
  "CONVEX", "POSTGRESQL", "NODE.JS", "GOLANG", "DOCKER", "AWS",
  "THREE.JS", "WEBGL", "FIGMA"
];

export function StackModule() {
  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden flex flex-col justify-center">
      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-6 md:px-12 xl:px-24 mb-16">
        <SlideUp yOffset={20}>
          <h2 className="font-mono text-xs tracking-[0.3em] font-bold uppercase text-[#22D3EE]">
            [ 04 — Core Stack & Capabilities ]
          </h2>
        </SlideUp>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />
        
        {/* Usando uma animação simples de CSS/Framer para rodar infinito */}
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
        >
          {/* Renderizando duas vezes para o efeito infinito perfeito */}
          {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-8 md:px-16"
            >
              <span 
                className="font-heading text-5xl md:text-7xl lg:text-9xl font-black text-transparent transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-[#22D3EE] hover:drop-shadow-[0_0_25px_rgba(34,211,238,0.6)] cursor-default"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}
              >
                {tech}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
