// ─────────────────────────────────────────────────────────────────────────────
// V4 Soft Pastel Modern — theme tokens
// Spec: Projects/Sondax-Travel/ui-pattern-demo/variants/v4-soft-pastel.html
//
// Replaces the old DARK palette. Keeps the `C` named export for back-compat —
// every old key still resolves to a sensible V4 hue so existing components
// (charts, KPI, Card) remain readable while we rebuild.
//
// New canonical tokens (recommended): use these for new code.
//   bg / bgAlt / surface / line / lineStrong
//   ink / inkSoft
//   mint / mintSoft / peach / peachSoft / lavender / lavenderSoft
// ─────────────────────────────────────────────────────────────────────────────

// Canonical V4 tokens
export const T = {
  // Background + surface
  bg:           "#F4F1F8",   // page bg (soft lilac wash)
  bgAlt:        "#ECE7F2",   // alt strip / hover row alt
  surface:      "#FFFFFF",   // card / panel
  surfaceSoft:  "#FAF7FC",   // very light surface (row alt)

  // Borders
  line:         "#E2DBE9",
  lineStrong:   "#CEC2DA",

  // Text / ink
  ink:          "#2D1B3D",   // primary text
  inkSoft:      "#7B6B85",   // muted text

  // Three pastel accents
  mint:         "#7DCFB6",
  mintSoft:     "#DEF3EC",
  mintInk:      "#2D7A60",   // text on mintSoft, growth-strong

  peach:        "#FF9F8E",
  peachSoft:    "#FFE5DF",
  peachInk:     "#B8513E",

  lavender:     "#A88FBF",
  lavenderSoft: "#E8DFF1",
  lavenderInk:  "#6F578A",
};

// Chart hues mapped to V4 friendly pastels (for recharts legends).
// Old hard-saturated palette would clash on the lilac bg.
export const CHART = {
  china:       "#A88FBF",   // lavender — biggest segment
  korea:       "#7DCFB6",   // mint
  japan:       "#FF9F8E",   // peach
  india:       "#C9A8DC",   // light lavender
  thailand:    "#5BB39B",   // deep mint
  philippines: "#E89888",   // deep peach
};

// ─────────────────────────────────────────────────────────────────────────────
// Back-compat `C` export. All old usages keep working; visuals update to V4.
//   bg/card/text/muted/border/accent → V4 surfaces and ink
//   green/red/orange/etc. → V4-friendly approximations
// ─────────────────────────────────────────────────────────────────────────────
export const C = {
  // legacy chart hues (kept under their old keys)
  china:       CHART.china,
  korea:       CHART.korea,
  japan:       CHART.japan,
  india:       CHART.india,
  thailand:    CHART.thailand,
  philippines: CHART.philippines,

  // legacy structural keys → V4
  bg:     T.bg,
  card:   T.surface,
  text:   T.ink,
  muted:  T.inkSoft,
  accent: T.lavender,        // primary accent in V4 = lavender
  border: T.line,

  // legacy semantic colors → V4-friendly
  green:  T.mintInk,         // success / growth-strong text
  red:    T.peachInk,        // alarm / growth-mid text
  purple: T.lavender,
  pink:   T.peach,
  orange: T.peach,           // map orange → peach
  cyan:   "#5BB39B",         // map cyan → deep mint
};
