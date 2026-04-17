// Shared table + card list renderer. Decoupled from filter bar so InsightPane
// and TourSummaryTable can both reuse it with different tour subsets.

import { useState, useEffect } from "react";
import { C } from "../../data/colors.js";
import { MARKET_FLAGS, CATEGORY_COLORS, CATEGORY_LABELS, MONTH_COLOR } from "./tourData.js";

export function useIsMobile() {
  const [m, setM] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return m;
}

export default function TourListView({ tours, goto }) {
  const [hoverId, setHoverId] = useState(null);
  const isMobile = useIsMobile();
  if (isMobile) return <MobileCardList tours={tours} goto={goto} />;
  return <DesktopTable tours={tours} goto={goto} hoverId={hoverId} setHoverId={setHoverId} />;
}

function DesktopTable({ tours, goto, hoverId, setHoverId }) {
  const onKey = (e, t) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); goto(`tour-${t.id}`); }
  };

  return (
    <div style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      overflow: "hidden",
    }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: 0,
          fontSize: 12,
          minWidth: 680,
        }}>
          <thead>
            <tr>
              {["#", "Tour", "Duration", "Markets", "Platforms", "Months"].map((h, i) => (
                <th key={h} style={{
                  padding: "10px 12px",
                  textAlign: "left",
                  color: C.muted,
                  fontWeight: 800,
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: 1.2,
                  background: "#1a2744",
                  borderBottom: `1px solid ${C.border}`,
                  whiteSpace: "nowrap",
                  ...(i === 0 ? { width: 40 } : {}),
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tours.map((t, idx) => {
              const catColor = CATEGORY_COLORS[t.category] ?? C.accent;
              const isHover = hoverId === t.id;
              const isLast = idx === tours.length - 1;
              return (
                <tr
                  key={t.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open detail for tour ${t.id}: ${t.shortName}`}
                  onClick={() => goto(`tour-${t.id}`)}
                  onKeyDown={(e) => onKey(e, t)}
                  onMouseEnter={() => setHoverId(t.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onFocus={() => setHoverId(t.id)}
                  onBlur={() => setHoverId(null)}
                  style={{
                    cursor: "pointer",
                    background: isHover ? `${catColor}12` : "transparent",
                    transition: "background 0.12s",
                    outline: "none",
                  }}
                >
                  <td style={{
                    padding: "10px 12px",
                    borderBottom: isLast ? "none" : `1px solid ${C.border}`,
                    borderLeft: `3px solid ${isHover ? catColor : "transparent"}`,
                    transition: "border-color 0.12s",
                    verticalAlign: "middle",
                  }}>
                    <span title={CATEGORY_LABELS[t.category]} style={{
                      display: "inline-flex",
                      alignItems: "center", justifyContent: "center",
                      width: 26, height: 26,
                      background: `${catColor}20`,
                      color: catColor,
                      border: `1px solid ${catColor}50`,
                      borderRadius: 6,
                      fontSize: 11, fontWeight: 800,
                    }}>{t.id}</span>
                  </td>
                  <td style={{
                    padding: "10px 12px",
                    borderBottom: isLast ? "none" : `1px solid ${C.border}`,
                    fontWeight: 700,
                    color: isHover ? catColor : C.text,
                    fontSize: 12, lineHeight: 1.4,
                    transition: "color 0.12s",
                  }}>{t.shortName}</td>
                  <td style={{
                    padding: "10px 12px",
                    borderBottom: isLast ? "none" : `1px solid ${C.border}`,
                    color: C.muted, whiteSpace: "nowrap",
                  }}>{t.duration}</td>
                  <td style={{
                    padding: "10px 12px",
                    borderBottom: isLast ? "none" : `1px solid ${C.border}`,
                  }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                      {t.markets.map(m => (
                        <span key={m} title={m} style={{
                          fontSize: 13, lineHeight: 1,
                          padding: "2px 4px",
                          background: `${C.accent}10`,
                          border: `1px solid ${C.accent}30`,
                          borderRadius: 4,
                        }}>{MARKET_FLAGS[m] ?? m}</span>
                      ))}
                    </div>
                  </td>
                  <td style={{
                    padding: "10px 12px",
                    borderBottom: isLast ? "none" : `1px solid ${C.border}`,
                    color: C.muted, fontSize: 11,
                  }}>{t.platforms.join(" · ")}</td>
                  <td style={{
                    padding: "10px 12px",
                    borderBottom: isLast ? "none" : `1px solid ${C.border}`,
                  }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                      {t.bestMonths.map(m => (
                        <span key={m} style={{
                          fontSize: 10, fontWeight: 700,
                          padding: "1px 6px",
                          background: `${MONTH_COLOR[m]}18`,
                          color: MONTH_COLOR[m],
                          border: `1px solid ${MONTH_COLOR[m]}40`,
                          borderRadius: 10,
                        }}>{m}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MobileCardList({ tours, goto }) {
  const onKey = (e, t) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); goto(`tour-${t.id}`); }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {tours.map(t => {
        const catColor = CATEGORY_COLORS[t.category] ?? C.accent;
        return (
          <div
            key={t.id}
            role="button"
            tabIndex={0}
            aria-label={`Open detail for tour ${t.id}: ${t.shortName}`}
            onClick={() => goto(`tour-${t.id}`)}
            onKeyDown={(e) => onKey(e, t)}
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderLeft: `3px solid ${catColor}`,
              borderRadius: 10,
              padding: "12px 14px",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{
                display: "inline-flex",
                alignItems: "center", justifyContent: "center",
                width: 28, height: 28, flexShrink: 0,
                background: `${catColor}20`, color: catColor,
                border: `1px solid ${catColor}50`,
                borderRadius: 6, fontSize: 12, fontWeight: 800,
              }}>{t.id}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>
                  {t.shortName}
                </div>
                <div style={{ fontSize: 10, color: catColor, fontWeight: 600, marginTop: 2 }}>
                  {CATEGORY_LABELS[t.category]} · {t.duration}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, fontSize: 11, color: C.muted }}>
              <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
                {t.markets.map(m => (
                  <span key={m} style={{ fontSize: 14, lineHeight: 1 }}>{MARKET_FLAGS[m]}</span>
                ))}
              </div>
              <span style={{ color: C.border }}>·</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {t.bestMonths.map(m => (
                  <span key={m} style={{
                    fontSize: 10, fontWeight: 700,
                    padding: "1px 5px",
                    background: `${MONTH_COLOR[m]}18`,
                    color: MONTH_COLOR[m],
                    border: `1px solid ${MONTH_COLOR[m]}40`,
                    borderRadius: 8,
                  }}>{m}</span>
                ))}
              </div>
            </div>

            <div style={{ fontSize: 10, color: `${C.muted}99`, marginTop: 6 }}>
              {t.platforms.join(" · ")} · <span style={{ color: C.accent }}>tap for detail →</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
