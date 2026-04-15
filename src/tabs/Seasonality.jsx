import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { C } from "../data/colors.js";
import H2 from "../components/H2.jsx";
import Card from "../components/Card.jsx";
import KPI from "../components/KPI.jsx";
import Tip from "../components/Tip.jsx";

const leadTimes = [
  { persona: "P1 NA Winter Escape", leadTime: "90–150 ngày", shape: "Long-tail — một số book 6mo ahead cho Dec peak", source: "Expedia US outbound Asia + Buffalo Tours / Trails of Indochina", color: C.accent, days: 120 },
  { persona: "P2 UK/IE Culture", leadTime: "60–120 ngày", shape: "Peak bookings 4mo ahead", source: "VisitBritain outbound booking-window 2024", color: C.orange, days: 90 },
  { persona: "P3 AU/NZ Short-haul", leadTime: "30–75 ngày", shape: "Short lead; lastminute-spike Dec", source: "Skyscanner AU/NZ + Tourism Australia", color: C.green, days: 52 },
  { persona: "P4 Nomad", leadTime: "14–45 (accom); 3–14 (tour add-on)", shape: "Very short for tour add-on", source: "Airbnb long-stay + Nomad List", color: C.purple, days: 30 },
  { persona: "P5 Gen-Z", leadTime: "21–60 ngày", shape: "Shorter than P2; TikTok-triggered", source: "Klook booking-window APAC · Phocuswright Gen-Z", color: C.india, days: 40 },
  { persona: "P6 Family Multigen", leadTime: "90–180 ngày", shape: "Earliest bookers (school-holiday lock-in)", source: "Booking.com traveller insights family", color: C.cyan, days: 135 },
  { persona: "P7 Luxury HNWI", leadTime: "120–240 ngày", shape: "Longest; private-guide scarcity", source: "Luxury Travel Intelligence · Virtuoso outlook", color: C.pink, days: 180 },
];

const spikeEvents = [
  { event: "US Thanksgiving", when: "4th Thu Nov", personas: "P1 + P6 US", note: "4-day spike" },
  { event: "Xmas / NY", when: "Dec 20 – Jan 5", personas: "Toàn bộ persona", note: "Global peak" },
  { event: "UK half-term Oct", when: "Late Oct", personas: "P2 + P6 UK", note: "Shoulder spike" },
  { event: "UK half-term Feb", when: "Mid-Feb", personas: "P2 + P6 UK", note: "Secondary peak" },
  { event: "US spring break", when: "Mid-Mar – early Apr", personas: "P6 US", note: "Family peak" },
  { event: "Lunar NY / Tết VN", when: "Late Jan – mid Feb", personas: "In-country dip", note: "Operator price-shield international guests" },
  { event: "AU/NZ summer", when: "Mid-Dec – late Feb", personas: "P3 + P6 AU", note: "AU/NZ summer escape" },
  { event: "SG/IN inter-term", when: "Late Nov – Dec; Mar", personas: "P3 + P6 SG/IN", note: "School inter-term" },
  { event: "PH Xmas (Simbang Gabi)", when: "Dec 16 – Jan 6", personas: "P3/P5/P6 PH", note: "PH peak concentrated" },
  { event: "India Diwali + winter", when: "Nov + late Dec – early Jan", personas: "P6/P7 IN", note: "IN HNWI peak" },
];

const cruisePortCalls = [
  { port: "Hạ Long", oct: 8, nov: 12, dec: 18, jan: 18, feb: 15, mar: 12, total: 83, archetype: "P1 + P7 Winter Escape + luxury combo" },
  { port: "Phú Mỹ", oct: 10, nov: 14, dec: 16, jan: 16, feb: 14, mar: 12, total: 82, archetype: "P6 family Asia cruise itinerary" },
  { port: "Chan May", oct: 6, nov: 10, dec: 14, jan: 12, feb: 12, mar: 10, total: 64, archetype: "P1 + P2 culture + cruise-extend Huế" },
  { port: "Nha Trang", oct: 4, nov: 6, dec: 8, jan: 8, feb: 7, mar: 6, total: 39, archetype: "P7 luxury secondary stop" },
];

