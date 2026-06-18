import type { MetadataRoute } from "next";
import { localizedUrl } from "@/lib/seo";

const PATHS = ["", "/about", "/travel", "/debt", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of PATHS) {
    const alts = {
      ar: localizedUrl("ar", path),
      en: localizedUrl("en", path),
    };
    // Arabic (canonical)
    entries.push({
      url: localizedUrl("ar", path),
      lastModified,
      changeFrequency: "monthly",
      priority: path === "" ? 1 : 0.8,
      alternates: { languages: alts },
    });
    // English
    entries.push({
      url: localizedUrl("en", path),
      lastModified,
      changeFrequency: "monthly",
      priority: path === "" ? 0.9 : 0.7,
      alternates: { languages: alts },
    });
  }

  return entries;
}
