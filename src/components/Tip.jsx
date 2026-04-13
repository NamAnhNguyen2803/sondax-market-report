import { C } from "../data/colors.js";

export default function Tip({ active, payload, label }) {
  if (!active || !payload) return null;
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 12 }}>
      <p style={{ color: C.text, fontWeight: 600, marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || p.fill, margin: "2px 0" }}>
          {p.name}: <strong>{typeof p.value === "number" ? p.value.toLocaleString("vi-VN") : p.value}</strong>
        </p>
      ))}
    </div>
  );
}
