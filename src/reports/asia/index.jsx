import Overview  from "../../tabs/Overview.jsx";
import Country   from "../../tabs/Country.jsx";
import Quarterly from "../../tabs/Quarterly.jsx";
import Behavior  from "../../tabs/Behavior.jsx";
import Channels  from "../../tabs/Channels.jsx";
import Roi2026   from "../../tabs/Roi2026.jsx";
import Insights  from "../../tabs/Insights.jsx";

const TAB_COMPONENTS = {
  overview:  Overview,
  country:   Country,
  quarterly: Quarterly,
  behavior:  Behavior,
  channels:  Channels,
  roi2026:   Roi2026,
  insights:  Insights,
};

export default function AsiaReport({ tab = "overview" }) {
  const Active = TAB_COMPONENTS[tab] ?? Overview;
  return <Active />;
}
