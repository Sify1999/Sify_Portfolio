import { ImageResponse } from "next/og";

export const alt = "Sify — Software, built end to end.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  const bars = Array.from({ length: 56 }, (_, i) => {
    const x = i / 55;
    return 20 + Math.round(150 * Math.sin(Math.PI * x) * (0.55 + 0.45 * Math.abs(Math.sin(i * 0.9))));
  });
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0c0d16", color: "#ece8e1" }}>
        <div style={{ fontSize: 34, color: "#9392a1" }}>Sify</div>
        <div style={{ fontSize: 112, lineHeight: 1, letterSpacing: -2 }}>Software, built end to end.</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, height: 180 }}>
          {bars.map((h, i) => (
            <div key={i} style={{ width: 12, height: h, background: i % 9 === 4 ? "#e8c27a" : "#7e42e6", opacity: 0.4 + h / 260 }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
