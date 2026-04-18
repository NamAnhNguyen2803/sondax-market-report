import MarkdownReport     from "../../components/MarkdownReport.jsx";
import PartNav            from "../../components/PartNav.jsx";
import SubSectionNav      from "../../components/SubSectionNav.jsx";
import { stripNoiseSections } from "../../utils/mdSplit.js";
import { T }              from "../../data/colors.js";
import HomePane           from "./HomePane.jsx";
import InsightPane        from "./InsightPane.jsx";
import TourSummaryTable   from "./TourSummaryTable.jsx";
import TourDetailPage     from "./TourDetailPage.jsx";
import { INSIGHTS }       from "./insights.js";

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
        <div style={{ fontSize: 12, marginBottom: 14, lineHeight: 1.7 }}>
          <button
            onClick={onBack}
            style={{
              background: "transparent", border: "none",
              color: T.peach, cursor: "pointer", padding: 0,
              fontSize: 12, fontWeight: 700, fontFamily: "inherit",
            }}
          >
            ← Tổng quan tour EN Inbound
          </button>
          <span style={{ color: T.lineStrong, margin: "0 10px" }}>›</span>
          <span style={{ color: T.ink, fontWeight: 600 }}>{title}</span>
        </div>
      )}
      <div style={{ margin: "8px 0 18px", maxWidth: 760 }}>
        <h2 className="serif" style={{
          fontSize: 30, color: T.ink, fontWeight: 600, lineHeight: 1.2, marginBottom: 6,
        }}>
          {title}
        </h2>
        {subtitle && (
          <div style={{ fontSize: 14, color: T.inkSoft, lineHeight: 1.55 }}>
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
      <TourSummaryTable goto={goto} from="rpt-explorer" />
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
  INSIGHTS.forEach(ins => {
    map[ins.tabId] = () => <InsightPane insightId={ins.id} goto={goto} />;
  });
  return map;
}

function parseTourId(section) {
  if (section?.startsWith("tour-")) {
    return section.substring(5);
  }
  return null;
}

export default function Rpt001Report({ section = "rpt-home", from = null, goto = () => {} }) {
  const sectionMap = buildSectionMap(goto);

  const tourId = parseTourId(section);
  if (tourId) {
    return <TourDetailPage tourId={tourId} goto={goto} from={from} />;
  }

  const render = sectionMap[section] ?? sectionMap["rpt-home"];
  return render();
}
