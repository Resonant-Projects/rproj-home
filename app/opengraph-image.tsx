import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Keith Elliott - Full-Stack Developer & Audio Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #2c1028 0%, #6e2765 50%, #7e3775 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: 20,
        }}
      >
        Keith Elliott
      </div>
      <div
        style={{
          fontSize: 36,
          color: "#a87da3",
          marginBottom: 40,
        }}
      >
        Full-Stack Developer & Audio Engineer
      </div>
      <div
        style={{
          fontSize: 24,
          color: "#e2d4e0",
        }}
      >
        resonantprojects.art
      </div>
    </div>,
    { ...size },
  );
}
