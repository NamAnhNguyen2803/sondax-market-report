// ─────────────────────────────────────────────────────────────────────────────
// V5 Sondax Brand — palette aligned with sondaxtravel.com (navy + amber + white)
//
// Replaces V4 lavender/mint/peach. All old `T.lavender / T.mint / T.peach`
// keys still work — they now resolve to brand-equivalent hues so existing
// components keep rendering while we incrementally retheme.
//
// Canonical brand tokens (use for new code):
//   bg / bgAlt / surface / surfaceSoft / line / lineStrong
//   ink / inkSoft
//   navy / navySoft / navyInk     ← primary brand
//   amber / amberSoft / amberInk  ← section pills, accents, callouts
//   emerald / emeraldSoft / emeraldInk  ← success / growth-strong
// ─────────────────────────────────────────────────────────────────────────────

export const T = {
  // Surface
  bg:           "#FFFFFF",   // page bg (white)
  bgAlt:        "#F4F5F7",   // alt strip / section divider
  surface:      "#FFFFFF",   // card / panel
  surfaceSoft:  "#FAFBFC",   // very light row alt

  // Borders
  line:         "#E5E7EB",
  lineStrong:   "#CBD2DA",

  // Text
  ink:          "#1B2B5A",   // primary (navy)
  inkSoft:      "#5A6478",   // muted

  // Brand primaries
  navy:         "#1B2B5A",
  navySoft:     "#E6EAF3",
  navyInk:      "#0F1A3A",

  amber:        "#F59E0B",   // section pills + warm accent
  amberSoft:    "#FEF3D6",
  amberInk:     "#92560A",

  emerald:      "#10B981",
  emeraldSoft:  "#D1FAE5",
  emeraldInk:   "#065F46",

  // ─── V4 legacy keys remapped → brand equivalents (back-compat) ─────────────
  // mint   → emerald (success / growth-strong)
  mint:         "#10B981",
  mintSoft:     "#D1FAE5",
  mintInk:      "#065F46",

  // peach  → amber (warm callout / section pill)
  peach:        "#F59E0B",
  peachSoft:    "#FEF3D6",
  peachInk:     "#92560A",

  // lavender → navy (primary brand)
  lavender:     "#1B2B5A",
  lavenderSoft: "#E6EAF3",
  lavenderInk:  "#1B2B5A",
};

// Chart hues — aligned with brand (navy primary, amber accent, emerald success)
export const CHART = {
  china:       "#1B2B5A",   // navy — biggest segment
  korea:       "#F59E0B",   // amber
  japan:       "#10B981",   // emerald
  india:       "#5B7BB6",   // mid navy
  thailand:    "#0F8C68",   // deep emerald
  philippines: "#C97A0F",   // deep amber
};

// ─────────────────────────────────────────────────────────────────────────────
// Back-compat `C` export. All old usages keep working; visuals shift to brand.
// ─────────────────────────────────────────────────────────────────────────────
export const C = {
  // legacy chart hues
  china:       CHART.china,
  korea:       CHART.korea,
  japan:       CHART.japan,
  india:       CHART.india,
  thailand:    CHART.thailand,
  philippines: CHART.philippines,

  // legacy structural keys → brand
  bg:     T.bg,
  card:   T.surface,
  text:   T.ink,
  muted:  T.inkSoft,
  accent: T.navy,
  border: T.line,

  // legacy semantic colors → brand
  green:  T.emeraldInk,
  red:    T.amberInk,
  purple: T.navy,
  pink:   T.amber,
  orange: T.amber,
  cyan:   "#0F8C68",
};
