import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description:
      "Consulting, project management & debt collection in Muscat, Oman — RAM Sustainable Development.",
    start_url: "/",
    display: "standalone",
    background_color: "#eff3f9",
    theme_color: "#0e2a47",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  };
}
