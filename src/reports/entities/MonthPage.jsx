import { T } from "../../data/colors.js";
import { byMonth, relatedIds } from "../../data/entities.js";
import { ChipRow } from "./EntityChip.jsx";

export default function MonthPage({ id, goto }) {
  const m = byMonth[String(id)];
  if (!m) return <NotFound id={id} goto={goto} />;

  const rel = relatedIds("month", id);

  return (
    <div>
      {/* Back */}
      <button onClick={() => goto("hub")} style={backBtn}>
        ← Quay về Entity Hub
      </button>

      {/* Header */}
      <div style={{ marginTop: 8, marginBottom: 22 }}>
        <div style={{ fontSize: 10, color: T.navy, letterSpacing: 1.6, textTransform: "uppercase", fontWeight: 700 }}>
          Month · #{m.id}
        </div>
        <h1 className="serif" style={{ fontSize: 30, margin: "4px 0 6px", color: T.ink }}>
          {m.name_vi} <span style={{ color: T.inkSoft, fontWeight: 400 }}>· {m.name_en}</span>
        </h1>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          <Pill bg={T.amberSoft} ink={T.amberInk}>Season: {m.season_tag}</Pill>
          <Pill bg="#FEE2E2" ink="#991B1B">Demand: {m.combined_demand}</Pill>
          {m.confidence && <Pill bg={T.bgAlt} ink={T.inkSoft}>Confidence: {m.confidence}</Pill>}
        </div>
        {m.demand_reason && (
          <div style={{ color: T.inkSoft, fontSize: 14, lineHeight: 1.55, maxWidth: 720 }}>
            {m.demand_reason}
          </div>
        )}
      </div>

      {/* Primary drivers */}
      {m.primary_drivers?.length > 0 && (
        <Section title="🔥 Primary drivers">
          <ul style={{ margin: 0, paddingLeft: 20, color: T.ink, fontSize: 13, lineHeight: 1.7 }}>
            {m.primary_drivers.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        </Section>
      )}

      {/* Cross-links — 3 chip rows */}
      <Section title={`🗺️ Tours hoạt động trong tháng (${rel.tours?.length || 0})`}>
        <ChipRow items={(rel.tours || []).map((id) => ({ kind: "tour", id }))} onGo={(k, i) => goto(`${k}/${i}`)} />
      </Section>

      <Section title={`👥 Personas đỉnh trong tháng (${rel.personas?.length || 0})`}>
        <ChipRow items={(rel.personas || []).map((id) => ({ kind: "persona", id }))} onGo={(k, i) => goto(`${k}/${i}`)} />
      </Section>

      <Section title={`🌐 Thị trường đỉnh trong tháng (${rel.markets?.length || 0})`}>
        <ChipRow items={(rel.markets || []).map((id) => ({ kind: "market", id }))} onGo={(k, i) => goto(`${k}/${i}`)} />
      </Section>

      {/* Events */}
      {m.events?.length > 0 && (
        <Section title="📌 Sự kiện · festivals · holidays">
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: T.ink, lineHeight: 1.7 }}>
            {m.events.map((e, i) => (
              <li key={i}>
                <strong>{e.name}</strong>
                {e.date && <span style={{ color: T.inkSoft }}> · {e.date}</span>}
                {e.impact && <span style={{ color: T.inkSoft }}> — {e.impact}</span>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Weather */}
      {m.weather_note && (
        <Section title="🌦️ Thời tiết · regional">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
            {["north", "central", "south"].map((r) => m.weather_note[r] && (
              <div key={r} style={{
                padding: "10px 12px",
                background: T.bgAlt,
                border: `1px solid ${T.line}`,
                borderRadius: 8,
                fontSize: 12.5,
                color: T.ink,
                lineHeight: 1.5,
              }}>
                <div style={{ fontSize: 10, color: T.navy, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>
                  {r === "north" ? "Miền Bắc" : r === "central" ? "Miền Trung" : "Miền Nam"}
                </div>
                {m.weather_note[r]}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Booking lead time */}
      {m.booking_lead_time && (
        <Section title="⏱ Booking lead time">
          <div style={{ fontSize: 13, color: T.ink }}>{m.booking_lead_time}</div>
        </Section>
      )}

      {/* Source refs */}
      {m.source_refs?.length > 0 && <SourceRefs refs={m.source_refs} />}

      {m.coverage_gap && <CoverageBanner />}
    </div>
  );
}

// ── Shared widgets ─────────────────────────────────────────────────────────
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

export function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 22 }}>
      <div style={{
        fontSize: 11, color: T.navy, fontWeight: 700, letterSpacing: 1.1,
        textTransform: "uppercase", marginBottom: 8,
      }}>
        {title}
      </div>
      <div style={{ paddingLeft: 2 }}>{children}</div>
    </section>
  );
}

export function Pill({ bg, ink, children }) {
  return (
    <span style={{
      padding: "3px 9px", background: bg, color: ink,
      fontSize: 11, fontWeight: 700, borderRadius: 999, letterSpacing: 0.3,
    }}>
      {children}
    </span>
  );
}

export function SourceRefs({ refs }) {
  return (
    <section style={{ marginTop: 28, padding: "12px 14px", background: T.bgAlt, borderRadius: 8, border: `1px dashed ${T.line}` }}>
      <div style={{ fontSize: 10, color: T.inkSoft, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
        📎 Source references
      </div>
      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 11.5, color: T.inkSoft, lineHeight: 1.6 }}>
        {refs.map((r, i) => <li key={i}><code style={{ fontSize: 11 }}>{r}</code></li>)}
      </ul>
    </section>
  );
}

export function CoverageBanner() {
  return (
    <div style={{
      marginTop: 16, padding: "10px 14px",
      background: "#FEF3C7", border: "1px solid #F5D99A",
      borderRadius: 6, fontSize: 12, color: "#92560A", lineHeight: 1.5,
    }}>
      ⚠️ <strong>Coverage gap</strong> — một số field không có data đầy đủ từ báo cáo gốc.
      Xem <code>extraction-log.md</code> để biết chi tiết.
    </div>
  );
}

export function NotFound({ id, goto }) {
  return (
    <div>
      <button onClick={() => goto("hub")} style={backBtn}>← Về Entity Hub</button>
      <div style={{ marginTop: 40, padding: 20, background: T.bgAlt, borderRadius: 8, textAlign: "center", color: T.inkSoft }}>
        Không tìm thấy entity với id <code>{id}</code>.
      </div>
    </div>
  );
}
