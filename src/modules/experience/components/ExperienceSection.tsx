"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

interface Experience {
  id: string;
  type: "work" | "education";
  role: { pt: string; en: string };
  company: string;
  period: { pt: string; en: string };
  description: { pt: string; en: string };
  tags: string[];
}

const experiences: Experience[] = [
  {
    id: "1",
    type: "work",
    role: { pt: "Senior Full Stack Engineer", en: "Senior Full Stack Engineer" },
    company: "EcoVolt Enterprise",
    period: { pt: "2024 – Presente", en: "2024 – Present" },
    description: {
      pt: "Liderança técnica na arquitetura de sistemas corporativos escaláveis. Foco em performance, segurança zero-trust e UX premium com Core Web Vitals < 1.2s.",
      en: "Technical leadership in architecting scalable enterprise systems. Focus on performance, zero-trust security and premium UX with Core Web Vitals < 1.2s.",
    },
    tags: ["Next.js 15", "TypeScript", "Convex", "TailwindCSS", "AI/LLMs"],
  },
  {
    id: "2",
    type: "work",
    role: { pt: "Software Developer", en: "Software Developer" },
    company: "Tech Solutions Inc.",
    period: { pt: "2021 – 2024", en: "2021 – 2024" },
    description: {
      pt: "Desenvolvimento de aplicações fullstack, otimização de queries e integração de APIs de terceiros. Aumento de 40% na performance da plataforma principal através de refactoring e indexação estratégica.",
      en: "Fullstack application development, query optimization and third-party API integration. Increased core platform performance by 40% through refactoring and strategic indexing.",
    },
    tags: ["React", "Node.js", "PostgreSQL", "Docker", "Redis"],
  },
  {
    id: "3",
    type: "work",
    role: { pt: "Frontend Developer", en: "Frontend Developer" },
    company: "Creative Studio",
    period: { pt: "2019 – 2021", en: "2019 – 2021" },
    description: {
      pt: "Criação de interfaces altamente interativas e responsivas, colaboração direta com designers UX/UI para construir jornadas de usuário engajadoras e acessíveis.",
      en: "Creation of highly interactive and responsive interfaces, direct collaboration with UX/UI designers to build engaging and accessible user journeys.",
    },
    tags: ["JavaScript", "React", "CSS/SASS", "Figma", "WCAG"],
  },
];

export function ExperienceSection({ isPt }: { isPt: boolean }) {
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
            {isPt ? "Carreira" : "Career"}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {isPt ? "Trajetória Profissional" : "Professional Journey"}
          </h2>
          <p className="text-white/45 max-w-2xl text-lg leading-relaxed">
            {isPt
              ? "Minha evolução como engenheiro de software através de projetos e empresas inovadoras."
              : "My evolution as a software engineer through innovative projects and companies."}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-8 md:pl-14">
          {/* Vertical line */}
          <div className="absolute left-[15px] md:left-[21px] top-2 bottom-2 w-px bg-gradient-to-b from-primary-500/50 via-white/10 to-transparent" aria-hidden="true" />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
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
                  className="absolute -left-8 md:-left-[52px] top-5 h-9 w-9 bg-[#0d0d10] border-2 border-primary-500/70 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.35)] group-hover:border-primary-400"
                  aria-hidden="true"
                >
                  {exp.type === "work" ? (
                    <Briefcase className="w-4 h-4 text-primary-400" />
                  ) : (
                    <GraduationCap className="w-4 h-4 text-primary-400" />
                  )}
                </div>

                {/* Card */}
                <article className="group bg-white/[0.025] border border-white/[0.06] backdrop-blur-sm rounded-2xl p-6 md:p-8 hover:border-primary-500/25 hover:bg-white/[0.04] transition-all duration-300">
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-primary-300 transition-colors leading-snug">
                        {isPt ? exp.role.pt : exp.role.en}
                      </h3>
                      <p className="text-white/60 font-medium mt-0.5">{exp.company}</p>
                    </div>
                    <span className="inline-flex items-center shrink-0 px-3.5 py-1 rounded-full bg-primary-900/30 text-primary-300/90 border border-primary-800/40 text-xs font-semibold tracking-wide whitespace-nowrap">
                      {isPt ? exp.period.pt : exp.period.en}
                    </span>
                  </div>

                  <p className="text-white/45 leading-relaxed text-sm mb-5">
                    {isPt ? exp.description.pt : exp.description.en}
                  </p>

                  <div className="flex flex-wrap gap-1.5" aria-label="Technologies">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-[11px] font-medium rounded-md bg-white/[0.04] text-white/55 border border-white/[0.07]"
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
