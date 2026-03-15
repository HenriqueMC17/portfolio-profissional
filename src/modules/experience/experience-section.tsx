'use client';
import type { Dictionary } from '@/types/dictionary';

import { motion } from 'framer-motion';
import { experiencesInfo } from '@/types/experience';

export function ExperienceTimeline({ dict }: { dict: Dictionary }) {
  return (
    <section id="experience" className="py-24 md:py-32 px-6 sm:px-12 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="mb-20 text-center"
      >
        <span className="text-[#22D3EE] font-mono text-xs block mb-4 uppercase tracking-[0.3em] font-bold">
          [ 03 — {dict.Navigation.experience} ]
        </span>
        <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter text-white uppercase">
          Timeline Profissional
        </h2>
      </motion.div>

      <div className="relative border-l border-white/10 ml-4 md:ml-0 space-y-16 pb-8">
        {experiencesInfo.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="relative pl-8 md:pl-12 group"
          >
            {/* Timeline Dot */}
            <div className={`absolute left-0 top-1.5 w-3 h-3 -translate-x-[7px] rounded-full border-2 border-black ${
              exp.isCurrent ? 'bg-[#22D3EE] shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-pulse' : 'bg-white/30 group-hover:bg-[#22D3EE] group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-300'
            }`} />

            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4 gap-2 md:gap-4">
              <h3 className="text-2xl font-bold text-white tracking-tight">{exp.role}</h3>
              <span className="font-mono text-xs text-[#22D3EE] shrink-0 bg-[#22D3EE]/10 px-3 py-1.5 rounded-md border border-[#22D3EE]/20 tracking-wider">
                {exp.period}
              </span>
            </div>

            <div className="text-lg text-zinc-300 mb-6 font-semibold">
              {exp.company}
            </div>

            <ul className="space-y-4 font-mono text-sm text-zinc-400">
              {exp.description.map((desc, i) => (
                <li key={i} className="leading-relaxed flex gap-4 group-hover:text-zinc-300 transition-colors duration-300">
                  <span className="text-[#2563EB] mt-0.5">{">"}</span> 
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        {/* Older Roles Summary */}
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true, margin: '-50px' }}
           transition={{ duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
           className="relative pl-8 md:pl-12 pt-12"
        >
          <div className="absolute left-0 top-13 w-3 h-3 -translate-x-[7px] rounded-full border-2 border-black bg-white/10" />
          <h3 className="text-lg font-bold text-zinc-500 mb-2 uppercase tracking-wide">Anteriores</h3>
          <p className="text-zinc-500 font-mono text-sm">
            {">"} GMX Iluminação, CCBEU (Suporte ERP DKSoft/Sponte)
          </p>
        </motion.div>
      </div>
    </section>
  );
}
