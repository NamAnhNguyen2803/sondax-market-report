import { T } from "../../data/colors.js";
import { byPersona, relatedIds } from "../../data/entities.js";
import { ChipRow } from "./EntityChip.jsx";
import { Section, Pill, SourceRefs, CoverageBanner, NotFound } from "./MonthPage.jsx";

export default function PersonaPage({ id, goto }) {
  const p = byPersona[String(id)];
  if (!p) return <NotFound id={id} goto={goto} />;

  const rel = relatedIds("persona", p.id);
  const isDeep = p.type === "deep";

  return (
    <div>
      <button onClick={() => goto("hub")} style={backBtn}>← Quay về Entity Hub</button>

      {/* Header */}
      <div style={{ marginTop: 8, marginBottom: 20 }}>
        <div style={{ fontSize: 10, color: T.navy, letterSpacing: 1.6, textTransform: "uppercase", fontWeight: 700 }}>
          Persona · {p.id} · {p.type}
        </div>
        <h1 className="serif" style={{ fontSize: 28, margin: "4px 0 6px", color: T.ink, lineHeight: 1.25 }}>
          {p.name}
        </h1>
        {p.short && p.short !== p.name && (
          <div style={{ color: T.inkSoft, fontSize: 13, marginBottom: 4 }}>
            <em>{p.short}</em>
          </div>
        )}
      </div>

      {/* Meta pills */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {p.age_range && <Pill bg={T.bgAlt} ink={T.ink}>👤 {p.age_range}</Pill>}
        {p.lifecycle && <Pill bg={T.bgAlt} ink={T.inkSoft}>{p.lifecycle}</Pill>}
        {p.budget_range?.tier && (
          <Pill bg={T.emeraldSoft} ink={T.emeraldInk}>
            💵 {p.budget_range.tier}
            {p.budget_range.min_usd
              ? ` · $${p.budget_range.min_usd}–${p.budget_range.max_usd}`
              : ""}
          </Pill>
        )}
        {p.cruise_overlap && (
          <Pill bg={T.navySoft} ink={T.navyInk}>🚢 Cruise overlap: {p.cruise_overlap}</Pill>
        )}
        {p.confidence && <Pill bg={T.bgAlt} ink={T.inkSoft}>Conf: {p.confidence}</Pill>}
      </div>

      {/* Deep persona story (UC-card format) */}
      {isDeep && (
        <>
          {p.pain && <StoryBlock title="😣 Pain" body={p.pain} />}
          {p.analogy && <StoryBlock title="🔮 Analogy" body={p.analogy} subtle />}
          {p.solution && <StoryBlock title="✅ Solution" body={p.solution} />}

          {(p.before || p.after) && (
            <Section title="🔄 Before / After">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10 }}>
                {p.before && (
                  <div style={{ padding: "10px 12px", background: "#FEE2E2", border: "1px solid #F5B5B5", borderRadius: 8 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#991B1B", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
                      Before
                    </div>
                    <div style={{ fontSize: 13, color: T.ink, lineHeight: 1.5 }}>{p.before}</div>
                  </div>
                )}
                {p.after && (
                  <div style={{ padding: "10px 12px", background: T.emeraldSoft, border: "1px solid #9FDDBF", borderRadius: 8 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: T.emeraldInk, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
                      After
                    </div>
                    <div style={{ fontSize: 13, color: T.ink, lineHeight: 1.5 }}>{p.after}</div>
                  </div>
                )}
              </div>
            </Section>
          )}

          {p.outcome && <StoryBlock title="🎯 Outcome" body={p.outcome} />}
        </>
      )}

      {/* Cross-links */}
      <Section title={`📅 Tháng cao điểm (${rel.months?.length || 0})`}>
        <ChipRow items={(rel.months || []).map((id) => ({ kind: "month", id }))} onGo={(k, i) => goto(`${k}/${i}`)} />
      </Section>

      <Section title={`🗺️ Preferred tours (${rel.tours?.length || 0})`}>
        <ChipRow items={(rel.tours || []).map((id) => ({ kind: "tour", id }))} onGo={(k, i) => goto(`${k}/${i}`)} />
      </Section>

      <Section title={`🌐 Origin markets (${rel.markets?.length || 0})`}>
        <ChipRow items={(rel.markets || []).map((id) => ({ kind: "market", id }))} onGo={(k, i) => goto(`${k}/${i}`)} />
      </Section>

      {/* Unmet need */}
      {p.unmet_need && (
        <Section title="💡 Unmet need">
          <div style={{
            padding: "12px 14px",
            background: T.amberSoft,
            border: "1px solid #F5D99A",
            borderRadius: 8,
            fontSize: 13,
            color: T.ink,
            lineHeight: 1.55,
          }}>
            {p.unmet_need}
          </div>
        </Section>
      )}

      {/* OTA preference */}
      {p.OTA_preference?.length > 0 && (
        <Section title="📱 OTA preference">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {p.OTA_preference.map((o, i) => (
              <span key={i} style={{
                padding: "4px 10px", background: T.bgAlt, border: `1px solid ${T.line}`,
                borderRadius: 6, fontSize: 12, color: T.ink, fontWeight: 600,
              }}>{o}</span>
            ))}
          </div>
        </Section>
      )}

      {p.booking_lead_time && (
        <Section title="⏱ Booking lead time">
          <div style={{ fontSize: 13, color: T.ink }}>{p.booking_lead_time}</div>
        </Section>
      )}

      {p.source_refs?.length > 0 && <SourceRefs refs={p.source_refs} />}
      {p.coverage_gap && <CoverageBanner />}
    </div>
  );
}

function StoryBlock({ title, body, subtle = false }) {
  return (
    <Section title={title}>
      <div style={{
        fontSize: 13.5,
        color: T.ink,
        lineHeight: 1.6,
        fontStyle: subtle ? "italic" : "normal",
        maxWidth: 720,
      }}>
        {body}
      </div>
    </Section>
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
