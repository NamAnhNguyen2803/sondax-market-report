import { T } from "../data/colors.js";

export default function KPI({ label, value, sub, icon }) {
  return (
    <div style={{
      background: T.surface,
      borderRadius: 16,
      padding: "16px 20px",
      border: `1px solid ${T.line}`,
      flex: "1 1 180px",
      minWidth: 160,
      boxShadow: "0 1px 2px rgba(168,143,191,0.06)",
    }}>
      <div style={{
        fontSize: 10, color: T.lavender, marginBottom: 4,
        textTransform: "uppercase", letterSpacing: 1.4, fontWeight: 700,
      }}>
        {icon} {label}
      </div>
      <div className="serif num" style={{
        fontSize: 26, fontWeight: 600, color: T.ink, lineHeight: 1.15,
      }}>{value}</div>
      {sub && (
        <div style={{ fontSize: 11.5, color: T.peach, marginTop: 4, fontWeight: 600 }}>
          {sub}
        </div>
      )}
    </div>
  );
}
