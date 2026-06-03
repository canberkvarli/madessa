import { ImageResponse } from "next/og";

export const alt = "Madessa — Made by a family, for yours";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbf6ee",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
          color: "#2c2622",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 32, letterSpacing: 1 }}>Madessa</div>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#a3673f", textTransform: "uppercase" }}>
            Free shipping over €50
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 100, lineHeight: 1, letterSpacing: -2 }}>
            <span>Made by a&nbsp;</span>
            <span style={{ fontStyle: "italic", color: "#bd7e54" }}>family,</span>
          </div>
          <div style={{ display: "flex", fontSize: 100, lineHeight: 1.1, letterSpacing: -2 }}>for yours.</div>
          <div style={{ display: "flex", fontSize: 30, color: "#5a4f45", marginTop: 28, fontFamily: "sans-serif" }}>
            Handmade details · natural fabrics · little ones &amp; mamas
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["#bd7e54", "#8d9b7e", "#e7c8bb", "#2c2622"].map((c) => (
            <div key={c} style={{ display: "flex", width: 64, height: 8, borderRadius: 4, background: c }} />
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
