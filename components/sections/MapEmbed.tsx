import { useTranslations } from "next-intl";
import { Navigation } from "lucide-react";
import { LINKS } from "@/lib/site";

/** Office map with a "Get directions" action. */
export function MapEmbed({ className }: { className?: string }) {
  const t = useTranslations("contact");
  const tf = useTranslations("footer");

  return (
    <figure
      className={`group relative overflow-hidden rounded-3xl border border-border shadow-elevated ${className ?? ""}`}
    >
      <iframe
        src={LINKS.mapsEmbed}
        title={t("mapHeading")}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full min-h-[320px] w-full border-0 grayscale-[0.2] transition-[filter] duration-500 group-hover:grayscale-0"
      />
      <a
        href={LINKS.mapsDirections}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 end-4 inline-flex items-center gap-2 rounded-full bg-surface/95 px-4 py-2.5 text-sm font-medium text-navy-700 shadow-elevated backdrop-blur transition-colors hover:bg-surface dark:text-gold-300"
      >
        <Navigation className="size-4" />
        {tf("directions")}
      </a>
    </figure>
  );
}
