'use client';

import { motion } from 'framer-motion';
import { experiencesInfo } from '@/types/experience';

export function ExperienceTimeline({ dict, lang }: { dict: any; lang: string }) {
  return (
    <section id="experience" className="py-24 px-6 sm:px-12 max-w-5xl mx-auto border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <span className="text-[#A1A1AA] font-mono text-sm block mb-2 uppercase tracking-widest">{dict.Navigation.experience}</span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAFAFA]">
          Timeline <span className="italic font-serif">Profissional</span>
        </h2>
      </motion.div>

      <div className="relative border-l border-[#1A1A1A] ml-4 md:ml-0 space-y-12 pb-8">
        {experiencesInfo.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 md:pl-12 group"
          >
            {/* Timeline Dot */}
            <div className={`absolute left-0 top-1.5 w-3 h-3 -translate-x-1.5 rounded-full border-2 border-[#0A0A0A] ${
              exp.isCurrent ? 'bg-[#FAFAFA] animate-pulse duration-3000' : 'bg-[#333333] group-hover:bg-[#555555] transition-colors'
            }`} />

            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2 gap-2 md:gap-4">
              <h3 className="text-xl font-bold text-[#FAFAFA]">{exp.role}</h3>
              <span className="font-mono text-sm text-[#A1A1AA] shrink-0 bg-[#111111] px-3 py-1 rounded-md border border-[#1A1A1A]">
                {exp.period}
              </span>
            </div>

            <div className="text-lg text-[#E4E4E7] mb-4 font-semibold">
              {exp.company}
            </div>

            <ul className="space-y-2">
              {exp.description.map((desc, i) => (
                <li key={i} className="text-[#A1A1AA] leading-relaxed flex gap-3">
                  <span className="text-[#333333] mt-1.5">›</span> {desc}
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
           transition={{ duration: 0.5, delay: 0.3 }}
           className="relative pl-8 md:pl-12 pt-8"
        >
          <div className="absolute left-0 top-9.5 w-3 h-3 -translate-x-1.5 rounded-full border-2 border-[#0A0A0A] bg-[#222222]" />
          <h3 className="text-lg font-bold text-[#A1A1AA] mb-2">Anteriores</h3>
          <p className="text-[#A1A1AA] text-sm">
            GMX Iluminação, CCBEU (Suporte ERP DKSoft/Sponte)
          </p>
        </motion.div>
      </div>
    </section>
  );
}
