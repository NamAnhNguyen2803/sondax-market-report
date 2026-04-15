import H2 from "../components/H2.jsx";
import Card from "../components/Card.jsx";
import KPI from "../components/KPI.jsx";
import { C } from "../data/colors.js";

const retailOTAs = [
  { rank: 1, name: "Booking.com (Experiences beta + Hotels)", uv: "400–500M", commission: "15–18%", velocity: "Low (Experiences); High (Hotels)", format: "Thumbnail + review score", price: "$30–$200 day · $100–$500 multi-day", fit: "P1 M · P2 M · P3 M · P6 H · P7 L" },
  { rank: 2, name: "Expedia Group (Expedia + Hotels.com + Vrbo)", uv: "200–250M", commission: "20–25%", velocity: "Low (Activities underdeveloped VN)", format: "Package-bundle UI", price: "$50–$300", fit: "P1 M · P6 M · else L" },
  { rank: 3, name: "Viator (TripAdvisor-owned)", uv: "50–70M", commission: "25–30%", velocity: "High — top HN day-tour 500–2000 reviews", format: "Photo-heavy + review-dense", price: "$20–$150 day · $200–$2K multi-day", fit: "P1 H · P2 H · P5 H · P6 H · P7 M" },
  { rank: 4, name: "GetYourGuide (GYG)", uv: "30–40M", commission: "20–25%", velocity: "High EU; Mid VN", format: "Listicle + 'Insider' curation", price: "$25–$200 day · $300–$1.5K multi-day", fit: "P2 H · P5 H · P3 M · P1 M" },
  { rank: 5, name: "Klook", uv: "40–60M (APAC-heavy)", commission: "20–25%", velocity: "Highest APAC (SG, HK, TW, JP, PH, IN)", format: "App-first + member-pts + vouchers", price: "$15–$120 day · $150–$800 multi-day", fit: "P3 H · P5 H · PH H · P6 M · P4 M" },
  { rank: 6, name: "Agoda (Booking Hold.)", uv: "80–100M (APAC-heavy)", commission: "15–20%", velocity: "Mid (accom-dominant)", format: "Hotel-first UI", price: "Hotel; activities add-on $20–$100", fit: "P4 H · P5 M · P3 M · rest L" },
  { rank: 7, name: "TripAdvisor (direct + review layer)", uv: "450M (world's largest)", commission: "25–30% (Viator-powered)", velocity: "Extremely high — ranking effect = discovery", format: "Review-centric + '#1 Thing To Do'", price: "$20–$150 day · $150–$2K multi-day", fit: "P1 H · P2 H · P7 M · P6 H · P5 M" },
  { rank: 8, name: "TourRadar", uv: "2–4M", commission: "20–25%", velocity: "Mid (multi-day niche)", format: "Comparison grid multi-day", price: "$600–$4K multi-day", fit: "P2 H · P1 M · P7 M · else L" },
  { rank: 9, name: "Intrepid Travel marketplace", uv: "2–3M", commission: "N/A (operator-own) hoặc ~15–20% partner", velocity: "Mid", format: "Brand-led content", price: "$1K–$3K multi-day", fit: "P2 H · P3 M · P6 M" },
  { rank: 10, name: "G Adventures marketplace", uv: "2–3M", commission: "N/A hoặc ~15–20% partner", velocity: "Mid", format: "Brand-led 'small-group'", price: "$1K–$3K multi-day", fit: "P2 H · P5 M · P3 M" },
];

const cruiseLines = [
  { name: "Royal Caribbean (Spectrum/Ovation ex-SG)", vnPorts: "HL, Phú Mỹ", path: "RFQ → vetting 6–9mo → shore-ex catalog", commission: "Net-rate 30–60% markup", exclusivity: "Non-exclusive; rotation control" },
  { name: "Princess Cruises (Diamond, Sapphire, Grand)", vnPorts: "HL, Phú Mỹ, Chan May, Nha Trang", path: "'Discoveries' program", commission: "Net-rate 30–50% markup", exclusivity: "Non-exclusive" },
  { name: "Holland America (Noordam, Westerdam)", vnPorts: "HL, Chan May, Phú Mỹ", path: "Approved-vendor + curation", commission: "Net-rate", exclusivity: "Non-exclusive" },
  { name: "Celebrity Cruises (Solstice, Millennium)", vnPorts: "HL, Phú Mỹ", path: "Similar", commission: "Net-rate", exclusivity: "Non-exclusive" },
  { name: "Silversea (Silver Shadow, Silver Muse)", vnPorts: "Cả 4 cảng", path: "Curated-partner (ít operators)", commission: "Net-rate premium pricing", exclusivity: "Semi-exclusive — 1–2 partner/port" },
  { name: "Viking Ocean (Orion, Mars)", vnPorts: "HL, Phú Mỹ", path: "'Included' shore-ex + premium option", commission: "Line pays operator bulk", exclusivity: "Semi-exclusive" },
  { name: "Regent Seven Seas (Explorer, Mariner)", vnPorts: "Cả 4 cảng", path: "All-inclusive shore-ex (pax $0)", commission: "Line pays annual contract", exclusivity: "Semi-exclusive" },
  { name: "Oceania (Regatta, Nautica)", vnPorts: "HL, Phú Mỹ", path: "Choice + OceaniaChoice", commission: "Net-rate", exclusivity: "Non-exclusive" },
  { name: "Norwegian (Jewel, Spirit Asia)", vnPorts: "Phú Mỹ, HL", path: "Standard approved-vendor", commission: "Net-rate", exclusivity: "Non-exclusive" },
];

