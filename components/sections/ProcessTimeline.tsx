"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

type TimelineStep = { id: string; n: string };

/**
 * Ordered, animated process timeline. A gold "thread" line draws itself top→bottom
 * as the section scrolls into view; each step reveals with its number and (optional) icon.
 * Works for the 3-step home process and the 6-step project workflow.
 */
export function ProcessTimeline({ ns, steps }: { ns: string; steps: TimelineStep[] }) {
  const t = useTranslations(ns);
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <ol ref={ref} className="relative">
      {/* track + drawing thread */}
      <div aria-hidden className="absolute bottom-6 start-6 top-3 w-0.5 bg-border" />
      <motion.div
        aria-hidden
        style={{ scaleY: reduce ? 1 : scaleY }}
        className="absolute bottom-6 start-6 top-3 w-0.5 origin-top bg-gradient-to-b from-gold-400 via-gold-300 to-navy-500"
      />

      {steps.map((step) => {
        return (
          <li key={step.id} className="relative ps-20 pb-12 last:pb-0">
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute start-0 top-0 z-10 grid size-12 place-items-center rounded-full bg-navy-700 text-mist-50 shadow-elevated ring-4 ring-background dark:bg-navy-600"
            >
              <span className="font-display text-sm font-bold">{step.n}</span>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-display text-sm font-semibold tracking-widest text-gold-600 dark:text-gold-300">
                {step.n}
              </span>
              <h3 className="mt-1.5 text-xl font-semibold sm:text-2xl">{t(`${step.id}.title`)}</h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">{t(`${step.id}.body`)}</p>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}
