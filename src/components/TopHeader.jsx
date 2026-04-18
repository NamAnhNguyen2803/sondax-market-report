// TopHeader — brand-aligned top nav inspired by sondaxtravel.com.
// Logo left · 4 intent-based mega menus center · "Visit site" CTA right.
// Each menu item navigates cross-report via goReport(report, section).

import { useState, useEffect, useRef } from "react";
import { T } from "../data/colors.js";

// ─── Menu data ─────────────────────────────────────────────────────────────
// Each menu is a list of groups; each group has a label (or null) + items.
// Each item: { label, desc, report, section, icon? }
const MENUS = [
  {
    key: "overview",
    label: "Tổng quan",
    width: 460,
    groups: [
      {
        label: null,
        items: [
          { icon: "🌏", label: "Asia · Trang chủ",                report: "asia",    section: "asia-home", desc: "Landing 6 câu hỏi insights cho inbound Việt Nam" },
          { icon: "📊", label: "Asia · Tổng quan inbound 2025",    report: "asia",    section: "overview",  desc: "Số liệu tổng quan inbound 2025 — 18 triệu lượt, top markets, growth" },
          { icon: "📋", label: "Asia · Tóm tắt chiến lược",        report: "asia",    section: "executive", desc: "Executive summary EN Inbound Tour 2026–27 (cover full year)" },
          { icon: "🏖️", label: "RPT-001 · Tour EN Inbound 5–10",   report: "rpt-001", section: "rpt-home",  desc: "Báo cáo focus mùa cao điểm — 18 tours · 5 curated insights" },
          { icon: "☕", label: "MKT-001 · Cafe + Cruise",          report: "mkt-001", section: "mkt-home",  desc: "Niche Hà Nội & Vịnh Hạ Long — financial bear/base/bull 2025–28" },
        ],
      },
    ],
  },
  {
    key: "season",
    label: "Mùa du lịch",
    width: 540,
    groups: [
      {
        label: "📆 Mùa cao điểm · Tháng 5–10",
        items: [
          { icon: "📆", label: "Tổng quan seasonal",          report: "rpt-001", section: "rpt-s8",        desc: "School holiday × market matrix · sub-peaks · regional suitability" },
          { icon: "☀️", label: "July Peak insight",           report: "rpt-001", section: "rpt-july-peak", desc: "Tours phù hợp Tháng 7 — peak Western family travel" },
          { icon: "📅", label: "Asia · Diễn biến theo quý",   report: "asia",    section: "quarterly",     desc: "Inbound theo quý — Q2/Q3 peak window, traffic shift" },
        ],
      },
      {
        label: "❄️ Mùa thấp điểm · Tháng 10–3",
        items: [
          { icon: "📆", label: "Asia · Mùa vụ chi tiết",        report: "asia", section: "seasonality", desc: "Shoulder + low season month-by-month, weather, demand pattern Q4–Q1" },
          { icon: "📋", label: "Asia · EN Inbound executive",    report: "asia", section: "executive",   desc: "Tóm tắt full-year — focus Q4 + Q1 (mùa Tết, golf, MICE)" },
          { icon: "🚀", label: "Asia · GTM Roadmap full year",   report: "asia", section: "gtm",         desc: "Go-to-market theo quý — actions cho mùa thấp điểm" },
        ],
      },
    ],
  },
  {
    key: "products",
    label: "Sản phẩm",
    width: 560,
    groups: [
      {
        label: "🏖️ Tour EN Inbound · Tháng 5–10",
        items: [
          { icon: "🔎", label: "Tour Explorer — 18 tours",    report: "rpt-001", section: "rpt-explorer",      desc: "Browse all · filter Market · Category · Month" },
          { icon: "🏆", label: "Quick Wins — 10 tours",       report: "rpt-001", section: "rpt-quick-wins",    desc: "Barrier thấp + ROI cao — launch trong 30 ngày" },
          { icon: "💎", label: "Whitespace — 5 tours",        report: "rpt-001", section: "rpt-whitespace",    desc: "Không có đối thủ trực tiếp — first-mover tuyệt đối" },
          { icon: "📈", label: "Growth Markets",              report: "rpt-001", section: "rpt-growth-markets", desc: "Thị trường tăng trưởng nhanh — bet vào đâu" },
          { icon: "💰", label: "Revenue Leaders",             report: "rpt-001", section: "rpt-revenue",       desc: "Tours pricing cao + supply tốt — margin play" },
        ],
      },
      {
        label: "☕🚢 Cafe + Cruise · HN/Vịnh HL",
        items: [
          { icon: "☕", label: "Cafe Workshop HN",             report: "mkt-001", section: "cafe-market",       desc: "15–25 operators · GMV $1.5–3.5M · Korean = top segment" },
          { icon: "🚢", label: "Cruise Vịnh Hạ Long",         report: "mkt-001", section: "cruise-market",     desc: "GMV $580–680M · 1N2D dominant · ADR $80–350+" },
          { icon: "🎯", label: "Synthesis Cafe + Cruise",      report: "mkt-001", section: "synthesis",         desc: "3 ưu tiên: Bundle / OTA reduce / Premium tier" },
        ],
      },
    ],
  },
  {
    key: "customers",
    label: "Khách hàng",
    width: 540,
    groups: [
      {
        label: "🌏 Theo quốc gia",
        items: [
          { icon: "🌏", label: "6 quốc gia trọng điểm",        report: "asia",    section: "country",     desc: "TQ · HQ · Nhật · Đài · Mỹ · Úc — sizing & shift 2025" },
          { icon: "🌐", label: "Source markets EN (10 nước)",   report: "rpt-001", section: "rpt-s1",      desc: "US · UK · CA · AU · NZ · IE · SG · IN · PH · ZA — segment size + holiday calendar" },
          { icon: "🇵🇭", label: "Philippines focus",             report: "asia",    section: "philippines", desc: "ASEAN visa-free + flexible travel calendar — segment chiến lược" },
        ],
      },
      {
        label: "👥 Theo persona / hành vi",
        items: [
          { icon: "👥", label: "7 Persona EN Inbound",         report: "asia", section: "personas", desc: "Family · Couple · Solo · Adventurer · Foodie · Heritage · Wellness" },
          { icon: "🧠", label: "Hành vi du khách",              report: "asia", section: "behavior", desc: "Booking lead time · spend per day · channel preference · trip length" },
          { icon: "📏", label: "Định cỡ thị trường",            report: "asia", section: "market",   desc: "Market sizing — TAM/SAM/SOM cho từng segment EN Inbound" },
        ],
      },
    ],
  },
];

