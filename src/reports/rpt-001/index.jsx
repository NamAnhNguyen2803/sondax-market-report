import MarkdownReport  from "../../components/MarkdownReport.jsx";
import PartNav         from "../../components/PartNav.jsx";
import SubSectionNav   from "../../components/SubSectionNav.jsx";
import { stripNoiseSections } from "../../utils/mdSplit.js";
import { C } from "../../data/colors.js";
import HomePane from "./HomePane.jsx";
import InsightPane from "./InsightPane.jsx";
import TourSummaryTable from "./TourSummaryTable.jsx";
import TourDetailPage from "./TourDetailPage.jsx";
import { INSIGHTS } from "./insights.js";

import s1 from "./Section-01-source-markets.md?raw";
import s2 from "./Section-02-tour-categories.md?raw";
import s3 from "./Section-03-destinations.md?raw";
import s4 from "./Section-04-ota-platforms.md?raw";
import s5 from "./Section-05-success-factors.md?raw";
import s6 from "./Section-06-vendors.md?raw";
import s7 from "./Section-07-differentiation.md?raw";
import s8 from "./Section-08-seasonal.md?raw";
import s9 from "./Section-09-action-matrix.md?raw";

function SectionHeader({ title, subtitle, onBack }) {
  return (
    <>
      {onBack && (
        <div style={{ fontSize: 11, marginBottom: 10 }}>
          <button
            onClick={onBack}
            style={{
              background: "transparent", border: "none",
              color: C.muted, cursor: "pointer", padding: 0,
              fontSize: 11, fontWeight: 600,
            }}
          >
            ★ Overview
          </button>
          <span style={{ color: C.border, margin: "0 8px" }}>›</span>
          <span style={{ color: C.accent, fontWeight: 700 }}>{title}</span>
        </div>
      )}
      <div style={{ margin: "4px 0 14px" }}>
        <h2 style={{
          color: C.text, fontSize: 17, fontWeight: 800,
          margin: "0 0 4px", borderLeft: `4px solid ${C.accent}`,
          paddingLeft: 12,
        }}>{title}</h2>
        {subtitle && (
          <div style={{ fontSize: 12, color: C.muted, paddingLeft: 16, lineHeight: 1.5 }}>
            {subtitle}
          </div>
        )}
      </div>
    </>
  );
}

function ExplorerPane({ goto }) {
  return (
    <>
      <SectionHeader
        title="🔎 Tour Explorer — All 18 Tours"
        subtitle="Filter theo Market · Category · Month. Click tour để xem full detail."
        onBack={() => goto("rpt-home")}
      />
      <TourSummaryTable goto={goto} />
    </>
  );
}

function SectionView({ source, title, goto }) {
  const clean = stripNoiseSections(source);
  return (
    <>
      <SectionHeader title={title} onBack={() => goto("rpt-home")} />
      <PartNav source={clean} />
      <SubSectionNav source={clean} />
      <MarkdownReport source={clean} />
    </>
  );
}

// Build SECTION_MAP: home + explorer + 5 insights + S1-S9 evidence + tour detail pages
function buildSectionMap(goto) {
  const map = {
    "rpt-home":     () => <HomePane goto={goto} />,
    "rpt-explorer": () => <ExplorerPane goto={goto} />,
    "rpt-s1":       () => <SectionView source={s1} title="S1 · Thị trường nguồn" goto={goto} />,
    "rpt-s2":       () => <SectionView source={s2} title="S2 · Tour Categories" goto={goto} />,
    "rpt-s3":       () => <SectionView source={s3} title="S3 · Destinations" goto={goto} />,
    "rpt-s4":       () => <SectionView source={s4} title="S4 · OTA Platforms" goto={goto} />,
    "rpt-s5":       () => <SectionView source={s5} title="S5 · Success Factors" goto={goto} />,
    "rpt-s6":       () => <SectionView source={s6} title="S6 · Vendor Landscape" goto={goto} />,
    "rpt-s7":       () => <SectionView source={s7} title="S7 · Differentiation" goto={goto} />,
    "rpt-s8":       () => <SectionView source={s8} title="S8 · Seasonal Intel" goto={goto} />,
    "rpt-s9":       () => <SectionView source={s9} title="S9 · Action Matrix + Monthly Playbook" goto={goto} />,
  };
  // Add insight routes dynamically
  INSIGHTS.forEach(ins => {
    map[ins.tabId] = () => <InsightPane insightId={ins.id} goto={goto} />;
  });
  return map;
}

// Parse tour ID from section string (e.g., "tour-T01" → "T01")
function parseTourId(section) {
  if (section?.startsWith("tour-")) {
    return section.substring(5);
  }
  return null;
}

export default function Rpt001Report({ section = "rpt-home", goto = () => {} }) {
  const sectionMap = buildSectionMap(goto);

  // Check if section is a tour detail page
  const tourId = parseTourId(section);
  if (tourId) {
    return <TourDetailPage tourId={tourId} goto={goto} />;
  }

  const render = sectionMap[section] ?? sectionMap["rpt-home"];
  return render();
}
