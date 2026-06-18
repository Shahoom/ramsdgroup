"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { ThreadBackground } from "@/components/motion/ThreadBackground";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Inner-page hero (Consulting / Debt / Contact). Dark, thread-filled, animated entrance. */
export function PageHero({
  kicker,
  title,
  subtitle,
  children,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay } }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, ease: EASE, delay },
        };

  return (
    <section className="relative isolate flex min-h-[58vh] items-center overflow-hidden bg-navy-900 pb-16 pt-36 text-mist-50 lg:min-h-[64vh] lg:pt-40">
      <div className="mesh-navy absolute inset-0" aria-hidden />
      <ThreadBackground variant="hero" tone="dark" />
      <div
        className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-background"
        aria-hidden
      />
      <Container className="relative z-10">
        <div className="max-w-3xl">
          <motion.p
            {...rise(0.05)}
            className="inline-flex items-center gap-2.5 rounded-full border border-gold-300/25 bg-navy-950/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-gold-200 backdrop-blur-sm sm:text-sm"
          >
            <span
              aria-hidden
              className="size-1.5 rounded-full bg-gold-400 shadow-[0_0_12px_2px_rgba(201,162,75,0.55)]"
            />
            {kicker}
          </motion.p>
          <motion.h1
            {...rise(0.15)}
            className="mt-6 text-balance text-[2.5rem] font-bold leading-[1.08] tracking-[-0.015em] sm:text-5xl lg:text-[4rem]"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              {...rise(0.28)}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-mist-100/85"
            >
              {subtitle}
            </motion.p>
          )}
          {children && <motion.div {...rise(0.4)}>{children}</motion.div>}
        </div>
      </Container>
    </section>
  );
}