// ─── Component ─────────────────────────────────────────────────────────────
export default function TopHeader({ goReport, setMobileOpen, isMobile }) {
  const [openKey, setOpenKey] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const containerRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    if (!openKey) return;
    const onKey = (e) => { if (e.key === "Escape") setOpenKey(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openKey]);

  // Close on outside click
  useEffect(() => {
    if (!openKey) return;
    const onClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpenKey(null);
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [openKey]);

  const onSelect = (item) => {
    goReport(item.report, item.section);
    setOpenKey(null);
    setMobileMenu(false);
  };

  // ─── Styles ──────────────────────────────────────────────────────────────
  const headerStyle = {
    background: T.bg,
    borderBottom: `1px solid ${T.line}`,
    position: "sticky", top: 0, zIndex: 60,
    boxShadow: "0 1px 3px rgba(27,43,90,0.04)",
  };

  const innerStyle = {
    display: "flex", alignItems: "center", gap: 10,
    padding: "12px 24px",
    maxWidth: 1280, margin: "0 auto",
  };

  const navBtnStyle = (active) => ({
    background: active ? T.navySoft : "transparent",
    border: "none",
    color: active ? T.navy : T.ink,
    fontSize: 13.5, fontWeight: 600,
    padding: "8px 14px",
    borderRadius: 8,
    cursor: "pointer",
    fontFamily: "inherit",
    display: "flex", alignItems: "center", gap: 6,
    transition: "background .15s, color .15s",
  });

  const ctaStyle = {
    background: T.amber,
    border: `1px solid ${T.amber}`,
    color: "#FFFFFF",
    fontSize: 12.5, fontWeight: 700,
    padding: "8px 14px",
    borderRadius: 8,
    cursor: "pointer",
    fontFamily: "inherit",
    textDecoration: "none",
    display: "inline-flex", alignItems: "center", gap: 5,
    transition: "background .15s, transform .1s",
  };

  return (
    <header ref={containerRef} style={headerStyle}>
      <div style={innerStyle}>

        {/* Mobile hamburger (in-report sidebar) */}
        {isMobile && (
          <button
            onClick={() => setMobileOpen?.(v => !v)}
            style={{
              background: T.navySoft, border: `1px solid ${T.line}`,
              color: T.navy, fontSize: 16, cursor: "pointer",
              padding: "4px 10px", borderRadius: 8, fontWeight: 700,
              marginRight: 4,
            }}
            aria-label="Open in-report sidebar"
          >☰</button>
        )}

        {/* Logo */}
        <button
          onClick={() => goReport("asia", "asia-home")}
          style={{
            background: "transparent", border: "none", padding: 0, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 10,
          }}
          aria-label="Sondax Travel home"
        >
          <img
            src="/brand/sondax-logo.png"
            alt="Sondax Travel"
            style={{ height: 36, width: "auto", display: "block" }}
          />
        </button>

        {/* Center nav (desktop) */}
        {!isMobile && (
          <nav style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 18 }}>
            {MENUS.map(m => (
              <button
                key={m.key}
                onClick={() => setOpenKey(openKey === m.key ? null : m.key)}
                style={navBtnStyle(openKey === m.key)}
              >
                {m.label}
                <span style={{
                  fontSize: 8, opacity: 0.7,
                  transform: openKey === m.key ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform .15s",
                }}>▼</span>
              </button>
            ))}
          </nav>
        )}

        {/* Mobile nav toggle (mega menu drawer) */}
        {isMobile && (
          <button
            onClick={() => setMobileMenu(v => !v)}
            style={{ ...navBtnStyle(mobileMenu), marginLeft: "auto" }}
          >
            Khám phá <span style={{ fontSize: 8, opacity: 0.7 }}>{mobileMenu ? "▲" : "▼"}</span>
          </button>
        )}

        <div style={{ flex: 1 }} />

        {/* Right CTA — sondaxtravel.com */}
        {!isMobile && (
          <a
            href="https://sondaxtravel.com"
            target="_blank"
            rel="noopener noreferrer"
            style={ctaStyle}
            onMouseEnter={e => e.currentTarget.style.background = T.amberInk}
            onMouseLeave={e => e.currentTarget.style.background = T.amber}
          >
            ↗ sondaxtravel.com
          </a>
        )}
      </div>

      {/* ─── Desktop mega-menu panel ─── */}
      {!isMobile && openKey && (() => {
        const menu = MENUS.find(m => m.key === openKey);
        const idx  = MENUS.findIndex(m => m.key === openKey);
        // Position panel under its trigger
        return (
          <div style={{
            position: "absolute",
            top: "100%", left: 0, right: 0,
            background: "transparent",
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}>
            <div style={{
              maxWidth: 1280, width: "100%",
              padding: "0 24px",
              position: "relative",
            }}>
              <div style={{
                position: "absolute",
                top: 6,
                // approximate offset under the button (logo + spacing + buttons before)
                left: `calc(24px + ${isMobile ? 0 : 36 + 10 + 18}px + ${idx * 92}px)`,
                width: menu.width,
                background: T.surface,
                border: `1px solid ${T.line}`,
                borderRadius: 14,
                boxShadow: "0 14px 40px rgba(27,43,90,0.12)",
                pointerEvents: "auto",
                padding: "16px 16px 14px",
                maxHeight: "70vh",
                overflowY: "auto",
              }}>
                {menu.groups.map((g, gi) => (
                  <div key={gi} style={{ marginBottom: gi < menu.groups.length - 1 ? 14 : 0 }}>
                    {g.label && (
                      <div style={{
                        fontSize: 10, color: T.amberInk,
                        fontWeight: 700, textTransform: "uppercase",
                        letterSpacing: 1.4, padding: "4px 8px 8px",
                      }}>{g.label}</div>
                    )}
                    {g.items.map((it, ii) => (
                      <button
                        key={ii}
                        onClick={() => onSelect(it)}
                        style={{
                          display: "flex", gap: 12, alignItems: "flex-start",
                          width: "100%", textAlign: "left",
                          padding: "10px 12px",
                          background: "transparent",
                          border: "none", borderRadius: 8,
                          cursor: "pointer",
                          fontFamily: "inherit",
                          transition: "background .12s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = T.amberSoft}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <span style={{ fontSize: 18, lineHeight: 1.2, marginTop: 1 }}>{it.icon}</span>
                        <span style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ color: T.ink, fontWeight: 700, fontSize: 13, marginBottom: 2 }}>
                            {it.label}
                          </div>
                          <div style={{ color: T.inkSoft, fontSize: 11.5, lineHeight: 1.45 }}>
                            {it.desc}
                          </div>
                        </span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ─── Mobile mega-menu drawer (stacked accordion) ─── */}
      {isMobile && mobileMenu && (
        <div style={{
          background: T.surface,
          borderTop: `1px solid ${T.line}`,
          maxHeight: "70vh", overflowY: "auto",
          padding: "10px 16px 18px",
        }}>
          {MENUS.map(m => (
            <div key={m.key} style={{ marginBottom: 14 }}>
              <div style={{
                fontSize: 11, color: T.navy,
                fontWeight: 800, textTransform: "uppercase",
                letterSpacing: 1.4, padding: "12px 4px 6px",
                borderBottom: `1px solid ${T.line}`,
              }}>{m.label}</div>
              {m.groups.map((g, gi) => (
                <div key={gi} style={{ marginTop: 8 }}>
                  {g.label && (
                    <div style={{
                      fontSize: 10, color: T.amberInk,
                      fontWeight: 700, textTransform: "uppercase",
                      letterSpacing: 1.2, padding: "4px 6px 4px",
                    }}>{g.label}</div>
                  )}
                  {g.items.map((it, ii) => (
                    <button
                      key={ii}
                      onClick={() => onSelect(it)}
                      style={{
                        display: "flex", gap: 10, alignItems: "flex-start",
                        width: "100%", textAlign: "left",
                        padding: "10px 8px",
                        background: "transparent",
                        border: "none", borderRadius: 8,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      <span style={{ fontSize: 16 }}>{it.icon}</span>
                      <span style={{ flex: 1 }}>
                        <div style={{ color: T.ink, fontWeight: 700, fontSize: 13 }}>{it.label}</div>
                        <div style={{ color: T.inkSoft, fontSize: 11.5, lineHeight: 1.45, marginTop: 2 }}>{it.desc}</div>
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          ))}
          <a
            href="https://sondaxtravel.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block", marginTop: 8, padding: "10px 14px",
              background: T.amber, color: "#FFFFFF",
              borderRadius: 8, textAlign: "center",
              textDecoration: "none", fontWeight: 700, fontSize: 13,
            }}
          >↗ sondaxtravel.com</a>
        </div>
      )}
    </header>
  );
}
