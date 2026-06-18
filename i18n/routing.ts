import { defineRouting } from "next-intl/routing";

/**
 * Routing model:
 * - Arabic (`ar`) is the DEFAULT locale and is served at the ROOT with no prefix:
 *     /, /about, /travel, /debt, /contact
 * - English (`en`) is served under the `/en` prefix:
 *     /en, /en/about, /en/travel, /en/debt, /en/contact
 *
 * `localePrefix: "as-needed"` gives the default locale a clean, prefix-free URL.
 * `localeDetection: false` keeps the root deterministic (always Arabic) instead of
 * redirecting visitors to `/en` based on their Accept-Language header.
 */
export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localePrefix: "as-needed",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
