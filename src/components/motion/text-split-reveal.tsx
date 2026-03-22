"use client";

import { motion } from "framer-motion";

interface TextSplitRevealProps {
  text: string;
  className?: string;
  staggerDelay?: number;
  wordMode?: boolean;
}

export function TextSplitReveal({ text, className = "", staggerDelay = 0.05, wordMode = false }: TextSplitRevealProps) {
  const segments = wordMode ? text.split(" ") : text.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1] as [number, number, number, number], // Cinematic easing
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      {segments.map((segment, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          className="inline-block"
        >
          {segment === " " && !wordMode ? "\u00A0" : segment}
          {wordMode && index < segments.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </motion.span>
  );
}