const shorexAggregators = [
  { name: "ShoreExcursionsGroup.com", traffic: "500K–1M", commission: "20–25%", velocity: "Mid (~50–200 review/tour)", niche: "Largest cruise-ex; US/UK market" },
  { name: "ShoreTrips.com", traffic: "200–400K", commission: "20–25%", velocity: "Mid", niche: "Boutique cruise-ex, premium-skew" },
  { name: "Viator Cruises (vertical)", traffic: "50M Viator", commission: "25–30%", velocity: "High (Viator pool)", niche: "Largest OTA-cruise hybrid" },
  { name: "TourRadar cruise add-ons", traffic: "2–4M", commission: "20–25%", velocity: "Mid", niche: "Multi-day + cruise combo" },
  { name: "ShoreExcursioneer.com", traffic: "100–200K", commission: "20–25%", velocity: "Low–Mid", niche: "US cruise-focused" },
];

const heatmap = [
  { ch: "1. Booking.com", p1: "M", p2: "M", p3: "M", p4: "M", p5: "L", p6: "H", p7: "L" },
  { ch: "2. Expedia", p1: "M", p2: "L", p3: "L", p4: "L", p5: "L", p6: "M", p7: "L" },
  { ch: "3. Viator", p1: "H", p2: "H", p3: "M", p4: "L", p5: "H", p6: "H", p7: "M" },
  { ch: "4. GYG", p1: "M", p2: "H", p3: "M", p4: "L", p5: "H", p6: "M", p7: "L" },
  { ch: "5. Klook", p1: "L", p2: "L", p3: "H", p4: "M", p5: "H", p6: "M", p7: "L" },
  { ch: "6. Agoda", p1: "L", p2: "L", p3: "M", p4: "H", p5: "M", p6: "M", p7: "L" },
  { ch: "7. TripAdvisor", p1: "H", p2: "H", p3: "M", p4: "L", p5: "M", p6: "H", p7: "M" },
  { ch: "8. TourRadar", p1: "M", p2: "H", p3: "L", p4: "L", p5: "L", p6: "L", p7: "M" },
  { ch: "9. Intrepid", p1: "L", p2: "H", p3: "M", p4: "L", p5: "L", p6: "M", p7: "L" },
  { ch: "10. G Adventures", p1: "L", p2: "H", p3: "M", p4: "L", p5: "M", p6: "L", p7: "L" },
  { ch: "11. RCL/Princess shore-ex", p1: "H", p2: "M", p3: "L", p4: "L", p5: "L", p6: "M", p7: "M" },
  { ch: "12. Silversea/Viking/Regent", p1: "H", p2: "M", p3: "L", p4: "L", p5: "L", p6: "L", p7: "H" },
  { ch: "13. ShoreExGroup / ShoreTrips", p1: "H", p2: "M", p3: "L", p4: "L", p5: "L", p6: "L", p7: "M" },
  { ch: "14. Viator Cruises", p1: "H", p2: "M", p3: "L", p4: "L", p5: "L", p6: "M", p7: "M" },
  { ch: "15. Halongbay.com.vn / Bookyourtour", p1: "L", p2: "M", p3: "M", p4: "M", p5: "M", p6: "M", p7: "H" },
];

const cellColor = { H: C.green, M: C.orange, L: C.muted };

