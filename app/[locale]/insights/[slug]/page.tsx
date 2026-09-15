import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { articleJsonLd, buildMetadata } from "@/lib/seo";
import { getEntryBySlug, listEntries } from "@/lib/content/repository";
import { EntryDetail } from "@/components/content/EntryDetail";
import { JsonLd } from "@/components/seo/JsonLd";
export async function generateStaticParams() { const entries = await listEntries({ type: "article", locale: "en" }); return ["ar", "en"].flatMap((locale) => entries.map((e) => ({ locale, slug: e.slug }))); }
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> { const { locale, slug } = await params; const entry = await getEntryBySlug("article", locale, slug); if (!entry) return {}; return buildMetadata({ locale, path: `/insights/${slug}`, title: `${entry.title} | RAM`, description: entry.excerpt }); }
export default async function ArticlePage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) { const { locale, slug } = await params; const entry = await getEntryBySlug("article", locale, slug); if (!entry) notFound(); return <><JsonLd data={articleJsonLd(locale, entry)} /><EntryDetail entry={entry} /></>; }
