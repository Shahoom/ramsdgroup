import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/motion/SectionReveal";
import { InfinityGlyph } from "@/components/motion/InfinityGlyph";
import { cn } from "@/lib/utils";

type GridItem = { id: string; icon: LucideIcon };

const colClass: Record<2 | 3 | 4, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/**
 * Reusable card grid for features / values / benefits. Localized text is looked
 * up at `{ns}.{id}.title` and `{ns}.{id}.body`. `withInfinity` adds the ∞ motif.
 */
export function FeatureGrid({
  ns,
  items,
  cols = 3,
  withInfinity = false,
  className,
}: {
  ns: string;
  items: GridItem[];
  cols?: 2 | 3 | 4;
  withInfinity?: boolean;
  className?: string;
}) {
  const t = useTranslations(ns);

  return (
    <Stagger className={cn("grid gap-6", colClass[cols], className)}>
      {items.map(({ id, icon: Icon }) => (
        <StaggerItem key={id}>
          <article className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-7 shadow-elevated transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-400/40 hover:shadow-float">
            {withInfinity && (
              <InfinityGlyph className="pointer-events-none absolute -end-4 -top-1 h-16 w-32 text-gold-400/25 transition-colors duration-500 group-hover:text-gold-400/55" />
            )}
            <span className="relative grid size-14 place-items-center rounded-2xl bg-navy-700/8 text-navy-700 transition-transform duration-500 group-hover:-translate-y-0.5 dark:bg-gold-300/10 dark:text-gold-300">
              <Icon className="size-7" strokeWidth={1.75} />
            </span>
            <h3 className="relative mt-6 text-xl font-semibold leading-snug">
              {t(`${id}.title`)}
            </h3>
            <p className="relative mt-3 leading-relaxed text-muted">{t(`${id}.body`)}</p>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
