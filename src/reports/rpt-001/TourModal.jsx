import { useEffect } from "react";
import { C } from "../../data/colors.js";
import { MARKET_FLAGS, CATEGORY_COLORS, CATEGORY_LABELS, MONTH_COLOR } from "./tourData.js";

export default function TourModal({ tour, onClose }) {
  useEffect(() => {
    if (!tour) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [tour, onClose]);

  if (!tour) return null;

  const catColor = CATEGORY_COLORS[tour.category] ?? C.accent;

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

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(5, 10, 22, 0.75)",
        backdropFilter: "blur(4px)",
        zIndex: 200,
        display: "flex",
        alignItems: "center", justifyContent: "center",
        padding: 20,
        animation: "tmFadeIn 0.18s ease-out",
      }}
    >
      <style>{`
        @keyframes tmFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes tmSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 14,
          width: "100%",
          maxWidth: 720,
          maxHeight: "86vh",
          overflow: "hidden",
          boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${catColor}30`,
          animation: "tmSlideUp 0.22s ease-out",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "18px 22px 14px",
          background: `linear-gradient(135deg, ${catColor}15 0%, transparent 80%)`,
          borderBottom: `1px solid ${C.border}`,
          position: "relative",
        }}>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute", top: 12, right: 14,
              background: "transparent",
              border: `1px solid ${C.border}`,
              borderRadius: 6,
              color: C.muted,
              width: 28, height: 28,
              cursor: "pointer",
              fontSize: 14,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = C.text; e.currentTarget.style.borderColor = C.text; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = C.muted; e.currentTarget.style.borderColor = C.border; }}
          >
            ✕
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{
              background: catColor, color: "#0F172A",
              fontSize: 10, fontWeight: 800,
              padding: "3px 8px", borderRadius: 6,
              letterSpacing: 0.5,
            }}>
              TOUR #{tour.id}
            </span>
            <span style={{
              fontSize: 10, color: catColor,
              fontWeight: 700, letterSpacing: 0.5,
            }}>
              {CATEGORY_LABELS[tour.category]}
            </span>
          </div>

          <h2 style={{
            fontSize: 18, fontWeight: 800, color: C.text,
            margin: 0, lineHeight: 1.35, paddingRight: 32,
          }}>
            {tour.name}
          </h2>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 12, fontSize: 11 }}>
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

        {/* Body — scrollable */}
        <div style={{
          overflowY: "auto",
          padding: "18px 22px 22px",
          flex: 1,
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 4 }}>
            <div>
              <div style={{
                fontSize: 9, color: C.muted, textTransform: "uppercase",
                letterSpacing: 1.4, fontWeight: 700, marginBottom: 6,
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
            <div>
              <div style={{
                fontSize: 9, color: C.muted, textTransform: "uppercase",
                letterSpacing: 1.4, fontWeight: 700, marginBottom: 6,
              }}>
                Best Platforms
              </div>
              <div>{tour.platforms.map(p => chip(p, C.purple ?? "#A78BFA"))}</div>
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{
              fontSize: 9, color: C.muted, textTransform: "uppercase",
              letterSpacing: 1.4, fontWeight: 700, marginBottom: 6,
            }}>
              Best Months
            </div>
            <div>
              {tour.bestMonths.map(m => chip(m, MONTH_COLOR[m] ?? C.accent))}
            </div>
          </div>

          {section("Route / Destinations", tour.route, C.text)}

          <div style={{
            background: "#0b1222",
            border: `1px solid ${C.border}`,
            borderLeft: `3px solid ${C.green}`,
            borderRadius: "0 8px 8px 0",
            padding: "12px 14px",
            marginBottom: 14,
          }}>
            <div style={{
              fontSize: 9, color: C.green, textTransform: "uppercase",
              letterSpacing: 1.4, fontWeight: 800, marginBottom: 6,
            }}>
              💰 Revenue / Chuyến
            </div>
            <div style={{ fontSize: 14, color: C.text, fontWeight: 700 }}>
              {tour.revenue}
            </div>
          </div>

          {section("Rationale (từ S1–S8)", tour.rationale)}

          <div style={{
            background: `${C.orange}08`,
            border: `1px solid ${C.orange}30`,
            borderLeft: `3px solid ${C.orange}`,
            borderRadius: "0 8px 8px 0",
            padding: "12px 14px",
            marginBottom: 14,
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

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <div style={{
                fontSize: 9, color: C.muted, textTransform: "uppercase",
                letterSpacing: 1.4, fontWeight: 700, marginBottom: 6,
              }}>
                Đối thủ dẫn đầu
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
                {tour.competitors}
              </div>
            </div>
            <div>
              <div style={{
                fontSize: 9, color: C.pink, textTransform: "uppercase",
                letterSpacing: 1.4, fontWeight: 700, marginBottom: 6,
              }}>
                Rào cản gia nhập
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
                {tour.barrier}
              </div>
            </div>
          </div>
        </div>

        {/* Footer hint */}
        <div style={{
          padding: "10px 22px",
          borderTop: `1px solid ${C.border}`,
          fontSize: 10, color: `${C.muted}99`,
          textAlign: "center",
        }}>
          Press <kbd style={{ background: "#0b1222", padding: "1px 6px", borderRadius: 4, border: `1px solid ${C.border}`, fontSize: 10 }}>ESC</kbd> or click outside to close
        </div>
      </div>
    </div>
  );
}
