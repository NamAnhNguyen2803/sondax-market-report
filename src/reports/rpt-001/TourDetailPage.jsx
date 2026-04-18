import { T } from "../../data/colors.js";
import { TOURS, MARKET_FLAGS, CATEGORY_COLORS, CATEGORY_LABELS, MONTH_COLOR } from "./tourData.js";
import { INSIGHTS } from "./insights.js";

function Breadcrumb({ goto, from, tourName }) {
  const fromInsight = from && from.startsWith("rpt-") && from !== "rpt-home" && from !== "rpt-explorer"
    ? INSIGHTS.find(i => i.tabId === from)
    : null;
  const fromExplorer = from === "rpt-explorer";

  const link = (label, onClick, color = T.peach) => (
    <button
      onClick={onClick}
      style={{
        background: "transparent", border: "none",
        color, cursor: "pointer", padding: 0,
        fontSize: 12, fontWeight: 700, fontFamily: "inherit",
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ fontSize: 12, marginBottom: 14, lineHeight: 1.7 }}>
      {link("← Tổng quan tour EN Inbound", () => goto("rpt-home"))}
      {(fromInsight || fromExplorer) && (
        <>
          <span style={{ color: T.lineStrong, margin: "0 10px" }}>›</span>
          {fromInsight
            ? link(`${fromInsight.icon} ${fromInsight.title}`, () => goto(fromInsight.tabId), T.lavenderInk)
            : link("🔎 Tour Explorer", () => goto("rpt-explorer"), T.lavenderInk)}
        </>
      )}
      <span style={{ color: T.lineStrong, margin: "0 10px" }}>›</span>
      <span style={{ color: T.ink, fontWeight: 600 }}>{tourName}</span>
    </div>
  );
}

const chip = (text, color) => (
  <span key={text} style={{
    display: "inline-block",
    padding: "3px 10px",
    marginRight: 6, marginBottom: 6,
    background: `${color}1f`,
    border: `1px solid ${color}55`,
    borderRadius: 999,
    color, fontSize: 11.5, fontWeight: 600,
    whiteSpace: "nowrap",
  }}>{text}</span>
);

const SectionLabel = ({ children, color = T.lavender }) => (
  <div style={{
    fontSize: 9.5, color, textTransform: "uppercase",
    letterSpacing: 1.4, fontWeight: 800, marginBottom: 8,
  }}>
    {children}
  </div>
);

const Surface = ({ children, accent = null, style = {} }) => (
  <div style={{
    background: T.surface,
    border: `1px solid ${T.line}`,
    borderLeft: accent ? `4px solid ${accent}` : `1px solid ${T.line}`,
    borderRadius: 14,
    padding: "16px 18px",
    marginBottom: 16,
    boxShadow: "0 1px 2px rgba(168,143,191,0.06)",
    ...style,
  }}>{children}</div>
);

function extractSectionRefs(text) {
  if (!text) return [];
  const matches = text.match(/\bS[1-9]\b/g) || [];
  return [...new Set(matches)].sort((a, b) => parseInt(a.substring(1)) - parseInt(b.substring(1)));
}

