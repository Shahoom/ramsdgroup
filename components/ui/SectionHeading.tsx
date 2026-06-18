import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  kicker?: React.ReactNode;
  heading: React.ReactNode;
  sub?: React.ReactNode;
  align?: "start" | "center";
  tone?: "default" | "invert";
  as?: "h1" | "h2" | "h3";
  className?: string;
  headingClassName?: string;
};

/**
 * Reusable "kicker + heading (+ sub)" block with a gold thread accent on the kicker.
 * Use `tone="invert"` on dark backgrounds.
 */
export function SectionHeading({
  kicker,
  heading,
  sub,
  align = "start",
  tone = "default",
  as: Heading = "h2",
  className,
  headingClassName,
}: Props) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered ? "items-center text-center" : "items-start text-start",
        className,
      )}
    >
      {kicker && (
        <div
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em]",
            tone === "invert"
              ? "border-gold-300/25 bg-gold-300/10 text-gold-200"
              : "border-gold-500/20 bg-gold-400/[0.07] text-gold-600 dark:border-gold-300/25 dark:bg-gold-300/10 dark:text-gold-300",
          )}
        >
          <span
            aria-hidden
            className="size-1.5 rounded-full bg-gold-400 shadow-[0_0_10px_1px_rgba(201,162,75,0.5)]"
          />
          {kicker}
        </div>
      )}
      <Heading
        className={cn(
          "max-w-3xl text-balance text-[1.95rem] font-bold leading-[1.12] sm:text-4xl lg:text-5xl",
          centered && "mx-auto",
          tone === "invert" ? "text-mist-50" : "text-foreground",
          headingClassName,
        )}
      >
        {heading}
      </Heading>
      {sub && (
        <p
          className={cn(
            "max-w-2xl text-lg leading-relaxed",
            centered && "mx-auto",
            tone === "invert" ? "text-mist-100/80" : "text-muted",
          )}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
