import KPI from "../components/KPI.jsx";
import H2 from "../components/H2.jsx";
import Card from "../components/Card.jsx";
import Tip from "../components/Tip.jsx";
import { C } from "../data/colors.js";
import { fmt } from "../utils.js";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";

export default function MarketSizing() {
  const marketData = [
    { name: "SG", value: 880000, yoy: "+28%", peak: "35%", color: C.china },
    { name: "US", value: 780000, yoy: "+25%", peak: "60%", color: C.purple },
    { name: "AU", value: 490000, yoy: "+22%", peak: "40%", color: C.green },
    { name: "IN", value: 500000, yoy: "+98%", peak: "50%", color: C.india },
    { name: "UK", value: 300000, yoy: "+18%", peak: "55%", color: C.orange },
    { name: "PH", value: 175000, yoy: "+95%", peak: "55%", color: C.philippines },
    { name: "CA", value: 180000, yoy: "+20%", peak: "60%", color: C.cyan },
    { name: "NZ", value: 80000, yoy: "+15%", peak: "45%", color: C.pink },
    { name: "IE", value: 35000, yoy: "+15%", peak: "55%", color: C.accent },
    { name: "ZA", value: 25000, yoy: "+10%", peak: "50%", color: C.red },
  ];

  const marketTable = [
    { rank: 1, market: "United States", flag: "🇺🇸", inbound: "~780K", yoy: "+25%", peak: "~60%", adr: "$120–180", los: "10–14N", regions: "HN · HCM · Hội An · Hạ Long · Nha Trang", trend: "Tăng — đường bay JFK-SGN trực tiếp 2023" },
    { rank: 2, market: "United Kingdom", flag: "🇬🇧", inbound: "~300K", yoy: "+18%", peak: "~55%", adr: "$100–150", los: "10–15N", regions: "HN · Hội An · Hạ Long · HCM · Sa Pa", trend: "Ổn định; Feb half-term = spike" },
    { rank: 3, market: "Canada", flag: "🇨🇦", inbound: "~180K", yoy: "+20%", peak: "~60%", adr: "$110–160", los: "10–14N", regions: "HN · Hội An · Hạ Long", trend: "Winter-escape tăng tốc" },
    { rank: 4, market: "Australia", flag: "🇦🇺", inbound: "~490K", yoy: "+22%", peak: "~40%", adr: "$100–150", los: "8–12N", regions: "HCM · Hội An · Nha Trang · Hạ Long · Phú Quốc", trend: "Oct + Feb–Mar peaks" },
    { rank: 5, market: "New Zealand", flag: "🇳🇿", inbound: "~80K", yoy: "+15%", peak: "~45%", adr: "$100–140", los: "10–14N", regions: "HCM · HN · Hội An", trend: "Shoulder Oct + Mar" },
    { rank: 6, market: "Ireland", flag: "🇮🇪", inbound: "~35K", yoy: "+15%", peak: "~55%", adr: "$100–150", los: "12–16N", regions: "HN · Hội An · Hạ Long", trend: "Xmas/NY + Feb spike" },
    { rank: 7, market: "Singapore", flag: "🇸🇬", inbound: "~880K", yoy: "+28%", peak: "~35%", adr: "$90–140", los: "4–7N", regions: "HCM · Phú Quốc · Đà Nẵng · Hạ Long", trend: "Short-haul; inter-term Nov + Mar" },
    { rank: 8, market: "India", flag: "🇮🇳", inbound: "~500K", yoy: "+98%", peak: "~50%", adr: "$80–130", los: "6–10N", regions: "HN · Phú Quốc · Đà Nẵng · HCM · Hạ Long", trend: "Tăng mạnh — Dec–Feb + Diwali" },
    { rank: 9, market: "South Africa", flag: "🇿🇦", inbound: "~25K", yoy: "+10%", peak: "~50%", adr: "$90–130", los: "12–18N", regions: "HN · Hội An · Hạ Long · HCM", trend: "Volume nhỏ, LOS dài" },
    { rank: 10, market: "Philippines", flag: "🇵🇭", inbound: "~175K", yoy: "+95%", peak: "~55%", adr: "$80–120", los: "5–8N", regions: "HCM · HN · Đà Nẵng · Phú Quốc · Hạ Long", trend: "Tăng mạnh — Dec–Feb + PH summer Oct" },
  ];

  const cruisePortCalls = [
    { port: "Hạ Long", oct: 8, nov: 12, dec: 18, jan: 18, feb: 15, mar: 12, total: 83, pax: "180K–220K", capture: "65–80%", color: C.accent },
    { port: "Phú Mỹ (HCM gateway)", oct: 10, nov: 14, dec: 16, jan: 16, feb: 14, mar: 12, total: 82, pax: "190K–230K", capture: "55–70%", color: C.orange },
    { port: "Chan May (Huế/Hội An)", oct: 6, nov: 10, dec: 14, jan: 12, feb: 12, mar: 10, total: 64, pax: "130K–170K", capture: "75–95%", color: C.green },
    { port: "Nha Trang", oct: 4, nov: 6, dec: 8, jan: 8, feb: 7, mar: 6, total: 39, pax: "70K–100K", capture: "40–55%", color: C.purple },
  ];

  const cruisePaxNationality = [
    { nationality: "US", pct: "~35%", note: "Royal Caribbean, Princess, HAL, Celebrity Asia" },
    { nationality: "UK", pct: "~15%", note: "P&O, Cunard, Silversea" },
    { nationality: "AU", pct: "~15%", note: "P&O Australia, Princess AU" },
    { nationality: "SG", pct: "~8%", note: "RCL Spectrum/Ovation ex-SG homeport" },
    { nationality: "IN", pct: "~4%", note: "Costa + Norwegian SG cruises (rising)" },
    { nationality: "PH", pct: "~4%", note: "Spectrum ex-SG (rising)" },
    { nationality: "Khác", pct: "~19%", note: "Germany (~10%), others" },
  ];

  return (
    <>
      <H2>Tổng quan inbound VN 2024</H2>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        <KPI label="Khách QT đến VN" value="17.6M" sub="2024 (98% của 2019)" />
        <KPI label="Mục tiêu 2025" value="~20M" sub="VNAT outlook" />
        <KPI label="Philippines tăng" value="+95%" sub="2023→2024 YoY" />
        <KPI label="Ấn Độ tăng" value="+98%" sub="2023→2024 YoY" />
        <KPI label="Mỹ tăng" value="+25%" sub="2023→2024 YoY" />
      </div>

      <H2>10 Thị Trường Nguồn — Biểu Đồ Volume</H2>
      <Card>
        <ResponsiveContainer width="100%" height={380}>
          <BarChart layout="vertical" data={marketData} margin={{ top: 5, right: 80, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis type="number" tickFormatter={fmt} tick={{ fill: C.muted, fontSize: 10 }} />
            <YAxis type="category" dataKey="name" width={35} tick={{ fill: C.muted, fontSize: 11 }} />
            <Tooltip content={<Tip />} />
            <Bar dataKey="value" name="Lượng khách 2024" barSize={22} radius={[0, 6, 6, 0]}>
              {marketData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <H2>10 Thị Trường Nguồn — Bảng Chi Tiết</H2>
      <Card>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                {["#", "Thị trường", "Inbound 2024", "YoY", "Peak Oct–Mar", "ADR/đêm", "LOS", "Top sub-regions VN", "Xu hướng"].map((h, i) => (
                  <th key={i} style={{ textAlign: "left", padding: "8px 6px", color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.4, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {marketTable.map((row) => (
                <tr key={row.rank} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "8px 6px", color: C.muted, fontSize: 11 }}>{row.rank}</td>
                  <td style={{ padding: "8px 6px", color: C.text, fontWeight: 600, whiteSpace: "nowrap" }}>{row.flag} {row.market}</td>
                  <td style={{ padding: "8px 6px", color: C.accent, fontWeight: 700 }}>{row.inbound}</td>
                  <td style={{ padding: "8px 6px", color: row.yoy.includes("+9") ? C.green : C.orange, fontWeight: 600 }}>{row.yoy}</td>
                  <td style={{ padding: "8px 6px", color: C.text }}>{row.peak}</td>
                  <td style={{ padding: "8px 6px", color: C.muted }}>{row.adr}</td>
                  <td style={{ padding: "8px 6px", color: C.muted, whiteSpace: "nowrap" }}>{row.los}</td>
                  <td style={{ padding: "8px 6px", color: C.muted, fontSize: 10 }}>{row.regions}</td>
                  <td style={{ padding: "8px 6px", color: C.muted, fontSize: 10 }}>{row.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ color: C.muted, fontSize: 10, marginTop: 8, marginBottom: 0 }}>
          ADR = avg daily rate per pax · LOS = avg length of stay · Peak Oct–Mar = ước tính % volume mùa khô. Source: VNAT 2024 quarterly bulletins · Tourism Australia · STB Singapore · Ministry of Tourism India · PH DOT.
        </p>
      </Card>

      <H2>Read-across cho Archetype Design</H2>
      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
          {[
            { title: "Cruise-overlap candidates", desc: "US + UK + CA + AU drive Dec–Feb cruise-pax flow từ SG/HK homeports — feed P1 Winter Escape + P7 Luxury archetypes.", color: C.accent },
            { title: "Accelerating markets", desc: "IN + PH skew younger + shorter-LOS → feed P4 Digital Nomad, P5 Gen-Z, P6 Multigen archetype targets.", color: C.green },
            { title: "Stable long-haul", desc: "UK, IE, ZA skew premium + culture-seeker → feed P2 + P7.", color: C.orange },
            { title: "Short-haul rising", desc: "SG + IN + PH skew value-seeking + multi-generational → feed P6 + PH-tailored variant A5.", color: C.purple },
          ].map((item) => (
            <div key={item.title} style={{ padding: 12, background: C.card, borderRadius: 8, borderLeft: `3px solid ${item.color}` }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: item.color, marginBottom: 4 }}>{item.title}</div>
              <p style={{ color: C.muted, fontSize: 11, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      <H2>Cruise Port-Calls Oct–Mar 2024/25</H2>
      <Card>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                {["Cảng", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Tổng Oct–Mar", "~Pax/mùa", "Capture rate"].map((h, i) => (
                  <th key={i} style={{ textAlign: i === 0 ? "left" : "center", padding: "8px 6px", color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.4 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cruisePortCalls.map((row) => (
                <tr key={row.port} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "10px 6px", color: row.color, fontWeight: 700, fontSize: 12 }}>{row.port}</td>
                  {[row.oct, row.nov, row.dec, row.jan, row.feb, row.mar].map((v, i) => (
                    <td key={i} style={{ textAlign: "center", padding: "10px 6px", color: C.text, fontSize: 12 }}>{v}</td>
                  ))}
                  <td style={{ textAlign: "center", padding: "10px 6px", color: row.color, fontWeight: 800, fontSize: 14 }}>{row.total}</td>
                  <td style={{ textAlign: "center", padding: "10px 6px", color: C.muted, fontSize: 11 }}>{row.pax}</td>
                  <td style={{ textAlign: "center", padding: "10px 6px", color: C.green, fontWeight: 600, fontSize: 12 }}>{row.capture}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ color: C.muted, fontSize: 10, marginTop: 8, marginBottom: 0 }}>
          Source: cruisemapper.com/ports · cruisetimetables.com · CLIA Asia Cruise Report 2024. Port-call = 1 ship arrival. ±10% do schedule revisions.
        </p>
      </Card>

      <H2>Tổng Cruise Pax Oct–Mar 2024/25</H2>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        <KPI label="Total cruise pax VN" value="570K–720K" sub="Oct–Mar 2024/25 ước tính" />
        <KPI label="Hạ Long" value="180K–220K" sub="83 port-calls" />
        <KPI label="Phú Mỹ" value="190K–230K" sub="82 port-calls" />
        <KPI label="Chan May" value="130K–170K" sub="64 port-calls · capture cao nhất" />
      </div>

      <H2>Quốc tịch Cruise Pax tại VN (ước tính)</H2>
      <Card>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {cruisePaxNationality.map((item) => (
            <div key={item.nationality} style={{ padding: "8px 12px", background: C.card, borderRadius: 8, minWidth: 140 }}>
              <div style={{ fontWeight: 700, color: C.accent, fontSize: 13 }}>{item.nationality} {item.pct}</div>
              <div style={{ color: C.muted, fontSize: 10, marginTop: 2 }}>{item.note}</div>
            </div>
          ))}
        </div>
        <p style={{ color: C.muted, fontSize: 11, marginTop: 10, marginBottom: 0 }}>
          → 60%+ cruise pax đến từ US + UK + AU — validates P1 + P7 cruise-heavy personas và P6 multigen trên family-branded itineraries.
        </p>
      </Card>

      <H2>Các Cruise Lines tại VN Oct–Mar</H2>
      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
          <div style={{ padding: 12, background: C.card, borderRadius: 8 }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: C.text, marginBottom: 6 }}>Mass-market</div>
            <p style={{ color: C.muted, fontSize: 11, lineHeight: 1.6, margin: 0 }}>
              Royal Caribbean (Spectrum, Ovation — SG homeport) · Princess (Diamond, Sapphire) · Holland America (Noordam, Westerdam) · Celebrity (Solstice, Millennium) · Norwegian (Jewel, Spirit) · Costa
            </p>
          </div>
          <div style={{ padding: 12, background: C.card, borderRadius: 8 }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: C.text, marginBottom: 6 }}>Luxury / Expedition</div>
            <p style={{ color: C.muted, fontSize: 11, lineHeight: 1.6, margin: 0 }}>
              Silversea (Silver Shadow, Silver Muse) · Viking Ocean (Orion, Mars) · Regent Seven Seas (Explorer, Mariner) · Oceania (Regatta, Nautica) · Seabourn · Explora Journeys
            </p>
          </div>
          <div style={{ padding: 12, background: C.card, borderRadius: 8 }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: C.text, marginBottom: 6 }}>Hạ Long overnight (local)</div>
            <p style={{ color: C.muted, fontSize: 11, lineHeight: 1.6, margin: 0 }}>
              Paradise · Indochine · Heritage Line · Ambassador · Orchid · Bhaya — đây là direct competitor trong benchmark §4, KHÔNG cùng category với international cruise-ship shore-ex.
            </p>
          </div>
        </div>
      </Card>

      <H2>Gaps Cần Xác Nhận Thêm</H2>
      <Card>
        <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
          {[
            "[gap] Exact 2025 Q4 + 2026/27 port-call schedule per line — cần live cruisemapper/cruisetimetables pull",
            "[gap] Confirmed capture rate per port từ cruise-line official data — industry proxies only",
            "[gap] 2025 actual full-year pax count per VN port — VNAT publishes aggregate, not per-port",
            "[gap] CA, NZ, IE, ZA 2024 YoY live — hiện dùng training-data estimate ±10%",
          ].map((g, i) => (
            <li key={i} style={{ color: C.muted, fontSize: 11, lineHeight: 1.7, marginBottom: 2 }}>{g}</li>
          ))}
        </ul>
      </Card>
    </>
  );
}
