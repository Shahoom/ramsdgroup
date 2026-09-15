import { seedEntries } from "@/lib/content/seed-content";
import type { EntryType, Locale } from "@/lib/content/schema";
import { listPublishedEntries } from "@/lib/content/supabase-repository";

export async function listEntries({ type, locale }: { type?: EntryType; locale: Locale }) {
  const remote = await listPublishedEntries(type, locale);
  return remote.length ? remote : seedEntries.filter((entry) => entry.locale === locale && (!type || entry.type === type));
}

export async function getEntryBySlug(type: EntryType, locale: Locale, slug: string) {
  return (await listEntries({ type, locale })).find((entry) => entry.slug === slug) ?? null;
}

export async function listFeaturedEntries(type: EntryType, locale: Locale, limit = 3) {
  return (await listEntries({ type, locale })).slice(0, limit);
}

export async function getSiteSettings(locale: Locale) {
  return { locale, established: "2018", experienceSince: "2012", metricsVerified: false };
}
