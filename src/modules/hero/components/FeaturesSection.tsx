"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Globe2 } from "lucide-react";

interface FeaturesSectionProps {
  isPt: boolean;
}

export function FeaturesSection({ isPt }: FeaturesSectionProps) {
  const features = [
    {
      icon: <Cpu className="w-6 h-6" aria-hidden="true" />,
      title: "Clean Architecture",
      desc: isPt ? "Domínio isolado e escalável." : "Isolated and scalable domain.",
    },
    {
      icon: <Globe2 className="w-6 h-6" aria-hidden="true" />,
      title: "Premium UI/UX",
      desc: isPt ? "Animações fluidas a 60fps." : "Fluid 60fps animations.",
    },
    {
      icon: <Code2 className="w-6 h-6" aria-hidden="true" />,
      title: "Type-Safe APIs",
      desc: isPt ? "Contratos rigorosos com Zod." : "Strict contracts with Zod.",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      className="z-10 w-full grid grid-cols-1 md:grid-cols-3 gap-6 pb-24"
      aria-label={isPt ? "Principais características" : "Key features"}
    >
      {features.map((feature, idx) => (
        <article
          key={idx}
          className="group flex flex-col items-center text-center p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-primary-500/30 transition-all duration-300"
        >
          <div className="p-3 rounded-full bg-primary-500/10 text-primary-500 mb-4 group-hover:scale-110 transition-transform">
            {feature.icon}
          </div>
          <h3 className="text-lg font-semibold text-white/90 mb-2">{feature.title}</h3>
          <p className="text-sm text-white/50">{feature.desc}</p>
        </article>
      ))}
    </motion.section>
  );
}
