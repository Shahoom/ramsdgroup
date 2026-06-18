import { useTranslations } from "next-intl";
import { Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BookingButton } from "@/components/ui/BookingButton";
import { ThreadBackground } from "@/components/motion/ThreadBackground";
import { SectionReveal } from "@/components/motion/SectionReveal";

/** Shared call-to-action banner used on every page. "Time is the thread…" */
export function CTABanner() {
  const t = useTranslations("cta");

  return (
    <section className="relative isolate overflow-hidden bg-navy-800">
      <div className="mesh-navy absolute inset-0 opacity-90" aria-hidden />
      <ThreadBackground variant="divider" tone="dark" />
      <Container className="relative z-10 py-20 lg:py-28">
        <SectionReveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-300/30 bg-navy-950/30 px-4 py-1.5 text-sm text-gold-200">
            <Clock className="size-4" />
            {t("sub")}
          </span>
          <h2 className="text-balance text-3xl font-bold leading-tight text-mist-50 sm:text-4xl lg:text-5xl lg:leading-[1.2]">
            {t("heading")}
          </h2>
          <div className="mt-10">
            <BookingButton label={t("button")} size="lg" variant="gold" />
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
