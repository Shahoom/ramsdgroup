import type { MetadataRoute } from "next";
import { localizedUrl } from "@/lib/seo";
import { seedEntries } from "@/lib/content/seed-content";

const STATIC_PATHS = ["", "/services", "/industries", "/how-we-work", "/compliance-and-confidentiality", "/about", "/insights", "/case-studies", "/faq", "/contact", "/privacy", "/terms", "/disclaimer"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...STATIC_PATHS, ...new Set(seedEntries.map((e) => `${e.type === "article" ? "/insights" : e.type === "service" ? "/services" : "/industries"}/${e.slug}`))];
  return paths.flatMap((path) => (["ar", "en"] as const).map((locale) => ({ url: localizedUrl(locale, path), lastModified: new Date("2026-09-15T00:00:00.000Z"), changeFrequency: path.startsWith("/insights") ? "monthly" as const : "yearly" as const, priority: path === "" ? 1 : path.split("/").length <= 2 ? 0.8 : 0.7, alternates: { languages: { ar: localizedUrl("ar", path), en: localizedUrl("en", path), "x-default": `https://www.ramsdgroup.com${path}` } } })));
}
