"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
  moment?: string;
  momentOpts?: string;
};

export function RevealSection({
  children,
  className,
  id,
  labelledBy,
  moment,
  momentOpts,
}: RevealSectionProps) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      className={className}
      id={id}
      aria-labelledby={labelledBy}
      data-moment={moment}
      data-moment-opts={momentOpts}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
