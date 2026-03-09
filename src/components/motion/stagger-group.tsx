"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface StaggerGroupProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  staggerDelay?: number;
  once?: boolean;
}

export function StaggerGroup({
  children,
  staggerDelay = 0.1,
  once = true,
  ...props
}: StaggerGroupProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10%" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
