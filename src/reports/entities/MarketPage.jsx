import { T } from "../../data/colors.js";
import { byMarket, relatedIds } from "../../data/entities.js";
import { ChipRow } from "./EntityChip.jsx";
import { Section, Pill, SourceRefs, CoverageBanner, NotFound } from "./MonthPage.jsx";

export default function MarketPage({ id, goto }) {
  const mk = byMarket[String(id)];
  if (!mk) return <NotFound id={id} goto={goto} />;

  const rel = relatedIds("market", mk.id);

  return (
    <div>
      <button onClick={() => goto("hub")} style={backBtn}>← Quay về Entity Hub</button>

      {/* Header */}
      <div style={{ marginTop: 8, marginBottom: 20 }}>
        <div style={{ fontSize: 10, color: T.navy, letterSpacing: 1.6, textTransform: "uppercase", fontWeight: 700 }}>
          Market · {mk.id}
        </div>
        <h1 className="serif" style={{ fontSize: 30, margin: "4px 0 6px", color: T.ink, lineHeight: 1.2 }}>
          {mk.flag_emoji} {mk.name_en}
          {mk.name_vi && mk.name_vi !== mk.name_en && (
            <span style={{ color: T.inkSoft, fontWeight: 400, fontSize: 22 }}> · {mk.name_vi}</span>
          )}
        </h1>
      </div>

      {/* KPI row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: 10,
        marginBottom: 22,
      }}>
        <KPI label="Volume / năm" value={mk.volume_annual != null ? `${(mk.volume_annual / 1000).toFixed(0)}K` : "—"} />
        <KPI label="YoY growth" value={mk.yoy_growth_pct != null ? `${mk.yoy_growth_pct > 0 ? "+" : ""}${mk.yoy_growth_pct}%` : "—"}
             tone={mk.yoy_growth_pct > 30 ? "hot" : mk.yoy_growth_pct > 10 ? "up" : "neutral"} />
        <KPI label="Party size TB" value={mk.avg_party_size ? `${mk.avg_party_size} pax` : "—"} />
        <KPI label="Lead time TB" value={mk.avg_booking_window_days ? `${mk.avg_booking_window_days}d` : "—"} />
      </div>

      {/* Pills */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 22 }}>
        {mk.yoy_trend && <Pill bg={T.emeraldSoft} ink={T.emeraldInk}>📈 {mk.yoy_trend}</Pill>}
        {mk.currency && <Pill bg={T.bgAlt} ink={T.inkSoft}>💱 {mk.currency}</Pill>}
        {mk.visa_regime && <Pill bg={T.navySoft} ink={T.navyInk}>🛂 {mk.visa_regime}</Pill>}
        {mk.confidence && <Pill bg={T.bgAlt} ink={T.inkSoft}>Conf: {mk.confidence}</Pill>}
      </div>

      {/* Cross-links */}
      <Section title={`📅 Peak months (${rel.months?.length || 0})`}>
        <ChipRow items={(rel.months || []).map((id) => ({ kind: "month", id }))} onGo={(k, i) => goto(`${k}/${i}`)} />
      </Section>

      <Section title={`👥 Personas (${rel.personas?.length || 0})`}>
        <ChipRow items={(rel.personas || []).map((id) => ({ kind: "persona", id }))} onGo={(k, i) => goto(`${k}/${i}`)} />
      </Section>

      <Section title={`🗺️ Popular tours (${rel.tours?.length || 0})`}>
        <ChipRow items={(rel.tours || []).map((id) => ({ kind: "tour", id }))} onGo={(k, i) => goto(`${k}/${i}`)} />
      </Section>

      {/* School holidays */}
      {mk.school_holidays?.length > 0 && (
        <Section title="🎓 School holidays">
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: T.ink, lineHeight: 1.7 }}>
            {mk.school_holidays.map((h, i) => (
              <li key={i}>
                <strong>{h.name}</strong>
                {h.start && h.end && <span style={{ color: T.inkSoft }}> — {h.start} → {h.end}</span>}
                {h.duration_weeks && <span style={{ color: T.inkSoft }}> · {h.duration_weeks} tuần</span>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* OTA preference */}
      {mk.OTA_preference?.length > 0 && (
        <Section title="📱 OTA preference">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {mk.OTA_preference.map((o, i) => (
              <span key={i} style={{
                padding: "4px 10px", background: T.bgAlt, border: `1px solid ${T.line}`,
                borderRadius: 6, fontSize: 12, color: T.ink, fontWeight: 600,
              }}>{o}</span>
            ))}
          </div>
        </Section>
      )}

      {mk.flight_options && (
        <Section title="✈️ Flight options">
          <div style={{ fontSize: 13, color: T.ink, lineHeight: 1.55 }}>{mk.flight_options}</div>
        </Section>
      )}

      {mk.notes && (
        <Section title="📝 Notes">
          <div style={{ fontSize: 13, color: T.ink, lineHeight: 1.55, maxWidth: 720 }}>{mk.notes}</div>
        </Section>
      )}

      {mk.source_refs?.length > 0 && <SourceRefs refs={mk.source_refs} />}
      {mk.coverage_gap && <CoverageBanner />}
    </div>
  );
}

function KPI({ label, value, tone = "neutral" }) {
  const tones = {
    hot:     { bd: T.amber,   bg: T.amberSoft   },
    up:      { bd: T.emerald, bg: T.emeraldSoft },
    neutral: { bd: T.line,    bg: T.surface     },
  };
  const t = tones[tone];
  return (
    <div style={{
      padding: "10px 12px",
      background: t.bg,
      border: `1px solid ${t.bd}`,
      borderRadius: 8,
    }}>
      <div style={{ fontSize: 10, color: T.inkSoft, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
        {label}
      </div>
      <div style={{ fontSize: 20, color: T.ink, fontWeight: 700, marginTop: 2 }}>
        {value}
      </div>
    </div>
  );
}

const backBtn = {
  padding: "6px 10px",
  background: T.bgAlt,
  border: `1px solid ${T.line}`,
  borderRadius: 6,
  fontSize: 12,
  color: T.ink,
  cursor: "pointer",
  fontFamily: "inherit",
  fontWeight: 600,
};
