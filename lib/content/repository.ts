import { seedEntries } from "@/lib/content/seed-content";
import type { EntryType, Locale, LocalizedEntry } from "@/lib/content/schema";
import { listPublishedEntries } from "@/lib/content/supabase-repository";

export async function listEntries({ type, locale }: { type?: EntryType; locale: Locale }) {
  const remote = await listPublishedEntries(type, locale);
  const seeded = seedEntries.filter((entry) => entry.locale === locale && (!type || entry.type === type));
  return mergeContentEntries(seeded, remote);
}

export function mergeContentEntries(seeded: LocalizedEntry[], remote: LocalizedEntry[]) {
  const remoteKeys = new Set(remote.map((entry) => `${entry.type}:${entry.locale}:${entry.slug}`));
  return [
    ...remote,
    ...seeded.filter((entry) => !remoteKeys.has(`${entry.type}:${entry.locale}:${entry.slug}`)),
  ];
}

export async function getEntryBySlug(type: EntryType, locale: Locale, slug: string) {
  return (await listEntries({ type, locale })).find((entry) => entry.slug === slug) ?? null;
}

export async function listFeaturedEntries(type: EntryType, locale: Locale, limit = 3) {
  return (await listEntries({ type, locale })).slice(0, limit);
}

export async function listRelatedEntries(entry: LocalizedEntry, limit = 3) {
  return (await listEntries({ type: entry.type, locale: entry.locale }))
    .filter((candidate) => candidate.slug !== entry.slug)
    .slice(0, limit);
}

export async function getSiteSettings(locale: Locale) {
  return { locale, established: "2018", experienceSince: "2012", metricsVerified: false };
}
