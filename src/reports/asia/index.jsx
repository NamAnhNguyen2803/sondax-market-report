import HomePane         from "./HomePane.jsx";
import Overview         from "../../tabs/Overview.jsx";
import Country          from "../../tabs/Country.jsx";
import Quarterly        from "../../tabs/Quarterly.jsx";
import Behavior         from "../../tabs/Behavior.jsx";
import Channels         from "../../tabs/Channels.jsx";
import Roi2026          from "../../tabs/Roi2026.jsx";
import Insights         from "../../tabs/Insights.jsx";
import ExecutiveSummary from "../../tabs/ExecutiveSummary.jsx";
import MarketSizing     from "../../tabs/MarketSizing.jsx";
import Personas         from "../../tabs/Personas.jsx";
import OTALandscape     from "../../tabs/OTALandscape.jsx";
import Benchmark        from "../../tabs/Benchmark.jsx";
import Seasonality      from "../../tabs/Seasonality.jsx";
import Philippines      from "../../tabs/Philippines.jsx";
import Archetypes       from "../../tabs/Archetypes.jsx";
import GTMRoadmap       from "../../tabs/GTMRoadmap.jsx";
import Risks            from "../../tabs/Risks.jsx";

const TAB_COMPONENTS = {
  overview:    Overview,
  country:     Country,
  quarterly:   Quarterly,
  behavior:    Behavior,
  channels:    Channels,
  roi2026:     Roi2026,
  insights:    Insights,
  executive:   ExecutiveSummary,
  market:      MarketSizing,
  personas:    Personas,
  ota:         OTALandscape,
  benchmark:   Benchmark,
  seasonality: Seasonality,
  philippines: Philippines,
  archetypes:  Archetypes,
  gtm:         GTMRoadmap,
  risks:       Risks,
};

export default function AsiaReport({ section = "asia-home", goto = () => {} }) {
  if (section === "asia-home") return <HomePane goto={goto} />;
  const Active = TAB_COMPONENTS[section] ?? TAB_COMPONENTS.overview;
  return <Active />;
}
