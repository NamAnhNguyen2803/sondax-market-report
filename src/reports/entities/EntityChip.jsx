import { T } from "../../data/colors.js";
import { labelFor } from "../../data/entities.js";

// Color per entity kind — reuse brand tokens
const STYLES = {
  month:   { bg: T.navySoft,    ink: T.navyInk,    bd: "#C7D0E6", icon: "📅" },
  tour:    { bg: T.amberSoft,   ink: T.amberInk,   bd: "#F5D99A", icon: "🗺️" },
  persona: { bg: T.emeraldSoft, ink: T.emeraldInk, bd: "#9FDDBF", icon: "👥" },
  market:  { bg: "#FCE9F0",     ink: "#8F224F",    bd: "#F2C4D4", icon: "🌐" },
};

/**
 * Clickable chip for cross-entity navigation.
 *
 * Props:
 *   kind:     "month" | "tour" | "persona" | "market"
 *   id:       entity id string / number
 *   onGo:     (kind, id) => void
 *   showIcon: boolean (default true)
 *   size:     "sm" | "md" (default "md")
 */
export default function EntityChip({ kind, id, onGo, showIcon = true, size = "md", label }) {
  const s = STYLES[kind] || STYLES.tour;
  const txt = label || labelFor(kind, id);
  const pad = size === "sm" ? "3px 8px" : "5px 10px";
  const fs  = size === "sm" ? 11 : 12;

  return (
    <button
      onClick={() => onGo?.(kind, id)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: pad,
        margin: "2px 4px 2px 0",
        background: s.bg,
        color: s.ink,
        border: `1px solid ${s.bd}`,
        borderRadius: 999,
        fontSize: fs,
        fontWeight: 600,
        fontFamily: "inherit",
        cursor: "pointer",
        transition: "transform .1s, box-shadow .15s",
        lineHeight: 1.3,
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.boxShadow = "0 2px 6px rgba(27,43,90,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
      title={`${kind}: ${txt}`}
    >
      {showIcon && <span style={{ fontSize: fs - 1 }}>{s.icon}</span>}
      <span>{txt}</span>
    </button>
  );
}

/** Row of chips. items: [{kind, id}] */
export function ChipRow({ items, onGo, empty = "—" }) {
  if (!items || items.length === 0) {
    return <span style={{ color: T.inkSoft, fontSize: 12, fontStyle: "italic" }}>{empty}</span>;
  }
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 0, alignItems: "center" }}>
      {items.map(({ kind, id }) => (
        <EntityChip key={`${kind}-${id}`} kind={kind} id={id} onGo={onGo} />
      ))}
    </div>
  );
}