const heatmap = [
  { persona: "P1 NA Winter Escape", oct: "M", nov: "S", dec: "P", jan: "P", feb: "S", mar: "M", notes: "Xmas/NY + Thanksgiving Nov" },
  { persona: "P2 UK/IE Culture", oct: "S", nov: "M", dec: "P", jan: "M", feb: "P", mar: "M", notes: "Half-term Oct + Feb" },
  { persona: "P3 AU/NZ Short-haul", oct: "S", nov: "M", dec: "M", jan: "S", feb: "S", mar: "P", notes: "AU school Oct; autumn escape Mar" },
  { persona: "P4 Nomad", oct: "M", nov: "S", dec: "S", jan: "S", feb: "S", mar: "M", notes: "Trải đều Nov–Mar" },
  { persona: "P5 Gen-Z", oct: "P", nov: "M", dec: "M", jan: "M", feb: "S", mar: "P", notes: "Shoulder prices + TikTok wave Mar" },
  { persona: "P6 Family Multigen", oct: "M", nov: "M", dec: "P", jan: "P", feb: "S", mar: "S", notes: "Xmas global + UK/SG half-term + US spring" },
  { persona: "P7 Luxury HNWI", oct: "L", nov: "M", dec: "P", jan: "P", feb: "P", mar: "M", notes: "Winter-escape + post-Xmas HNWI" },
];

const cellColor = { P: C.red, S: C.orange, M: C.accent, L: C.muted };
const cellLabel = { P: "🔴 Peak", S: "🟠 Strong", M: "🟡 Mid", L: "⚪ Low" };

const portCallData = [
  { month: "Oct", "Hạ Long": 8, "Phú Mỹ": 10, "Chan May": 6, "Nha Trang": 4 },
  { month: "Nov", "Hạ Long": 12, "Phú Mỹ": 14, "Chan May": 10, "Nha Trang": 6 },
  { month: "Dec", "Hạ Long": 18, "Phú Mỹ": 16, "Chan May": 14, "Nha Trang": 8 },
  { month: "Jan", "Hạ Long": 18, "Phú Mỹ": 16, "Chan May": 12, "Nha Trang": 8 },
  { month: "Feb", "Hạ Long": 15, "Phú Mỹ": 14, "Chan May": 12, "Nha Trang": 7 },
  { month: "Mar", "Hạ Long": 12, "Phú Mỹ": 12, "Chan May": 10, "Nha Trang": 6 },
];

