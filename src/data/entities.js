// Sondax Entity Explorer — data loader
// Source: Projects/Sondax-Travel/reports/_entities/*.json (symlinked into ./entities/)

import months    from "./entities/months.json";
import tours     from "./entities/tours.json";
import personas  from "./entities/personas.json";
import markets   from "./entities/markets.json";
import crossRefs from "./entities/cross-refs.json";

// Index by ID for O(1) lookup
const indexBy = (arr) => Object.fromEntries(arr.map((x) => [String(x.id), x]));

export const MONTHS   = months;
export const TOURS    = tours;
export const PERSONAS = personas;
export const MARKETS  = markets;
export const XREF     = crossRefs;

export const byMonth   = indexBy(months);
export const byTour    = indexBy(tours);
export const byPersona = indexBy(personas);
export const byMarket  = indexBy(markets);

// Lookup: any ID → entity + kind
export function lookup(id) {
  const s = String(id);
  if (byMonth[s])   return { kind: "month",   entity: byMonth[s] };
  if (byTour[s])    return { kind: "tour",    entity: byTour[s] };
  if (byPersona[s]) return { kind: "persona", entity: byPersona[s] };
  if (byMarket[s])  return { kind: "market",  entity: byMarket[s] };
  return null;
}

// Related entities for an entity (from cross-refs.edges_symmetric)
export function relatedIds(kind, id) {
  const edges = XREF.edges_symmetric || {};
  const pick = (key) => (edges[key] || {})[String(id)] || [];
  if (kind === "month") {
    return {
      tours:    pick("month→tour"),
      personas: pick("month→persona"),
      markets:  pick("month→market"),
    };
  }
  if (kind === "tour") {
    return {
      months:   pick("tour→month"),
      personas: pick("tour→persona"),
      markets:  pick("tour→market"),
    };
  }
  if (kind === "persona") {
    return {
      months:   pick("persona→month"),
      tours:    pick("persona→tour"),
      markets:  pick("persona→market"),
    };
  }
  if (kind === "market") {
    return {
      months:   pick("market→month"),
      tours:    pick("market→tour"),
      personas: pick("market→persona"),
    };
  }
  return {};
}

// Label helper — short display string for chip
export function labelFor(kind, id) {
  const s = String(id);
  if (kind === "month") {
    const m = byMonth[s];
    return m ? m.short || m.name_vi || `Th${s}` : `Th${s}`;
  }
  if (kind === "tour") {
    const t = byTour[s];
    return t ? `${t.id} ${truncate(t.name || "", 28)}` : s;
  }
  if (kind === "persona") {
    const p = byPersona[s];
    return p ? `${p.id} ${truncate(p.short || p.name || "", 28)}` : s;
  }
  if (kind === "market") {
    const mk = byMarket[s];
    return mk ? `${mk.flag_emoji || ""} ${mk.id}` : s;
  }
  return s;
}

function truncate(str, n) {
  if (!str) return "";
  return str.length > n ? str.slice(0, n - 1) + "…" : str;
}

// Counts for sidebar badges
export const COUNTS = {
  months:   MONTHS.length,
  tours:    TOURS.length,
  personas: PERSONAS.length,
  markets:  MARKETS.length,
  total:    MONTHS.length + TOURS.length + PERSONAS.length + MARKETS.length,
};
