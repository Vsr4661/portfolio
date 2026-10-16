import { ImageResponse } from "next/og";

export const alt = "VAIBHAV ORIGINALS — Vaibhav Singh Rathore, Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(80% 90% at 100% 0%, #5a0a0f 0%, #141414 60%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 44, fontWeight: 800, color: "#E50914", letterSpacing: 2 }}>VAIBHAV</div>
          <div style={{ fontSize: 16, letterSpacing: 12, color: "#d9d9d9" }}>ORIGINALS</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1 }}>Vaibhav Singh Rathore</div>
          <div style={{ marginTop: 20, fontSize: 34, color: "#b3b3b3" }}>
            Software Developer · Web &amp; Mobile Applications
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 24, color: "#b3b3b3" }}>
          <span>React</span>
          <span>·</span>
          <span>React Native</span>
          <span>·</span>
          <span>TypeScript</span>
          <span>·</span>
          <span>B.Tech CSE 2025</span>
        </div>
      </div>
    ),
    size,
  );
}
