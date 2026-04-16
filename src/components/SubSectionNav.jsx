import { C } from "../data/colors.js";
import { headingToId } from "../utils/mdSplit.js";

/**
 * Horizontal jump-to bar generated from ## headings in markdown.
 * Renders only when source has 3+ ## headings.
 */
export default function SubSectionNav({ source }) {
  const items = [];
  for (const line of source.split("\n")) {
    const m = line.match(/^## (.+)/);
    if (m) {
      const raw = m[1].trim();
      // shorten: "9.1 Action Matrix — 18 Tour Recommendations" → "9.1 Action Matrix"
      const short = raw
        .replace(/\s*[—–-]\s*.{20,}$/, "")   // drop long subtitles
        .replace(/\(.*?\)/g, "")              // drop parenthetical
        .trim()
        .slice(0, 36);
      items.push({ id: headingToId(raw), label: short });
    }
  }
  if (items.length < 3) return null;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap",
      background: `${C.card}`,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: "8px 12px",
      margin: "0 0 16px",
      position: "sticky",
      top: 0,
      zIndex: 10,
    }}>
      <span style={{
        fontSize: 9, color: C.muted, fontWeight: 700,
        textTransform: "uppercase", letterSpacing: 1.2,
        marginRight: 4, whiteSpace: "nowrap",
      }}>
        Sections
      </span>
      {items.map((p) => (
        <button
          key={p.id}
          onClick={() => scrollTo(p.id)}
          style={{
            background: "transparent",
            border: `1px solid ${C.accent}40`,
            borderRadius: 5,
            color: C.accent,
            fontSize: 10,
            fontWeight: 600,
            padding: "3px 8px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "background .15s",
          }}
          onMouseEnter={(e) => e.target.style.background = `${C.accent}20`}
          onMouseLeave={(e) => e.target.style.background = "transparent"}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
