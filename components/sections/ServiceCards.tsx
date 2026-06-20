"use client";

import { useTranslations } from "next-intl";
import { Scale, ArrowUpRight, ShieldCheck, Clock, Globe } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal, Stagger, StaggerItem } from "@/components/motion/SectionReveal";
import { InfinityGlyph } from "@/components/motion/InfinityGlyph";

const HIGHLIGHTS = [
  { icon: ShieldCheck, key: "confidentiality" },
  { icon: Clock, key: "speed" },
  { icon: Globe, key: "crossBorder" },
] as const;

export function ServiceCards() {
  const t = useTranslations("home");
  const tc = useTranslations("common");

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          align="center"
          kicker={t("why.kicker")}
          heading={t("why.heading")}
          className="mb-14"
        />

        <SectionReveal>
          <Link
            href="/debt"
            className="group relative block overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-elevated transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-float sm:p-12"
          >
            <InfinityGlyph className="pointer-events-none absolute -end-8 -top-4 h-32 w-64 text-gold-400/20 transition-colors duration-500 group-hover:text-gold-400/45" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-14">
              {/* Left: main card content */}
              <div className="flex-1">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-700 dark:text-gold-300">
                  {t("services.debt.kicker")}
                </span>
                <span className="mt-4 grid size-16 place-items-center rounded-2xl bg-navy-700 text-mist-50 shadow-elevated transition-transform duration-500 group-hover:scale-105 dark:bg-navy-600">
                  <Scale className="size-8" strokeWidth={1.75} />
                </span>
                <h3 className="mt-6 text-2xl font-bold sm:text-3xl">{t("services.debt.heading")}</h3>
                <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">{t("services.debt.sub")}</p>
                <span className="mt-7 inline-flex items-center gap-2 font-medium text-navy-700 dark:text-gold-300">
                  {tc("learnMore")}
                  <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                </span>
              </div>

              {/* Right: highlight chips */}
              <Stagger className="grid gap-3 sm:grid-cols-3 lg:w-64 lg:grid-cols-1 lg:shrink-0">
                {HIGHLIGHTS.map(({ icon: Icon, key }) => (
                  <StaggerItem key={key}>
                    <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/70 px-4 py-4 backdrop-blur-sm">
                      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-navy-700/10 text-navy-700 dark:bg-navy-600/20 dark:text-gold-300">
                        <Icon className="size-5" strokeWidth={1.75} />
                      </span>
                      <span className="text-sm font-semibold leading-snug">{t(`services.debt.highlights.${key}`)}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Link>
        </SectionReveal>
      </Container>
    </section>
  );
}
