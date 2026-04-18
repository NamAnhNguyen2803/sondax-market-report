// RPT-001 nav — 3-tier treasure hunt, grouped by season.
// First entry = L1 home. Curated insights sit under Peak (May–Oct)
// group; Off-peak (Oct–Mar) is a placeholder sub-page until coverage ships.
// Evidence S1–S9 stays at the bottom as source material.

export const RPT_NAV = [
  // L1
  { id: "rpt-home",           label: "Tổng quan tour EN Inbound" },

  // L2 — Mùa cao điểm (Tháng 5–10)
  { id: "rpt-s8",             label: "📆 Tổng quan seasonal",    group: "peak" },
  { id: "rpt-quick-wins",     label: "🏆 Quick Wins",            group: "peak" },
  { id: "rpt-whitespace",     label: "💎 Whitespace",            group: "peak" },
  { id: "rpt-growth-markets", label: "📈 Growth Markets",        group: "peak" },
  { id: "rpt-july-peak",      label: "☀️ July Peak",              group: "peak" },
  { id: "rpt-revenue",        label: "💰 Revenue Leaders",       group: "peak" },
  { id: "rpt-explorer",       label: "🔎 Tour Explorer (18)",    group: "peak" },

  // L2 — Mùa thấp điểm (Tháng 10–3) — placeholder
  { id: "rpt-offpeak",        label: "🔜 Sắp có dữ liệu",         group: "offpeak" },

  // L2 — Evidence sources
  { id: "rpt-s1", label: "S1 · Thị trường nguồn", group: "evidence" },
  { id: "rpt-s2", label: "S2 · Tour Categories",  group: "evidence" },
  { id: "rpt-s3", label: "S3 · Destinations",     group: "evidence" },
  { id: "rpt-s4", label: "S4 · OTA Platforms",    group: "evidence" },
  { id: "rpt-s5", label: "S5 · Success Factors",  group: "evidence" },
  { id: "rpt-s6", label: "S6 · Vendor Landscape", group: "evidence" },
  { id: "rpt-s7", label: "S7 · Differentiation",  group: "evidence" },
  { id: "rpt-s9", label: "S9 · Monthly Playbook", group: "evidence" },
];
