"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BookingButton } from "@/components/ui/BookingButton";
import { ThreadBackground } from "@/components/motion/ThreadBackground";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const t = useTranslations("home.hero");
  const tc = useTranslations("common");
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay } }
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: EASE, delay },
        };

  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden bg-navy-900 pb-20 pt-32 text-mist-50 lg:min-h-screen">
      <div className="mesh-navy absolute inset-0" aria-hidden />
      <ThreadBackground variant="hero" tone="dark" />
      {/* fade to page bg at the bottom edge */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background"
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
            {t("kicker")}
          </motion.p>

          <motion.h1
            {...rise(0.15)}
            className="mt-7 text-balance text-[2.6rem] font-bold leading-[1.06] tracking-[-0.015em] sm:text-6xl lg:text-7xl xl:text-[5rem]"
          >
            {t("title")}
          </motion.h1>

          <motion.div
            {...rise(0.28)}
            className="mt-6 h-px w-40 origin-start bg-gradient-to-r from-gold-400 via-gold-300 to-transparent"
            aria-hidden
          />

          <motion.p
            {...rise(0.38)}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-mist-100/85 sm:text-xl"
          >
            {t("intro")}
          </motion.p>

          <motion.div {...rise(0.5)} className="mt-10 flex flex-wrap items-center gap-4">
            <BookingButton size="lg" />
            <Button
              asChild
              variant="outline"
              size="lg"
              withArrow
              className="border-mist-50/30 text-mist-50 hover:border-mist-50/60 hover:bg-mist-50/10"
            >
              <Link href="/travel">{tc("exploreServices")}</Link>
            </Button>
          </motion.div>
        </div>
      </Container>

      {!reduce && (
        <motion.div
          className="absolute inset-x-0 bottom-8 z-10 flex justify-center text-mist-100/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.span
            className="inline-flex flex-col items-center gap-1 text-xs uppercase tracking-widest"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {tc("scrollHint")}
            <ChevronDown className="size-4" />
          </motion.span>
        </motion.div>
      )}
    </section>
  );
}
