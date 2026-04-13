import { C } from "../../data/colors.js";
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import StatStrip from "../../components/StatStrip.jsx";

// ─── Data ────────────────────────────────────────────────────────────────────

const HERO_STATS = [
  { value: "$1.5–3.5M",   label: "GMV Cafe Workshop HN",    note: "bottom-up · ±30%" },
  { value: "$580–680M",   label: "GMV Cruise Vịnh Hạ Long", note: "Sở DL Quảng Ninh 2025" },
  { value: "28–38%",      label: "CAGR Cafe 2026–28",       note: "base case" },
  { value: "12–15%",      label: "CAGR Cruise 2026–28",     note: "Euromonitor" },
  { value: "$80–140K",    label: "Cross-sell Bundle 2026",  note: "incremental base case" },
  { value: "$4.8–6.6M",  label: "Revenue tổng 2028 base",  note: "subjective prob. 50–55%" },
];

const PROJECTION = [
  { year: "2025",  bear: 2.1,  base: 2.6,  bull: null },
  { year: "2026",  bear: 2.5,  base: 3.4,  bull: 4.2  },
  { year: "2027",  bear: 3.0,  base: 4.6,  bull: 6.1  },
  { year: "2028",  bear: 3.2,  base: 5.7,  bull: 8.4  },
];

const FINDINGS = [
  { icon: "☕", title: "Cafe Workshop HN",       text: "LBR Tier 1 với on-site roastery + vegan workshop — moat khó copy trong 18–24 tháng." },
  { icon: "🚢", title: "Cruise Hạ Long",         text: "Must-do cho 70–80% khách quốc tế đến HN. GMV gấp 200–400× cafe nhưng CAGR thấp hơn." },
  { icon: "🇰🇷", title: "Korean = Top Segment",  text: "22–28% cafe · 18–22% cruise. Chung top nationality → cross-sell tiềm năng cao nhất." },
  { icon: "🔗", title: "Cross-sell chưa ai làm", text: "70–80% overlap khách HN→HL nhưng 0 operator hiện khai thác bài bản." },
  { icon: "📊", title: "OTA = Sword & Shield",   text: "65–75% bookings qua OTA — discovery traffic vs. 18–27% commission ăn mòn margin." },
  { icon: "💰", title: "Revenue 2028 Bear",      text: "$2.8–3.6M | 20–25% margin. Driver: Korean visa tightening + OTA commission tăng." },
  { icon: "🚀", title: "Revenue 2028 Bull",      text: "$7.2–9.5M | 42–50% margin. Driver: Korean+Chinese recovery + viral Premium tier." },
  { icon: "⚠️", title: "OTA Dependency Risk",    text: "Giảm từ 65–75% về 45–55% trong 12 tháng — nhưng giữ ≥40% để không mất discovery." },
  { icon: "👨‍🍳", title: "Host Turnover Risk",    text: "Lin/Luka/Giang là asset — nhưng ngành F&B experience có turnover 25–35%/năm." },
  { icon: "📈", title: "Cafe CAGR 28–38%",       text: "Fastest-growing niche. E-Conomy SEA proxy + bottom-up booking velocity." },
  { icon: "🏆", title: "LBR vs Coffee Station",  text: "Station: Phố Cổ location + brand. LBR: nội dung sâu hơn + vegan + roastery." },
  { icon: "🗺️", title: "Priority 2026",          text: "① Coffee→Cruise bundle ② Giảm OTA 65→45% ③ Premium cruise tier để bật margin." },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionTitle({ children }) {
  return (
    <div style={{
      fontSize: 13, fontWeight: 800, color: C.accent,
      textTransform: "uppercase", letterSpacing: 1.5,
      borderBottom: `1px solid ${C.border}`,
      paddingBottom: 8, marginBottom: 14, marginTop: 28,
    }}>
      {children}
    </div>
  );
}

function FindingCard({ icon, title, text }) {
  return (
    <div style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: "12px 14px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{title}</span>
      </div>
      <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.65 }}>{text}</div>
    </div>
  );
}

