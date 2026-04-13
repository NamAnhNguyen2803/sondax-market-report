import { C } from "../data/colors.js";

/**
 * Horizontal strip of KPI cards shown at the top of each report section.
 * items: Array<{ value: string, label: string, note?: string }>
 */
export default function StatStrip({ items }) {
  if (!items?.length) return null;
  return (
    <div style={{
      display: "flex", gap: 8, flexWrap: "wrap",
      margin: "0 0 18px",
    }}>
      {items.map((item, i) => (
        <div key={i} style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderLeft: `3px solid ${C.accent}`,
          borderRadius: 8,
          padding: "10px 14px",
          minWidth: 120,
          flex: "1 1 120px",
        }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: C.accent, lineHeight: 1.1, letterSpacing: -0.5 }}>
            {item.value}
          </div>
          <div style={{ fontSize: 11, color: C.text, fontWeight: 600, marginTop: 4, lineHeight: 1.4 }}>
            {item.label}
          </div>
          {item.note && (
            <div style={{ fontSize: 10, color: C.muted, marginTop: 2, lineHeight: 1.3 }}>
              {item.note}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
