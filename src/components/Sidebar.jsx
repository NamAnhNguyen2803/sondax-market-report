import { useState, useEffect } from "react";
import { C } from "../data/colors.js";
import { TABS, EN_INBOUND_TABS, RPT_001_TABS } from "../data/index.js";

const W = 232;

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

// Top-level groups — ordered. RPT-001 is 2nd, right after Asia.
const GROUPS = [
  { id: "asia",      label: "Asia → Vietnam 2025",    report: "asia"    },
  { id: "rpt-001",   label: "RPT-001 · VN Tours May–Oct", report: "rpt-001" },
  { id: "en-inbound", label: "Tour EN Inbound · 2026–27", report: "asia"   },
  { id: "mkt-001",   label: "MKT-001 · Cafe + Cruise", report: "mkt-001" },
];

export default function Sidebar({ view, setView, mobileOpen, setMobileOpen }) {
  // Only the active group is expanded by default; RPT-001 open on first load
  const [expanded, setExpanded] = useState(() => {
    const initial = {};
    GROUPS.forEach(g => { initial[g.id] = false; });
    // Default-expanded based on current view
    if (view.report === "rpt-001") initial["rpt-001"] = true;
    else if (view.report === "mkt-001") initial["mkt-001"] = true;
    else initial["asia"] = true;
    // MKT subgroup state
    initial.cafe = view.section?.startsWith("cafe") ?? false;
    initial.cruise = view.section?.startsWith("cruise") ?? false;
    return initial;
  });

  // Auto-expand the group that matches the active view when it changes
  useEffect(() => {
    setExpanded(prev => {
      const next = { ...prev };
      if (view.report === "rpt-001") next["rpt-001"] = true;
      else if (view.report === "mkt-001") next["mkt-001"] = true;
      else if (view.report === "asia") {
        // keep both asia groups agnostic — don't force collapse user's choice
        if (!next["asia"] && !next["en-inbound"]) next["asia"] = true;
      }
      return next;
    });
  }, [view.report]);

  const toggle = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  const isAsia = (tab) => view.report === "asia" && view.section === tab;
  const isMkt  = (sec) => view.report === "mkt-001" && view.section === sec;
  const isRpt  = (sec) => view.report === "rpt-001" && view.section === sec;

  const go = (report, section) => { setView({ report, section }); setMobileOpen(false); };

  const sidebarStyle = {
    width: W, minWidth: W,
    background: "#0b1222",
    borderRight: `1px solid ${C.border}`,
    display: "flex", flexDirection: "column",
    overflowY: "auto",
    position: "sticky", top: 0,
    height: "100vh", flexShrink: 0,
  };

  // Collapsible top-level group header
  const groupToggle = (id, label, count) => {
    const open = !!expanded[id];
    return (
      <button
        onClick={() => toggle(id)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          width: "100%", textAlign: "left",
          padding: "10px 14px 8px",
          marginTop: 6,
          background: open ? `${C.accent}0a` : "transparent",
          border: "none",
          borderLeft: `2px solid ${open ? C.accent : "transparent"}`,
          color: open ? C.accent : C.muted,
          fontSize: 9, fontWeight: 800,
          textTransform: "uppercase", letterSpacing: 1.4,
          cursor: "pointer",
          transition: "color 0.15s, background 0.15s",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            display: "inline-block",
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.15s",
            fontSize: 9, color: open ? C.accent : C.muted,
          }}>▶</span>
          {label}
        </span>
        {count != null && (
          <span style={{
            fontSize: 9, color: open ? C.accent : `${C.muted}80`,
            fontWeight: 700,
          }}>{count}</span>
        )}
      </button>
    );
  };

  const navItem = (label, active, onClick, indent = false) => (
    <button onClick={onClick} style={{
      display: "block", width: "100%", textAlign: "left",
      padding: indent ? "6px 14px 6px 28px" : "6px 14px 6px 22px",
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

  const mktSubgroupHeader = (id, label) => {
    const open = !!expanded[id];
    return (
      <button onClick={() => toggle(id)} style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        width: "100%", textAlign: "left",
        padding: "6px 14px 6px 22px",
        background: "transparent",
        border: "none",
        color: C.text, fontSize: 12, fontWeight: 600,
        cursor: "pointer",
      }}>
        <span>{label}</span>
        <span style={{ fontSize: 9, color: C.muted, marginLeft: 6 }}>
          {open ? "▲" : "▼"}
        </span>
      </button>
    );
  };

  return (
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

      {/* 1. Asia → Vietnam 2025 */}
      {groupToggle("asia", "Asia → Vietnam 2025", TABS.length)}
      {expanded["asia"] && TABS.map(t => (
        <div key={t.id}>{navItem(t.label, isAsia(t.id), () => go("asia", t.id))}</div>
      ))}

      {/* 2. RPT-001 — Vietnam Tours EN Inbound (moved up) */}
      {groupToggle("rpt-001", "RPT-001 · VN Tours May–Oct", RPT_001_TABS.length)}
      {expanded["rpt-001"] && (
        <>
          {RPT_001_TABS.filter(t => !t.group).map(t => (
            <div key={t.id}>{navItem(t.label, isRpt(t.id), () => go("rpt-001", t.id))}</div>
          ))}
          {mktSubgroupHeader("rpt-evidence", "📊 Evidence · S1–S9")}
          {(expanded["rpt-evidence"] || RPT_001_TABS.some(t => t.group === "evidence" && isRpt(t.id)))
            && RPT_001_TABS.filter(t => t.group === "evidence").map(t => (
              <div key={t.id}>{navItem(t.label, isRpt(t.id), () => go("rpt-001", t.id), true)}</div>
            ))}
        </>
      )}

      {/* 3. EN Inbound Research */}
      {groupToggle("en-inbound", "Tour EN Inbound · 2026–27", EN_INBOUND_TABS.length)}
      {expanded["en-inbound"] && EN_INBOUND_TABS.map(t => (
        <div key={t.id}>{navItem(t.label, isAsia(t.id), () => go("asia", t.id))}</div>
      ))}

      {/* 4. MKT-001 */}
      {groupToggle("mkt-001", "MKT-001 · Cafe + Cruise", MKT_NAV.length)}
      {expanded["mkt-001"] && MKT_NAV.map(item => {
        if (!item.children) {
          return (
            <div key={item.id}>
              {navItem(item.label, isMkt(item.id), () => go("mkt-001", item.id))}
            </div>
          );
        }
        const anyChildActive = item.children.some(c => isMkt(c.id));
        return (
          <div key={item.id}>
            {mktSubgroupHeader(item.id, item.label)}
            {(expanded[item.id] || anyChildActive) && item.children.map(child =>
              navItem(child.label, isMkt(child.id), () => go("mkt-001", child.id), true)
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
}
