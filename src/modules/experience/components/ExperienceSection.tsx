"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, X, ChevronRight, Check } from "lucide-react";

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
  lang?: string;
}

const getHighlights = (id: string, isPt: boolean) => {
  switch (id) {
    case "1":
      return {
        metrics: [
          { label: isPt ? "Desempenho" : "Performance", value: "98/100" },
          { label: isPt ? "LCP Inicial" : "Initial LCP", value: "< 1.2s" },
          { label: isPt ? "Deploy em" : "Deploy in", value: "< 3m" }
        ],
        bullets: isPt ? [
          "Liderança técnica na modelagem da arquitetura serverless Convex e Next.js 16.",
          "Otimização crítica do carregamento inicial de telas usando importações dinâmicas.",
          "Implementação de validações em camadas (esquemas Zod) cobrindo 100% dos fluxos de dados.",
          "Integração contínua de rotas de chat streaming acionadas pela API de IA do Gemini."
        ] : [
          "Technical leadership in Convex serverless and Next.js 16 architecture design.",
          "Critical initial page loading optimization utilizing dynamic imports.",
          "Layered validations implementation (Zod schemas) covering 100% of data flows.",
          "Continuous integration of streaming chat routes powered by Gemini AI API."
        ]
      };
    case "2":
      return {
        metrics: [
          { label: isPt ? "Queries SQL" : "SQL Queries", value: "+40%" },
          { label: isPt ? "Latência API" : "API Latency", value: "< 80ms" },
          { label: isPt ? "Suporte" : "Scale Support", value: "100k+" }
        ],
        bullets: isPt ? [
          "Aumento de 40% na performance da plataforma através de refatorações de índices e cache.",
          "Modelagem de dados complexos no PostgreSQL com orquestração de microsserviços.",
          "Desenvolvimento de APIs robustas de integração financeira e mensageria externa.",
          "Containerização do ambiente de desenvolvimento local via Docker Compose."
        ] : [
          "40% increase in database query execution speed via index optimization and cache.",
          "Complex PostgreSQL relational data modeling and microservices orchestration.",
          "Robust API creation for payment processing and external messaging services.",
          "Local environment containerization using Docker Compose to align setup."
        ]
      };
    case "3":
      return {
        metrics: [
          { label: isPt ? "Interações" : "Interactions", value: "< 1.5s" },
          { label: isPt ? "Acessibilidade" : "Accessibility", value: "100% WCAG" },
          { label: isPt ? "Componentes" : "Components", value: "50+" }
        ],
        bullets: isPt ? [
          "Desenvolvimento de Design Systems compartilhados de alta fidelidade e consistência visual.",
          "Criação de micro-interações dinâmicas usando Framer Motion e physics animations.",
          "Garantia de 100% de conformidade com normas de acessibilidade (WCAG AA).",
          "Colaboração direta com designers via Figma para refinar interfaces de usuários."
        ] : [
          "High fidelity shared Design Systems and visual consistency development.",
          "Dynamic micro-interactions creation using Framer Motion and physics animations.",
          "Ensuring 100% compliance with international accessibility rules (WCAG AA).",
          "Direct collaboration with product designers via Figma to refine layouts."
        ]
      };
    default:
      return { metrics: [], bullets: [] };
  }
};

export function ExperienceSection({ dict, lang = "pt" }: ExperienceSectionProps) {
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const isPt = lang === "pt";

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
                <article
                  onClick={() => setSelectedExp(exp)}
                  className="group bg-surface-l1/80 border border-white/8 backdrop-blur-sm rounded-2xl p-6 md:p-8 hover:border-primary-500/25 hover:bg-surface-l1 transition-all duration-300 ease-out-expo cursor-pointer relative overflow-hidden"
                >
                  {/* Subtle hover gradient indicator */}
                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-linear-to-r from-primary-500 to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-350 origin-left" />

                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-primary-300 transition-colors leading-snug flex items-center gap-1.5">
                        <span>{exp.role}</span>
                        <ChevronRight className="w-4.5 h-4.5 text-white/20 group-hover:text-primary-400 transition-all group-hover:translate-x-1 duration-300" />
                      </h3>
                      <p className="text-white/60 font-medium mt-0.5">{exp.company}</p>
                    </div>
                    <span className="inline-flex items-center shrink-0 px-4 py-1 rounded-full bg-primary-900/30 text-primary-300/90 border border-primary-800/40 text-xs font-semibold tracking-wide whitespace-nowrap font-mono tabular-nums">
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

      {/* Interactive Detail Drawer */}
      <AnimatePresence>
        {selectedExp && (() => {
          const highlights = getHighlights(selectedExp.id, isPt);
          return (
            <>
              {/* GPU-accelerated backdrop blur overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedExp(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
                style={{ transform: "translate3d(0, 0, 0)", willChange: "transform, backdrop-filter" }}
              />

              {/* Side panel */}
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 220 }}
                className="fixed right-0 top-0 bottom-0 w-full max-w-md sm:max-w-lg bg-surface-l2 border-l border-white/8 z-55 p-6 sm:p-8 flex flex-col overflow-y-auto shadow-2xl"
                style={{ backgroundColor: "#2d2d2d" }}
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/8 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-primary-500/10 text-primary-400 border border-primary-500/20">
                      {selectedExp.type === "work" ? <Briefcase className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg leading-tight">{selectedExp.company}</h4>
                      <span className="text-xs text-white/50">{selectedExp.period}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedExp(null)}
                    className="p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Role title */}
                <div className="mb-6">
                  <span className="text-xs font-mono tracking-widest text-primary-400 uppercase">
                    {selectedExp.type === "work" ? (isPt ? "Cargo" : "Role") : (isPt ? "Formação" : "Education")}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1 leading-snug">{selectedExp.role}</h3>
                </div>

                {/* Metrics grid */}
                {highlights.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {highlights.metrics.map((metric, i) => (
                      <div key={i} className="bg-surface-l1/60 border border-white/5 p-4 rounded-xl flex flex-col items-center text-center">
                        <span className="text-[10px] text-white/45 mb-1 leading-tight">{metric.label}</span>
                        <span className="text-base font-bold text-white font-mono tracking-tight tabular-nums">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Description */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-white mb-2">{isPt ? "Sobre a Atuação" : "About the Role"}</h4>
                  <p className="text-white/60 text-sm leading-relaxed">{selectedExp.description}</p>
                </div>

                {/* Bullet highlights */}
                {highlights.bullets.length > 0 && (
                  <div className="mb-8 flex-1">
                    <h4 className="text-sm font-semibold text-white mb-3">{isPt ? "Destaques & Entregas" : "Highlights & Deliverables"}</h4>
                    <ul className="space-y-3.5">
                      {highlights.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-2.5 items-start text-xs text-white/50 leading-relaxed">
                          <Check className="w-4.5 h-4.5 text-primary-400 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech stack */}
                <div className="mt-auto pt-6 border-t border-white/8">
                  <h4 className="text-sm font-semibold text-white mb-3">{isPt ? "Tecnologias Utilizadas" : "Technologies Used"}</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-semibold rounded-md bg-white/4 text-white/55 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.aside>
            </>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
