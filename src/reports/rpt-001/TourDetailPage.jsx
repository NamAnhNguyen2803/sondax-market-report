import { C } from "../../data/colors.js";
import { TOURS } from "./tourData.js";
import { MARKET_FLAGS, CATEGORY_COLORS, CATEGORY_LABELS, MONTH_COLOR } from "./tourData.js";
import { INSIGHTS } from "./insights.js";

function Breadcrumb({ goto, from, tourName }) {
  const fromInsight = from && from.startsWith("rpt-") && from !== "rpt-home" && from !== "rpt-explorer"
    ? INSIGHTS.find(i => i.tabId === from)
    : null;
  const fromExplorer = from === "rpt-explorer";

  const crumbBtn = (label, onClick, color = C.muted) => (
    <button
      onClick={onClick}
      style={{
        background: "transparent", border: "none",
        color, cursor: "pointer", padding: 0,
        fontSize: 11, fontWeight: 600,
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ fontSize: 11, marginBottom: 10, lineHeight: 1.8 }}>
      {crumbBtn("★ Overview", () => goto("rpt-home"))}
      {(fromInsight || fromExplorer) && (
        <>
          <span style={{ color: C.border, margin: "0 8px" }}>›</span>
          {fromInsight
            ? crumbBtn(`${fromInsight.icon} ${fromInsight.title}`, () => goto(fromInsight.tabId), fromInsight.color)
            : crumbBtn("🔎 Tour Explorer", () => goto("rpt-explorer"), C.muted)}
        </>
      )}
      <span style={{ color: C.border, margin: "0 8px" }}>›</span>
      <span style={{ color: C.accent, fontWeight: 700 }}>{tourName}</span>
    </div>
  );
}

