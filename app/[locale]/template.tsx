"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * `template.tsx` re-mounts on every navigation, which makes it the right place
 * for enter transitions between routes. Honors prefers-reduced-motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
