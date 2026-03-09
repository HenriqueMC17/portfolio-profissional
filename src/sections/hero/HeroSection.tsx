'use client';
import type { Dictionary } from '@/types/dictionary';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function HeroSection({ dict, lang }: { dict: Dictionary; lang: string }) {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-end pb-32 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Background / Noise handled globally */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent pointer-events-none" />

      <div className="z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="font-mono text-[#A1A1AA] uppercase tracking-widest text-xs sm:text-sm mb-6">
            {dict.Hero.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.1] font-bold tracking-tight text-[#FAFAFA] mb-8">
            <span className="italic font-serif">{dict.Hero.title.split(' ')[0]}</span>{' '}
            {dict.Hero.title.split(' ').slice(1).join(' ')}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="text-[#A1A1AA] text-lg sm:text-desktop-lg max-w-2xl mb-10 leading-relaxed">
            {dict.Hero.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-wrap gap-4"
        >
          <Button
            className="rounded-full bg-[#FAFAFA] text-[#0A0A0A] hover:bg-white/90 px-8 py-6 text-sm sm:text-base cursor-pointer"
            asChild
          >
            <a href={`/${lang}#projects`}>{dict.Hero.cta_projects}</a>
          </Button>

          <Button
            variant="outline"
            className="rounded-full border-[#1A1A1A] text-[#FAFAFA] hover:bg-[#111111] bg-transparent px-8 py-6 text-sm sm:text-base cursor-pointer"
            asChild
          >
            <a href={`/${lang}#contact`}>{dict.Hero.cta_contact}</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
