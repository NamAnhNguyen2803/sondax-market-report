import EntityHub   from "./EntityHub.jsx";
import MonthPage   from "./MonthPage.jsx";
import TourPage    from "./TourPage.jsx";
import PersonaPage from "./PersonaPage.jsx";
import MarketPage  from "./MarketPage.jsx";

/**
 * Entity Explorer router.
 *
 * section format:
 *   "hub"                    → EntityHub (L1, 4 tabs)
 *   "month/:id"              → MonthPage
 *   "tour/:id"               → TourPage
 *   "persona/:id"            → PersonaPage
 *   "market/:id"             → MarketPage
 */
export default function EntitiesReport({ section, goto }) {
  const s = section || "hub";

  if (s === "hub" || s === "entities-home") {
    return <EntityHub goto={goto} />;
  }

  const [kind, ...rest] = s.split("/");
  const id = rest.join("/");

  if (kind === "month")   return <MonthPage   id={id} goto={goto} />;
  if (kind === "tour")    return <TourPage    id={id} goto={goto} />;
  if (kind === "persona") return <PersonaPage id={id} goto={goto} />;
  if (kind === "market")  return <MarketPage  id={id} goto={goto} />;

  return <EntityHub goto={goto} />;
}
