import { C } from "../data/colors.js";
import { extractPartHeadings } from "../utils/mdSplit.js";

/**
 * Horizontal "Jump to Part" bar, auto-generated from markdown source.
 * Only renders if the source contains 2+ PHẦN/PART headings.
 */
export default function PartNav({ source }) {
  const parts = extractPartHeadings(source);
  if (parts.length < 2) return null;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap",
      background: `${C.accent}0d`,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: "8px 12px",
      margin: "0 0 16px",
    }}>
      <span style={{
        fontSize: 10, color: C.muted, fontWeight: 700,
        textTransform: "uppercase", letterSpacing: 1.2,
        marginRight: 4, whiteSpace: "nowrap",
      }}>
        Jump to
      </span>
      {parts.map((p) => (
        <button
          key={p.id}
          onClick={() => scrollTo(p.id)}
          style={{
            background: "transparent",
            border: `1px solid ${C.accent}50`,
            borderRadius: 5,
            color: C.accent,
            fontSize: 11,
            fontWeight: 600,
            padding: "3px 9px",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {p.letter} · {p.shortLabel}
        </button>
      ))}
    </div>
  );
}
