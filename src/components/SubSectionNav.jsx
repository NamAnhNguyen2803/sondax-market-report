import { T } from "../data/colors.js";
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
      const short = raw
        .replace(/\s*[—–-]\s*.{20,}$/, "")
        .replace(/\(.*?\)/g, "")
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
      background: T.surface,
      border: `1px solid ${T.line}`,
      borderRadius: 12,
      padding: "9px 14px",
      margin: "0 0 18px",
      position: "sticky",
      top: 0,
      zIndex: 10,
    }}>
      <span style={{
        fontSize: 9.5, color: T.lavender, fontWeight: 800,
        textTransform: "uppercase", letterSpacing: 1.4,
        marginRight: 6, whiteSpace: "nowrap",
      }}>
        Sections
      </span>
      {items.map((p) => (
        <button
          key={p.id}
          onClick={() => scrollTo(p.id)}
          style={{
            background: "transparent",
            border: `1px solid ${T.lavender}55`,
            borderRadius: 999,
            color: T.lavenderInk,
            fontSize: 10.5,
            fontWeight: 700,
            padding: "3px 10px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "background .15s",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => e.target.style.background = T.lavenderSoft}
          onMouseLeave={(e) => e.target.style.background = "transparent"}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
