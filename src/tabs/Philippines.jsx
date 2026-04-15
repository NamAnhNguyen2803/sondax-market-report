import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { C } from "../data/colors.js";
import H2 from "../components/H2.jsx";
import Card from "../components/Card.jsx";
import KPI from "../components/KPI.jsx";

export default function Philippines() {
  const volumeData = [
    { year: "2023", pax: 90 },
    { year: "2024", pax: 175 },
    { year: "2025 YTD", pax: 210 },
    { year: "2027F", pax: 280 },
  ];

  const personaMix = [
    { persona: "P3 Short-haul Beach+Adv", share: 25, note: "Manila/Cebu origin; 4–7D HCM+Phú Quốc / HCM+Đà Nẵng" },
    { persona: "P5 Gen-Z Bucket-list", share: 25, note: "Klook-driven, TikTok-driven, barkada group-of-6" },
    { persona: "P6 Family Multigen", share: 20, note: "School-holiday + Xmas; halal-options relevant (Mindanao origin)" },
    { persona: "P4 Digital Nomad", share: 10, note: "PH English + tech workforce; Đà Nẵng co-work pull" },
    { persona: "P2 Culture (equiv.)", share: 10, note: "Older Catholic-heritage traveller; Huế + old HN" },
    { persona: "P7 Luxury HNWI", share: 5, note: "Growing via Thomas Cook PH + SMC/ABS-CBN exec travel" },
    { persona: "P1 NA Winter Escape", share: 5, note: "PH is tropical — no winter-escape motive; residual" },
  ];

  const otaData = [
    { channel: "Klook PH", penetration: "Dominant", notes: "PH-native app, peso pricing, BDO/GCash partner, Klook-Points program — PRIMARY retail" },
    { channel: "Traveloka", penetration: "Large", notes: "SEA-native, flight+hotel bundling leadership — secondary retail" },
    { channel: "Agoda", penetration: "Large (hotel)", notes: "Large for hotel; smaller for activities — tertiary" },
    { channel: "Booking.com", penetration: "Mid", notes: "Bali-level penetration; less PH-native than Klook" },
    { channel: "Facebook Messenger", penetration: "CRITICAL", notes: "Discovery + closing channel — every PH listing needs FB Messenger auto-reply" },
    { channel: "PH Tourism Promo Board", penetration: "Awareness only", notes: "Low direct-book but TBIC aggregator feed" },
  ];

  const localizationLevers = [
    { lever: "Language", what: "English (PH native) + PH idioms ('barkada', 'tropa') + Filipino food familiarity callouts" },
    { lever: "Pricing", what: "Peso bands ≈ $500–$1,200 for P5 Gen-Z, $2–3K for P6 family. Klook PH-peso locked." },
    { lever: "Channel", what: "Klook PH + Traveloka + Facebook Messenger auto-chat + Instagram reels" },
    { lever: "Family content", what: "Multigen-friendly (abuela/abuelo), Catholic calendar: All Saints Nov 1, Simbang Gabi Dec 16–24, Sinulog Cebu early-Jan" },
    { lever: "Dietary", what: "Halal-friendly disclosure (esp. Mindanao-origin); non-pork-forward option flags" },
    { lever: "Payment", what: "GCash, PayMaya, BDO bank-transfer — local options" },
    { lever: "Trust signal", what: "FB Messenger response ≤3h, video review PH creator, PH Tourism Promotion Board badge" },
    { lever: "Social proof", what: "Partner with PH travel KOL (e.g. Kryz Uy, Nico Bolzico, Bogart the Explorer)" },
  ];

  const personaMixColors = [C.accent, C.blue, C.green, C.orange, C.purple, C.yellow, C.muted];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* Pain → Insight */}
      <Card>
        <H2>Philippines Deep-Dive — Pain → Analogy → Insight</H2>
        <p style={{ color: C.text, lineHeight: 1.7, marginBottom: 12 }}>
          PH inbound VN 2023→2024 tăng từ ~90K lên ~175K (~+95%), nhưng sản phẩm VN cho PH market phần lớn vẫn là
          bản dịch-lại từ US/UK retail — <strong>wrong fit</strong>. PH traveller không = "Western budget backpacker".
          PH có pattern riêng: <strong>family-first, cost-sensitive nhưng experience-rich, halal-leaning ở
          Mindanao-origin, English-native, Klook-anchored</strong>.
        </p>
        <p style={{ color: C.muted, lineHeight: 1.7, marginBottom: 0 }}>
          Giống như Bắc Mỹ nhìn "Asian market" như một khối — thực tế SG, HK, TW, PH mỗi thị trường có persona riêng.
          PO cần zoom vào PH với data-của-PH, không extrapolate từ SEA aggregate.
        </p>
      </Card>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16 }}>
        <KPI label="PH inbound VN 2024" value="~175K" sub="+95% YoY từ ~90K (2023)" />
        <KPI label="2025 YTD projected" value="~210K" sub="+20% YoY; PAL route expansion" />
        <KPI label="2027 outlook" value="~280K" sub="~+15%/năm theo DOT + PAL" />
        <KPI label="Oct–Mar share" value="~55%" sub="Dominant peak window" />
        <KPI label="PH cruise pax Oct–Mar" value="~10–12K" sub="SG-homeport RCL + Princess 2024/25" />
        <KPI label="Top-3 persona mix" value="P3+P5+P6" sub="~70% of PH pax" />
      </div>

      {/* Volume Chart */}
      <Card>
        <H2>PH Outbound → VN Volume (K pax)</H2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={volumeData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="year" tick={{ fill: C.muted, fontSize: 13 }} />
            <YAxis tick={{ fill: C.muted, fontSize: 13 }} unit="K" />
            <Tooltip
              contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8 }}
              formatter={(v) => [`${v}K pax`]}
            />
            <Bar dataKey="pax" radius={[4, 4, 0, 0]}>
              {volumeData.map((_, i) => (
                <Cell key={i} fill={i === 3 ? C.muted : C.accent} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 8, marginTop: 12 }}>
          {[
            { label: "Visa reciprocity", desc: "PH + VN mutual 21-day visa-free extended" },
            { label: "PAL direct routes", desc: "Manila–Hanoi, Manila–HCM, Manila–Đà Nẵng daily/5×/week" },
            { label: "Cebu Pacific", desc: "Manila–Hanoi, Manila–HCM — low-cost option" },
            { label: "VN as Bali-alternative", desc: "Bali pricing +30% 2023→2024; PH trade-down to VN" },
          ].map((d, i) => (
            <div key={i} style={{ background: C.bg, borderRadius: 8, padding: "10px 14px" }}>
              <div style={{ color: C.accent, fontWeight: 700, fontSize: 13 }}>{d.label}</div>
              <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>{d.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Persona Mix */}
      <Card>
        <H2>PH Persona Mix (vs §2 personas)</H2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: C.bg }}>
                {["Persona", "PH share (est.)", "Notes"].map((h) => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", color: C.muted, fontWeight: 600, borderBottom: `1px solid ${C.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {personaMix.map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "10px 12px", color: C.text, fontWeight: row.share >= 20 ? 700 : 400 }}>{row.persona}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{
                        width: `${row.share * 3}px`, height: 16, borderRadius: 4,
                        background: personaMixColors[i], minWidth: 20
                      }} />
                      <span style={{ color: row.share >= 20 ? C.accent : C.text, fontWeight: row.share >= 20 ? 700 : 400 }}>
                        ~{row.share}%
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "10px 12px", color: C.muted }}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{
          background: C.accent + "18", border: `1px solid ${C.accent}`, borderRadius: 8,
          padding: "12px 16px", marginTop: 16, color: C.text, fontSize: 13
        }}>
          <strong>Key insight:</strong> PH persona mix heavily <strong>P3 + P5 + P6 (~70%)</strong> — very different from
          US/UK where P1 + P2 + P7 dominate. PH archetype variant MUST target P3/P5/P6 triangle.
        </div>
      </Card>

      {/* OTA + Channel */}
      <Card>
        <H2>PH Dominant OTAs + Channel Behaviour</H2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: C.bg }}>
                {["Channel", "PH penetration", "Notes"].map((h) => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", color: C.muted, fontWeight: 600, borderBottom: `1px solid ${C.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {otaData.map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: row.penetration === "Dominant" || row.penetration === "CRITICAL" ? C.accent + "10" : "transparent" }}>
                  <td style={{ padding: "10px 12px", color: C.text, fontWeight: 700 }}>{row.channel}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{
                      background: row.penetration === "Dominant" ? C.green + "30" : row.penetration === "CRITICAL" ? C.orange + "30" : C.bg,
                      color: row.penetration === "Dominant" ? C.green : row.penetration === "CRITICAL" ? C.orange : C.muted,
                      borderRadius: 4, padding: "2px 8px", fontSize: 12, fontWeight: 600
                    }}>{row.penetration}</span>
                  </td>
                  <td style={{ padding: "10px 12px", color: C.muted }}>{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Cruise Pax */}
      <Card>
        <H2>PH Cruise Pax (Oct–Mar 2024/25)</H2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
          <div>
            <p style={{ color: C.text, lineHeight: 1.7, marginBottom: 8 }}>
              PH cruise pax growth driven by <strong>Royal Caribbean Spectrum of the Seas (SG homeport) +
              Ovation of the Seas Asia seasonal</strong>.
            </p>
            <ul style={{ color: C.muted, fontSize: 13, lineHeight: 1.8, paddingLeft: 20, marginBottom: 0 }}>
              <li>Spectrum + Ovation ~5,000 pax/sailing × ~30 sailings × ~5% PH nationality = <strong>~7.5K PH cruise pax VN-port</strong></li>
              <li>Princess Diamond/Sapphire ~3% PH = <strong>~3K</strong></li>
              <li><strong>Total ~10–12K PH cruise pax Oct–Mar 2024/25</strong> (rising to ~15K 2026/27 with Spectrum SG year-round)</li>
            </ul>
          </div>
          <div style={{ background: C.bg, borderRadius: 8, padding: 16 }}>
            <div style={{ color: C.accent, fontWeight: 700, fontSize: 13, marginBottom: 8 }}>→ Implication for product</div>
            <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7, marginBottom: 0 }}>
              PH cruise pax = small but growing segment. 1 archetype variant should address PH cruise-shore-ex combo
              (e.g. SG-homeport cruise → HL shore-ex package promoted on Klook PH with peso pricing).
            </p>
          </div>
        </div>
      </Card>

      {/* Localization Levers */}
      <Card>
        <H2>PH Localization Levers (§7 Archetype Design)</H2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 12 }}>
          {localizationLevers.map((row, i) => (
            <div key={i} style={{ background: C.bg, borderRadius: 8, padding: "12px 16px", borderLeft: `3px solid ${C.accent}` }}>
              <div style={{ color: C.accent, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{row.lever}</div>
              <div style={{ color: C.text, fontSize: 13, lineHeight: 1.6 }}>{row.what}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* A5 PH Barkada Variant */}
      <Card>
        <H2>Target Archetype: A5 "PH Barkada Gen-Z Group"</H2>
        <div style={{ background: C.accent + "10", borderRadius: 8, padding: 16, marginBottom: 16, border: `1px solid ${C.accent}` }}>
          <div style={{ color: C.accent, fontWeight: 700, marginBottom: 4 }}>
            "6 tụi bạn, 7 ngày, 1 giá cố định, từng check-in TikTok-ready."
          </div>
          <div style={{ color: C.muted, fontSize: 13 }}>— A5 PH-tailored variant (satisfies NAC C9: PH stand-alone ≥2 pages)</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12 }}>
          {[
            { label: "Target", value: "P5 Gen-Z + P3 Beach mix" },
            { label: "Peak window", value: "Oct shoulder + Feb–Mar + PH Xmas Dec 16–Jan 6" },
            { label: "Route", value: "HCM 2N + Đà Nẵng 2N + Phú Quốc 3N  OR  HN 2N + Hà Giang 2N + Ninh Bình 1N" },
            { label: "Price band", value: "₱35,000–₱55,000/pax ($600–$950)" },
            { label: "Channel", value: "Klook PH exclusive 10-day flash promo + FB Messenger + Instagram DM close" },
            { label: "Group structure", value: "Flat price per 6-person group — not per-pax" },
          ].map((item, i) => (
            <div key={i} style={{ background: C.bg, borderRadius: 8, padding: "12px 14px" }}>
              <div style={{ color: C.muted, fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{item.label}</div>
              <div style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Gaps */}
      <Card>
        <H2>Gaps Flagged (§6)</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            "Verified PH 2024 full-year + 2025 Q1 outbound-to-VN number — waiting live VNAT + PH DOT release",
            "PH Gen-Z share of total VN outbound — derived, not primary-surveyed",
            "Exact Klook PH VN-tour category share of PH outbound — platform-opaque; industry estimate",
          ].map((gap, i) => (
            <div key={i} style={{ background: C.bg, borderRadius: 8, padding: "10px 14px", borderLeft: `3px solid ${C.orange}`, color: C.muted, fontSize: 13 }}>
              <span style={{ color: C.orange, fontWeight: 700 }}>[gap] </span>{gap}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
