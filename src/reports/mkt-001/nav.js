// MKT-001 nav — 3-tier IA.
// Product split (cafe / cruise) made explicit via sidebar subgroup headers
// (☕ Cafe Workshop HN, 🚢 Cruise Vịnh Hạ Long). Labels within each group
// mirror each other so readers can compare like-for-like across products.

export const MKT_NAV = [
  // L1
  { id: "mkt-home",            label: "Trang chủ Cafe + Cruise" },

  // L2 — Executive
  { id: "executive",           label: "📋 Executive Summary" },

  // L2 — Cafe deep-dives
  { id: "cafe-market",         label: "Thị trường & khách",     group: "cafe" },
  { id: "cafe-competition",    label: "Cạnh tranh & vận hành",  group: "cafe" },

  // L2 — Cruise deep-dives
  { id: "cruise-market",       label: "Thị trường & khách",     group: "cruise" },
  { id: "cruise-competition",  label: "Cạnh tranh & vận hành",  group: "cruise" },

  // L2 — Synthesis
  { id: "synthesis",           label: "🎯 Synthesis & Roadmap" },
];
