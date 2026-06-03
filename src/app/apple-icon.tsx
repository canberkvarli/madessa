import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2c2622",
          color: "#f5ece0",
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          fontSize: 116,
        }}
      >
        M
      </div>
    ),
    { ...size },
  );
}
