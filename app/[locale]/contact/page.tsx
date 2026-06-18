import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, Mail, Phone, Handshake } from "lucide-react";

import type { Locale } from "@/i18n/routing";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SITE, LINKS } from "@/lib/site";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { JsonLd } from "@/components/seo/JsonLd";

import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { CTABanner } from "@/components/sections/CTABanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return buildMetadata({ locale, path: "/contact", title: t("title"), description: t("description") });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const location = locale === "ar" ? SITE.location.ar : SITE.location.en;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: nav("home"), path: "" },
          { name: nav("contact"), path: "/contact" },
        ])}
      />

      <PageHero kicker={location} title={t("title")} subtitle={t("intro")} />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <SectionReveal>
              <ContactForm />
            </SectionReveal>

            <SectionReveal delay={0.1} className="flex flex-col gap-6">
              <ContactFacts />
              <MapEmbed className="min-h-[280px] flex-1" />
            </SectionReveal>
          </div>
        </Container>
      </section>

      <PartnershipBand />
      <CTABanner />
    </>
  );
}

function ContactFacts() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const location = locale === "ar" ? SITE.location.ar : SITE.location.en;

  const facts = [
    { icon: MapPin, label: location, href: LINKS.mapsDirections, ltr: false },
    { icon: Mail, label: SITE.email, href: LINKS.email, ltr: true },
    { icon: Phone, label: SITE.phoneDisplay, href: LINKS.phone, ltr: true },
  ];

  return (
    <div className="rounded-3xl border border-border bg-surface p-6 shadow-elevated sm:p-8">
      <h2 className="text-lg font-semibold">{t("factsHeading")}</h2>
      <ul className="mt-5 space-y-3">
        {facts.map((f, i) => {
          const Icon = f.icon;
          return (
            <li key={i}>
              <a
                href={f.href}
                target={f.href.startsWith("http") ? "_blank" : undefined}
                rel={f.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-surface-2"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy-700/8 text-navy-700 dark:bg-gold-300/10 dark:text-gold-300">
                  <Icon className="size-5" />
                </span>
                <span dir={f.ltr ? "ltr" : undefined} className="font-medium">
                  {f.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PartnershipBand() {
  const t = useTranslations("contact.partnership");
  return (
    <section className="pb-4">
      <Container>
        <SectionReveal className="relative overflow-hidden rounded-3xl border border-gold-400/30 bg-gold-400/10 px-6 py-12 text-center sm:px-12 sm:py-16">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-gold-400 text-navy-900">
            <Handshake className="size-7" />
          </span>
          <h2 className="mx-auto mt-6 max-w-2xl text-balance text-2xl font-bold sm:text-3xl">
            {t("heading")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">{t("sub")}</p>
          <Button asChild variant="primary" size="lg" withArrow className="mt-8">
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer">{t("button")}</a>
          </Button>
        </SectionReveal>
      </Container>
    </section>
  );
}
