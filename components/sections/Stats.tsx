import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/motion/SectionReveal";
import { StatCounter } from "@/components/motion/StatCounter";
import { STATS } from "@/lib/content";

/** Animated counters that count up when scrolled into view. */
export function Stats() {
  const t = useTranslations("home.stats");

  return (
    <section className="relative py-16 lg:py-20" aria-label="Key figures">
      <Container>
        <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <StaggerItem
                key={stat.id}
                className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-3xl border border-border bg-surface px-5 py-9 text-center shadow-elevated transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/40 hover:shadow-float"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 origin-center scale-x-0 bg-gradient-to-r from-gold-400/0 via-gold-400 to-gold-400/0 transition-transform duration-500 group-hover:scale-x-100"
                />
                <span className="grid size-14 place-items-center rounded-2xl bg-navy-700 text-mist-50 shadow-elevated transition-transform duration-500 group-hover:scale-105 dark:bg-navy-600">
                  <Icon className="size-7" strokeWidth={1.75} />
                </span>
                <StatCounter
                  target={stat.target}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className="font-display text-4xl font-bold tabular-nums text-navy-700 sm:text-5xl dark:text-gold-300"
                />
                <span className="text-sm leading-snug text-muted">{t(stat.id)}</span>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
