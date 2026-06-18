"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import { animate, useInView, useReducedMotion } from "motion/react";

type Props = {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Counts up from 0 to `target` when scrolled into view. Uses locale-aware digit
 * grouping (Arabic-Indic numerals under the `ar` locale). Honors reduced motion.
 */
export function StatCounter({ target, prefix = "", suffix = "", duration = 2, className }: Props) {
  const locale = useLocale();
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const formatter = React.useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }),
    [locale],
  );

  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    // duration 0 under reduced motion → jumps straight to the target.
    const controls = animate(0, target, {
      duration: reduce ? 0 : duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, duration, reduce]);

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${formatter.format(target)}${suffix}`}>
      <span aria-hidden>
        {prefix}
        {formatter.format(value)}
        {suffix}
      </span>
    </span>
  );
}
