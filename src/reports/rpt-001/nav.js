// RPT-001 nav — already 3-tier. First entry = L1 home.
// Insights = curated L2 question pages. Explorer = full-browse L2.
// Evidence S1–S9 grouped under sub-header.

export const RPT_NAV = [
  // L1
  { id: "rpt-home",           label: "Tổng quan tour EN Inbound" },

  // Featured — mùa cao điểm EN inbound (tháng 5–10)
  { id: "rpt-s8",             label: "📆 Mùa 5–10 · Seasonal Intel" },

  // L2 — curated insights (questions a sales person asks)
  { id: "rpt-quick-wins",     label: "🏆 Quick Wins" },
  { id: "rpt-whitespace",     label: "💎 Whitespace" },
  { id: "rpt-growth-markets", label: "📈 Growth Markets" },
  { id: "rpt-july-peak",      label: "☀️ July Peak" },
  { id: "rpt-revenue",        label: "💰 Revenue Leaders" },

  // L2 — full-browse fallback
  { id: "rpt-explorer",       label: "🔎 Tour Explorer (18)" },

  // L2 — evidence sources
  { id: "rpt-s1", label: "S1 · Thị trường nguồn",  group: "evidence" },
  { id: "rpt-s2", label: "S2 · Tour Categories",   group: "evidence" },
  { id: "rpt-s3", label: "S3 · Destinations",      group: "evidence" },
  { id: "rpt-s4", label: "S4 · OTA Platforms",     group: "evidence" },
  { id: "rpt-s5", label: "S5 · Success Factors",   group: "evidence" },
  { id: "rpt-s6", label: "S6 · Vendor Landscape",  group: "evidence" },
  { id: "rpt-s7", label: "S7 · Differentiation",   group: "evidence" },
  { id: "rpt-s9", label: "S9 · Monthly Playbook",  group: "evidence" },
];
