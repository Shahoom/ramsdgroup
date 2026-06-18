import * as React from "react";
import { cn } from "@/lib/utils";

const PATH =
  "M50,25 C38,8 8,12 8,25 C8,38 38,42 50,25 C62,8 92,12 92,25 C92,38 62,42 50,25 Z";

/**
 * Animated lemniscate (∞) — the "limitless" motif. A faint base stroke with a
 * gold "comet" that endlessly traces the loop. Degrades to a static glyph when
 * prefers-reduced-motion is set (the CSS animation is neutralized globally).
 */
export function InfinityGlyph({
  className,
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 50"
      fill="none"
      aria-hidden
      className={cn("overflow-visible", className)}
    >
      <path
        d={PATH}
        pathLength={1}
        className="stroke-current opacity-25"
        strokeWidth={3}
        strokeLinecap="round"
      />
      {animate && (
        <path
          d={PATH}
          pathLength={1}
          className="infinity-comet stroke-current"
          strokeWidth={3}
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
