import { T } from "../data/colors.js";

/**
 * Horizontal strip of KPI cards shown at the top of each report section.
 * items: Array<{ value: string, label: string, note?: string }>
 */
export default function StatStrip({ items }) {
  if (!items?.length) return null;
  return (
    <div style={{
      display: "flex", gap: 10, flexWrap: "wrap",
      margin: "0 0 22px",
    }}>
      {items.map((item, i) => (
        <div key={i} style={{
          background: T.surface,
          border: `1px solid ${T.line}`,
          borderLeft: `3px solid ${T.lavender}`,
          borderRadius: 14,
          padding: "12px 16px",
          minWidth: 140,
          flex: "1 1 140px",
          boxShadow: "0 1px 2px rgba(168,143,191,0.05)",
        }}>
          <div className="serif num" style={{
            fontSize: 22, fontWeight: 600, color: T.lavender,
            lineHeight: 1.1, letterSpacing: -0.3,
          }}>
            {item.value}
          </div>
          <div style={{
            fontSize: 11.5, color: T.ink, fontWeight: 600,
            marginTop: 5, lineHeight: 1.4,
          }}>
            {item.label}
          </div>
          {item.note && (
            <div style={{ fontSize: 10.5, color: T.inkSoft, marginTop: 3, lineHeight: 1.4 }}>
              {item.note}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
