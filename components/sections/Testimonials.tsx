"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Star, Pause, Play } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { TESTIMONIALS } from "@/lib/content";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 8000;

export function Testimonials() {
  const t = useTranslations("home.testimonials");
  const ti = useTranslations("testimonials.items");
  const tc = useTranslations("common.carousel");
  const reduce = useReducedMotion();

  const count = TESTIMONIALS.length;
  const [[index, dir], setState] = React.useState<[number, number]>([0, 0]);
  const [paused, setPaused] = React.useState(false);

  const go = React.useCallback(
    (next: number, direction: number) => setState([(next + count) % count, direction]),
    [count],
  );
  const paginate = React.useCallback((d: number) => setState(([i]) => [(i + d + count) % count, d]), [count]);

  React.useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => paginate(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reduce, paginate]);

  const current = TESTIMONIALS[index];

  return (
    <section
      className="relative overflow-hidden bg-surface-2/60 py-20 lg:py-28"
      aria-roledescription="carousel"
      aria-label={t("heading")}
    >
      <Container>
        <SectionHeading align="center" kicker={t("kicker")} heading={t("heading")} className="mb-14" />

        <SectionReveal
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <Quote className="mx-auto mb-6 size-12 text-gold-400/50" />

          <div className="relative min-h-[18rem] sm:min-h-[15rem]">
            <AnimatePresence custom={dir} mode="wait">
              <motion.figure
                key={current.id}
                custom={dir}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir >= 0 ? 48 : -48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir >= 0 ? -48 : 48 }}
                transition={{ duration: reduce ? 0.2 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                drag={reduce ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) paginate(1);
                  else if (info.offset.x > 80) paginate(-1);
                }}
                className="flex flex-col items-center text-center"
                aria-live="polite"
              >
                <div className="mb-6 flex gap-1 text-gold-400" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-5 fill-current" />
                  ))}
                </div>
                <blockquote className="text-balance text-lg leading-relaxed text-foreground sm:text-xl">
                  {ti(`${current.id}.quote`)}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  {current.image ? (
                    <Image
                      src={current.image}
                      alt={ti(`${current.id}.name`)}
                      width={56}
                      height={56}
                      className="size-14 rounded-full object-cover ring-2 ring-gold-400/40"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="grid size-14 shrink-0 place-items-center rounded-full bg-navy-700 text-lg font-bold text-gold-300 ring-2 ring-gold-400/40 dark:bg-navy-600"
                    >
                      {ti(`${current.id}.name`).trim().charAt(0)}
                    </span>
                  )}
                  <div className="text-start">
                    <div className="font-semibold">{ti(`${current.id}.name`)}</div>
                    <div className="text-sm text-muted">{ti(`${current.id}.role`)}</div>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label={tc("previous")}
              className="grid size-11 place-items-center rounded-full border border-border transition-colors hover:bg-surface hover:text-navy-700 dark:hover:text-gold-300"
            >
              <ChevronLeft className="size-5 rtl:rotate-180" />
            </button>

            <div className="flex items-center gap-2" role="tablist">
              {TESTIMONIALS.map((tst, i) => (
                <button
                  key={tst.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={tc("goTo", { index: i + 1 })}
                  onClick={() => go(i, i > index ? 1 : -1)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === index ? "w-8 bg-gold-400" : "w-2 bg-border hover:bg-muted",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label={tc("next")}
              className="grid size-11 place-items-center rounded-full border border-border transition-colors hover:bg-surface hover:text-navy-700 dark:hover:text-gold-300"
            >
              <ChevronRight className="size-5 rtl:rotate-180" />
            </button>

            {!reduce && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? tc("play") : tc("pause")}
                className="ms-2 grid size-11 place-items-center rounded-full border border-border transition-colors hover:bg-surface"
              >
                {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
              </button>
            )}
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
