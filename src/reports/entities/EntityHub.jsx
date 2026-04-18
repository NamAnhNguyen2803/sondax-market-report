import { useState } from "react";
import { T } from "../../data/colors.js";
import { MONTHS, TOURS, PERSONAS, MARKETS, COUNTS } from "../../data/entities.js";

const TABS = [
  { id: "month",   label: "📅 Tháng",   data: MONTHS,   count: COUNTS.months   },
  { id: "tour",    label: "🗺️ Tour",    data: TOURS,    count: COUNTS.tours    },
  { id: "persona", label: "👥 Persona", data: PERSONAS, count: COUNTS.personas },
  { id: "market",  label: "🌐 Thị trường", data: MARKETS, count: COUNTS.markets },
];

const DEMAND_COLOR = {
  HIGHEST:       { bg: "#FEE2E2", ink: "#991B1B" },
  HIGH:          { bg: "#FEF3C7", ink: "#92400E" },
  MEDIUM:        { bg: "#DBEAFE", ink: "#1E40AF" },
  "LOW-MEDIUM":  { bg: "#E0E7FF", ink: "#3730A3" },
  LOW:           { bg: "#F3F4F6", ink: "#4B5563" },
};

const SEASON_COLOR = {
  peak:     { bg: T.amberSoft,   ink: T.amberInk },
  shoulder: { bg: T.navySoft,    ink: T.navyInk  },
  low:      { bg: "#F3F4F6",     ink: T.inkSoft  },
};

