import type { Metadata } from "next";
import { SITE, LINKS } from "./site";
import type { Locale } from "@/i18n/routing";

/** Absolute URL for a given locale + path ("" = home). */
export function localizedUrl(locale: Locale, path = "") {
  const clean = path.replace(/^\//, "");
  const prefix = locale === "en" ? "/en" : "";
  const suffix = clean ? `/${clean}` : "";
  return `${SITE.url}${prefix}${suffix}` || SITE.url;
}

type BuildMetadataArgs = {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  keywords?: string;
};

/**
 * Build per-page metadata with localized title/description, canonical URL,
 * hreflang alternates between `ar` (root) and `en` (/en), and Open Graph / Twitter cards.
 */
export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  keywords,
}: BuildMetadataArgs): Metadata {
  const canonical = localizedUrl(locale, path);

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical,
      languages: {
        ar: localizedUrl("ar", path),
        en: localizedUrl("en", path),
        "x-default": localizedUrl("ar", path),
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: locale === "ar" ? "ar_OM" : "en_US",
      url: canonical,
      title,
      description,
      // OG/Twitter images are supplied by the file-based `opengraph-image` convention.
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/** schema.org Organization + LocalBusiness graph. */
export function organizationJsonLd(locale: Locale) {
  const description =
    locale === "ar"
      ? "رام للتنمية المستدامة — أفضل شركة تحصيل ديون في مسقط، سلطنة عُمان. نقدّم خدمات تحصيل الديون الاحترافية من الشركات والأفراد، والاستشارات المالية، وتنفيذ الأحكام المدنية العابرة للحدود. مرخصون بوزارة التجارة العُمانية."
      : "RAM Sustainable Development — best debt collection company in Muscat, Oman. Licensed by the Ministry of Commerce. Professional debt collection from companies and individuals, financial advisory, and cross-border civil judgment enforcement.";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        alternateName: SITE.nameAr,
        url: SITE.url,
        email: SITE.email,
        telephone: SITE.phoneE164,
        logo: `${SITE.url}/brand/logo.png`,
        description,
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory:
            locale === "ar"
              ? "مرخصون لدى وزارة التجارة والصناعة وترويج الاستثمار في سلطنة عُمان"
              : "Licensed by the Ministry of Commerce, Industry and Investment Promotion of the Sultanate of Oman",
        },
        knowsAbout:
          locale === "ar"
            ? [
                "تحصيل الديون",
                "استرداد الديون المتعثرة",
                "تنفيذ الأحكام المدنية العابرة للحدود",
                "خدمات التأشيرات",
                "تأشيرة شنغن",
                "تأشيرات السعودية",
              ]
            : [
                "Debt collection",
                "Bad debt recovery",
                "Cross-border civil judgment enforcement",
                "Visa services",
                "Schengen visa",
                "Saudi Arabia visas",
              ],
        sameAs: [LINKS.instagram, LINKS.whatsappChannel],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE.url}/#localbusiness`,
        name: SITE.name,
        image: `${SITE.url}/brand/logo.png`,
        url: SITE.url,
        email: SITE.email,
        telephone: SITE.phoneE164,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Muscat",
          addressCountry: "OM",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: SITE.location.lat,
          longitude: SITE.location.lng,
        },
        areaServed: [
          { "@type": "Country", name: "Oman" },
          { "@type": "Place", name: "International" },
        ],
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory:
            locale === "ar"
              ? "مرخصون لدى وزارة التجارة والصناعة وترويج الاستثمار في سلطنة عُمان"
              : "Licensed by the Ministry of Commerce, Industry and Investment Promotion of the Sultanate of Oman",
        },
        sameAs: [LINKS.instagram, LINKS.whatsappChannel],
      },
    ],
  };
}

/** schema.org BreadcrumbList for an inner page (helps AI + rich results). */
export function breadcrumbJsonLd(locale: Locale, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: localizedUrl(locale, it.path),
    })),
  };
}

/** schema.org FAQPage from Q&A pairs — extractable by AI answer engines. */
export function faqJsonLd(qa: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** schema.org Service offered by RAM. */
export function serviceJsonLd(
  locale: Locale,
  opts: { name: string; description: string; path: string; serviceType: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    url: localizedUrl(locale, opts.path),
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: { "@type": "Country", name: "Oman" },
    availableLanguage: ["ar", "en"],
  };
}
