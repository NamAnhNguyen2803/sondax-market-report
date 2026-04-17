import { C } from "../../data/colors.js";
import { TOURS } from "./tourData.js";
import { findInsight, getToursForInsight } from "./insights.js";
import TourListView from "./TourListView.jsx";

// Extract section references from text (e.g., "S1", "S2", "S8")
function extractSectionRefs(text) {
  if (!text) return [];
  const matches = text.match(/\bS[1-9]\b/g) || [];
  return [...new Set(matches)].sort((a, b) => {
    const aNum = parseInt(a.substring(1));
    const bNum = parseInt(b.substring(1));
    return aNum - bNum;
  });
}

export default function InsightPane({ insightId, goto }) {
  const insight = findInsight(insightId);
  if (!insight) return <div style={{ color: C.muted }}>Insight not found: {insightId}</div>;

  const tours = getToursForInsight(insight, TOURS);
  const { title, icon, color, question, teaser, why, stat } = insight;

  // Extract evidence section references from teaser & why
  const referencedSections = [
    ...extractSectionRefs(teaser),
    ...(why ? why.flatMap(w => extractSectionRefs(w)) : []),
  ];
  const uniqueSections = [...new Set(referencedSections)].sort((a, b) => {
    const aNum = parseInt(a.substring(1));
    const bNum = parseInt(b.substring(1));
    return aNum - bNum;
  });

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ fontSize: 11, marginBottom: 14 }}>
        <button
          onClick={() => goto("rpt-home")}
          style={{
            background: "transparent", border: "none",
            color: C.muted, cursor: "pointer", padding: 0,
            fontSize: 11, fontWeight: 600,
          }}
        >
          ★ Overview
        </button>
        <span style={{ color: C.border, margin: "0 8px" }}>›</span>
        <span style={{ color, fontWeight: 700 }}>{icon} {title}</span>
      </div>

      {/* Insight header */}
      <div style={{
        background: `linear-gradient(135deg, ${color}15 0%, ${C.card} 80%)`,
        border: `1px solid ${color}40`,
        borderLeft: `4px solid ${color}`,
        borderRadius: 12,
        padding: "22px 24px",
        marginBottom: 18,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 10, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 32, lineHeight: 1 }}>{icon}</span>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: 0, lineHeight: 1.25 }}>
              {title}
            </h1>
          </div>
          <div style={{
            fontSize: 11, color, fontWeight: 800,
            textTransform: "uppercase", letterSpacing: 1.2,
            background: `${color}18`,
            border: `1px solid ${color}50`,
            borderRadius: 8, padding: "6px 12px",
            whiteSpace: "nowrap",
          }}>
            {stat.value} {stat.label}
          </div>
        </div>

        <div style={{ fontSize: 13, color, fontWeight: 600, marginBottom: 12, fontStyle: "italic", lineHeight: 1.5 }}>
          ❓ {question}
        </div>

        <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.65, marginBottom: 14 }}>
          {teaser}
        </div>

        {why && why.length > 0 && (
          <div style={{
            background: "#0b1222",
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            padding: "10px 14px",
            marginBottom: 12,
          }}>
            <div style={{
              fontSize: 9, color, fontWeight: 800,
              textTransform: "uppercase", letterSpacing: 1.4, marginBottom: 6,
            }}>
              Tiêu chí lựa chọn
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
              {why.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>
        )}

        {uniqueSections.length > 0 && (
          <div style={{
            display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap",
          }}>
            <span style={{
              fontSize: 9, color: C.muted, fontWeight: 800,
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
                    background: `${color}20`,
                    border: `1px solid ${color}50`,
                    color: color,
                    borderRadius: 6,
                    padding: "3px 10px",
                    fontSize: 10,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.12s",
                    outline: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${color}35`;
                    e.currentTarget.style.borderColor = color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${color}20`;
                    e.currentTarget.style.borderColor = `${color}50`;
                  }}
                >
                  {sectionId}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Curated tour list */}
      <div style={{
        fontSize: 11, color: C.muted, marginBottom: 10,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span style={{ color, fontWeight: 700 }}>{tours.length}</span> tours curated for this insight ·
        <span style={{ color: `${C.muted}aa` }}>click any row to see full detail</span>
      </div>

      <TourListView tours={tours} goto={goto} />
    </>
  );
}
