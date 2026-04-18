import { useState, useEffect } from "react";
import { T } from "../data/colors.js";
import { ASIA_NAV }    from "../reports/asia/nav.js";
import { MKT_NAV }     from "../reports/mkt-001/nav.js";
import { RPT_NAV }     from "../reports/rpt-001/nav.js";

const W = 244;

// Top-level groups — ordered. Each one knows its report id + nav tree.
const GROUPS = [
  { id: "asia",    report: "asia",    label: "Asia → Vietnam 2025",       nav: ASIA_NAV },
  { id: "rpt-001", report: "rpt-001", label: "RPT-001 · VN Tours May–Oct", nav: RPT_NAV  },
  { id: "mkt-001", report: "mkt-001", label: "MKT-001 · Cafe + Cruise",   nav: MKT_NAV  },
];

export default function Sidebar({ view, setView, goReport, mobileOpen, setMobileOpen }) {
  // Only the active group is expanded by default
  const [expanded, setExpanded] = useState(() => {
    const initial = {};
    GROUPS.forEach(g => { initial[g.id] = g.report === view.report; });
    return initial;
  });

  // Auto-expand the group that matches the active report
  useEffect(() => {
    setExpanded(prev => {
      const next = { ...prev };
      GROUPS.forEach(g => { if (g.report === view.report) next[g.id] = true; });
      return next;
    });
  }, [view.report]);

  const toggle = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  const isActive = (report, section) => view.report === report && view.section === section;

  const go = (report, section) => {
    setView({ report, section });
    setMobileOpen?.(false);
  };

  // ─── Styles ────────────────────────────────────────────────────────────────
  const sidebarStyle = {
    width: W, minWidth: W,
    background: T.surface,
    borderRight: `1px solid ${T.line}`,
    display: "flex", flexDirection: "column",
    overflowY: "auto",
    position: "sticky", top: 0,
    height: "100vh", flexShrink: 0,
  };

  // Top-level group header (collapsible)
  const groupHeader = (g, count) => {
    const open = !!expanded[g.id];
    return (
      <button
        onClick={() => toggle(g.id)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          width: "100%", textAlign: "left",
          padding: "12px 16px 10px",
          marginTop: 4,
          background: open ? T.lavenderSoft : "transparent",
          border: "none",
          borderLeft: `3px solid ${open ? T.lavender : "transparent"}`,
          color: open ? T.lavenderInk : T.inkSoft,
          fontSize: 10, fontWeight: 700,
          textTransform: "uppercase", letterSpacing: 1.4,
          cursor: "pointer",
          transition: "color 0.15s, background 0.15s",
          fontFamily: "inherit",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            display: "inline-block",
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.15s",
            fontSize: 9,
            color: open ? T.lavender : T.inkSoft,
          }}>▶</span>
          {g.label}
        </span>
        {count != null && (
          <span style={{
            fontSize: 9, fontWeight: 700,
            color: open ? T.lavender : T.inkSoft,
            opacity: 0.75,
          }}>{count}</span>
        )}
      </button>
    );
  };

  // Top-level item (the L1 home of a report)
  const homeItem = (g) => {
    const homeId = g.nav[0]?.id;
    if (!homeId) return null;
    const active = isActive(g.report, homeId);
    return (
      <button
        onClick={() => goReport(g.report, homeId)}
        style={{
          display: "block", width: "100%", textAlign: "left",
          padding: "8px 18px 8px 28px",
          background: active ? T.mintSoft : "transparent",
          borderLeft: active ? `3px solid ${T.mint}` : "3px solid transparent",
          color: active ? T.mintInk : T.ink,
          fontWeight: active ? 700 : 600,
          fontSize: 13,
          border: "none",
          cursor: "pointer",
          lineHeight: 1.4,
          transition: "color .15s, background .15s",
          fontFamily: "inherit",
        }}
      >
        ★ {g.nav[0].label}
      </button>
    );
  };

  // Regular nav item (L2)
  const navItem = (item, report, indent = false) => {
    const active = isActive(report, item.id);
    return (
      <button
        key={item.id}
        onClick={() => go(report, item.id)}
        style={{
          display: "block", width: "100%", textAlign: "left",
          padding: indent ? "5px 14px 5px 36px" : "5px 14px 5px 28px",
          background: active ? T.mintSoft : "transparent",
          borderLeft: active ? `3px solid ${T.mint}` : "3px solid transparent",
          color: active ? T.mintInk : T.inkSoft,
          fontWeight: active ? 700 : 500,
          fontSize: indent ? 11.5 : 12.5,
          border: "none",
          cursor: "pointer",
          lineHeight: 1.5,
          transition: "color .15s, background .15s",
          fontFamily: "inherit",
        }}
      >
        {item.label}
      </button>
    );
  };

  const subgroupHeader = (label) => (
    <div style={{
      padding: "10px 16px 4px 28px",
      fontSize: 9, color: T.lavender,
      fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2,
    }}>
      {label}
    </div>
  );

  return (
    <div style={sidebarStyle}>
      {/* Branding */}
      <div style={{
        padding: "18px 18px 14px",
        borderBottom: `1px solid ${T.line}`,
      }}>
        <div className="serif" style={{
          fontSize: 17, color: T.ink, fontWeight: 600,
        }}>
          Sondax Travel
        </div>
        <div style={{
          fontSize: 9, color: T.lavender, marginTop: 2,
          letterSpacing: 1.4, textTransform: "uppercase", fontWeight: 700,
        }}>
          Inbound Reports · 2025–26
        </div>
      </div>

      {GROUPS.map(g => {
        const visibleCount = g.nav.filter(it => !it.hidden).length;
        return (
          <div key={g.id}>
            {groupHeader(g, visibleCount)}
            {expanded[g.id] && (
              <div style={{ paddingBottom: 6 }}>
                {/* L1 home item — first nav entry */}
                {homeItem(g)}

                {/* Remaining L2 items, with optional grouping */}
                {(() => {
                  const rest = g.nav.slice(1);
                  // Group by `group` key
                  const groupOrder = [];
                  const grouped = {};
                  rest.forEach(it => {
                    const key = it.group ?? "_main";
                    if (!grouped[key]) {
                      grouped[key] = [];
                      groupOrder.push(key);
                    }
                    grouped[key].push(it);
                  });
                  return groupOrder.map(key => (
                    <div key={key}>
                      {key !== "_main" && subgroupHeader(GROUP_LABEL[key] ?? key)}
                      {grouped[key].map(it => navItem(it, g.report, key !== "_main"))}
                    </div>
                  ));
                })()}
              </div>
            )}
          </div>
        );
      })}

      <div style={{ flex: 1 }} />

      {/* Watermark */}
      <div style={{
        padding: "14px 18px",
        borderTop: `1px solid ${T.line}`,
        fontSize: 9.5,
        color: T.inkSoft,
        fontWeight: 600,
        letterSpacing: 1.2,
        textTransform: "uppercase",
      }}>
        Report by Nam Anh
      </div>
    </div>
  );
}

// Subgroup labels — translated for display
const GROUP_LABEL = {
  peak:     "📆 Mùa cao điểm · Tháng 5–10",
  offpeak:  "❄️ Mùa thấp điểm · Tháng 10–3",
  evidence: "📊 Evidence · Section sources",
  cafe:     "☕ Cafe Workshop HN",
  cruise:   "🚢 Cruise Vịnh Hạ Long",
  "en-inbound": "🌐 EN Inbound · Tour 2026–27",
  detail:   "🔍 Drill-down",
};
