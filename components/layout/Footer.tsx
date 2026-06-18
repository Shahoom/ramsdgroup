import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Mail, Phone, MapPin, Megaphone, Navigation } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

import { Link } from "@/i18n/navigation";
import { NAV_ITEMS, LINKS, SITE } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const location = locale === "ar" ? SITE.location.ar : SITE.location.en;

  return (
    <footer className="mesh-navy relative isolate overflow-hidden text-mist-100/85">
      <Container className="relative z-10 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + about */}
          <div className="lg:col-span-5">
            <Link href="/" aria-label={nav("brandAlt")} className="inline-block">
              <Image
                src="/brand/logo-footer.png"
                alt={nav("brandAlt")}
                width={260}
                height={76}
                className="h-14 w-auto object-contain brightness-0 invert drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)] sm:h-16"
              />
            </Link>
            <p className="mt-6 max-w-md leading-relaxed text-mist-100/70">{t("about")}</p>
          </div>

          {/* Explore */}
          <nav className="lg:col-span-3" aria-label="Footer">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gold-300">
              {t("exploreHeading")}
            </h2>
            <ul className="mt-5 space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-mist-100/75 underline-offset-4 transition-colors hover:text-mist-50 hover:underline"
                  >
                    {nav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gold-300">
              {t("contactHeading")}
            </h2>
            <ul className="mt-5 space-y-4 text-mist-100/80">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-gold-300" />
                <span className="flex flex-col">
                  <span>{location}</span>
                  <a
                    href={LINKS.mapsDirections}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1.5 text-sm text-gold-300 underline-offset-4 hover:underline"
                  >
                    <Navigation className="size-3.5" />
                    {t("directions")}
                  </a>
                </span>
              </li>
              <li>
                <a
                  href={LINKS.email}
                  className="flex items-center gap-3 transition-colors hover:text-mist-50"
                >
                  <Mail className="size-5 shrink-0 text-gold-300" />
                  <span dir="ltr">{SITE.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={LINKS.phone}
                  className="flex items-center gap-3 transition-colors hover:text-mist-50"
                >
                  <Phone className="size-5 shrink-0 text-gold-300" />
                  <span dir="ltr">{SITE.phoneDisplay}</span>
                </a>
              </li>
            </ul>

            <h2 className="mt-8 text-sm font-semibold uppercase tracking-wider text-gold-300">
              {t("followHeading")}
            </h2>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid size-11 place-items-center rounded-full border border-mist-50/15 transition-colors hover:border-gold-300 hover:text-gold-300"
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                href={LINKS.whatsappChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-mist-50/15 px-4 py-2.5 text-sm transition-colors hover:border-gold-300 hover:text-gold-300"
              >
                <Megaphone className="size-4" />
                {t("channel")}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-mist-50/10 pt-8 sm:flex-row">
          <p className="text-sm text-mist-100/60">{t("rights")}</p>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </footer>
  );
}
