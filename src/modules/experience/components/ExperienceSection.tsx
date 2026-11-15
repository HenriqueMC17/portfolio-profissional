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
          { label: isPt ? "Adoção Equipe" : "Team Adoption", value: "100%" },
          { label: isPt ? "ERPs / CRMs" : "ERPs / CRMs", value: "3 Sistemas" },
          { label: isPt ? "Auditorias" : "Audits", value: isPt ? "Semanais" : "Weekly" }
        ],
        bullets: isPt ? [
          "Gestão de funil de vendas e qualificação de leads no CRM Bitrix, estruturando dados comerciais para tomada de decisão.",
          "Ponto focal técnico nos sistemas DKSoft e Sponte, ministrando treinamentos e capacitações contínuas para a equipe.",
          "Condução de migração estruturada de dados entre plataformas corporativas e resolução de inconsistências cadastrais.",
          "Auditoria periódica de contratos e vendas, emissão de relatórios gerenciais e controle de disparos via Zap Suite."
        ] : [
          "Sales funnel and lead tracking management in Bitrix CRM, structuring commercial data for executive decision-making.",
          "Technical focal point for DKSoft and Sponte ERPs, delivering hands-on staff training and workflow standardization.",
          "Executed structured cross-system data migrations and resolved complex enrollment and financial inconsistencies.",
          "Periodic sales and contract auditing, executive reporting, and targeted outbound communication workflows."
        ]
      };
    case "2":
      return {
        metrics: [
          { label: isPt ? "Conformidade" : "Compliance", value: "100%" },
          { label: isPt ? "Auditorias" : "Audits", value: isPt ? "Aprovadas" : "Approved" },
          { label: isPt ? "Controle EPIs" : "PPE Control", value: isPt ? "Rastreável" : "Traceable" }
        ],
        bullets: isPt ? [
          "Organização e controle de documentação crítica para auditorias internas de conformidade em Saúde, Segurança e Meio Ambiente (SSMA).",
          "Coleta de dados e atualização de indicadores-chave de desempenho (KPIs) e gráficos de controle estatístico.",
          "Gestão logística, rastreabilidade e inventário de EPIs, equipamentos de segurança e descarte de contaminados.",
          "Alimentação de formulários e sincronização de dados nos sistemas corporativos Intranet e RELATE."
        ] : [
          "Control and governance of critical documentation for internal safety and environmental compliance audits (SSMA/EHS).",
          "Data collection and real-time maintenance of departmental key performance indicators (KPIs) and statistical control charts.",
          "Inventory management, logistics, and traceability of personal protective equipment (PPE) and hazardous waste protocols.",
          "Standardized form maintenance and cross-departmental data updates in corporate Intranet and RELATE systems."
        ]
      };
    case "3":
      return {
        metrics: [
          { label: isPt ? "Módulos FSD" : "FSD Modules", value: "18" },
          { label: isPt ? "Tx Concorrentes" : "Concurrent Tx", value: "> 100" },
          { label: isPt ? "LCP Inicial" : "Initial LCP", value: "< 1.2s" }
        ],
        bullets: isPt ? [
          "Arquitetura do Safe Finance: Monorepo Turborepo + PNPM Workspaces com Clean Architecture e banco reativo Convex BaaS.",
          "Modelagem e implementação de APIs REST robustas para processamento concorrente de mais de 100 transações financeiras.",
          "Arquitetura do EcoVolt: Plataforma B2B de inteligência energética com simulador de ROI solar e integração da Open-Meteo API.",
          "Type-safety rigorosa de ponta a ponta com TypeScript e esquemas Zod, além de interfaces fluidas com Framer Motion e Tailwind CSS v4."
        ] : [
          "Safe Finance Architecture: Turborepo + PNPM Workspaces monorepo applying strict Clean Architecture and Convex BaaS.",
          "Engineered robust REST APIs capable of concurrently processing >100 transactions with reliable data persistence.",
          "EcoVolt Architecture: B2B energy intelligence platform featuring solar ROI simulation and Open-Meteo weather integration.",
          "End-to-end type safety using TypeScript and strict Zod validation schemas, with fluid UI powered by Framer Motion and Tailwind CSS v4."
        ]
      };
    case "4":
      return {
        metrics: [
          { label: isPt ? "Status" : "Status", value: isPt ? "Cursando" : "In Progress" },
          { label: isPt ? "Previsão" : "Completion", value: "2027" },
          { label: isPt ? "Foco" : "Focus", value: isPt ? "Engenharia" : "Engineering" }
        ],
        bullets: isPt ? [
          "Formação acadêmica sólida com foco em algoritmos, complexidade de computação e boas práticas de Clean Code.",
          "Modelagem conceitual, lógica e física de bancos de dados relacionais (SQL) e não-relacionais (NoSQL/MongoDB).",
          "Estudo aprofundado de padrões arquiteturais cliente-servidor, microsserviços e engenharia de software distribuída.",
          "Aceleração prática através de projetos integradores e alinhamento com os padrões corporativos de mercado."
        ] : [
          "Strong academic foundation in computer science algorithms, computational complexity, and Clean Code standards.",
          "Conceptual, logical, and physical modeling of relational (SQL) and non-relational (NoSQL/MongoDB) database systems.",
          "Deep dive into client-server architectural patterns, microservices, and distributed software engineering.",
          "Hands-on accelerated delivery through integrative real-world projects aligned with industry best practices."
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
