import { useTranslations } from "next-intl";
import { PlaneTakeoff, Scale, ArrowUpRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/SectionReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { InfinityGlyph } from "@/components/motion/InfinityGlyph";

export function ServiceCards() {
  const t = useTranslations("home");
  const tc = useTranslations("common");

  const cards = [
    {
      href: "/travel" as const,
      icon: PlaneTakeoff,
      title: t("services.travel.title"),
      body: t("services.travel.sub"),
    },
    {
      href: "/debt" as const,
      icon: Scale,
      title: t("services.debt.heading"),
      body: t("services.debt.kicker"),
    },
  ];

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          align="center"
          kicker={t("why.kicker")}
          heading={t("why.heading")}
          className="mb-14"
        />

        <Stagger className="grid gap-6 md:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <StaggerItem key={card.href}>
                <Link
                  href={card.href}
                  className="group relative block h-full overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-elevated transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-400/50 hover:shadow-float sm:p-10"
                >
                  <InfinityGlyph className="pointer-events-none absolute -end-6 -top-2 h-20 w-40 text-gold-400/30 transition-colors duration-500 group-hover:text-gold-400/60" />
                  <Magnetic strength={0.18} className="relative flex h-full flex-col">
                    <span className="grid size-16 place-items-center rounded-2xl bg-navy-700 text-mist-50 shadow-elevated transition-transform duration-500 group-hover:scale-105 dark:bg-navy-600">
                      <Icon className="size-8" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-7 text-2xl font-bold sm:text-[1.7rem]">{card.title}</h3>
                    <p className="mt-3 grow text-lg leading-relaxed text-muted">{card.body}</p>
                    <span className="mt-8 inline-flex items-center gap-2 font-medium text-navy-700 dark:text-gold-300">
                      {tc("learnMore")}
                      <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                    </span>
                  </Magnetic>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
