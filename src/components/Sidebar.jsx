import { useState } from "react";
import { C } from "../data/colors.js";
import { TABS, EN_INBOUND_TABS, RPT_001_TABS } from "../data/index.js";

const W = 232; // sidebar width px

// MKT-001 nav tree
const MKT_NAV = [
  { id: "executive", label: "📝 Executive Summary" },
  {
    id: "cafe", label: "☕ Cafe Workshop HN",
    children: [
      { id: "cafe-market", label: "Thị trường & Khách hàng" },
      { id: "cafe-competition", label: "Cạnh tranh & Vận hành" },
    ],
  },
  {
    id: "cruise", label: "🚢 Cruise Vịnh Hạ Long",
    children: [
      { id: "cruise-market", label: "Thị trường & Khách hàng" },
      { id: "cruise-competition", label: "Cạnh tranh & Vận hành" },
    ],
  },
  { id: "synthesis", label: "🎯 Synthesis & Roadmap" },
];

export default function Sidebar({ view, setView, mobileOpen, setMobileOpen }) {
  const [expanded, setExpanded] = useState({ cafe: true, cruise: false });

  const isAsia = (tab) => view.report === "asia" && view.section === tab;
  const isMkt = (sec) => view.report === "mkt-001" && view.section === sec;

  const goAsia = (tab) => { setView({ report: "asia", section: tab }); setMobileOpen(false); };
  const goMkt  = (sec)  => { setView({ report: "mkt-001", section: sec }); setMobileOpen(false); };
  const toggle = (id)   => setExpanded(p => ({ ...p, [id]: !p[id] }));

  const sidebarStyle = {
    width: W,
    minWidth: W,
    background: "#0b1222",
    borderRight: `1px solid ${C.border}`,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    position: "sticky",
    top: 0,
    height: "100vh",
    flexShrink: 0,
    // mobile: absolute overlay
    ...(mobileOpen === false ? {
      // desktop: always shown handled by parent flex
    } : {}),
  };

  const groupLabel = (text) => (
    <div style={{
      fontSize: 9, color: C.muted, fontWeight: 800,
      textTransform: "uppercase", letterSpacing: 2,
      padding: "18px 14px 6px",
    }}>
      {text}
    </div>
  );

  const navItem = (label, active, onClick, indent = false) => (
    <button onClick={onClick} style={{
      display: "block", width: "100%", textAlign: "left",
      padding: indent ? "6px 14px 6px 28px" : "7px 14px",
      background: active ? `${C.accent}18` : "transparent",
      borderLeft: active ? `2px solid ${C.accent}` : "2px solid transparent",
      color: active ? C.accent : C.muted,
      fontWeight: active ? 700 : 400,
      fontSize: indent ? 11 : 12,
      border: "none",
      cursor: "pointer",
      lineHeight: 1.45,
      transition: "color .15s, background .15s",
    }}>
      {label}
    </button>
  );

  const groupHeader = (id, label) => (
    <button onClick={() => toggle(id)} style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      width: "100%", textAlign: "left",
      padding: "7px 14px",
      background: "transparent",
      border: "none",
      color: C.text,
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer",
    }}>
      <span>{label}</span>
      <span style={{ fontSize: 9, color: C.muted, marginLeft: 6 }}>
        {expanded[id] ? "▲" : "▼"}
      </span>
    </button>
  );

  const inner = (
    <div style={sidebarStyle}>
      {/* Branding */}
      <div style={{
        padding: "16px 14px 12px",
        borderBottom: `1px solid ${C.border}`,
        fontSize: 11, fontWeight: 800, color: C.accent, letterSpacing: 1,
        textTransform: "uppercase",
      }}>
        Sondax Travel
      </div>

      {/* Asia */}
      {groupLabel("Asia → Vietnam 2025")}
      {TABS.map(t => (
        <div key={t.id}>{navItem(t.label, isAsia(t.id), () => goAsia(t.id))}</div>
      ))}

      {/* EN Inbound Research */}
      {groupLabel("Tour EN Inbound · 2026–27")}
      {EN_INBOUND_TABS.map(t => (
        <div key={t.id}>{navItem(t.label, isAsia(t.id), () => goAsia(t.id))}</div>
      ))}

      {/* RPT-001 — Vietnam Tours EN Inbound */}
      {groupLabel("RPT-001 · VN Tours May–Oct")}
      {RPT_001_TABS.map(t => (
        <div key={t.id}>{navItem(t.label, view.report === "rpt-001" && view.section === t.id, () => { setView({ report: "rpt-001", section: t.id }); setMobileOpen(false); })}</div>
      ))}

      {/* MKT-001 */}
      {groupLabel("MKT-001 · Cafe + Cruise")}
      {MKT_NAV.map(item => {
        if (!item.children) {
          return (
            <div key={item.id}>
              {navItem(item.label, isMkt(item.id), () => goMkt(item.id))}
            </div>
          );
        }
        const anyChildActive = item.children.some(c => isMkt(c.id));
        return (
          <div key={item.id}>
            {groupHeader(item.id, item.label)}
            {(expanded[item.id] || anyChildActive) && item.children.map(child =>
              navItem(child.label, isMkt(child.id), () => goMkt(child.id), true)
            )}
          </div>
        );
      })}

      <div style={{ flex: 1 }} />

      {/* Watermark */}
      <div style={{
        padding: "12px 14px",
        borderTop: `1px solid ${C.border}`,
        fontSize: 10,
        color: `${C.muted}80`,
        fontWeight: 600,
        letterSpacing: 1.2,
        textTransform: "uppercase",
      }}>
        Report by Nam Anh
      </div>
    </div>
  );

  return inner;
}
