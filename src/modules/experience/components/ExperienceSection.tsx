"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

interface Experience {
  id: string;
  type: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

interface ExperienceSectionProps {
  dict: {
    sectionTitle: string;
    title: string;
    subtitle: string;
    items: Experience[];
  };
}

export function ExperienceSection({ dict }: ExperienceSectionProps) {
  return (
    <section id="experience" className="w-full py-24 md:py-32 relative">
      <div className="z-10 relative container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-14 text-center"
        >
          <span className="text-xs font-semibold tracking-widest text-primary-400/80 uppercase mb-4">
            {dict.sectionTitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {dict.title}
          </h2>
          <p className="text-white/45 max-w-2xl text-lg leading-relaxed">
            {dict.subtitle}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-8 md:pl-14">
          {/* Vertical line */}
          <div className="absolute left-[15px] md:left-[21px] top-2 bottom-2 w-px bg-linear-to-b from-primary-500/50 via-white/10 to-transparent" aria-hidden="true" />

          <div className="space-y-10">
            {dict.items.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div
                  className="absolute -left-8 md:-left-[52px] top-5 h-9 w-9 bg-background border-2 border-primary-500/70 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.35)] group-hover:border-primary-400"
                  aria-hidden="true"
                >
                  {exp.type === "work" ? (
                    <Briefcase className="w-4 h-4 text-primary-400" />
                  ) : (
                    <GraduationCap className="w-4 h-4 text-primary-400" />
                  )}
                </div>

                {/* Card */}
                <article className="group bg-surface-l1/80 border border-white/8 backdrop-blur-sm rounded-2xl p-6 md:p-8 hover:border-primary-500/25 hover:bg-surface-l1 transition-all duration-300 ease-out-expo">
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-primary-300 transition-colors leading-snug">
                        {exp.role}
                      </h3>
                      <p className="text-white/60 font-medium mt-0.5">{exp.company}</p>
                    </div>
                    <span className="inline-flex items-center shrink-0 px-4 py-1 rounded-full bg-primary-900/30 text-primary-300/90 border border-primary-800/40 text-xs font-semibold tracking-wide whitespace-nowrap tabular-nums">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-white/45 leading-relaxed text-sm mb-5">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2" aria-label="Technologies">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-[11px] font-medium rounded-md bg-white/4 text-white/55 border border-white/5 whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}