export default function OTALandscape() {
  return (
    <>
      <H2>Pain → Analogy</H2>
      <Card>
        <p style={{ color: C.text, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          PO đang đứng trước <strong style={{ color: C.accent }}>10 retail OTA + 9 cruise lines + 5 shore-ex aggregators</strong> — không biết channel nào fit persona nào. Giống chủ nhà hàng phải chọn giữa Grab Food, Shopee Food, Be Food, GoFood — ra menu sai chỗ = bỏ commission phí oan.
        </p>
      </Card>

      <H2>Key KPIs</H2>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        <KPI label="Retail OTAs" value="10" sub="Platforms profiled" />
        <KPI label="Cruise lines" value="9" sub="Shore-ex programs" />
        <KPI label="Shore-ex aggregators" value="5" sub="Cruise-ex marketplace" />
        <KPI label="Heatmap cells" value="105" sub="7 personas × 15 channels" />
      </div>

      <H2>10 Retail OTAs — Full Profile</H2>
      <Card>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                {["#", "Platform", "Traffic UV/mo", "Commission VN", "Review velocity", "Format", "Price band", "Persona fit (H/M/L)"].map((h, i) => (
                  <th key={i} style={{ textAlign: "left", padding: "8px 6px", color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.4, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {retailOTAs.map((o) => (
                <tr key={o.rank} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "8px 6px", color: C.muted }}>{o.rank}</td>
                  <td style={{ padding: "8px 6px", color: C.text, fontWeight: 700, fontSize: 11 }}>{o.name}</td>
                  <td style={{ padding: "8px 6px", color: C.accent, fontWeight: 600 }}>{o.uv}</td>
                  <td style={{ padding: "8px 6px", color: C.orange, fontWeight: 600 }}>{o.commission}</td>
                  <td style={{ padding: "8px 6px", color: C.muted }}>{o.velocity}</td>
                  <td style={{ padding: "8px 6px", color: C.muted }}>{o.format}</td>
                  <td style={{ padding: "8px 6px", color: C.green, fontWeight: 600 }}>{o.price}</td>
                  <td style={{ padding: "8px 6px", color: C.text }}>{o.fit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ color: C.muted, fontSize: 10, marginTop: 8, marginBottom: 0 }}>
          <strong>Ghi chú:</strong> UV = khách truy cập hàng tháng · <strong>Persona fit (H/M/L):</strong> Mức độ phù hợp với từng chân dung khách (High/Medium/Low) dựa trên lưu lượng khách + mức phí + tốc độ đánh giá. Source: SimilarWeb Q4 2024, Booking Holdings 2024 10-K, TripAdvisor Q3 2024, Viator/GYG/Klook Partner docs.
        </p>
      </Card>

      <H2>Key Insights for Archetype Design</H2>
      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 10 }}>
          {[
            { title: "Viator + TripAdvisor = discovery duopoly", desc: "Cho US/UK retail persona (P1, P2, P7 mid-tier). Top Hanoi day-tour review ranking = 70% traffic pull.", color: C.accent },
            { title: "Klook = APAC native", desc: "Dominant SG, HK, PH, IN audience. P3 AU/NZ và P5 SG/PH skew Klook. Mọi archetype Asia-origin + PH priority phải list Klook.", color: C.green },
            { title: "TourRadar + Intrepid + G Adv = multi-day specialist", desc: "P2 UK culture + P1 mid-tier tìm 10-day tour đi đây. Traffic thấp (2–4M) nhưng high-intent.", color: C.orange },
            { title: "Booking + Expedia + Agoda = hotel-first", desc: "Experiences vertical yếu nhưng hotel-based discovery của P6 family là upsell chance (book hotel 7N → thấy cross-sell).", color: C.purple },
          ].map((item) => (
            <div key={item.title} style={{ padding: 12, background: C.card, borderRadius: 8, borderLeft: `3px solid ${item.color}` }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: item.color, marginBottom: 4 }}>{item.title}</div>
              <p style={{ color: C.muted, fontSize: 11, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      <H2>Cruise Line Shore-Ex Programs (9 lines)</H2>
      <Card>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                {["Cruise line", "VN ports", "Approved-operator path", "Commission model", "Exclusivity"].map((h, i) => (
                  <th key={i} style={{ textAlign: "left", padding: "8px 6px", color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.4 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cruiseLines.map((l, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "8px 6px", color: C.text, fontWeight: 600 }}>{l.name}</td>
                  <td style={{ padding: "8px 6px", color: C.accent, fontSize: 11 }}>{l.vnPorts}</td>
                  <td style={{ padding: "8px 6px", color: C.muted, fontSize: 11 }}>{l.path}</td>
                  <td style={{ padding: "8px 6px", color: C.orange, fontSize: 11 }}>{l.commission}</td>
                  <td style={{ padding: "8px 6px", color: C.green, fontSize: 11 }}>{l.exclusivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <H2>Shore-Ex Aggregators (5 platforms)</H2>
      <Card>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                {["Aggregator", "Traffic UV/mo", "Commission", "Review velocity", "Niche"].map((h, i) => (
                  <th key={i} style={{ textAlign: "left", padding: "8px 6px", color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.4 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shorexAggregators.map((a, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "8px 6px", color: C.text, fontWeight: 700 }}>{a.name}</td>
                  <td style={{ padding: "8px 6px", color: C.accent, fontWeight: 600 }}>{a.traffic}</td>
                  <td style={{ padding: "8px 6px", color: C.orange, fontWeight: 600 }}>{a.commission}</td>
                  <td style={{ padding: "8px 6px", color: C.muted }}>{a.velocity}</td>
                  <td style={{ padding: "8px 6px", color: C.muted }}>{a.niche}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <H2>Hạ Long Direct Channels (local context)</H2>
      <Card>
        <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
          {[
            "Halongbay.com.vn — Vietnamese inbound DMC + direct-consumer; handles T6–T9 class overnight cruise.",
            "Bookyourtour.com — local inbound marketplace.",
            "Luxury Travel Vietnam — premium inbound DMC; private cruise arrangements.",
            "Local inbound DMCs: Asia Pioneer, Buffalo Tours, Haivenu, Indochina Junk.",
          ].map((item, i) => (
            <li key={i} style={{ color: C.muted, fontSize: 12, lineHeight: 1.7, marginBottom: 2 }}>{item}</li>
          ))}
        </ul>
      </Card>

      <H2>Persona × Channel Heatmap (7 × 15 = 105 cells)</H2>
      <Card>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                <th style={{ textAlign: "left", padding: "6px 8px", color: C.muted, fontSize: 10, whiteSpace: "nowrap" }}>Channel ↓ / Persona →</th>
                {["P1", "P2", "P3", "P4", "P5", "P6", "P7"].map((p) => (
                  <th key={p} style={{ textAlign: "center", padding: "6px 8px", color: C.text, fontSize: 11, fontWeight: 700 }}>{p}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heatmap.map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "6px 8px", color: C.text, fontSize: 10, whiteSpace: "nowrap" }}>{row.ch}</td>
                  {["p1", "p2", "p3", "p4", "p5", "p6", "p7"].map((key) => {
                    const val = row[key];
                    return (
                      <td key={key} style={{ textAlign: "center", padding: "4px" }}>
                        <span style={{
                          display: "inline-block",
                          minWidth: 22,
                          padding: "2px 6px",
                          background: `${cellColor[val]}25`,
                          color: cellColor[val],
                          borderRadius: 4,
                          fontWeight: 700,
                          fontSize: 10,
                        }}>{val}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 10, display: "flex", gap: 12, fontSize: 10 }}>
          <span style={{ color: C.green }}><strong>H</strong> = high fit (50%+ booking share)</span>
          <span style={{ color: C.orange }}><strong>M</strong> = mid (20–50%)</span>
          <span style={{ color: C.muted }}><strong>L</strong> = low (&lt;20%)</span>
        </div>
      </Card>

      <H2>Read-Across cho Archetype Design (§7)</H2>
      <Card>
        <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
          {[
            "P1 + P7 (cruise-heavy) dominate rows 11–14 → cruise-anchored archetypes MUST list these channels top-2.",
            "P3 + P5 = Klook + Viator/GYG core → SEA + EU persona archetype channels.",
            "P6 Family = widest channel spread (Booking H + Viator H + TripAdvisor H) → 3-channel listing critical.",
            "P4 Nomad = Agoda H only (weekend micro-add-on) → narrow channel.",
            "P2 UK/IE Culture = deep mid-premium bucket (Viator + GYG + TripAdvisor + TourRadar + Intrepid + G Adv đều H) → ≥3 channel mandatory.",
          ].map((item, i) => (
            <li key={i} style={{ color: C.muted, fontSize: 12, lineHeight: 1.7, marginBottom: 4 }}>{item}</li>
          ))}
        </ul>
      </Card>

      <H2>Gaps Flagged</H2>
      <Card>
        <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
          <li style={{ color: C.muted, fontSize: 11, lineHeight: 1.7 }}>[gap] Exact VN-market commission rates per platform là operator-negotiated NDAs; bands là industry-typical, verify per contract.</li>
          <li style={{ color: C.muted, fontSize: 11, lineHeight: 1.7 }}>[gap] Viator review velocity per new listing (ramp-up time) là platform-opaque — estimated from operator interviews.</li>
        </ul>
      </Card>
    </>
  );
}
