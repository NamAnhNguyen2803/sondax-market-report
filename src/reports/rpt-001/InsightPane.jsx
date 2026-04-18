import { T } from "../../data/colors.js";
import { TOURS } from "./tourData.js";
import { findInsight, getToursForInsight } from "./insights.js";
import TourListView from "./TourListView.jsx";

const ACCENT_BY_INSIGHT = {
  "quick-wins":     "mint",
  "whitespace":     "lavender",
  "growth-markets": "peach",
  "july-peak":      "peach",
  "revenue":        "lavender",
};
const ACCENT_MAP = {
  mint:     { ink: T.mintInk,     soft: T.mintSoft,     base: T.mint },
  peach:    { ink: T.peachInk,    soft: T.peachSoft,    base: T.peach },
  lavender: { ink: T.lavenderInk, soft: T.lavenderSoft, base: T.lavender },
};

// Extract section references from text (e.g., "S1", "S2", "S8")
function extractSectionRefs(text) {
  if (!text) return [];
  const matches = text.match(/\bS[1-9]\b/g) || [];
  return [...new Set(matches)].sort((a, b) => parseInt(a.substring(1)) - parseInt(b.substring(1)));
}

export default function InsightPane({ insightId, goto }) {
  const insight = findInsight(insightId);
  if (!insight) return <div style={{ color: T.inkSoft }}>Insight not found: {insightId}</div>;

  const tours = getToursForInsight(insight, TOURS);
  const A = ACCENT_MAP[ACCENT_BY_INSIGHT[insight.id] ?? "lavender"];
  const { title, icon, question, teaser, why, stat } = insight;

  const referencedSections = [
    ...extractSectionRefs(teaser),
    ...(why ? why.flatMap(w => extractSectionRefs(w)) : []),
  ];
  const uniqueSections = [...new Set(referencedSections)].sort((a, b) =>
    parseInt(a.substring(1)) - parseInt(b.substring(1)));

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ fontSize: 12, marginBottom: 14, lineHeight: 1.7 }}>
        <button
          onClick={() => goto("rpt-home")}
          style={{
            background: "transparent", border: "none",
            color: T.peach, cursor: "pointer", padding: 0,
            fontSize: 12, fontWeight: 700, fontFamily: "inherit",
          }}
        >
          ← Tổng quan tour EN Inbound
        </button>
        <span style={{ color: T.lineStrong, margin: "0 10px" }}>›</span>
        <span style={{ color: T.ink, fontWeight: 600 }}>{icon} {title}</span>
      </div>

      {/* Insight header card */}
      <div style={{
        background: T.surface,
        border: `1px solid ${T.line}`,
        borderLeft: `4px solid ${A.base}`,
        borderRadius: 16,
        padding: "26px 26px 22px",
        marginBottom: 22,
        boxShadow: "0 1px 2px rgba(168,143,191,0.08), 0 8px 24px -16px rgba(168,143,191,0.18)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 12, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 32, lineHeight: 1 }}>{icon}</span>
            <h1 className="serif" style={{
              fontSize: 28, fontWeight: 600, color: T.ink, margin: 0, lineHeight: 1.2,
            }}>
              {title}
            </h1>
          </div>
          <span style={{
            fontSize: 11, color: A.ink, fontWeight: 700,
            textTransform: "uppercase", letterSpacing: 1.2,
            background: A.soft, borderRadius: 999, padding: "5px 14px",
            whiteSpace: "nowrap",
          }}>
            {stat.value} {stat.label}
          </span>
        </div>

        <div style={{ fontSize: 15, color: A.ink, fontWeight: 600, marginBottom: 14, fontStyle: "italic", lineHeight: 1.5 }}>
          ❓ {question}
        </div>

        <div style={{ fontSize: 14, color: T.inkSoft, lineHeight: 1.65, marginBottom: 14 }}>
          {teaser}
        </div>

        {why && why.length > 0 && (
          <div style={{
            background: T.bg,
            border: `1px solid ${T.line}`,
            borderRadius: 12,
            padding: "12px 16px",
            marginBottom: 14,
          }}>
            <div style={{
              fontSize: 9.5, color: A.ink, fontWeight: 800,
              textTransform: "uppercase", letterSpacing: 1.4, marginBottom: 8,
            }}>
              Tiêu chí lựa chọn
            </div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: T.ink, lineHeight: 1.7 }}>
              {why.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>
        )}

        {uniqueSections.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{
              fontSize: 9.5, color: T.inkSoft, fontWeight: 800,
              textTransform: "uppercase", letterSpacing: 1.4,
            }}>
              📖 Evidence:
            </span>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {uniqueSections.map(sectionId => (
                <button
                  key={sectionId}
                  onClick={() => goto(`rpt-${sectionId.toLowerCase()}`)}
                  style={{
                    background: T.lavenderSoft,
                    border: `1px solid ${T.lavender}`,
                    color: T.lavenderInk,
                    borderRadius: 999,
                    padding: "3px 12px",
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.12s",
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                >
                  {sectionId}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tour count caption */}
      <div style={{
        fontSize: 12.5, color: T.inkSoft, marginBottom: 12,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span style={{ color: A.ink, fontWeight: 700 }}>{tours.length}</span> tours curated for this insight
        <span style={{ color: T.lineStrong }}>·</span>
        <span style={{ color: T.inkSoft }}>click any row to see full detail</span>
      </div>

      <TourListView tours={tours} goto={goto} from={insight.tabId} />
    </>
  );
}
