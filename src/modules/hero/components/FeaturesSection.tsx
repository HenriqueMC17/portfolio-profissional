"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Globe2, GitBranch, Zap, ShieldCheck } from "lucide-react";

interface FeaturesSectionProps {
  dict: {
    sectionTitle: string;
    cleanArch: { title: string; desc: string; metric: string };
    premiumUi: { title: string; desc: string; metric: string };
    typeSafe: { title: string; desc: string; metric: string };
    cicd: { title: string; desc: string; metric: string };
    aiNative: { title: string; desc: string; metric: string };
    security: { title: string; desc: string; metric: string };
  };
}

export function FeaturesSection({ dict }: FeaturesSectionProps) {
  const features = [
    {
      icon: <Cpu className="w-5 h-5" aria-hidden="true" />,
      title: dict.cleanArch.title,
      desc: dict.cleanArch.desc,
      metric: dict.cleanArch.metric,
    },
    {
      icon: <Globe2 className="w-5 h-5" aria-hidden="true" />,
      title: dict.premiumUi.title,
      desc: dict.premiumUi.desc,
      metric: dict.premiumUi.metric,
    },
    {
      icon: <Code2 className="w-5 h-5" aria-hidden="true" />,
      title: dict.typeSafe.title,
      desc: dict.typeSafe.desc,
      metric: dict.typeSafe.metric,
    },
    {
      icon: <GitBranch className="w-5 h-5" aria-hidden="true" />,
      title: dict.cicd.title,
      desc: dict.cicd.desc,
      metric: dict.cicd.metric,
    },
    {
      icon: <Zap className="w-5 h-5" aria-hidden="true" />,
      title: dict.aiNative.title,
      desc: dict.aiNative.desc,
      metric: dict.aiNative.metric,
    },
    {
      icon: <ShieldCheck className="w-5 h-5" aria-hidden="true" />,
      title: dict.security.title,
      desc: dict.security.desc,
      metric: dict.security.metric,
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="z-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-24"
      aria-label={dict.sectionTitle}
    >
      {features.map((feature) => (
        <motion.article
          key={feature.title}
          variants={itemVariants}
          className="group relative flex flex-col p-6 rounded-2xl bg-surface-l1/80 border border-white/8 hover:bg-surface-l1 hover:border-primary-500/25 transition-all duration-300 ease-out-expo overflow-hidden"
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