import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { FileText } from "lucide-react";

import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { LINKS } from "@/lib/site";
import { PROCESS_STEPS } from "@/lib/content";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { InfinityGlyph } from "@/components/motion/InfinityGlyph";

import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { CTABanner } from "@/components/sections/CTABanner";
import { Testimonials } from "@/components/sections/Testimonials";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  const keywords = t.has("keywords") ? t("keywords") : undefined;
  return buildMetadata({ locale, path: "", title: t("title"), description: t("description"), keywords });
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Stats />
      <AboutBand />
      <ServiceCards />
      <ServicesBand />
      <ProcessBand />
      <CTABanner />
      <Testimonials />
    </>
  );
}

function AboutBand() {
  const t = useTranslations("home.about");
  return (
    <section className="bg-grain relative overflow-hidden py-20 lg:py-28">
      <Container>
        <SectionReveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <InfinityGlyph className="h-12 w-24 text-gold-400" />
          <p className="mt-8 text-balance text-2xl font-medium leading-relaxed text-foreground sm:text-3xl sm:leading-[1.5]">
            {t("body")}
          </p>
        </SectionReveal>
      </Container>
    </section>
  );
}

function ServicesBand() {
  const t = useTranslations("home.servicesBand");
  return (
    <section className="relative overflow-hidden bg-surface-2/60 py-20 lg:py-28">
      <InfinityGlyph
        className="pointer-events-none absolute -end-10 top-1/2 hidden h-64 w-[28rem] -translate-y-1/2 text-gold-400/15 lg:block"
        animate={false}
      />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <SectionHeading kicker={t("kicker")} heading={t("heading")} />
          <SectionReveal delay={0.1} className="lg:ps-8">
            <p className="text-lg leading-relaxed text-muted">{t("body")}</p>
            <Button asChild variant="gold" size="lg" className="mt-8">
              <a href={LINKS.companyProfile} target="_blank" rel="noopener noreferrer">
                <FileText className="size-5" />
                {t("button")}
              </a>
            </Button>
          </SectionReveal>
        </div>
      </Container>
    </section>
  );
}

function ProcessBand() {
  const t = useTranslations("home.process");
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading kicker={t("kicker")} heading={t("heading")} sub={t("sub")} className="mb-14 max-w-3xl" />
        <div className="mx-auto max-w-3xl">
          <ProcessTimeline ns="home.process" steps={PROCESS_STEPS} />
        </div>
      </Container>
    </section>
  );
}
