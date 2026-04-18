// MKT-001 nav — full 3-tier rebuild from flat 5-section structure.
// L1 home = "Cafe + Cruise overview" with 5 question cards.
// L2 sub-pages = curated intros + existing markdown sections.

export const MKT_NAV = [
  // L1
  { id: "mkt-home",            label: "Trang chủ Cafe + Cruise" },

  // L2 — Executive (kept accessible)
  { id: "executive",           label: "📋 Executive Summary" },

  // L2 — Cafe deep-dives
  { id: "cafe-market",         label: "Thị trường + Khách hàng",     group: "cafe" },
  { id: "cafe-competition",    label: "Cạnh tranh + Vận hành",       group: "cafe" },

  // L2 — Cruise deep-dives
  { id: "cruise-market",       label: "Thị trường + Khách hàng",     group: "cruise" },
  { id: "cruise-competition",  label: "Cạnh tranh + Vận hành",       group: "cruise" },

  // L2 — Synthesis
  { id: "synthesis",           label: "🎯 Synthesis & Roadmap" },
];
