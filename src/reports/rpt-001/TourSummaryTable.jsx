import { useState, useMemo } from "react";
import { C } from "../../data/colors.js";
import { TOURS, MARKET_FLAGS, CATEGORY_COLORS, CATEGORY_LABELS, MONTH_COLOR } from "./tourData.js";
import TourListView from "./TourListView.jsx";

const ALL_MARKETS = ["US", "UK", "CA", "AU", "NZ", "SG", "IN", "PH"];
const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS);
const ALL_MONTHS = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];

export default function TourSummaryTable({ goto }) {
  const [fMarket, setFMarket] = useState(null);
  const [fCategory, setFCategory] = useState(null);
  const [fMonth, setFMonth] = useState(null);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const tours = useMemo(() => TOURS.filter(t => {
    if (fMarket && !t.markets.includes(fMarket)) return false;
    if (fCategory && t.category !== fCategory) return false;
    if (fMonth && !t.bestMonths.includes(fMonth)) return false;
    return true;
  }), [fMarket, fCategory, fMonth]);

  const clearFilters = () => { setFMarket(null); setFCategory(null); setFMonth(null); };
  const hasFilters = fMarket || fCategory || fMonth;

  const filterPill = (label, active, onClick, color = C.accent, key) => (
    <button
      key={key ?? label}
      onClick={onClick}
      aria-pressed={active}
      style={{
        background: active ? color : "transparent",
        color: active ? "#0F172A" : color,
        border: `1px solid ${active ? color : `${color}50`}`,
        borderRadius: 14,
        padding: "2px 9px",
        fontSize: 11, fontWeight: 700,
        cursor: "pointer",
        transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
    >{label}</button>
  );

  const filterRow = (label, children) => (
    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
      <span style={{
        fontSize: 9, color: C.muted, fontWeight: 800,
        textTransform: "uppercase", letterSpacing: 1.4,
        minWidth: 54,
      }}>{label}</span>
      {children}
    </div>
  );

  return (
    <>
      <div style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: "10px 12px",
        marginBottom: 14,
      }}>
        {filterRow("Market", (
          <>
            {ALL_MARKETS.map(m => filterPill(
              `${MARKET_FLAGS[m]} ${m}`, fMarket === m,
              () => setFMarket(fMarket === m ? null : m), C.accent, m,
            ))}
            <button
              onClick={() => setShowMoreFilters(v => !v)}
              style={{
                background: "transparent",
                border: `1px dashed ${C.muted}60`,
                borderRadius: 14,
                padding: "2px 9px",
                fontSize: 11, fontWeight: 700,
                color: C.muted, cursor: "pointer",
                marginLeft: 4,
              }}
            >{showMoreFilters ? "− Less" : "+ Category / Month"}</button>
            {hasFilters && (
              <button
                onClick={clearFilters}
                style={{
                  background: "transparent",
                  border: `1px solid ${C.pink}50`,
                  borderRadius: 14,
                  padding: "2px 9px",
                  fontSize: 11, fontWeight: 700,
                  color: C.pink, cursor: "pointer",
                }}
              >Clear ✕</button>
            )}
          </>
        ))}

        {showMoreFilters && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.border}` }}>
            {filterRow("Category", ALL_CATEGORIES.map(cat => filterPill(
              CATEGORY_LABELS[cat], fCategory === cat,
              () => setFCategory(fCategory === cat ? null : cat),
              CATEGORY_COLORS[cat], cat,
            )))}
            {filterRow("Month", ALL_MONTHS.map(m => filterPill(
              m, fMonth === m,
              () => setFMonth(fMonth === m ? null : m),
              MONTH_COLOR[m], m,
            )))}
          </div>
        )}

        <div style={{
          fontSize: 11, color: C.muted, marginTop: 8,
          paddingTop: 6, borderTop: `1px solid ${C.border}`,
        }}>
          <span style={{ color: C.accent, fontWeight: 700 }}>{tours.length}</span>
          <span style={{ marginLeft: 4 }}>of {TOURS.length} tours · click to open detail</span>
        </div>
      </div>

      <TourListView tours={tours} goto={goto} />
    </>
  );
}
