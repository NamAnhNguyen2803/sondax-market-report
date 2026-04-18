import { T } from "../../data/colors.js";
import { byTour, relatedIds } from "../../data/entities.js";
import { ChipRow } from "./EntityChip.jsx";
import { Section, Pill, SourceRefs, CoverageBanner, NotFound } from "./MonthPage.jsx";

export default function TourPage({ id, goto }) {
  const t = byTour[String(id)];
  if (!t) return <NotFound id={id} goto={goto} />;

  const rel = relatedIds("tour", t.id);

  // Separate peak vs shoulder months for richer display
  const peakMonths = (t.peak_month_ids || []).map((id) => ({ kind: "month", id }));
  const shoulderMonths = (t.shoulder_month_ids || []).map((id) => ({ kind: "month", id }));

  return (
    <div>
      <button onClick={() => goto("hub")} style={backBtn}>← Quay về Entity Hub</button>

      {/* Header */}
      <div style={{ marginTop: 8, marginBottom: 20 }}>
        <div style={{ fontSize: 10, color: T.navy, letterSpacing: 1.6, textTransform: "uppercase", fontWeight: 700 }}>
          Tour · {t.id} · {t.type}
        </div>
        <h1 className="serif" style={{ fontSize: 28, margin: "4px 0 6px", color: T.ink, lineHeight: 1.25 }}>
          {t.name}
        </h1>
        {t.tagline && (
          <div style={{ color: T.inkSoft, fontSize: 14, lineHeight: 1.5, maxWidth: 720, fontStyle: "italic" }}>
            {t.tagline}
          </div>
        )}
      </div>

      {/* Key stats row */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
        {t.duration && <Pill bg={T.bgAlt} ink={T.ink}>⏱ {t.duration}</Pill>}
        {t.region && <Pill bg={T.navySoft} ink={T.navyInk}>📍 {t.region}</Pill>}
        {t.price_range?.min_usd != null && (
          <Pill bg={T.emeraldSoft} ink={T.emeraldInk}>
            💵 ${t.price_range.min_usd}–${t.price_range.max_usd}
            {t.price_range.tier ? ` · ${t.price_range.tier}` : ""}
          </Pill>
        )}
        {t.hotness_score != null && (
          <Pill bg="#FEF3C7" ink="#92400E">🔥 Hotness {t.hotness_score}</Pill>
        )}
        {t.fund_decision && (
          <Pill bg={T.amberSoft} ink={T.amberInk}>📊 {t.fund_decision}</Pill>
        )}
        {t.launch_budget_usd && (
          <Pill bg={T.navySoft} ink={T.navyInk}>
            💼 ${(t.launch_budget_usd / 1000).toFixed(1)}K launch
          </Pill>
        )}
        {t.confidence && (
          <Pill bg={T.bgAlt} ink={T.inkSoft}>Conf: {t.confidence}</Pill>
        )}
      </div>

      {/* USP */}
      {t.unique_selling_point && (
        <Section title="✨ Unique selling point">
          <div style={{
            padding: "12px 14px",
            background: T.amberSoft,
            border: `1px solid #F5D99A`,
            borderRadius: 8,
            fontSize: 13.5,
            color: T.ink,
            lineHeight: 1.55,
          }}>
            {t.unique_selling_point}
          </div>
        </Section>
      )}

      {/* Peak + shoulder months */}
      <Section title={`📅 Tháng cao điểm (${peakMonths.length}) + shoulder (${shoulderMonths.length})`}>
        <div style={{ marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: T.inkSoft, fontWeight: 600, marginRight: 8 }}>Peak:</span>
          <ChipRow items={peakMonths} onGo={(k, i) => goto(`${k}/${i}`)} />
        </div>
        {shoulderMonths.length > 0 && (
          <div>
            <span style={{ fontSize: 11, color: T.inkSoft, fontWeight: 600, marginRight: 8 }}>Shoulder:</span>
            <ChipRow items={shoulderMonths} onGo={(k, i) => goto(`${k}/${i}`)} />
          </div>
        )}
      </Section>

      <Section title={`👥 Target personas (${rel.personas?.length || 0})`}>
        <ChipRow items={(rel.personas || []).map((id) => ({ kind: "persona", id }))} onGo={(k, i) => goto(`${k}/${i}`)} />
      </Section>

      <Section title={`🌐 Origin markets (${rel.markets?.length || 0})`}>
        <ChipRow items={(rel.markets || []).map((id) => ({ kind: "market", id }))} onGo={(k, i) => goto(`${k}/${i}`)} />
      </Section>

      {/* OTA channels */}
      {t.OTA_channels?.length > 0 && (
        <Section title="📱 OTA channels">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {t.OTA_channels.map((ch, i) => (
              <span key={i} style={{
                padding: "4px 10px", background: T.bgAlt, border: `1px solid ${T.line}`,
                borderRadius: 6, fontSize: 12, color: T.ink, fontWeight: 600,
              }}>
                {ch}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Vendors */}
      {t.vendors?.length > 0 && (
        <Section title="🤝 Vendors / Ops partners">
          <div style={{ fontSize: 13, color: T.ink, lineHeight: 1.7 }}>
            {t.vendors.join(" · ")}
          </div>
        </Section>
      )}

      {/* Risks */}
      {t.risks?.length > 0 && (
        <Section title="⚠️ Risks">
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: T.ink, lineHeight: 1.65 }}>
            {t.risks.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </Section>
      )}

      {/* Competition */}
      {t.competition && (
        <Section title="🥊 Competition">
          <div style={{ fontSize: 13, color: T.ink, lineHeight: 1.55 }}>{t.competition}</div>
        </Section>
      )}

      {t.source_refs?.length > 0 && <SourceRefs refs={t.source_refs} />}
      {t.coverage_gap && <CoverageBanner />}
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