function TourTitle({ title, subtitle }) {
  return (
    <div style={{ margin: "4px 0 14px" }}>
      <h2 style={{
        color: C.text, fontSize: 17, fontWeight: 800,
        margin: "0 0 4px", borderLeft: `4px solid ${C.accent}`,
        paddingLeft: 12,
      }}>{title}</h2>
      {subtitle && (
        <div style={{ fontSize: 12, color: C.muted, paddingLeft: 16, lineHeight: 1.5 }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

const chip = (text, color) => (
  <span key={text} style={{
    display: "inline-block",
    padding: "3px 9px",
    marginRight: 5, marginBottom: 5,
    background: `${color}18`,
    border: `1px solid ${color}50`,
    borderRadius: 14,
    color, fontSize: 11, fontWeight: 600,
    whiteSpace: "nowrap",
  }}>{text}</span>
);

const section = (label, value, color = C.muted) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{
      fontSize: 9, color: C.muted, textTransform: "uppercase",
      letterSpacing: 1.4, fontWeight: 700, marginBottom: 6,
    }}>
      {label}
    </div>
    <div style={{ fontSize: 13, color, lineHeight: 1.65 }}>{value}</div>
  </div>
);

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

export default function TourDetailPage({ tourId, goto, from }) {
  const idNum = Number(tourId);
  const tour = TOURS.find(t => t.id === idNum || String(t.id) === String(tourId));
  if (!tour) return <div style={{ padding: 20, color: C.muted }}>Tour not found</div>;

  const catColor = CATEGORY_COLORS[tour.category] ?? C.accent;

  // Extract evidence section references from rationale & whyInvest
  const referencedSections = [
    ...extractSectionRefs(tour.rationale),
    ...extractSectionRefs(tour.whyInvest),
  ];
  const uniqueSections = [...new Set(referencedSections)].sort((a, b) => {
    const aNum = parseInt(a.substring(1));
    const bNum = parseInt(b.substring(1));
    return aNum - bNum;
  });

  return (
    <>
      <Breadcrumb goto={goto} from={from} tourName={tour.name} />
      <TourTitle
        title={tour.name}
        subtitle={`${CATEGORY_LABELS[tour.category]} · ${tour.duration} · ${tour.priceRange}`}
      />

      {/* Tour Badge & Metadata */}
      <div style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: "16px 18px",
        marginBottom: 16,
        borderLeft: `4px solid ${catColor}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{
            background: catColor, color: "#0F172A",
            fontSize: 10, fontWeight: 800,
            padding: "4px 10px", borderRadius: 6,
            letterSpacing: 0.5,
          }}>
            TOUR #{tour.id}
          </span>
          <span style={{
            fontSize: 11, color: catColor,
            fontWeight: 700, letterSpacing: 0.5,
          }}>
            {CATEGORY_LABELS[tour.category]}
          </span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, fontSize: 12 }}>
          <span style={{ color: C.muted }}>
            <span style={{ color: C.accent, fontWeight: 700 }}>⏱</span> {tour.duration}
          </span>
          <span style={{ color: C.muted }}>
            <span style={{ color: C.orange, fontWeight: 700 }}>📅</span> {tour.bestMonthsLabel}
          </span>
          <span style={{ color: C.muted }}>
            <span style={{ color: C.green, fontWeight: 700 }}>💰</span> {tour.priceRange}
          </span>
        </div>
      </div>

      {/* Why Invest — promoted to top as primary decision driver */}
      <div style={{
        background: `${C.orange}08`,
        border: `1px solid ${C.orange}30`,
        borderLeft: `3px solid ${C.orange}`,
        borderRadius: "0 8px 8px 0",
        padding: "14px 16px",
        marginBottom: 16,
      }}>
        <div style={{
          fontSize: 9, color: C.orange, textTransform: "uppercase",
          letterSpacing: 1.4, fontWeight: 800, marginBottom: 6,
        }}>
          🎯 Tại sao nên đầu tư — Khoảng trống cụ thể
        </div>
        <div style={{ fontSize: 13, color: C.text, lineHeight: 1.65 }}>
          {tour.whyInvest}
        </div>
      </div>

      {/* Revenue Highlight — paired with Why Invest at top */}
      <div style={{
        background: "#0b1222",
        border: `1px solid ${C.border}`,
        borderLeft: `3px solid ${C.green}`,
        borderRadius: "0 8px 8px 0",
        padding: "14px 16px",
        marginBottom: 16,
      }}>
        <div style={{
          fontSize: 9, color: C.green, textTransform: "uppercase",
          letterSpacing: 1.4, fontWeight: 800, marginBottom: 6,
        }}>
          💰 Revenue / Chuyến
        </div>
        <div style={{ fontSize: 15, color: C.text, fontWeight: 700 }}>
          {tour.revenue}
        </div>
      </div>

      {/* Target Markets & Platforms */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 16 }}>
        <div style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          padding: "14px 16px",
        }}>
          <div style={{
            fontSize: 9, color: C.muted, textTransform: "uppercase",
            letterSpacing: 1.4, fontWeight: 700, marginBottom: 8,
          }}>
            Target Markets
          </div>
          <div>
            {tour.markets.map(m => (
              <span key={m} style={{
                display: "inline-block",
                padding: "3px 9px",
                marginRight: 5, marginBottom: 5,
                background: `${C.accent}12`,
                border: `1px solid ${C.accent}40`,
                borderRadius: 14,
                color: C.accent, fontSize: 11, fontWeight: 600,
              }}>
                {MARKET_FLAGS[m] ?? ""} {m}
              </span>
            ))}
          </div>
        </div>

        <div style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          padding: "14px 16px",
        }}>
          <div style={{
            fontSize: 9, color: C.muted, textTransform: "uppercase",
            letterSpacing: 1.4, fontWeight: 700, marginBottom: 8,
          }}>
            Best Platforms
          </div>
          <div>{tour.platforms.map(p => chip(p, C.purple ?? "#A78BFA"))}</div>
        </div>
      </div>

      {/* Best Months */}
      <div style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: "14px 16px",
        marginBottom: 16,
      }}>
        <div style={{
          fontSize: 9, color: C.muted, textTransform: "uppercase",
          letterSpacing: 1.4, fontWeight: 700, marginBottom: 8,
        }}>
          Best Months
        </div>
        <div>
          {tour.bestMonths.map(m => chip(m, MONTH_COLOR[m] ?? C.accent))}
        </div>
      </div>

      {/* Route / Destinations */}
      <div style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: "14px 16px",
        marginBottom: 16,
      }}>
        {section("Route / Destinations", tour.route, C.text)}
      </div>

      {/* Rationale */}
      <div style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: "14px 16px",
        marginBottom: 16,
      }}>
        {section("Rationale (từ S1–S8)", tour.rationale)}
      </div>

      {/* Competitors & Barrier */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 16 }}>
        <div style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          padding: "14px 16px",
        }}>
          <div style={{
            fontSize: 9, color: C.muted, textTransform: "uppercase",
            letterSpacing: 1.4, fontWeight: 700, marginBottom: 8,
          }}>
            Đối thủ dẫn đầu
          </div>
          <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
            {tour.competitors}
          </div>
        </div>

        <div style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          padding: "14px 16px",
        }}>
          <div style={{
            fontSize: 9, color: C.pink, textTransform: "uppercase",
            letterSpacing: 1.4, fontWeight: 700, marginBottom: 8,
          }}>
            Rào cản gia nhập
          </div>
          <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
            {tour.barrier}
          </div>
        </div>
      </div>

      {/* Evidence Cross-References */}
      {uniqueSections.length > 0 && (
        <div style={{
          background: `${C.accent}08`,
          border: `1px solid ${C.accent}30`,
          borderLeft: `3px solid ${C.accent}`,
          borderRadius: "0 8px 8px 0",
          padding: "14px 16px",
        }}>
          <div style={{
            fontSize: 9, color: C.accent, textTransform: "uppercase",
            letterSpacing: 1.4, fontWeight: 800, marginBottom: 10,
          }}>
            📖 Referenced in Evidence Sections
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {uniqueSections.map(sectionId => (
              <button
                key={sectionId}
                onClick={() => goto(`rpt-${sectionId.toLowerCase()}`)}
                style={{
                  background: `${C.accent}18`,
                  border: `1px solid ${C.accent}50`,
                  color: C.accent,
                  borderRadius: 8,
                  padding: "6px 12px",
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  outline: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${C.accent}30`;
                  e.currentTarget.style.borderColor = C.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `${C.accent}18`;
                  e.currentTarget.style.borderColor = `${C.accent}50`;
                }}
              >
                {sectionId}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
