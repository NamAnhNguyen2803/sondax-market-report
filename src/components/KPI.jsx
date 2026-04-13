import { C } from "../data/colors.js";

export default function KPI({ label, value, sub, icon }) {
  return (
    <div style={{ background: C.card, borderRadius: 12, padding: "16px 20px", border: `1px solid ${C.border}`, flex: "1 1 180px", minWidth: 160 }}>
      <div style={{ fontSize: 10, color: C.muted, marginBottom: 3, textTransform: "uppercase", letterSpacing: 1 }}>
        {icon} {label}
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: C.accent, marginTop: 3 }}>{sub}</div>}
    </div>
  );
}