export default function Seasonality() {
  return (
    <>
      <H2>Pain → Analogy</H2>
      <Card>
        <p style={{ color: C.text, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          PO cần biết "mỗi market book tour bao giờ" để lock inventory + pricing. Giống bán vé máy bay Tết — 3 tháng trước giá đẹp, 1 tháng trước giá chat. Mỗi persona có lead-time khác; biết sớm = lock sớm.
        </p>
      </Card>

      <H2>Key Insights</H2>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        <KPI label="Peak universal" value="Dec 15 – Feb 15" sub="P1, P2, P6, P7 🔴" />
        <KPI label="Shoulder month" value="Oct + Mar" sub="P3 + P5 🔴" />
        <KPI label="Earliest booker" value="P7 Luxury" sub="120–240 ngày lead" />
        <KPI label="Latest booker" value="P4 Nomad" sub="3–14 ngày tour add-on" />
      </div>

      <H2>Lead-Time Distribution per Persona</H2>
      <Card>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                {["Persona", "Lead-time TB", "Distribution shape", "Source signal"].map((h, i) => (
                  <th key={i} style={{ textAlign: "left", padding: "8px 6px", color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.4 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leadTimes.map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "8px 6px", color: row.color, fontWeight: 700 }}>{row.persona}</td>
                  <td style={{ padding: "8px 6px", color: C.accent, fontWeight: 600 }}>{row.leadTime}</td>
                  <td style={{ padding: "8px 6px", color: C.text, fontSize: 11 }}>{row.shape}</td>
                  <td style={{ padding: "8px 6px", color: C.muted, fontSize: 10 }}>{row.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 12, padding: 10, background: `${C.accent}10`, borderRadius: 8, borderLeft: `3px solid ${C.accent}` }}>
          <p style={{ color: C.text, fontSize: 12, margin: 0 }}>
            <strong style={{ color: C.accent }}>Operator implication:</strong> Lock Dec–Feb inventory <strong>by end of August</strong> cho P1, P6, P7. P3 + P5 có thể fill last-minute (flash-sale window).
          </p>
        </div>
      </Card>

      <H2>Price Elasticity by Month (Oct–Mar)</H2>
      <Card>
        <p style={{ color: C.text, fontSize: 12, lineHeight: 1.7, margin: 0 }}>
          <strong style={{ color: C.orange }}>Oct</strong> = shoulder (prices 10–20% off peak) · <strong style={{ color: C.orange }}>Nov</strong> rising · <strong style={{ color: C.red }}>Dec peak</strong> (Xmas/NY +20–40%) · <strong style={{ color: C.orange }}>Jan</strong> = post-NY dip · <strong style={{ color: C.orange }}>Feb</strong> = Lunar NY VN (inbound demand dip in-country nhưng return late-Feb) · <strong style={{ color: C.orange }}>Mar</strong> = shoulder (NH spring-break wave).
        </p>
      </Card>

      <H2>Spike Events Oct–Mar</H2>
      <Card>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                {["Event", "When", "Personas", "Notes"].map((h, i) => (
                  <th key={i} style={{ textAlign: "left", padding: "8px 6px", color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.4 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {spikeEvents.map((e, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "8px 6px", color: C.text, fontWeight: 700 }}>{e.event}</td>
                  <td style={{ padding: "8px 6px", color: C.accent }}>{e.when}</td>
                  <td style={{ padding: "8px 6px", color: C.muted }}>{e.personas}</td>
                  <td style={{ padding: "8px 6px", color: C.muted, fontSize: 10 }}>{e.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <H2>Cruise Season Oct–Mar — Port-Call Chart</H2>
      <Card>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={portCallData}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="month" tick={{ fill: C.muted, fontSize: 11 }} />
            <YAxis tick={{ fill: C.muted, fontSize: 10 }} />
            <Tooltip content={<Tip />} />
            <Bar dataKey="Hạ Long" fill={C.accent} />
            <Bar dataKey="Phú Mỹ" fill={C.orange} />
            <Bar dataKey="Chan May" fill={C.green} />
            <Bar dataKey="Nha Trang" fill={C.purple} />
          </BarChart>
        </ResponsiveContainer>
        <p style={{ color: C.muted, fontSize: 11, marginTop: 10, marginBottom: 0 }}>
          Peak density Dec 15 – Feb 15. Source: cruisemapper.com + cruisetimetables.com Q4 2024.
        </p>
      </Card>

      <H2>Port-Call Table + Archetype Hook</H2>
      <Card>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                {["Cảng", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Tổng", "Archetype hook"].map((h, i) => (
                  <th key={i} style={{ textAlign: i === 0 || i === 8 ? "left" : "center", padding: "8px 6px", color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.4 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cruisePortCalls.map((row) => (
                <tr key={row.port} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "8px 6px", color: C.text, fontWeight: 700, fontSize: 12 }}>{row.port}</td>
                  {[row.oct, row.nov, row.dec, row.jan, row.feb, row.mar].map((v, i) => (
                    <td key={i} style={{ textAlign: "center", padding: "8px 6px", color: C.text }}>{v}</td>
                  ))}
                  <td style={{ textAlign: "center", padding: "8px 6px", color: C.accent, fontWeight: 800, fontSize: 14 }}>{row.total}</td>
                  <td style={{ padding: "8px 6px", color: C.green, fontSize: 11 }}>{row.archetype}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <H2>Retail vs Cruise Peak Divergence</H2>
      <Card>
        <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
          {[
            "Cruise booking leads retail by 2–4 tuần — cruise pax book ship ≥6mo ahead; shore-ex booked 2–8 tuần trước sailing. Shore-ex operator inventory phải visible 6mo ahead nhưng locked 8 tuần = conversion window.",
            "Retail peak lag — retail pax vẫn book Oct cho Dec, cruise pax đã on ship locked Sep.",
            "→ Operator implication: Build cruise-extend archetype listings visible trong Q1 calendar year cho Q4 following (e.g. visible Jan 2026 cho Oct 2026 – Mar 2027 sailing).",
          ].map((item, i) => (
            <li key={i} style={{ color: C.muted, fontSize: 12, lineHeight: 1.7, marginBottom: 4 }}>{item}</li>
          ))}
        </ul>
      </Card>

      <H2>Persona × Month Demand Heatmap (7 × 6)</H2>
      <Card>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                <th style={{ textAlign: "left", padding: "8px 6px", color: C.muted, fontSize: 10, textTransform: "uppercase" }}>Persona</th>
                {["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((m) => (
                  <th key={m} style={{ textAlign: "center", padding: "8px 6px", color: C.muted, fontSize: 10, textTransform: "uppercase" }}>{m}</th>
                ))}
                <th style={{ textAlign: "left", padding: "8px 6px", color: C.muted, fontSize: 10, textTransform: "uppercase" }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {heatmap.map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "8px 6px", color: C.text, fontWeight: 700, fontSize: 11 }}>{row.persona}</td>
                  {["oct", "nov", "dec", "jan", "feb", "mar"].map((m) => {
                    const v = row[m];
                    return (
                      <td key={m} style={{ textAlign: "center", padding: "6px 4px" }}>
                        <span style={{
                          display: "inline-block",
                          minWidth: 28,
                          padding: "3px 6px",
                          background: `${cellColor[v]}25`,
                          color: cellColor[v],
                          borderRadius: 4,
                          fontWeight: 700,
                          fontSize: 11,
                        }}>{v}</span>
                      </td>
                    );
                  })}
                  <td style={{ padding: "6px 6px", color: C.muted, fontSize: 10 }}>{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 10, display: "flex", gap: 12, fontSize: 10, flexWrap: "wrap" }}>
          {Object.entries(cellLabel).map(([k, v]) => (
            <span key={k} style={{ color: cellColor[k] }}><strong>{v}</strong></span>
          ))}
        </div>
      </Card>

      <H2>Archetype Timing Seeds</H2>
      <Card>
        <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
          {[
            "Dec 15 – Feb 15 = universal peak (P1, P2, P6, P7 all 🔴) → anchor A1 Winter Escape + A2 Luxury combo window này.",
            "Oct + Mar = shoulder (P3 + P5 🔴) → anchor A6 AU/NZ Direct-Flight Beach + A5 PH Barkada Gen-Z archetype here.",
            "Feb half-term UK = secondary peak (P2 + P6 UK) → A4 UK/IE Mid-Premium có thể push Feb half-term promo.",
            "Nov–Dec Chan May cruise peak → A6 cruise-extend-to-Huế (cruise-leverage #2).",
          ].map((item, i) => (
            <li key={i} style={{ color: C.muted, fontSize: 12, lineHeight: 1.7, marginBottom: 4 }}>{item}</li>
          ))}
        </ul>
      </Card>

      <H2>Gaps Flagged</H2>
      <Card>
        <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
          <li style={{ color: C.muted, fontSize: 11, lineHeight: 1.7 }}>[gap] Exact monthly demand % per persona không public; heatmap qualitative từ lead-time + spike-event overlay.</li>
          <li style={{ color: C.muted, fontSize: 11, lineHeight: 1.7 }}>[gap] Google Trends "Vietnam tour" volatile cho small markets (NZ, IE, ZA); M/L judgments kém precise.</li>
        </ul>
      </Card>
    </>
  );
}
