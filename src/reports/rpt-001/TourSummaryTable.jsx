import { useState, useMemo } from "react";
import { T } from "../../data/colors.js";
import { TOURS, MARKET_FLAGS, CATEGORY_COLORS, CATEGORY_LABELS, MONTH_COLOR } from "./tourData.js";
import TourListView from "./TourListView.jsx";

const ALL_MARKETS = ["US", "UK", "CA", "AU", "NZ", "SG", "IN", "PH"];
const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS);
const ALL_MONTHS = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];

export default function TourSummaryTable({ goto, from }) {
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

  const filterPill = (label, active, onClick, color = T.lavender, key) => (
    <button
      key={key ?? label}
      onClick={onClick}
      aria-pressed={active}
      style={{
        background: active ? color : T.surface,
        color: active ? T.surface : T.inkSoft,
        border: `1px solid ${active ? color : T.line}`,
        borderRadius: 999,
        padding: "3px 11px",
        fontSize: 11, fontWeight: 700,
        cursor: "pointer",
        transition: "all 0.15s",
        whiteSpace: "nowrap",
        fontFamily: "inherit",
        letterSpacing: 0.4,
      }}
    >{label}</button>
  );

  const filterRow = (label, children) => (
    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
      <span style={{
        fontSize: 9.5, color: T.lavender, fontWeight: 800,
        textTransform: "uppercase", letterSpacing: 1.4,
        minWidth: 56,
      }}>{label}</span>
      {children}
    </div>
  );

  return (
    <>
      <div style={{
        background: T.surface,
        border: `1px solid ${T.line}`,
        borderRadius: 14,
        padding: "12px 14px",
        marginBottom: 16,
      }}>
        {filterRow("Market", (
          <>
            {ALL_MARKETS.map(m => filterPill(
              `${MARKET_FLAGS[m]} ${m}`, fMarket === m,
              () => setFMarket(fMarket === m ? null : m), T.lavender, m,
            ))}
            <button
              onClick={() => setShowMoreFilters(v => !v)}
              style={{
                background: "transparent",
                border: `1px dashed ${T.lineStrong}`,
                borderRadius: 999,
                padding: "3px 11px",
                fontSize: 11, fontWeight: 700,
                color: T.inkSoft, cursor: "pointer",
                marginLeft: 4, fontFamily: "inherit",
              }}
            >{showMoreFilters ? "− Less" : "+ Category / Month"}</button>
            {hasFilters && (
              <button
                onClick={clearFilters}
                style={{
                  background: "transparent",
                  border: `1px solid ${T.peach}`,
                  borderRadius: 999,
                  padding: "3px 11px",
                  fontSize: 11, fontWeight: 700,
                  color: T.peachInk, cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >Clear ✕</button>
            )}
          </>
        ))}

        {showMoreFilters && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${T.line}` }}>
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
          fontSize: 11.5, color: T.inkSoft, marginTop: 10,
          paddingTop: 8, borderTop: `1px solid ${T.line}`,
        }}>
          <span style={{ color: T.lavender, fontWeight: 700 }}>{tours.length}</span>
          <span style={{ marginLeft: 4 }}>of {TOURS.length} tours · click row to open detail</span>
        </div>
      </div>

      <TourListView tours={tours} goto={goto} from={from} />
    </>
  );
}