export default function EntityHub({ goto }) {
  const [tab, setTab] = useState("month");
  const active = TABS.find((t) => t.id === tab);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 18 }}>
        <div style={{
          fontSize: 10, color: T.navy, letterSpacing: 1.6,
          textTransform: "uppercase", fontWeight: 700,
        }}>
          Entity Explorer · Sondax Travel
        </div>
        <h1 className="serif" style={{
          fontSize: 28, margin: "6px 0 4px", color: T.ink, lineHeight: 1.2,
        }}>
          Tháng · Tour · Persona · Thị trường
        </h1>
        <div style={{ color: T.inkSoft, fontSize: 13, lineHeight: 1.55, maxWidth: 720 }}>
          Explore {COUNTS.total} entities được trích xuất từ 4 báo cáo Sondax.
          Mỗi chip click được — follow cross-link giữa tháng ↔ tour ↔ persona ↔ thị trường.
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: 6, flexWrap: "wrap",
        borderBottom: `1px solid ${T.line}`, marginBottom: 16, paddingBottom: 0,
      }}>
        {TABS.map((t) => {
          const isOn = t.id === tab;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "9px 14px",
                background: isOn ? T.surface : "transparent",
                border: "none",
                borderBottom: isOn ? `2.5px solid ${T.amber}` : "2.5px solid transparent",
                color: isOn ? T.ink : T.inkSoft,
                fontWeight: isOn ? 700 : 600,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
                marginBottom: -1,
                transition: "color .15s",
              }}
            >
              {t.label}
              <span style={{
                marginLeft: 6,
                fontSize: 11,
                color: T.inkSoft,
                fontWeight: 600,
                background: T.bgAlt,
                padding: "1px 7px",
                borderRadius: 999,
              }}>
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab content — cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 12,
      }}>
        {active.data.map((rec) => (
          <EntityCard
            key={rec.id}
            kind={tab}
            record={rec}
            onClick={() => goto(`${tab}/${rec.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

function EntityCard({ kind, record, onClick }) {
  let title, subtitle, badges, rightMeta;

  if (kind === "month") {
    title = record.name_vi || `Tháng ${record.id}`;
    subtitle = record.demand_reason || "";
    const dcol = DEMAND_COLOR[record.combined_demand] || DEMAND_COLOR.MEDIUM;
    const scol = SEASON_COLOR[record.season_tag] || SEASON_COLOR.low;
    badges = (
      <>
        <MetaPill bg={scol.bg} ink={scol.ink}>{record.season_tag}</MetaPill>
        <MetaPill bg={dcol.bg} ink={dcol.ink}>{record.combined_demand}</MetaPill>
      </>
    );
    rightMeta = `#${record.id}`;
  } else if (kind === "tour") {
    title = record.name;
    subtitle = record.tagline || record.duration || "";
    const typeCol = record.type === "featured"
      ? { bg: T.amberSoft, ink: T.amberInk }
      : record.type === "archetype"
      ? { bg: T.emeraldSoft, ink: T.emeraldInk }
      : { bg: T.navySoft, ink: T.navyInk };
    badges = (
      <>
        <MetaPill bg={typeCol.bg} ink={typeCol.ink}>{record.type}</MetaPill>
        {record.region && <MetaPill bg={T.bgAlt} ink={T.inkSoft}>{record.region}</MetaPill>}
        {record.hotness_score != null && (
          <MetaPill bg="#FEF3C7" ink="#92400E">🔥 {record.hotness_score}</MetaPill>
        )}
      </>
    );
    rightMeta = record.id;
  } else if (kind === "persona") {
    title = record.short || record.name;
    subtitle = (record.age_range ? `${record.age_range} · ` : "") +
      (record.origin_market_ids || []).join(", ");
    badges = (
      <>
        <MetaPill bg={record.type === "deep" ? T.emeraldSoft : T.bgAlt}
                  ink={record.type === "deep" ? T.emeraldInk : T.inkSoft}>
          {record.type === "deep" ? "deep" : "summary"}
        </MetaPill>
        {record.budget_range?.tier && (
          <MetaPill bg={T.navySoft} ink={T.navyInk}>{record.budget_range.tier}</MetaPill>
        )}
      </>
    );
    rightMeta = record.id;
  } else if (kind === "market") {
    title = `${record.flag_emoji || ""} ${record.name_en}`;
    subtitle = record.volume_annual
      ? `${(record.volume_annual / 1000).toFixed(0)}K/năm · YoY ${record.yoy_growth_pct > 0 ? "+" : ""}${record.yoy_growth_pct}%`
      : "—";
    const trendCol = record.yoy_trend === "strong-up" ? { bg: "#D1FAE5", ink: "#065F46" }
                   : record.yoy_trend === "up"         ? { bg: "#DBEAFE", ink: "#1E40AF" }
                   : record.yoy_trend === "down"       ? { bg: "#FEE2E2", ink: "#991B1B" }
                                                       : { bg: T.bgAlt, ink: T.inkSoft };
    badges = (
      <>
        <MetaPill bg={trendCol.bg} ink={trendCol.ink}>{record.yoy_trend || "—"}</MetaPill>
        {record.confidence && (
          <MetaPill bg={T.bgAlt} ink={T.inkSoft}>{record.confidence}</MetaPill>
        )}
      </>
    );
    rightMeta = record.id;
  }

  return (
    <button
      onClick={onClick}
      style={{
        display: "block", textAlign: "left", width: "100%",
        padding: "14px 14px 12px",
        background: T.surface,
        border: `1px solid ${T.line}`,
        borderRadius: 10,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "border-color .15s, transform .1s, box-shadow .15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = T.amber;
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(27,43,90,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = T.line;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
        <div style={{ fontSize: 14, color: T.ink, fontWeight: 700, lineHeight: 1.25 }}>
          {title}
        </div>
        <div style={{ fontSize: 10, color: T.inkSoft, fontWeight: 700, letterSpacing: 0.8 }}>
          {rightMeta}
        </div>
      </div>
      {subtitle && (
        <div style={{ fontSize: 12, color: T.inkSoft, lineHeight: 1.45, marginBottom: 8 }}>
          {subtitle.length > 90 ? subtitle.slice(0, 89) + "…" : subtitle}
        </div>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {badges}
      </div>
    </button>
  );
}

function MetaPill({ bg, ink, children }) {
  return (
    <span style={{
      padding: "2px 7px",
      background: bg, color: ink,
      fontSize: 10, fontWeight: 700,
      borderRadius: 999,
      letterSpacing: 0.3,
    }}>
      {children}
    </span>
  );
}
