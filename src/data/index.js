import { C } from "./colors.js";

export const countryData = [
  { name: "Trung Quốc", total9m: 3890000, growth: 44.3, q1: 1600000, q2: 1100000, q3: 1190000, share: 25.2, color: C.china, flag: "🇨🇳" },
  { name: "Hàn Quốc",   total9m: 3240000, growth: -3.8, q1: 1300000, q2: 900000,  q3: 1040000, share: 21.0, color: C.korea, flag: "🇰🇷" },
  { name: "Nhật Bản",   total9m: 618000,  growth: 16.0, q1: 226000,  q2: 100000,  q3: 292000,  share: 4.0,  color: C.japan, flag: "🇯🇵" },
  { name: "Ấn Độ",      total9m: 450000,  growth: 42.0, q1: 143000,  q2: 150000,  q3: 157000,  share: 2.9,  color: C.india, flag: "🇮🇳" },
  { name: "Thái Lan",   total9m: 345000,  growth: 8.1,  q1: 110000,  q2: 118000,  q3: 117000,  share: 2.2,  color: C.thailand, flag: "🇹🇭" },
  { name: "Philippines",total9m: 230000,  growth: 93.0, q1: 70000,   q2: 85000,   q3: 75000,   share: 1.5,  color: C.philippines, flag: "🇵🇭" },
];

export const quarterlyData = [
  { quarter: "Q1", "Trung Quốc": 1600000, "Hàn Quốc": 1300000, "Nhật Bản": 226000, "Ấn Độ": 143000, "Thái Lan": 110000, "Philippines": 70000 },
  { quarter: "Q2", "Trung Quốc": 1100000, "Hàn Quốc": 900000,  "Nhật Bản": 100000, "Ấn Độ": 150000, "Thái Lan": 118000, "Philippines": 85000 },
  { quarter: "Q3", "Trung Quốc": 1190000, "Hàn Quốc": 1040000, "Nhật Bản": 292000, "Ấn Độ": 157000, "Thái Lan": 117000, "Philippines": 75000 },
];

export const monthlyTotal = [
  { month: "T1", v: 2100000 }, { month: "T2", v: 1800000 }, { month: "T3", v: 2100000 },
  { month: "T4", v: 1600000 }, { month: "T5", v: 1550000 }, { month: "T6", v: 1540000 },
  { month: "T7", v: 1520000 }, { month: "T8", v: 1680000 }, { month: "T9", v: 1500000 },
];

export const transportData = [
  { name: "Hàng không", value: 13100000, pct: 85.2 },
  { name: "Đường bộ",   value: 2100000,  pct: 13.6 },
  { name: "Đường biển", value: 190600,   pct: 1.2  },
];

export const transportColors = [C.accent, C.india, C.japan];

export const TABS = [
  { id: "overview",   label: "📊 Tổng quan" },
  { id: "country",    label: "🌏 Quốc gia" },
  { id: "quarterly",  label: "📅 Theo quý" },
  { id: "behavior",   label: "🧠 Hành vi" },
  { id: "channels",   label: "📡 Kênh phân phối" },
  { id: "roi2026",    label: "🎯 ROI 2026" },
  { id: "insights",   label: "💡 Nhận định" },
];

// RPT-001 navigation — structured as: overview → insights → explorer → evidence
export const RPT_001_TABS = [
  { id: "rpt-home",          label: "★ Overview" },
  // Curated insight entry points
  { id: "rpt-quick-wins",    label: "🏆 Quick Wins" },
  { id: "rpt-whitespace",    label: "💎 Whitespace" },
  { id: "rpt-growth-markets", label: "📈 Growth Markets" },
  { id: "rpt-july-peak",     label: "☀️ July Peak" },
  { id: "rpt-revenue",       label: "💰 Revenue Leaders" },
  // Fallback full browse
  { id: "rpt-explorer",      label: "🔎 Tour Explorer (18)" },
  // Evidence / raw sections
  { id: "rpt-s1", label: "S1 · Thị trường nguồn", group: "evidence" },
  { id: "rpt-s2", label: "S2 · Tour Categories", group: "evidence" },
  { id: "rpt-s3", label: "S3 · Destinations", group: "evidence" },
  { id: "rpt-s4", label: "S4 · OTA Platforms", group: "evidence" },
  { id: "rpt-s5", label: "S5 · Success Factors", group: "evidence" },
  { id: "rpt-s6", label: "S6 · Vendor Landscape", group: "evidence" },
  { id: "rpt-s7", label: "S7 · Differentiation", group: "evidence" },
  { id: "rpt-s8", label: "S8 · Seasonal Intel", group: "evidence" },
  { id: "rpt-s9", label: "S9 · Monthly Playbook", group: "evidence" },
];

export const EN_INBOUND_TABS = [
  { id: "executive",   label: "📋 Tóm tắt chiến lược" },
  { id: "market",      label: "📏 Định cỡ thị trường" },
  { id: "personas",    label: "👥 7 Persona" },
  { id: "ota",         label: "🛒 OTA & Kênh" },
  { id: "benchmark",   label: "⚖️ Benchmark đối thủ" },
  { id: "seasonality", label: "📆 Mùa vụ" },
  { id: "philippines", label: "🇵🇭 Philippines" },
  { id: "archetypes",  label: "🏗️ 6 Archetype" },
  { id: "gtm",         label: "🚀 GTM Roadmap" },
  { id: "risks",       label: "⚠️ Rủi ro & Test" },
];
