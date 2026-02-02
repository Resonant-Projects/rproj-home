import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Keith Elliott - Full-Stack Developer & Audio Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, #09090b 0%, #1a1a2e 50%, #16213e 100%)",
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
            color: "#a855f7",
            marginBottom: 40,
          }}
        >
          Full-Stack Developer & Audio Engineer
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#9ca3af",
          }}
        >
          resonantprojects.art
        </div>
      </div>
    ),
    { ...size }
  );
}