export default function TourDetailPage({ tourId, goto, from }) {
  const idNum = Number(tourId);
  const tour = TOURS.find(t => t.id === idNum || String(t.id) === String(tourId));
  if (!tour) return <div style={{ padding: 20, color: T.inkSoft }}>Tour not found</div>;

  const catColor = CATEGORY_COLORS[tour.category] ?? T.lavender;

  const referencedSections = [
    ...extractSectionRefs(tour.rationale),
    ...extractSectionRefs(tour.whyInvest),
  ];
  const uniqueSections = [...new Set(referencedSections)].sort((a, b) =>
    parseInt(a.substring(1)) - parseInt(b.substring(1)));

  return (
    <>
      <Breadcrumb goto={goto} from={from} tourName={tour.name} />

      {/* Title */}
      <div style={{ margin: "8px 0 18px", maxWidth: 760 }}>
        <h2 className="serif" style={{
          fontSize: 30, color: T.ink, fontWeight: 600, lineHeight: 1.2, marginBottom: 6,
        }}>
          {tour.name}
        </h2>
        <div style={{ fontSize: 13, color: T.inkSoft, lineHeight: 1.5 }}>
          {CATEGORY_LABELS[tour.category]} · {tour.duration} · {tour.priceRange}
        </div>
      </div>

      {/* Tour metadata badge bar */}
      <Surface accent={catColor}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <span style={{
            background: catColor, color: T.surface,
            fontSize: 10, fontWeight: 800,
            padding: "4px 11px", borderRadius: 6,
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

        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, fontSize: 12.5 }}>
          <span style={{ color: T.inkSoft }}>
            <span style={{ color: T.lavender, fontWeight: 700 }}>⏱</span> {tour.duration}
          </span>
          <span style={{ color: T.inkSoft }}>
            <span style={{ color: T.peach, fontWeight: 700 }}>📅</span> {tour.bestMonthsLabel}
          </span>
          <span style={{ color: T.inkSoft }}>
            <span style={{ color: T.mintInk, fontWeight: 700 }}>💰</span> {tour.priceRange}
          </span>
        </div>
      </Surface>

      {/* Why Invest — promoted to top */}
      <div style={{
        background: T.peachSoft,
        border: `1px solid ${T.peach}66`,
        borderLeft: `3px solid ${T.peach}`,
        borderRadius: 14,
        padding: "16px 18px",
        marginBottom: 16,
      }}>
        <SectionLabel color={T.peachInk}>🎯 Tại sao nên đầu tư — Khoảng trống cụ thể</SectionLabel>
        <div style={{ fontSize: 13.5, color: T.ink, lineHeight: 1.7 }}>
          {tour.whyInvest}
        </div>
      </div>

      {/* Revenue */}
      <div style={{
        background: T.mintSoft,
        border: `1px solid ${T.mint}66`,
        borderLeft: `3px solid ${T.mint}`,
        borderRadius: 14,
        padding: "14px 18px",
        marginBottom: 16,
      }}>
        <SectionLabel color={T.mintInk}>💰 Revenue / Chuyến</SectionLabel>
        <div className="serif num" style={{ fontSize: 18, color: T.ink, fontWeight: 600 }}>
          {tour.revenue}
        </div>
      </div>

      {/* Target Markets & Platforms */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 16 }}>
        <Surface>
          <SectionLabel>Target Markets</SectionLabel>
          <div>
            {tour.markets.map(m => (
              <span key={m} style={{
                display: "inline-block",
                padding: "3px 10px",
                marginRight: 6, marginBottom: 6,
                background: T.lavenderSoft,
                border: `1px solid ${T.lavender}66`,
                borderRadius: 999,
                color: T.lavenderInk, fontSize: 11.5, fontWeight: 600,
              }}>
                {MARKET_FLAGS[m] ?? ""} {m}
              </span>
            ))}
          </div>
        </Surface>

        <Surface>
          <SectionLabel>Best Platforms</SectionLabel>
          <div>{tour.platforms.map(p => chip(p, T.lavender))}</div>
        </Surface>
      </div>

      {/* Best Months */}
      <Surface>
        <SectionLabel>Best Months</SectionLabel>
        <div>
          {tour.bestMonths.map(m => chip(m, MONTH_COLOR[m] ?? T.lavender))}
        </div>
      </Surface>

      {/* Route */}
      <Surface>
        <SectionLabel>Route / Destinations</SectionLabel>
        <div style={{ fontSize: 13.5, color: T.ink, lineHeight: 1.7 }}>{tour.route}</div>
      </Surface>

      {/* Rationale */}
      <Surface>
        <SectionLabel>Rationale (từ S1–S8)</SectionLabel>
        <div style={{ fontSize: 13, color: T.inkSoft, lineHeight: 1.7 }}>{tour.rationale}</div>
      </Surface>

      {/* Competitors & Barrier */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 16 }}>
        <Surface>
          <SectionLabel>Đối thủ dẫn đầu</SectionLabel>
          <div style={{ fontSize: 12.5, color: T.ink, lineHeight: 1.65 }}>{tour.competitors}</div>
        </Surface>
        <Surface>
          <SectionLabel color={T.peachInk}>Rào cản gia nhập</SectionLabel>
          <div style={{ fontSize: 12.5, color: T.ink, lineHeight: 1.65 }}>{tour.barrier}</div>
        </Surface>
      </div>

      {/* Evidence cross-refs */}
      {uniqueSections.length > 0 && (
        <div style={{
          background: T.lavenderSoft,
          border: `1px solid ${T.lavender}66`,
          borderLeft: `3px solid ${T.lavender}`,
          borderRadius: 14,
          padding: "14px 18px",
        }}>
          <SectionLabel>📖 Referenced in Evidence Sections</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {uniqueSections.map(sectionId => (
              <button
                key={sectionId}
                onClick={() => goto(`rpt-${sectionId.toLowerCase()}`)}
                style={{
                  background: T.surface,
                  border: `1px solid ${T.lavender}`,
                  color: T.lavenderInk,
                  borderRadius: 999,
                  padding: "5px 13px",
                  fontSize: 11.5,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.15s",
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
    </>
  );
}
