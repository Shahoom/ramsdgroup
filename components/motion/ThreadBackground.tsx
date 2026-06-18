"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

const CURVES = [
  "M-120,190 C 220,60 480,360 760,200 S 1180,80 1360,220",
  "M-120,330 C 240,470 540,170 840,360 S 1200,520 1360,350",
  "M-120,110 C 300,210 560,30 900,160 S 1240,300 1360,140",
  "M-120,460 C 260,350 620,560 940,430 S 1220,340 1360,470",
  "M-120,250 C 360,330 600,150 980,280 S 1260,420 1360,250",
];

type Props = {
  className?: string;
  /** "hero" is rich and parallaxed; "divider" is a quiet single-band accent. */
  variant?: "hero" | "divider";
  tone?: "light" | "dark";
};

/**
 * The "thread connecting law & economics" motif: layered flowing filaments that
 * drift, react to scroll + pointer (parallax), and carry traveling gold comets.
 * Decorative only (aria-hidden); fully static under prefers-reduced-motion.
 */
export function ThreadBackground({ className, variant = "hero", tone = "dark" }: Props) {
  const reduce = useReducedMotion();
  const wrapRef = React.useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const scrollShift = useTransform(scrollY, [0, 800], [0, variant === "hero" ? 90 : 30]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 60, damping: 18, mass: 0.6 });

  const xNear = useTransform(sx, (v) => v * 22);
  const yNear = useTransform(sy, (v) => v * 14);
  const xFar = useTransform(sx, (v) => v * -34);
  const yFar = useTransform(sy, (v) => v * -20);

  React.useEffect(() => {
    if (reduce || variant !== "hero") return;
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduce, variant]);

  const stroke = tone === "dark" ? "url(#thread-gold)" : "url(#thread-pine)";
  const comet = tone === "dark" ? "var(--color-gold-300)" : "var(--color-navy-600)";

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <motion.svg
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
        style={reduce ? undefined : { y: scrollShift }}
      >
        <defs>
          <linearGradient id="thread-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-gold-400)" stopOpacity="0" />
            <stop offset="45%" stopColor="var(--color-gold-300)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--color-gold-500)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="thread-pine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-navy-400)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--color-navy-500)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--color-navy-600)" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="thread-glow" cx="30%" cy="0%" r="80%">
            <stop offset="0%" stopColor="var(--color-gold-400)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--color-gold-400)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {variant === "hero" && <rect width="1200" height="600" fill="url(#thread-glow)" />}

        {/* Far layer */}
        <motion.g style={reduce ? undefined : { x: xFar, y: yFar }} opacity={0.7}>
          {CURVES.slice(0, 3).map((d, i) => (
            <g key={`far-${i}`} className={reduce ? undefined : "thread-drift"} style={{ animationDelay: `${i * -3}s`, animationDuration: `${22 + i * 4}s` }}>
              <path d={d} fill="none" stroke={stroke} strokeWidth={1.25} />
            </g>
          ))}
        </motion.g>

        {/* Near layer + comets */}
        <motion.g style={reduce ? undefined : { x: xNear, y: yNear }}>
          {CURVES.map((d, i) => (
            <g key={`near-${i}`} className={reduce ? undefined : "thread-drift"} style={{ animationDelay: `${i * -2.5}s`, animationDuration: `${18 + i * 3}s` }}>
              <path d={d} fill="none" stroke={stroke} strokeWidth={1.5} opacity={0.9} />
              {!reduce && (i === 0 || i === 2 || i === 4) && (
                <path
                  d={d}
                  pathLength={1}
                  fill="none"
                  className="thread-comet"
                  stroke={comet}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  style={{ animationDelay: `${i * -2.2}s`, animationDuration: `${7 + i}s` }}
                />
              )}
            </g>
          ))}
        </motion.g>
      </motion.svg>
    </div>
  );
}
