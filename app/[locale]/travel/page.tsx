import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Check, Globe } from "lucide-react";

import type { Locale } from "@/i18n/routing";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { VISA_DESTINATIONS, VISA_SERVICES, VISA_PROCESS, VISA_WHY } from "@/lib/content";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookingButton } from "@/components/ui/BookingButton";
import { SectionReveal, Stagger, StaggerItem } from "@/components/motion/SectionReveal";
import { JsonLd } from "@/components/seo/JsonLd";

import { PageHero } from "@/components/sections/PageHero";
import { VisionMission } from "@/components/sections/VisionMission";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { FAQ } from "@/components/sections/FAQ";
import { CTABanner } from "@/components/sections/CTABanner";
import { Testimonials } from "@/components/sections/Testimonials";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.travel" });
  const keywords = t.has("keywords") ? t("keywords") : undefined;
  return buildMetadata({ locale, path: "/travel", title: t("title"), description: t("description"), keywords });
}

export default async function TravelPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "travel" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const meta = await getTranslations({ locale, namespace: "meta.travel" });

  const faqItems = t.raw("faq.items") as { q: string; a: string }[];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale, [
            { name: nav("home"), path: "" },
            { name: nav("travel"), path: "/travel" },
          ]),
          serviceJsonLd(locale, {
            name: meta("title"),
            description: meta("description"),
            path: "/travel",
            serviceType: locale === "ar" ? "خدمات السفر والتأشيرات" : "Travel & visa services",
          }),
          faqJsonLd(faqItems.map(({ q, a }) => ({ q, a }))),
        ]}
      />

      <PageHero kicker={t("hero.kicker")} title={t("hero.title")} subtitle={t("hero.subtitle")}>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <BookingButton size="lg" />
          <a
            href="#destinations"
            className="inline-flex h-14 items-center rounded-full border border-mist-50/30 px-7 text-base font-medium text-mist-50 transition-colors hover:border-mist-50/60 hover:bg-mist-50/10"
          >
            {t("destinations.kicker")}
          </a>
        </div>
      </PageHero>

      {/* Vision & Mission */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading
            align="center"
            kicker={t("intro.kicker")}
            heading={t("intro.heading")}
            sub={t("intro.body")}
            className="mb-14"
          />
          <VisionMission ns="travel" />
        </Container>
      </section>

      {/* Featured destinations: Saudi + Schengen + worldwide */}
      <section id="destinations" className="scroll-mt-24 bg-surface-2/60 py-20 lg:py-28">
        <Container>
          <SectionHeading
            align="center"
            kicker={t("destinations.kicker")}
            heading={t("destinations.heading")}
            sub={t("destinations.sub")}
            className="mb-14"
          />
          <Stagger className="grid gap-6 md:grid-cols-2">
            {VISA_DESTINATIONS.map(({ id, icon: Icon }) => {
              const types = t.raw(`destinations.${id}.types`) as string[];
              const countries =
                id === "schengen" ? (t.raw(`destinations.${id}.countries`) as string[]) : null;
              return (
                <StaggerItem key={id}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-elevated transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/50 sm:p-10">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -end-10 -top-10 size-40 rounded-full bg-gold-400/10 blur-2xl"
                    />
                    <span className="relative grid size-16 place-items-center rounded-2xl bg-navy-700 text-mist-50 shadow-elevated transition-transform duration-500 group-hover:scale-105 dark:bg-navy-600">
                      <Icon className="size-8" strokeWidth={1.75} />
                    </span>
                    <h3 className="relative mt-7 text-2xl font-bold">{t(`destinations.${id}.title`)}</h3>
                    <p className="relative mt-3 leading-relaxed text-muted">
                      {t(`destinations.${id}.body`)}
                    </p>

                    <p className="relative mt-7 text-xs font-semibold uppercase tracking-wider text-gold-600 dark:text-gold-300">
                      {t(`destinations.${id}.typesLabel`)}
                    </p>
                    <ul className="relative mt-3 grid gap-x-5 gap-y-2.5 sm:grid-cols-2">
                      {types.map((ty) => (
                        <li key={ty} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 size-4 shrink-0 text-gold-500" strokeWidth={2.5} />
                          <span>{ty}</span>
                        </li>
                      ))}
                    </ul>

                    {countries && (
                      <>
                        <p className="relative mt-7 text-xs font-semibold uppercase tracking-wider text-gold-600 dark:text-gold-300">
                          {t(`destinations.${id}.countriesLabel`)}
                        </p>
                        <ul className="relative mt-3 flex flex-wrap gap-2">
                          {countries.map((c) => (
                            <li
                              key={c}
                              className="rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-1 text-xs font-medium text-gold-700 dark:text-gold-200"
                            >
                              {c}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    <div className="relative mt-8 pt-2">
                      <BookingButton variant="outline" size="sm" withIcon={false} />
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>

          {/* Worldwide destinations */}
          <SectionReveal className="relative mt-6 overflow-hidden rounded-3xl border border-gold-400/30 bg-gold-400/[0.06] px-6 py-12 text-center sm:px-12 sm:py-14">
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-navy-700 text-mist-50 dark:bg-navy-600">
              <Globe className="size-7" strokeWidth={1.75} />
            </span>
            <p className="mt-5 text-sm font-medium uppercase tracking-wider text-gold-600 dark:text-gold-300">
              {t("worldwide.kicker")}
            </p>
            <h3 className="mx-auto mt-2 max-w-2xl text-balance text-2xl font-bold sm:text-3xl">
              {t("worldwide.heading")}
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-muted">{t("worldwide.body")}</p>
            <ul className="mx-auto mt-7 flex max-w-2xl flex-wrap justify-center gap-2.5">
              {(t.raw("worldwide.regions") as string[]).map((r) => (
                <li
                  key={r}
                  className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium shadow-elevated"
                >
                  {r}
                </li>
              ))}
            </ul>
          </SectionReveal>
        </Container>
      </section>

      {/* Our services — concierge on a navy panel */}
      <section className="relative overflow-hidden">
        <div className="mesh-navy relative isolate py-20 text-mist-50 lg:py-28">
          <TravelMotif />
          <Container className="relative z-10">
            <SectionHeading
              align="center"
              tone="invert"
              kicker={t("services.kicker")}
              heading={t("services.heading")}
              sub={t("services.sub")}
              className="mb-14 [&_p]:text-mist-100/80"
            />
            <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" amount={0.05}>
              {VISA_SERVICES.map(({ id, icon: Icon }) => (
                <StaggerItem key={id}>
                  <div className="group flex h-full items-center gap-4 rounded-2xl border border-mist-50/10 bg-mist-50/[0.04] p-4 backdrop-blur-sm transition-colors duration-300 hover:border-gold-300/40 hover:bg-mist-50/[0.07]">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gold-400/15 text-gold-300 transition-transform duration-300 group-hover:scale-105">
                      <Icon className="size-6" strokeWidth={1.75} />
                    </span>
                    <span className="font-medium leading-snug">{t(`services.items.${id}`)}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading
            kicker={t("process.kicker")}
            heading={t("process.heading")}
            sub={t("process.sub")}
            className="mb-14"
          />
          <div className="mx-auto max-w-3xl">
            <ProcessTimeline ns="travel.process" steps={VISA_PROCESS} />
          </div>
        </Container>
      </section>

      {/* Why RAM (∞) */}
      <section className="bg-surface-2/60 py-20 lg:py-28">
        <Container>
          <SectionHeading
            align="center"
            kicker={t("why.kicker")}
            heading={t("why.heading")}
            className="mb-14"
          />
          <FeatureGrid ns="travel.why" items={VISA_WHY} cols={3} withInfinity />
        </Container>
      </section>

      {/* FAQ — answer-engine optimized */}
      <section className="py-20 lg:py-28">
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

/** Faint travel line-art (dashed flight arcs + dotted grid) behind the services panel. */
function TravelMotif() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 size-full text-gold-300/15"
    >
      <defs>
        <pattern id="visa-dots" width="34" height="34" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="1200" height="600" fill="url(#visa-dots)" opacity="0.5" />
      <path
        d="M-40,470 C 250,300 520,360 760,210 S 1180,120 1320,180"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="2 10"
        strokeLinecap="round"
      />
      <path
        d="M-40,120 C 300,200 540,140 880,260 S 1180,420 1320,360"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="2 10"
        strokeLinecap="round"
      />
      <g fill="currentColor" className="text-gold-300/25">
        <circle cx="760" cy="210" r="5" />
        <circle cx="880" cy="260" r="5" />
        <circle cx="250" cy="300" r="4" />
      </g>
    </svg>
  );
}
