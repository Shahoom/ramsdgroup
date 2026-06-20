import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Quote, ShieldCheck } from "lucide-react";

import type { Locale } from "@/i18n/routing";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { DEBT_VALUES, DEBT_BENEFITS, DEBT_TYPES, DEBT_PROCESS_STEPS } from "@/lib/content";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal, Stagger, StaggerItem } from "@/components/motion/SectionReveal";
import { JsonLd } from "@/components/seo/JsonLd";

import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
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

      {/* Licensing trust band */}
      <div className="border-b border-gold-400/20 bg-gold-400/[0.05] py-4">
        <Container>
          <p className="flex items-center justify-center gap-2.5 text-center text-sm font-medium text-gold-700 dark:text-gold-300">
            <ShieldCheck className="size-4 shrink-0" aria-hidden />
            {t("licensed")}
          </p>
        </Container>
      </div>

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

      {/* Debt recovery process */}
      <section className="bg-surface-2/60 py-20 lg:py-28">
        <Container>
          <SectionHeading
            kicker={t("process.kicker")}
            heading={t("process.heading")}
            align="center"
            className="mb-16"
          />
          <div className="mx-auto max-w-3xl">
            <ProcessTimeline ns="debt.process" steps={DEBT_PROCESS_STEPS} />
          </div>
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

      {/* Our commitment */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading
            kicker={t("pledge.kicker")}
            heading={t("pledge.heading")}
            align="center"
            className="mb-12"
          />
          <Stagger className="grid gap-5 sm:grid-cols-2">
            {(t.raw("pledge.items") as { title: string; body: string }[]).map((item, i) => (
              <StaggerItem key={i}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-gold-400/25 bg-gold-400/[0.04] p-6 sm:p-7">
                  <span className="size-2 rounded-full bg-gold-400" aria-hidden />
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="leading-relaxed text-muted">{item.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Who we serve */}
      <section className="bg-surface-2/60 py-20 lg:py-28">
        <Container>
          <SectionHeading
            kicker={t("clientTypes.kicker")}
            heading={t("clientTypes.heading")}
            sub={t("clientTypes.sub")}
            align="center"
            className="mb-12"
          />
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {(t.raw("clientTypes.segments") as string[]).map((seg) => (
              <span
                key={seg}
                className="rounded-full border border-navy-500/30 bg-navy-700/10 px-5 py-2 text-sm font-semibold text-navy-700 dark:text-navy-200"
              >
                {seg}
              </span>
            ))}
          </div>
          <SectionReveal>
            <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-surface px-6 py-7 text-center shadow-elevated sm:px-8 sm:py-8">
              <p className="mb-4 text-sm text-muted">{t("clientTypes.examplesLabel")}</p>
              <p className="font-medium leading-relaxed">
                {(t.raw("clientTypes.examples") as string[]).join(" · ")}
              </p>
            </div>
          </SectionReveal>
        </Container>
      </section>

      {/* Consulting advisory */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionReveal className="relative overflow-hidden rounded-3xl border border-navy-500/20 bg-navy-700/[0.04] px-6 py-12 sm:px-12 sm:py-14">
            <div className="mx-auto max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-navy-500/30 bg-navy-700/10 px-4 py-1.5 text-sm font-medium text-navy-700 dark:text-navy-200">
                {t("consulting.kicker")}
              </span>
              <h2 className="mt-5 text-balance text-2xl font-bold sm:text-3xl">
                {t("consulting.heading")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                {t("consulting.body")}
              </p>
            </div>
          </SectionReveal>
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
