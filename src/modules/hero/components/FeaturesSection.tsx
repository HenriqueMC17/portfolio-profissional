"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Globe2, GitBranch, Zap, ShieldCheck } from "lucide-react";

interface FeaturesSectionProps {
  isPt: boolean;
}

export function FeaturesSection({ isPt }: FeaturesSectionProps) {
  const features = [
    {
      icon: <Cpu className="w-5 h-5" aria-hidden="true" />,
      title: "Clean Architecture",
      desc: isPt
        ? "Domínio isolado, SOLID e Clean Code como fundação de cada sistema."
        : "Isolated domain, SOLID and Clean Code as the foundation of every system.",
      metric: isPt ? "0 acoplamento externo no domínio" : "Zero external coupling in domain",
    },
    {
      icon: <Globe2 className="w-5 h-5" aria-hidden="true" />,
      title: "Premium UI/UX",
      desc: isPt
        ? "Animações fluidas, Design Systems e Core Web Vitals otimizados."
        : "Fluid animations, Design Systems and optimized Core Web Vitals.",
      metric: "LCP < 1.2s · CLS < 0.01",
    },
    {
      icon: <Code2 className="w-5 h-5" aria-hidden="true" />,
      title: "Type-Safe APIs",
      desc: isPt
        ? "Contratos rigorosos end-to-end com Zod, TypeScript e geração automática."
        : "Strict end-to-end contracts with Zod, TypeScript and codegen.",
      metric: "100% type coverage",
    },
    {
      icon: <GitBranch className="w-5 h-5" aria-hidden="true" />,
      title: "CI/CD & DevOps",
      desc: isPt
        ? "Pipelines automatizados com testes, linting e deploy contínuo."
        : "Automated pipelines with tests, linting and continuous deployment.",
      metric: isPt ? "Deploy em < 3 min" : "Deploy in < 3 min",
    },
    {
      icon: <Zap className="w-5 h-5" aria-hidden="true" />,
      title: "AI-Native Dev",
      desc: isPt
        ? "Orquestração de agentes de IA com governança, COVE e rastreabilidade."
        : "AI agent orchestration with governance, COVE and full traceability.",
      metric: "SALLMA + FLARE protocols",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" aria-hidden="true" />,
      title: "Security First",
      desc: isPt
        ? "Positive Security, validação rigorosa e auditabilidade de ponta a ponta."
        : "Positive Security, strict validation and end-to-end auditability.",
      metric: "OWASP Top 10 compliant",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="z-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-24"
      aria-label={isPt ? "Principais competências" : "Core competencies"}
    >
      {features.map((feature) => (
        <motion.article
          key={feature.title}
          variants={itemVariants}
          className="group relative flex flex-col p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.045] hover:border-primary-500/25 transition-all duration-300 overflow-hidden"
        >
          {/* Subtle top-left gradient on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 0% 0%, rgba(99,102,241,0.06) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="flex items-start gap-4 mb-4">
            <div className="p-2.5 rounded-xl bg-primary-500/10 text-primary-400 group-hover:bg-primary-500/20 group-hover:scale-105 transition-all duration-300 shrink-0">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-base font-semibold text-white/90 mb-0.5">{feature.title}</h3>
              <span className="text-[10px] font-mono text-primary-400/70 tracking-wide">
                {feature.metric}
              </span>
            </div>
          </div>

          <p className="text-sm text-white/45 leading-relaxed">{feature.desc}</p>
        </motion.article>
      ))}
    </motion.section>
  );
}
