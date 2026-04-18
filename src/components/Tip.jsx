import { T } from "../data/colors.js";

export default function Tip({ active, payload, label }) {
  if (!active || !payload) return null;
  return (
    <div style={{
      background: T.surface,
      border: `1px solid ${T.line}`,
      borderRadius: 12,
      padding: "10px 14px",
      fontSize: 12,
      boxShadow: "0 8px 20px -12px rgba(168,143,191,0.4)",
    }}>
      <p style={{ color: T.ink, fontWeight: 700, marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || p.fill, margin: "2px 0", fontWeight: 600 }}>
          {p.name}: <strong style={{ color: T.ink }}>{typeof p.value === "number" ? p.value.toLocaleString("vi-VN") : p.value}</strong>
        </p>
      ))}
    </div>
  );
}
