import MarkdownReport  from "../../components/MarkdownReport.jsx";
import PartNav         from "../../components/PartNav.jsx";
import SubSectionNav   from "../../components/SubSectionNav.jsx";
import StatStrip       from "../../components/StatStrip.jsx";
import { stripNoiseSections } from "../../utils/mdSplit.js";
import { C } from "../../data/colors.js";

import s1 from "./Section-01-source-markets.md?raw";
import s2 from "./Section-02-tour-categories.md?raw";
import s3 from "./Section-03-destinations.md?raw";
import s4 from "./Section-04-ota-platforms.md?raw";
import s5 from "./Section-05-success-factors.md?raw";
import s6 from "./Section-06-vendors.md?raw";
import s7 from "./Section-07-differentiation.md?raw";
import s8 from "./Section-08-seasonal.md?raw";
import s9 from "./Section-09-action-matrix.md?raw";

/* ── Hero card for the report landing page ─────────────── */
function ReportHero() {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${C.card} 0%, #1a2744 100%)`,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: "28px 24px",
      marginBottom: 24,
    }}>
      <div style={{ fontSize: 9, color: C.accent, textTransform: "uppercase", letterSpacing: 2, fontWeight: 800, marginBottom: 8 }}>
        RPT-260416-001 · Market Overview
      </div>
      <h1 style={{ color: C.text, fontSize: 22, fontWeight: 800, lineHeight: 1.3, marginBottom: 12 }}>
        Vietnam Tours for English-Speaking Tourists
      </h1>
      <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
        May–October 2025-2026 · 10 thị trường nguồn · 18 tour recommendations · OTA competitive intelligence với 50+ verified URLs
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {[
          { label: "Tours", value: "18", color: C.accent },
          { label: "Markets", value: "10", color: C.orange },
          { label: "Quick Wins", value: "10", color: C.pink },
          { label: "OTA URLs", value: "50+", color: C.green },
          { label: "Whitespace", value: "5", color: "#a78bfa" },
        ].map(s => (
          <div key={s.label} style={{
            background: `${s.color}15`, border: `1px solid ${s.color}30`,
            borderRadius: 8, padding: "8px 14px", minWidth: 90,
          }}>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Section renderer (same pattern as mkt-001) ───────── */
function SectionView({ source, highlight }) {
  const clean = stripNoiseSections(source);
  return (
    <>
      {highlight && (
        <div style={{
          background: `${C.orange}12`,
          border: `1px solid ${C.orange}40`,
          borderLeft: `4px solid ${C.orange}`,
          borderRadius: "0 8px 8px 0",
          padding: "10px 16px",
          marginBottom: 16,
          fontSize: 12,
          color: C.orange,
          fontWeight: 700,
        }}>
          ★ Action Matrix — 18 tours · Business Case · OTA Competitive Intelligence (50+ verified URLs)
        </div>
      )}
      <PartNav source={clean} />
      <SubSectionNav source={clean} />
      <MarkdownReport source={clean} />
    </>
  );
}

/* ── Section map ───────────────────────────────────────── */
const SECTION_MAP = {
  "rpt-home":    () => <><ReportHero /><SectionView source={s9} highlight /></>,
  "rpt-s1":      () => <SectionView source={s1} />,
  "rpt-s2":      () => <SectionView source={s2} />,
  "rpt-s3":      () => <SectionView source={s3} />,
  "rpt-s4":      () => <SectionView source={s4} />,
  "rpt-s5":      () => <SectionView source={s5} />,
  "rpt-s6":      () => <SectionView source={s6} />,
  "rpt-s7":      () => <SectionView source={s7} />,
  "rpt-s8":      () => <SectionView source={s8} />,
  "rpt-s9":      () => <SectionView source={s9} highlight />,
};

export default function Rpt001Report({ section = "rpt-home" }) {
  const render = SECTION_MAP[section] ?? SECTION_MAP["rpt-home"];
  return render();
}