const CHART_TOOLTIP_STYLE = {
  background: "#0b1222",
  border: `1px solid ${C.border}`,
  borderRadius: 8,
  fontSize: 12,
  color: C.text,
};

function ProjectionChart() {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 8px 8px" }}>
      <ResponsiveContainer width="100%" height={240}>
        <ComposedChart data={PROJECTION} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
          <XAxis dataKey="year" tick={{ fill: C.muted, fontSize: 11 }} />
          <YAxis
            tickFormatter={v => `$${v}M`}
            tick={{ fill: C.muted, fontSize: 11 }}
            domain={[0, 10]}
          />
          <Tooltip
            contentStyle={CHART_TOOLTIP_STYLE}
            formatter={(v, name) => [`$${v}M`, name]}
          />
          <Legend wrapperStyle={{ fontSize: 11, color: C.muted }} />
          <Bar dataKey="bear" name="Bear case" fill={C.red}    opacity={0.75} radius={[3,3,0,0]} />
          <Bar dataKey="base" name="Base case" fill={C.accent} opacity={0.85} radius={[3,3,0,0]} />
          <Line dataKey="bull" name="Bull case" stroke={C.green} strokeWidth={2} dot={{ r: 4, fill: C.green }} strokeDasharray="5 3" connectNulls />
        </ComposedChart>
      </ResponsiveContainer>
      <div style={{ fontSize: 10, color: C.muted, textAlign: "center", marginTop: 6 }}>
        Revenue tổng (Cafe + Cruise + Cross-sell) · $M · 2025–2028
      </div>
    </div>
  );
}

function ConfidenceTable() {
  const rows = [
    { claim: "Vietnam inbound 2025",       value: "17.5–18M lượt",    confidence: "High",    color: C.green },
    { claim: "GMV Cruise Hạ Long 2025",    value: "$580–680M",        confidence: "Med-High",color: C.cyan },
    { claim: "GMV Cafe Workshop HN 2025",  value: "$1.5–3.5M",        confidence: "Low-Med", color: C.orange },
    { claim: "Korean share cafe / cruise", value: "22–28% / 18–22%",  confidence: "Medium",  color: C.cyan },
    { claim: "OTA commission cruise",      value: "18–27%",           confidence: "Med-High",color: C.cyan },
    { claim: "Cross-sell take rate",       value: "15–18%",           confidence: "Low",     color: C.red },
    { claim: "Revenue 2028 base",          value: "$4.8–6.6M",        confidence: "Low-Med", color: C.orange },
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, background: C.card, borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 12 }}>
        <thead>
          <tr>
            {["Claim", "Số", "Confidence"].map(h => (
              <th key={h} style={{ padding: "9px 12px", textAlign: "left", color: C.muted, fontWeight: 700, background: "#1a2744", borderBottom: `1px solid ${C.border}`, fontSize: 11 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td style={{ padding: "8px 12px", color: C.text, borderBottom: `1px solid ${C.border}` }}>{r.claim}</td>
              <td style={{ padding: "8px 12px", color: C.accent, fontWeight: 700, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap" }}>{r.value}</td>
              <td style={{ padding: "8px 12px", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ background: `${r.color}22`, color: r.color, border: `1px solid ${r.color}50`, borderRadius: 4, padding: "2px 7px", fontSize: 11, fontWeight: 700 }}>
                  {r.confidence}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

export default function Executive() {
  return (
    <div>
      {/* Hero KPI strip */}
      <StatStrip items={HERO_STATS} />

      {/* Financial Projection */}
      <SectionTitle>📊 Financial Projection — Bear / Base / Bull (2025–2028)</SectionTitle>
      <ProjectionChart />

      {/* Confidence rating */}
      <SectionTitle>🎯 Confidence Rating — Top Headlines</SectionTitle>
      <ConfidenceTable />

      {/* 12 Key Findings */}
      <SectionTitle>🔍 Top 12 Key Findings</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
        {FINDINGS.map((f, i) => <FindingCard key={i} {...f} />)}
      </div>
    </div>
  );
}
