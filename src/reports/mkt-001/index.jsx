import { T }                  from "../../data/colors.js";
import MarkdownReport         from "../../components/MarkdownReport.jsx";
import StatStrip              from "../../components/StatStrip.jsx";
import PartNav                from "../../components/PartNav.jsx";
import SubSectionNav          from "../../components/SubSectionNav.jsx";
import { stripNoiseSections } from "../../utils/mdSplit.js";
import HomePane               from "./HomePane.jsx";
import Executive              from "./Executive.jsx";
import { CAFE_STATS }         from "./cafeData.js";
import { CRUISE_STATS }       from "./cruiseData.js";

import s2 from "./Section-02-cafe-market-customer.md?raw";
import s3 from "./Section-03-cafe-competition-growth.md?raw";
import s4 from "./Section-04-cruise-market-customer.md?raw";
import s5 from "./Section-05-cruise-competition-growth.md?raw";
import s6 from "./Section-06-synthesis-roadmap.md?raw";

// Curated intros — short editorial framing for each L2 sub-page.
// Avoids "cold-open markdown" feel; ties back to the question on the L1 card.
const INTROS = {
  "cafe-market": {
    title: "Cafe Workshop HN — Thị trường + Khách hàng",
    intro: "Câu hỏi: niche này đang ở giai đoạn nào và ai là khách? 15–25 operators active, GMV bottom-up $1.5–3.5M (±30%). 60–70% bookings drop ngoài mùa cao điểm. Korean = top segment 22–28% — chia sẻ hành vi với cruise → kéo cross-sell.",
  },
  "cafe-competition": {
    title: "Cafe Workshop HN — Cạnh tranh + Vận hành",
    intro: "Vì sao LBR ngồi Tier 1 và moat dài bao lâu? On-site roastery + vegan workshop = 18–24 tháng khó copy. Phủ 6 OTAs vs ngành 2–3 → discovery tốt nhưng commission 18–27% ăn margin. Roadmap: kéo OTA dependency 65→45% mà vẫn giữ ≥40% để không mất discovery.",
  },
  "cruise-market": {
    title: "Cruise Vịnh Hạ Long — Thị trường + Khách hàng",
    intro: "Cruise là must-do cho 70–80% khách quốc tế đến HN — overlap segment với cafe Korean cao. GMV $580–680M (gấp 200–400× cafe) nhưng CAGR thấp hơn (12–15%). Format 1N2D dominant; ADR $80–200 std → $350+ Premium tier.",
  },
  "cruise-competition": {
    title: "Cruise Vịnh Hạ Long — Cạnh tranh + Vận hành",
    intro: "Tier 1 dominant: Paradise + Dragon (fleet + review volume). OTA mix 65–75% bookings, 22–28% net margin std. Premium tier ($350+/pax) ít operator → moat thấp, opportunity cao 2026. Cross-sell coffee→cruise hiện chưa ai làm bài bản — first-mover lane.",
  },
  "synthesis": {
    title: "Synthesis & Roadmap 2026",
    intro: "3 ưu tiên xếp theo upside × feasibility: ① Coffee→Cruise bundle (whitespace, Korean overlap), ② Reduce OTA dependency 65→45% (margin recovery), ③ Premium cruise tier (margin upside). Plan quý-by-quý + KPI breakers.",
  },
};

function Breadcrumb({ goto, title }) {
  return (
    <div style={{ fontSize: 12, marginBottom: 14, lineHeight: 1.7 }}>
      <button
        onClick={() => goto("mkt-home")}
        style={{
          background: "transparent", border: "none",
          color: T.peach, cursor: "pointer", padding: 0,
          fontSize: 12, fontWeight: 700, fontFamily: "inherit",
        }}
      >
        ← Trang chủ Cafe + Cruise
      </button>
      <span style={{ color: T.lineStrong, margin: "0 10px" }}>›</span>
      <span style={{ color: T.ink, fontWeight: 600 }}>{title}</span>
    </div>
  );
}

function L2Header({ title, intro }) {
  return (
    <div style={{ marginBottom: 22, maxWidth: 760 }}>
      <h2 className="serif" style={{
        fontSize: 30, color: T.ink, fontWeight: 600, lineHeight: 1.2, marginBottom: 10,
      }}>
        {title}
      </h2>
      {intro && (
        <p style={{ fontSize: 14, color: T.inkSoft, lineHeight: 1.65 }}>
          {intro}
        </p>
      )}
    </div>
  );
}

function SectionView({ source, stats, sectionId, goto }) {
  const meta = INTROS[sectionId];
  const clean = stripNoiseSections(source);
  return (
    <>
      <Breadcrumb goto={goto} title={meta?.title ?? sectionId} />
      <L2Header title={meta?.title ?? sectionId} intro={meta?.intro} />
      {stats && <StatStrip items={stats} />}
      <PartNav source={clean} />
      <SubSectionNav source={clean} />
      <MarkdownReport source={clean} />
    </>
  );
}

function ExecutiveWrapped({ goto }) {
  return (
    <>
      <Breadcrumb goto={goto} title="Executive Summary" />
      <L2Header
        title="Executive Summary — Cafe + Cruise"
        intro="5 phút overview: financial projection bear/base/bull 2025–28, confidence rating top 7 headlines, 12 key findings — cô đọng từ 5 deep-dive section bên dưới."
      />
      <Executive />
    </>
  );
}

const SECTION_MAP = (goto) => ({
  "mkt-home":           () => <HomePane goto={goto} />,
  "executive":          () => <ExecutiveWrapped goto={goto} />,
  "cafe-market":        () => <SectionView source={s2} stats={CAFE_STATS["cafe-market"]} sectionId="cafe-market" goto={goto} />,
  "cafe-competition":   () => <SectionView source={s3} stats={CAFE_STATS["cafe-competition"]} sectionId="cafe-competition" goto={goto} />,
  "cruise-market":      () => <SectionView source={s4} stats={CRUISE_STATS["cruise-market"]} sectionId="cruise-market" goto={goto} />,
  "cruise-competition": () => <SectionView source={s5} stats={CRUISE_STATS["cruise-competition"]} sectionId="cruise-competition" goto={goto} />,
  "synthesis":          () => <SectionView source={s6} sectionId="synthesis" goto={goto} />,
});

export default function Mkt001Report({ section = "mkt-home", goto = () => {} }) {
  const map = SECTION_MAP(goto);
  const render = map[section] ?? map["mkt-home"];
  return render();
}
