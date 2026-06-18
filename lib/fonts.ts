import { IBM_Plex_Sans_Arabic, IBM_Plex_Sans, Fraunces } from "next/font/google";

/**
 * Self-hosted fonts (downloaded & inlined at build time by next/font — no runtime
 * external requests, automatic size-adjust fallbacks to avoid layout shift).
 *
 * - Arabic (root locale): IBM Plex Sans Arabic — refined, modern, full weight range.
 * - Latin body (/en): IBM Plex Sans — clean superfamily companion.
 * - Latin display (/en headings): Fraunces — editorial-luxury variable serif.
 */
export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export const plexLatin = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-latin",
  display: "swap",
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
});

/** Combined font-variable class applied to <html>. */
export const fontVariables = `${plexArabic.variable} ${plexLatin.variable} ${fraunces.variable}`;
