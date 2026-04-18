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

function OffPeakPane({ goto, goReport }) {
  const jumpAsia = (section) => {
    if (goReport) goReport("asia", section);
  };
  const linkBtn = (section, label, desc) => (
    <button
      onClick={() => jumpAsia(section)}
      style={{
        display: "block", width: "100%", textAlign: "left",
        padding: "14px 16px",
        background: T.surface,
        border: `1px solid ${T.line}`,
        borderLeft: `3px solid ${T.lavender}`,
        borderRadius: 10,
        cursor: "pointer", marginBottom: 10,
        fontFamily: "inherit",
        transition: "background .15s, border-color .15s",
      }}
      onMouseEnter={e => e.currentTarget.style.background = T.lavenderSoft}
      onMouseLeave={e => e.currentTarget.style.background = T.surface}
    >
      <div style={{ fontWeight: 700, color: T.ink, fontSize: 13.5 }}>{label} <span style={{ color: T.lavender, marginLeft: 4 }}>→</span></div>
      <div style={{ color: T.inkSoft, fontSize: 12.5, marginTop: 3, lineHeight: 1.5 }}>{desc}</div>
    </button>
  );
  return (
    <>
      <SectionHeader
        title="❄️ Mùa thấp điểm · Tháng 10 – 3"
        subtitle="Báo cáo RPT-001 này focus mùa cao điểm (Tháng 5–10). Phần phân tích Tháng 10 → Tháng 3 cho EN Inbound đã có sẵn trong báo cáo Asia · Tour EN Inbound 2026–27. Bấm bên dưới để sang."
        onBack={() => goto("rpt-home")}
      />
      <div style={{ marginTop: 18 }}>
        {linkBtn("executive",   "Tóm tắt chiến lược",       "Executive summary cho Tour EN Inbound 2026–27 (cover full year, focus shoulder + low season)")}
        {linkBtn("seasonality", "Mùa vụ chi tiết",          "Phân tích shoulder + low season month-by-month, weather windows, demand pattern Q4–Q1")}
        {linkBtn("market",      "Định cỡ thị trường",       "Market sizing cả năm — bao gồm Q4 + Q1 (mùa Tết + golf + MICE)")}
        {linkBtn("personas",    "7 Persona EN Inbound",     "Persona profile theo segment — applicable cả mùa cao + thấp điểm")}
        {linkBtn("gtm",         "GTM Roadmap full year",    "Roadmap go-to-market theo quý, có actions cho Q4–Q1 mùa thấp điểm")}
      </div>
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

function buildSectionMap(goto, goReport) {
  const map = {
    "rpt-home":     () => <HomePane goto={goto} />,
    "rpt-explorer": () => <ExplorerPane goto={goto} />,
    "rpt-offpeak":  () => <OffPeakPane goto={goto} goReport={goReport} />,
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

export default function Rpt001Report({ section = "rpt-home", from = null, goto = () => {}, goReport }) {
  const sectionMap = buildSectionMap(goto, goReport);

  const tourId = parseTourId(section);
  if (tourId) {
    return <TourDetailPage tourId={tourId} goto={goto} from={from} />;
  }

  const render = sectionMap[section] ?? sectionMap["rpt-home"];
  return render();
}
