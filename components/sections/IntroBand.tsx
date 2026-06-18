import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { VisionMission } from "./VisionMission";

/** Shared intro band for the Project & Debt pages: dual eyebrow + Vision/Mission. */
export function IntroBand({ ns }: { ns: "debt" }) {
  const t = useTranslations(`${ns}.band1`);

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionReveal className="mb-14 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 px-4 py-1.5 text-sm font-medium text-gold-600 dark:text-gold-300">
            {t("kicker")}
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold sm:text-4xl lg:text-5xl">
            {t("heading")}
          </h2>
        </SectionReveal>

        <SectionHeading
          kicker={t("kicker2")}
          heading={t("heading2")}
          align="center"
          className="mb-12"
        />
        <VisionMission ns={ns} />
      </Container>
    </section>
  );
}
