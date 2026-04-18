// Asia → Vietnam 2025 nav — 3-tier IA.
// First entry = L1 home (auto-promoted to "★ home" by Sidebar).
// Remaining = L2 sub-pages, with descriptive labels (not section codes).
//
// `group` key bundles items under a sub-header in the sidebar.

export const ASIA_NAV = [
  // L1
  { id: "asia-home",      label: "Trang chủ Asia" },

  // L2 — Tổng hợp 2025
  { id: "overview",       label: "📊 Tổng quan inbound 2025" },
  { id: "country",        label: "🌏 6 quốc gia trọng điểm" },
  { id: "quarterly",      label: "📅 Diễn biến theo quý" },
  { id: "behavior",       label: "🧠 Hành vi du khách" },
  { id: "channels",       label: "📡 Kênh phân phối" },
  { id: "roi2026",        label: "🎯 ROI 2026" },
  { id: "insights",       label: "💡 Nhận định" },

  // L2 — Tour EN Inbound 2026–27 (kept as nested sub-pages)
  { id: "executive",      label: "📋 Tóm tắt chiến lược",   group: "en-inbound" },
  { id: "market",         label: "📏 Định cỡ thị trường",    group: "en-inbound" },
  { id: "personas",       label: "👥 7 Persona",              group: "en-inbound" },
  { id: "ota",            label: "🛒 OTA & Kênh",             group: "en-inbound" },
  { id: "benchmark",      label: "⚖️ Benchmark đối thủ",     group: "en-inbound" },
  { id: "seasonality",    label: "📆 Mùa vụ",                  group: "en-inbound" },
  { id: "philippines",    label: "🇵🇭 Philippines",          group: "en-inbound" },
  { id: "archetypes",     label: "🏗️ 6 Archetype",           group: "en-inbound" },
  { id: "gtm",            label: "🚀 GTM Roadmap",            group: "en-inbound" },
  { id: "risks",          label: "⚠️ Rủi ro & Test",          group: "en-inbound" },
];
