import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Branded favicon: gold "R" on deep pine. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#0e2a47,#07182b)",
          color: "#dab75e",
          fontSize: "42px",
          fontWeight: 800,
          fontFamily: "serif",
          borderRadius: "14px",
        }}
      >
        R
      </div>
    ),
    size,
  );
}
