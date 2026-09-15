import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: "Commercial debt collection, amicable settlements, legal recovery, and international collections from Muscat, Oman.",
    start_url: "/ar",
    display: "standalone",
    background_color: "#eff3f9",
    theme_color: "#0e2a47",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
