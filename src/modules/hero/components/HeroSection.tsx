"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HeroSectionProps {
  isPt: boolean;
}

export function HeroSection({ isPt }: HeroSectionProps) {
  return (
    <section className="relative w-full flex flex-col items-center text-center pt-32 pb-16 md:pt-40 md:pb-24 z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/80 backdrop-blur-sm mb-8"
        role="status"
        aria-live="polite"
      >
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
        </span>
        {isPt ? "Disponível para novos projetos" : "Available for new projects"}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 mb-6"
      >
        {isPt ? "Engenharia de Software" : "Software Engineering"}
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent">
          {isPt ? "Em Alto Nível." : "At High Level."}
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="max-w-2xl text-lg md:text-xl text-white/60 mb-10 leading-relaxed"
      >
        {isPt
          ? "Construindo arquiteturas escaláveis, experiências web premium e sistemas de ponta a ponta com Next.js, Node e Cloud."
          : "Building scalable architectures, premium web experiences, and end-to-end systems with Next.js, Node, and Cloud."}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <Button size="lg" className="group rounded-full px-8">
          <span>{isPt ? "Ver Projetos" : "View Projects"}</span>
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Button>

        <Button variant="outline" size="lg" className="rounded-full px-8">
          {isPt ? "Entrar em Contato" : "Get in Touch"}
        </Button>
      </motion.div>
    </section>
  );
}
