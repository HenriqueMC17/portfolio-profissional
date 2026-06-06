"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface AboutHorizontalScrollProps {
  dict: {
    sectionTitle: string;
    title: string;
    statements: string[];
  };
}

export function AboutHorizontalScroll({ dict }: AboutHorizontalScrollProps) {
  const containerRef = useRef<HTMLElement>(null);
  
  // Track scroll position of this section relative to viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map vertical scroll progress to horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ["20%", "-60%"]);
  const smoothX = useSpring(x, { stiffness: 80, damping: 25 });

  return (
    <section ref={containerRef} className="relative py-20 md:py-32 overflow-hidden w-full">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-12 text-left"
      >
        <span className="text-xs font-semibold tracking-widest text-primary-400/80 uppercase mb-4 block">
          {dict.sectionTitle}
        </span>
        <h2 className="text-3xl md:text-5xl font-light italic text-white/90">
          {dict.title}
        </h2>
      </motion.div>

      {/* Horizontal Scroll Text Track */}
      <div className="relative flex items-center overflow-hidden py-6 w-full">
        <motion.div style={{ x: smoothX }} className="flex gap-16 md:gap-24 whitespace-nowrap will-change-transform">
          {dict.statements.map((statement, index) => (
            <p
              key={index}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight select-none"
              style={{
                WebkitTextStroke: index % 2 === 0 ? "none" : "1px rgba(255,255,255,0.2)",
                color: index % 2 === 0 ? "rgba(255,255,255,0.85)" : "transparent",
              }}
            >
              {statement}
            </p>
          ))}
        </motion.div>
      </div>

      {/* Subtle border line below */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent origin-left"
      />
    </section>
  );
}
