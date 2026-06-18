import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PlaneTakeoff, Scale, ArrowUpRight, HeartHandshake } from "lucide-react";

import type { Locale } from "@/i18n/routing";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { LINKS } from "@/lib/site";
import { ABOUT_VALUES } from "@/lib/content";

import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SectionReveal, Stagger, StaggerItem } from "@/components/motion/SectionReveal";
import { JsonLd } from "@/components/seo/JsonLd";

import { PageHero } from "@/components/sections/PageHero";
import { Stats } from "@/components/sections/Stats";
import { VisionMission } from "@/components/sections/VisionMission";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CTABanner } from "@/components/sections/CTABanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return buildMetadata({ locale, path: "/about", title: t("title"), description: t("description") });
}

const PILLARS = [
  { id: "travel", href: "/travel", icon: PlaneTakeoff },
  { id: "debt", href: "/debt", icon: Scale },
] as const;

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const tc = await getTranslations({ locale, namespace: "common" });

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: nav("home"), path: "" },
          { name: nav("about"), path: "/about" },
        ])}
      />

      <PageHero kicker={t("hero.kicker")} title={t("hero.title")} subtitle={t("hero.subtitle")} />

      {/* Story */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <SectionReveal>
              <SectionHeading kicker={t("story.kicker")} heading={t("story.heading")} as="h2" />
            </SectionReveal>
            <SectionReveal delay={0.1} className="flex flex-col gap-5 text-lg leading-relaxed text-muted">
              <p>{t("story.body1")}</p>
              <p>{t("story.body2")}</p>
            </SectionReveal>
          </div>
        </Container>
      </section>

      <Stats />

      {/* Pillars */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading
            align="center"
            kicker={t("pillars.kicker")}
            heading={t("pillars.heading")}
            className="mb-14"
          />
          <Stagger className="grid gap-6 md:grid-cols-2">
            {PILLARS.map(({ id, href, icon: Icon }) => (
              <StaggerItem key={id}>
                <Link
                  href={href}
                  className="group relative block h-full overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-elevated transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/50 sm:p-10"
                >
                  <span className="grid size-16 place-items-center rounded-2xl bg-navy-700 text-mist-50 shadow-elevated transition-transform duration-500 group-hover:scale-105 dark:bg-navy-600">
                    <Icon className="size-8" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-7 text-2xl font-bold">{t(`pillars.${id}.title`)}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-muted">{t(`pillars.${id}.body`)}</p>
                  <span className="mt-7 inline-flex items-center gap-2 font-medium text-navy-700 dark:text-gold-300">
                    {tc("learnMore")}
                    <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="bg-surface-2/60 py-20 lg:py-28">
        <Container>
          <VisionMission ns="about" />
        </Container>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading
            align="center"
            kicker={t("values.kicker")}
            heading={t("values.heading")}
            className="mb-14"
          />
          <FeatureGrid ns="about.values" items={ABOUT_VALUES} cols={4} />
        </Container>
      </section>

      {/* Volunteer team */}
      <section className="relative overflow-hidden">
        <div className="mesh-navy relative isolate py-20 text-mist-50 lg:py-24">
          <Container className="relative z-10">
            <SectionReveal className="mx-auto max-w-3xl text-center">
              <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-gold-400 text-navy-900">
                <HeartHandshake className="size-8" strokeWidth={1.75} />
              </span>
              <p className="mt-6 text-sm font-medium uppercase tracking-wider text-gold-200">
                {t("volunteer.kicker")}
              </p>
              <h2 className="mt-3 text-balance text-2xl font-bold sm:text-3xl lg:text-4xl">
                {t("volunteer.heading")}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-mist-100/85">
                {t("volunteer.body")}
              </p>
              <Button asChild variant="gold" size="lg" withArrow className="mt-8">
                <a href={LINKS.email}>{t("volunteer.cta")}</a>
              </Button>
            </SectionReveal>
          </Container>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
