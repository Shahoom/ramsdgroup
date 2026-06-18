import { useTranslations } from "next-intl";
import { Eye, Compass } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/SectionReveal";

/** Vision + Mission pair. Reads {ns}.vision.* and {ns}.mission.*. */
export function VisionMission({ ns }: { ns: "debt" | "travel" | "about" }) {
  const t = useTranslations(ns);

  const cards = [
    { key: "vision", icon: Eye },
    { key: "mission", icon: Compass },
  ] as const;

  return (
    <Stagger className="grid gap-6 lg:grid-cols-2">
      {cards.map(({ key, icon: Icon }) => (
        <StaggerItem key={key}>
          <article className="relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-elevated sm:p-10">
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-400 via-gold-300 to-transparent"
            />
            <span className="grid size-14 place-items-center rounded-2xl bg-navy-700 text-mist-50 dark:bg-navy-600">
              <Icon className="size-7" strokeWidth={1.75} />
            </span>
            <h3 className="mt-6 text-2xl font-bold">{t(`${key}.title`)}</h3>
            <p className="mt-4 leading-relaxed text-muted">{t(`${key}.body`)}</p>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
