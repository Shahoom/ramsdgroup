import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Quote } from "lucide-react";

import type { Locale } from "@/i18n/routing";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { DEBT_VALUES, DEBT_BENEFITS, DEBT_TYPES } from "@/lib/content";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal, Stagger, StaggerItem } from "@/components/motion/SectionReveal";
import { JsonLd } from "@/components/seo/JsonLd";

import { PageHero } from "@/components/sections/PageHero";
import { IntroBand } from "@/components/sections/IntroBand";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { FAQ } from "@/components/sections/FAQ";
import { CTABanner } from "@/components/sections/CTABanner";
import { Testimonials } from "@/components/sections/Testimonials";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.debt" });
  const keywords = t.has("keywords") ? t("keywords") : undefined;
  return buildMetadata({ locale, path: "/debt", title: t("title"), description: t("description"), keywords });
}

export default async function DebtPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "debt" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const meta = await getTranslations({ locale, namespace: "meta.debt" });
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale, [
            { name: nav("home"), path: "" },
            { name: nav("debt"), path: "/debt" },
          ]),
          serviceJsonLd(locale, {
            name: meta("title"),
            description: meta("description"),
            path: "/debt",
            serviceType: locale === "ar" ? "تحصيل الديون" : "Debt collection",
          }),
          faqJsonLd(faqItems),
        ]}
      />

      <PageHero kicker={t("hero.kicker")} title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <IntroBand ns="debt" />

      {/* Legal advisor band */}
      <section className="bg-surface-2/60 py-20 lg:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <SectionReveal>
              <div className="mesh-navy relative overflow-hidden rounded-3xl p-8 text-mist-50 shadow-elevated sm:p-10 lg:sticky lg:top-28">
                <Quote className="size-10 text-gold-300" />
                <p className="mt-6 text-balance text-2xl font-semibold leading-snug sm:text-[1.7rem]">
                  {t("legalAdvisor.heading")}
                </p>
                <p className="mt-6 text-gold-200">— {t("legalAdvisor.attribution")}</p>
              </div>
            </SectionReveal>

            <div className="flex flex-col gap-6">
              {(["p1", "p2", "p3", "p4"] as const).map((p, i) => (
                <SectionReveal key={p} delay={i * 0.05}>
                  <p className="leading-relaxed text-muted">{t(`legalAdvisor.${p}`)}</p>
                </SectionReveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* How we work + values (∞) */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading kicker={t("howWeWork.kicker")} heading={t("howWeWork.heading")} align="center" className="mb-14" />
          <FeatureGrid ns="debt.values" items={DEBT_VALUES} cols={3} withInfinity />
        </Container>
      </section>

      {/* Benefits */}
      <section className="bg-surface-2/60 py-20 lg:py-28">
        <Container>
          <SectionHeading
            kicker={t("benefits.kicker")}
            heading={t("benefits.heading")}
            sub={t("benefits.body")}
            align="center"
            className="mb-14"
          />
          <FeatureGrid ns="debt.benefits" items={DEBT_BENEFITS} cols={4} />
        </Container>
      </section>

      {/* Cross-border civil judgment enforcement */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionReveal className="relative overflow-hidden rounded-3xl border border-gold-400/30 bg-gold-400/[0.06] px-6 py-12 sm:px-12 sm:py-14">
            <div className="mx-auto max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-sm font-medium text-gold-700 dark:text-gold-300">
                {t("crossBorder.kicker")}
              </span>
              <h2 className="mt-5 text-balance text-2xl font-bold sm:text-3xl">
                {t("crossBorder.heading")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                {t("crossBorder.body")}
              </p>
            </div>
          </SectionReveal>
        </Container>
      </section>

      {/* Debt types */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading heading={t("debtTypes.heading")} align="center" className="mb-12" />
          <Stagger className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {DEBT_TYPES.map(({ id, icon: Icon }) => (
              <StaggerItem key={id}>
                <div className="group flex h-full flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-7 text-center shadow-elevated transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/40">
                  <span className="grid size-14 place-items-center rounded-2xl bg-navy-700 text-mist-50 transition-transform duration-500 group-hover:scale-105 dark:bg-navy-600">
                    <Icon className="size-7" strokeWidth={1.75} />
                  </span>
                  <span className="font-semibold leading-snug">{t(`debtTypes.items.${id}`)}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* FAQ — answer-engine optimized */}
      <section className="bg-surface-2/60 py-20 lg:py-28">
        <Container>
          <SectionHeading
            align="center"
            kicker={t("faq.kicker")}
            heading={t("faq.heading")}
            className="mb-12"
          />
          <FAQ items={faqItems} />
        </Container>
      </section>

      <CTABanner />
      <Testimonials />
    </>
  );
}
