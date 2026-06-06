"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HeroSectionProps {
  dict: {
    statusBadge: string;
    headlineLine1: string;
    headlineLine2: string;
    subheadline: string;
    viewProjects: string;
    getInTouch: string;
    scroll: string;
  };
}

const TECH_TAGS = ["Next.js 16", "TypeScript", "Node.js", "Convex", "AI/LLMs", "Cloud"];

export function HeroSection({ dict }: HeroSectionProps) {
  return (
    <section
      className="relative w-full flex flex-col items-center text-center pt-32 pb-16 md:pt-44 md:pb-24 z-10"
      aria-label="Hero section"
    >
      {/* Status Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/80 backdrop-blur-sm mb-8"
        role="status"
        aria-live="polite"
      >
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        {dict.statusBadge}
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 max-w-5xl"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/40">
          {dict.headlineLine1}
        </span>
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-violet-400 to-accent">
          {dict.headlineLine2}
        </span>
      </motion.h1>

      {/* Sub-headline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
        className="max-w-2xl text-lg md:text-xl text-white/55 mb-8 leading-relaxed"
      >
        {dict.subheadline}
      </motion.p>

      {/* Tech Tags */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="flex flex-wrap items-center justify-center gap-2 mb-10"
        aria-label="Core technologies"
      >
        {TECH_TAGS.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.08] text-white/60 hover:text-white/90 hover:border-primary-500/40 transition-colors whitespace-nowrap"
          >
            {tag}
          </span>
        ))}
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <Button size="lg" className="group rounded-full px-8" asChild>
          <a href="#projects">
            <Sparkles className="mr-2 w-4 h-4 text-accent/80" aria-hidden="true" />
            <span>{dict.viewProjects}</span>
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </Button>

        <Button variant="outline" size="lg" className="rounded-full px-8 gap-2" asChild>
          <a href="#contact">
            {dict.getInTouch}
          </a>
        </Button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        aria-hidden="true"
      >
        <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-medium">
          {dict.scroll}
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}