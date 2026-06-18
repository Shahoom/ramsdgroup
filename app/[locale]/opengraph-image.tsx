import { ImageResponse } from "next/og";
import { routing } from "@/i18n/routing";

export const alt = "RAM Sustainable Development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Branded OG card. Locale-agnostic (Latin) to avoid embedding Arabic webfonts.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(1200px 600px at 12% -10%, #1b4670 0%, transparent 55%), radial-gradient(900px 600px at 100% 120%, #0a2038 0%, transparent 60%), #07182b",
          color: "#eef2f8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "#c9a24b",
              color: "#07182b",
              fontSize: "34px",
              fontWeight: 800,
            }}
          >
            R
          </div>
          <div style={{ fontSize: "26px", letterSpacing: "6px", color: "#dab75e" }}>
            R . A . M
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "76px", fontWeight: 800, lineHeight: 1.05 }}>
            RAM Sustainable
          </div>
          <div style={{ fontSize: "76px", fontWeight: 800, lineHeight: 1.05, color: "#dab75e" }}>
            Development
          </div>
          <div style={{ marginTop: "28px", fontSize: "30px", color: "#c3cede", maxWidth: "820px" }}>
            The thread connecting law &amp; economics — consulting, project management &amp; debt
            collection in Muscat, Oman.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ height: "3px", width: "180px", background: "linear-gradient(90deg,#c9a24b,transparent)" }} />
          <div style={{ fontSize: "24px", color: "#93a6bd" }}>ramsdgroup.com</div>
        </div>
      </div>
    ),
    size,
  );
}
