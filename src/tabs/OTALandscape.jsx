import { C } from "../data/colors.js";
import KPI from "../components/KPI.jsx";
import H2 from "../components/H2.jsx";
import Badge from "../components/Badge.jsx";

const otaData = [
  { name: "Viator", traffic: "25M", commission: "25-30%", personas: "P1, P2, P5, P6", highlight: true },
  { name: "Booking.com", traffic: "550M", commission: "15-20%", personas: "P6, P1" },
  { name: "Klook", traffic: "30M", commission: "15-25%", personas: "P3, P5" },
  { name: "GetYourGuide", traffic: "20M", commission: "20-25%", personas: "P2, P5" },
  { name: "TripAdvisor", traffic: "150M", commission: "Phí listing", personas: "P1, P2" },
  { name: "Agoda", traffic: "80M", commission: "15-20%", personas: "P3, P4" },
  { name: "Expedia", traffic: "95M", commission: "15-25%", personas: "P1, P6" },
  { name: "TourRadar", traffic: "5M", commission: "20-30%", personas: "P2, P7" },
  { name: "Shore Excursions Group", traffic: "1M", commission: "25-35%", personas: "P1, P7" },
  { name: "Halongbaycruises.com", traffic: "500K", commission: "20-25%", personas: "P7, P2" },
];

const personas = ["P1 NA", "P2 UK", "P3 AU", "P4 Nomad", "P5 GenZ", "P6 Family", "P7 Luxury"];
const channels = ["Booking", "Viator", "GYG", "Klook", "TA", "TourRadar", "ShoreEx", "HLBay"];
const heatmapData = [
  ["M", "H", "M", "L", "H", "M", "H", "L"],
  ["M", "H", "H", "L", "H", "H", "M", "M"],
  ["M", "M", "M", "H", "M", "L", "L", "M"],
  ["M", "L", "L", "M", "L", "L", "L", "M"],
  ["L", "H", "H", "H", "M", "L", "L", "M"],
  ["H", "H", "M", "M", "H", "L", "M", "M"],
  ["L", "M", "L", "L", "M", "M", "M", "H"],
];

const getCellStyle = (value) => {
  switch (value) {
    case "H": return { background: C.green + "25", color: C.green, fontWeight: 700 };
    case "M": return { background: C.accent + "20", color: C.accent, fontWeight: 500 };
    case "L": return { background: C.border, color: C.muted };
    default: return {};
  }
};

export default function OTALandscapeTab() {
  return (
    <>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
        <KPI icon="📊" label="Số OTA chính" value="10" sub="Bao phủ đa dạng phân khúc" />
        <KPI icon="🔍" label="Kênh discovery top" value="Viator, TripAdvisor" sub="Cho khách Âu-Mỹ" />
        <KPI icon="🌏" label="Kênh APAC bản địa" value="Klook" sub="Thống trị vé tham quan" />
        <KPI icon="💰" label="Hoa hồng phổ biến" value="15-30%" sub="Tùy nền tảng và dịch vụ" />
      </div>

      <H2>Tổng quan các nền tảng OTA</H2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, background: C.card, borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}`, fontSize: 11 }}>
          <thead>
            <tr style={{ background: C.bg }}>
              {["Nền tảng", "Traffic (UV/tháng)", "Hoa hồng", "Persona phù hợp (Top 2)"].map((h) => (
                <th key={h} style={{ padding: "8px 10px", textAlign: "left", color: C.muted, fontWeight: 600, borderBottom: `1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {otaData.map((ota, i) => (
              <tr key={i} style={{ background: ota.highlight ? C.accent + "15" : "transparent", borderBottom: i < otaData.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <td style={{ padding: "8px 10px", fontWeight: 700, color: C.text }}>{ota.name}</td>
                <td style={{ padding: "8px 10px", color: C.muted }}>{ota.traffic}</td>
                <td style={{ padding: "8px 10px" }}><Badge color={ota.highlight ? C.accent : C.green}>{ota.commission}</Badge></td>
                <td style={{ padding: "8px 10px", fontWeight: 600 }}>{ota.personas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Heatmap mức độ phù hợp Kênh-Persona</H2>
      <div style={{ display: "grid", gridTemplateColumns: "100px repeat(8, 1fr)", gap: "2px", background: C.bg, padding: "2px", borderRadius: 8, border: `1px solid ${C.border}` }}>
        {/* Header */}
        <div />
        {channels.map((ch, i) => <div key={i} style={{ fontSize: 10, fontWeight: 600, color: C.muted, textAlign: "center", padding: "6px 0" }}>{ch}</div>)}

        {/* Rows */}
        {personas.map((p, r) => (
          <>
            <div key={p} style={{ fontSize: 10, fontWeight: 700, color: C.text, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 8, textAlign: "right" }}>{p}</div>
            {heatmapData[r].map((val, c) => (
              <div key={`${r}-${c}`} style={{ ...getCellStyle(val), display: "flex", justifyContent: "center", alignItems: "center", height: 32, borderRadius: 4, fontSize: 12 }}>
                {val}
              </div>
            ))}
          </>
        ))}
      </div>
       <div style={{display: 'flex', gap: 20, fontSize: 10, color: C.muted, marginTop: 8, justifyContent: 'flex-end'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 4}}><div style={{width: 10, height: 10, background: C.green, borderRadius: 2}}></div>H: Rất phù hợp</div>
        <div style={{display: 'flex', alignItems: 'center', gap: 4}}><div style={{width: 10, height: 10, background: C.accent, borderRadius: 2}}></div>M: Phù hợp</div>
        <div style={{display: 'flex', alignItems: 'center', gap: 4}}><div style={{width: 10, height: 10, background: C.muted, borderRadius: 2}}></div>L: Ít phù hợp</div>
      </div>
    </>
  );
}
