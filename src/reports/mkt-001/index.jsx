import MarkdownReport        from "../../components/MarkdownReport.jsx";
import StatStrip             from "../../components/StatStrip.jsx";
import PartNav               from "../../components/PartNav.jsx";
import Executive             from "./Executive.jsx";
import { CAFE_STATS }        from "./cafeData.js";
import { CRUISE_STATS }      from "./cruiseData.js";
import { stripNoiseSections } from "../../utils/mdSplit.js";

import s2 from "./Section-02-cafe-market-customer.md?raw";
import s3 from "./Section-03-cafe-competition-growth.md?raw";
import s4 from "./Section-04-cruise-market-customer.md?raw";
import s5 from "./Section-05-cruise-competition-growth.md?raw";
import s6 from "./Section-06-synthesis-roadmap.md?raw";

function SectionView({ source, stats }) {
  const clean = stripNoiseSections(source);
  return (
    <>
      {stats && <StatStrip items={stats} />}
      <PartNav source={clean} />
      <MarkdownReport source={clean} />
    </>
  );
}

const SECTION_MAP = {
  executive:        () => <Executive />,
  "cafe-market":    () => <SectionView source={s2} stats={CAFE_STATS["cafe-market"]} />,
  "cafe-competition": () => <SectionView source={s3} stats={CAFE_STATS["cafe-competition"]} />,
  "cruise-market":  () => <SectionView source={s4} stats={CRUISE_STATS["cruise-market"]} />,
  "cruise-competition": () => <SectionView source={s5} stats={CRUISE_STATS["cruise-competition"]} />,
  synthesis:        () => <SectionView source={s6} />,
};

export default function Mkt001Report({ section = "executive" }) {
  const render = SECTION_MAP[section] ?? SECTION_MAP.executive;
  return render();
}
