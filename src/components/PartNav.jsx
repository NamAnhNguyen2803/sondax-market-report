import { T } from "../data/colors.js";
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
      background: T.lavenderSoft,
      border: `1px solid ${T.line}`,
      borderRadius: 12,
      padding: "10px 14px",
      margin: "0 0 18px",
    }}>
      <span style={{
        fontSize: 10, color: T.lavender, fontWeight: 800,
        textTransform: "uppercase", letterSpacing: 1.4,
        marginRight: 6, whiteSpace: "nowrap",
      }}>
        Jump to
      </span>
      {parts.map((p) => (
        <button
          key={p.id}
          onClick={() => scrollTo(p.id)}
          style={{
            background: T.surface,
            border: `1px solid ${T.lavender}66`,
            borderRadius: 999,
            color: T.lavenderInk,
            fontSize: 11.5,
            fontWeight: 700,
            padding: "3px 11px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            fontFamily: "inherit",
          }}
        >
          {p.letter} · {p.shortLabel}
        </button>
      ))}
    </div>
  );
}
