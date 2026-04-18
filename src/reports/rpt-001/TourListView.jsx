// Shared table + card list renderer. Decoupled from filter bar so InsightPane
// and TourSummaryTable can both reuse it with different tour subsets.

import { useState, useEffect } from "react";
import { T } from "../../data/colors.js";
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

export default function TourListView({ tours, goto, from }) {
  const [hoverId, setHoverId] = useState(null);
  const isMobile = useIsMobile();
  if (isMobile) return <MobileCardList tours={tours} goto={goto} from={from} />;
  return <DesktopTable tours={tours} goto={goto} from={from} hoverId={hoverId} setHoverId={setHoverId} />;
}

function DesktopTable({ tours, goto, from, hoverId, setHoverId }) {
  const onKey = (e, t) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); goto(`tour-${t.id}`, from); }
  };

  return (
    <div style={{
      background: T.surface,
      border: `1px solid ${T.line}`,
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: "0 1px 2px rgba(168,143,191,0.08), 0 8px 24px -16px rgba(168,143,191,0.18)",
    }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: 0,
          fontSize: 12.5,
          minWidth: 680,
        }}>
          <thead>
            <tr>
              {["#", "Tour", "Duration", "Markets", "Platforms", "Months"].map((h, i) => (
                <th key={h} style={{
                  padding: "11px 14px",
                  textAlign: "left",
                  color: T.lavender,
                  fontWeight: 800,
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: 1.4,
                  background: T.lavenderSoft,
                  borderBottom: `1px solid ${T.line}`,
                  whiteSpace: "nowrap",
                  ...(i === 0 ? { width: 48 } : {}),
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tours.map((t, idx) => {
              const catColor = CATEGORY_COLORS[t.category] ?? T.lavender;
              const isHover = hoverId === t.id;
              const isLast = idx === tours.length - 1;
              return (
                <tr
                  key={t.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open detail for tour ${t.id}: ${t.shortName}`}
                  onClick={() => goto(`tour-${t.id}`, from)}
                  onKeyDown={(e) => onKey(e, t)}
                  onMouseEnter={() => setHoverId(t.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onFocus={() => setHoverId(t.id)}
                  onBlur={() => setHoverId(null)}
                  style={{
                    cursor: "pointer",
                    background: isHover ? T.surfaceSoft : T.surface,
                    transition: "background 0.12s",
                    outline: "none",
                  }}
                >
                  <td style={{
                    padding: "10px 14px",
                    borderBottom: isLast ? "none" : `1px solid ${T.line}`,
                    borderLeft: `3px solid ${isHover ? catColor : "transparent"}`,
                    transition: "border-color 0.12s",
                    verticalAlign: "middle",
                  }}>
                    <span title={CATEGORY_LABELS[t.category]} style={{
                      display: "inline-flex",
                      alignItems: "center", justifyContent: "center",
                      width: 28, height: 28,
                      background: `${catColor}22`,
                      color: catColor,
                      border: `1px solid ${catColor}55`,
                      borderRadius: 8,
                      fontSize: 11.5, fontWeight: 800,
                    }}>{t.id}</span>
                  </td>
                  <td className="serif" style={{
                    padding: "10px 14px",
                    borderBottom: isLast ? "none" : `1px solid ${T.line}`,
                    fontWeight: 600,
                    color: isHover ? catColor : T.ink,
                    fontSize: 14, lineHeight: 1.35,
                    transition: "color 0.12s",
                  }}>{t.shortName}</td>
                  <td style={{
                    padding: "10px 14px",
                    borderBottom: isLast ? "none" : `1px solid ${T.line}`,
                    color: T.inkSoft, whiteSpace: "nowrap",
                  }}>{t.duration}</td>
                  <td style={{
                    padding: "10px 14px",
                    borderBottom: isLast ? "none" : `1px solid ${T.line}`,
                  }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                      {t.markets.map(m => (
                        <span key={m} title={m} style={{
                          fontSize: 13, lineHeight: 1,
                          padding: "2px 5px",
                          background: T.lavenderSoft,
                          border: `1px solid ${T.lavender}66`,
                          borderRadius: 6,
                        }}>{MARKET_FLAGS[m] ?? m}</span>
                      ))}
                    </div>
                  </td>
                  <td style={{
                    padding: "10px 14px",
                    borderBottom: isLast ? "none" : `1px solid ${T.line}`,
                    color: T.inkSoft, fontSize: 11.5,
                  }}>{t.platforms.join(" · ")}</td>
                  <td style={{
                    padding: "10px 14px",
                    borderBottom: isLast ? "none" : `1px solid ${T.line}`,
                  }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                      {t.bestMonths.map(m => (
                        <span key={m} style={{
                          fontSize: 10, fontWeight: 700,
                          padding: "1px 7px",
                          background: `${MONTH_COLOR[m]}1f`,
                          color: MONTH_COLOR[m],
                          border: `1px solid ${MONTH_COLOR[m]}55`,
                          borderRadius: 999,
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

function MobileCardList({ tours, goto, from }) {
  const onKey = (e, t) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); goto(`tour-${t.id}`, from); }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {tours.map(t => {
        const catColor = CATEGORY_COLORS[t.category] ?? T.lavender;
        return (
          <div
            key={t.id}
            role="button"
            tabIndex={0}
            aria-label={`Open detail for tour ${t.id}: ${t.shortName}`}
            onClick={() => goto(`tour-${t.id}`, from)}
            onKeyDown={(e) => onKey(e, t)}
            style={{
              background: T.surface,
              border: `1px solid ${T.line}`,
              borderLeft: `3px solid ${catColor}`,
              borderRadius: 14,
              padding: "13px 15px",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{
                display: "inline-flex",
                alignItems: "center", justifyContent: "center",
                width: 30, height: 30, flexShrink: 0,
                background: `${catColor}22`, color: catColor,
                border: `1px solid ${catColor}55`,
                borderRadius: 8, fontSize: 12, fontWeight: 800,
              }}>{t.id}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="serif" style={{ fontSize: 14, fontWeight: 600, color: T.ink, lineHeight: 1.3 }}>
                  {t.shortName}
                </div>
                <div style={{ fontSize: 10.5, color: catColor, fontWeight: 600, marginTop: 2 }}>
                  {CATEGORY_LABELS[t.category]} · {t.duration}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, fontSize: 11, color: T.inkSoft }}>
              <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
                {t.markets.map(m => (
                  <span key={m} style={{ fontSize: 14, lineHeight: 1 }}>{MARKET_FLAGS[m]}</span>
                ))}
              </div>
              <span style={{ color: T.lineStrong }}>·</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {t.bestMonths.map(m => (
                  <span key={m} style={{
                    fontSize: 10, fontWeight: 700,
                    padding: "1px 6px",
                    background: `${MONTH_COLOR[m]}1f`,
                    color: MONTH_COLOR[m],
                    border: `1px solid ${MONTH_COLOR[m]}55`,
                    borderRadius: 999,
                  }}>{m}</span>
                ))}
              </div>
            </div>

            <div style={{ fontSize: 10.5, color: T.inkSoft, marginTop: 6 }}>
              {t.platforms.join(" · ")} · <span style={{ color: T.peach, fontWeight: 700 }}>tap for detail →</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
