import { useState } from "react";
import { C } from "../data/colors.js";
import H2 from "../components/H2.jsx";
import Card from "../components/Card.jsx";

const categories = [
  { id: "city", name: "A. City Tours (HN + HCM)" },
  { id: "cruise", name: "B. Hạ Long Overnight Cruise" },
  { id: "shoreex", name: "C. Shore Excursions" },
  { id: "multiday", name: "D. Multi-day North VN" },
];

const benchmarkData = {
  city: {
    items: [
      { exemplar: "A Chef's Tour Hanoi (Food-led small-group)", platform: "TripAdvisor #1–3 HN · Viator 4.9★ 2000+ reviews", price: "$65–$95 half-day", inclusion: "Guide chef-background · 5–6 stops · all food/drink · cultural commentary", positive: "'Best food tour of SE Asia' · 'Chef-quality insight' · 'Small group felt private'", critical: "Price cao hơn TB; một số nói 'too many stops'", whitespace: "Không có family-kid variant; không có luxury private-chef version" },
      { exemplar: "Hanoi Food Tour by Hanoi Street Food", platform: "TripAdvisor #4–8 · Viator 4.8★ 1500+", price: "$35–$55 evening", inclusion: "Guide · 4–5 street stops · beer · pho", positive: "'Authentic, generous tastes' · 'Local guide great'", critical: "Some 'too rushed'; English-heavy", whitespace: "Vegetarian/halal option yếu" },
      { exemplar: "Back of the Bike HCM", platform: "TripAdvisor #1–2 HCM · Viator 4.9★ 1800+", price: "$65–$95 evening", inclusion: "Motorbike-pillion + guide · 5–6 food/sight stops", positive: "'Thrilling, authentic' · 'Guides friendly'", critical: "Không an toàn cho elderly; kids age-gate", whitespace: "Không có family-van version cho grandma-accessible" },
      { exemplar: "Vespa Adventures (HCM food + sight)", platform: "TripAdvisor top-5 HCM · Viator 4.9★ 1200+", price: "$80–$110 4h", inclusion: "Vespa-sidecar · 4–5 stops · food + beer", positive: "'Best tour of VN' · 'Photo-worthy'", critical: "Limited kid-seat; rainy-day cancel policy hazy", whitespace: "Không có HN version; không cruise-pax targeted" },
      { exemplar: "Hanoi Classic Walking Tour Free+Tip", platform: "Viator/GYG · 4.7★", price: "$0–$30 tip-based", inclusion: "Guide walking + stop narration (no food)", positive: "'Great primer for arrivals'", critical: "'Not deep enough'", whitespace: "Upsell-to-day-tour yếu" },
    ],
    priceCurve: "$0 tip-based → $30 entry → $65–$95 mid (sweet spot) → $110 premium",
    gap: "Private-chef table + Michelin-trained version không có ở $150–$250/pax sweet spot (hầu hết $400+). Multigen-grandma-friendly vehicle version (4-wheel thay motorbike + vespa) missing.",
  },
  cruise: {
    items: [
      { exemplar: "Paradise Elegance (4-deluxe + premium)", platform: "Halongbay.com.vn #top · Viator 4.8", price: "$250–$400 2D1N · $450–$700 3D2N", inclusion: "Cabin · 3 meals · kayak · Sung Sot + Ti Top · T'ai Chi", positive: "'Luxurious feel' · 'Good food' · 'Crew great'", critical: "Busy route — other boats visible", whitespace: "Không có quiet-bay itinerary; không có private-charter easy-book" },
      { exemplar: "Orchid Cruise (premium, 20-cabin)", platform: "Direct + Viator · 4.9", price: "$320–$500 2D1N", inclusion: "Cabin · 3 meals · Bai Tu Long route · jacuzzi", positive: "'Less crowded bay' · 'Intimate'", critical: "Higher price; fewer dates", whitespace: "Dates limited; cancel policy strict" },
      { exemplar: "Heritage Line Ylang (luxury boutique)", platform: "Luxury channels + Viator · 4.9", price: "$600–$900 2D1N", inclusion: "Private balcony · 3 meals · fine-dining · Cat Ba area", positive: "'Top-end luxury' · 'Best suite in VN'", critical: "3× giá Paradise", whitespace: "Rất ít cabins (9); book 6mo+" },
      { exemplar: "Indochine Cruise", platform: "Direct + Bookyourtour · 4.7", price: "$250–$400", inclusion: "Cabin · meals · standard itinerary", positive: "'Good value mid-range'", critical: "Standard route crowd", whitespace: "Không có USP differentiator" },
      { exemplar: "Bhaya Classic", platform: "Direct + aggregator · 4.7", price: "$200–$300", inclusion: "Cabin · meals · standard", positive: "'Affordable starter cruise'", critical: "Basic product; crowded", whitespace: "Entry-level" },
    ],
    priceCurve: "$200 entry → $250–$400 mid (Paradise, Indochine) → $500–$700 premium → $900+ luxury (Heritage Line)",
    gap: "Cruise + VN-land combo as single product missing (hiện stand-alone only) → whitespace A1 Winter Escape + A2 Luxury HNWI. Family-kid-programmed cabin package yếu.",
  },
  shoreex: {
    items: [
      { exemplar: "Hanoi Highlights from Ha Long port", platform: "Viator Cruises + ShoreExGroup · 4.5–4.8", price: "$120–$250 day", inclusion: "Transfer HL-HN + guide + lunch + 4 HN sights", positive: "'Good overview' · 'Efficient'", critical: "'Rushed; bus ride 4h total'", whitespace: "Overnight cruise-extend post-debark missing — huge whitespace" },
      { exemplar: "Cu Chi + HCM from Phú Mỹ", platform: "Viator Cruises + ShoreTrips · 4.5–4.7", price: "$120–$220 day", inclusion: "Transfer Phú Mỹ-HCM · Cu Chi tunnels · HCM highlights · lunch", positive: "'Informative' · 'Good driver'", critical: "'Long day'; 'Cu Chi commercialized'", whitespace: "Multi-pax group-of-4 discount yếu" },
      { exemplar: "Huế/Hội An from Chan May", platform: "Cruise-line shore-ex + Viator Cruises · 4.7–4.9", price: "$130–$280 day", inclusion: "Transfer Chan May-Huế hoặc Hội An · guide · lunch · 4–5 sites", positive: "'Hội An magical' · 'Guide excellent'", critical: "'Too much on one day (Huế+Hoi An split)'", whitespace: "Overnight extend (debark → 2N Hội An → re-embark next port) missing — HUGE whitespace feed A3/A6" },
    ],
    priceCurve: "$120–$280 shore-ex range — cruise extension overnight SKU không tồn tại",
    gap: "Cruise-extend overnight (debark Chan May, 2N Hội An, re-embark Phú Mỹ next sailing) — nobody sells this as package → whitespace A3 Hạ Long + A6 Chan May archetype.",
  },
  multiday: {
    items: [
      { exemplar: "Intrepid 8-day North Vietnam (small-group 12)", platform: "Intrepid direct + TourRadar · 4.6", price: "$1,100–$1,600", inclusion: "Hotel 3-star · guide · breakfast · train/bus · HL cruise 1N", positive: "'Good value; decent pace'", critical: "'14 pax felt large'; 'hotel basic'", whitespace: "Mid-premium 6-pax max + 4-star hotel missing (gap giữa Intrepid $1.2K và $5K+ premium)" },
      { exemplar: "G Adventures Vietnam Classic 9-day", platform: "G Adv direct + TourRadar · 4.5", price: "$1,100–$1,700", inclusion: "Similar to Intrepid", positive: "'Youth-friendly'", critical: "'Old operator-style'", whitespace: "Cùng gap với Intrepid" },
      { exemplar: "TourRadar bestsellers (e.g. 'Easy Vietnam 10 days')", platform: "TourRadar · 4.5–4.8", price: "$1,300–$2,500", inclusion: "Varies by operator", positive: "Mixed", critical: "Highly variable", whitespace: "Không có gap-uniform offering" },
      { exemplar: "Audley / Trailfinders / Backyard (custom)", platform: "Private website + travel designer channel", price: "$4,000–$8,000 custom", inclusion: "Private guide · 4–5 star · private transfer · custom", positive: "'Premium, smooth'", critical: "'High price'", whitespace: "Productized mid-premium ($2.5–4K) missing — buyer bị ép từ $1.5K group → $5K+ private" },
    ],
    priceCurve: "$1.1K entry (Intrepid) → $1.3–2.5K TourRadar bestsellers → $4–8K custom (Audley)",
    gap: "Productized 10-day 6-pax-max 4-star $2.5–4K/pax package — giữa Intrepid và Audley → clear demand gap (P2 persona). Whitespace A4 UK/IE Mid-Premium Slow Culture.",
  },
};

const priceCurveData = [
  { name: "Luxury private 12–18D", range: [4000, 14000], color: C.purple, label: "$4K–14K", gap: "Combo cruise+land" },
  { name: "Multi-day 8–10D", range: [1100, 2500], color: C.orange, label: "$1.1K–2.5K", gap: "$2.5–4K mid-premium gap" },
  { name: "Overnight cruise", range: [200, 900], color: C.green, label: "$200–900", gap: "Combo cruise+land" },
  { name: "Shore-ex", range: [120, 280], color: C.india, label: "$120–280", gap: "Overnight extend missing" },
  { name: "Day tour", range: [30, 95], color: C.accent, label: "$30–95", gap: "Mid $150–250 private-chef gap" },
  { name: "Free tip", range: [0, 30], color: C.muted, label: "$0–30", gap: "Upsell weak" },
];

export default function Benchmark() {
  const [activeCategory, setActiveCategory] = useState("city");
  const activeData = benchmarkData[activeCategory];

  return (
    <>
      <H2>Pain → Analogy</H2>
      <Card>
        <p style={{ color: C.text, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          PO không có bảng "VN package hiện đang bán giá bao nhiêu, bao gồm gì, review bias gì" cho từng category. Giống chủ quán phở thiếu menu tham chiếu quán bên cạnh — sẽ price sai. Bảng dưới fix 4 category archetype-relevant.
        </p>
      </Card>

      <H2>Review-Sample Bias Disclosure</H2>
      <Card style={{ border: `1px solid ${C.orange}40`, background: `${C.orange}08` }}>
        <p style={{ color: C.orange, fontWeight: 700, fontSize: 12, margin: "0 0 8px" }}>Critical caveat — TripAdvisor + Viator review count tail-bias cao:</p>
        <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
          {[
            "Reviewer self-select skew positive (satisfied khách review; unhappy khách often silently churn)",
            "Đặt giá 5-star operator more often score 4.5+ vs premium 5-star scoring 4.2 (high expectation → strict reviewer)",
            "Non-English reviewer under-represented (English-only pool distorts 'best operator' perception)",
            "Aggregated ranking effect: top-3 on TripAdvisor get disproportionate booking share — entry-rank starved",
          ].map((item, i) => (
            <li key={i} style={{ color: C.text, fontSize: 11, lineHeight: 1.7, marginBottom: 2 }}>{item}</li>
          ))}
        </ul>
        <p style={{ color: C.text, fontSize: 11, margin: "8px 0 0", fontStyle: "italic" }}>
          → Operator implication: archetype listing mới Oct–Mar 2026/27 MUST seed first 15–30 reviews quickly để clear ranking threshold.
        </p>
      </Card>

      <H2>Benchmark theo Category</H2>
      <Card>
        <div style={{ display: "flex", gap: 8, marginBottom: 16, borderBottom: `1px solid ${C.border}`, paddingBottom: 8, flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                background: activeCategory === cat.id ? C.accent : C.card,
                color: activeCategory === cat.id ? C.bg : C.text,
                border: `1px solid ${activeCategory === cat.id ? C.accent : C.border}`,
                outline: "none",
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
            <thead>
              <tr>
                {["Exemplar", "Nền tảng + rank", "Giá", "Inclusion", "Positive themes", "Critical themes", "Whitespace"].map((h, i) => (
                  <th key={i} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activeData.items.map((item, index) => (
                <tr key={index} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ ...tdStyle, color: C.text, fontWeight: 700 }}>{item.exemplar}</td>
                  <td style={tdStyle}>{item.platform}</td>
                  <td style={{ ...tdStyle, color: C.green, fontWeight: 600 }}>{item.price}</td>
                  <td style={{ ...tdStyle, fontSize: 10 }}>{item.inclusion}</td>
                  <td style={{ ...tdStyle, color: C.green, fontSize: 10 }}>{item.positive}</td>
                  <td style={{ ...tdStyle, color: C.orange, fontSize: 10 }}>{item.critical}</td>
                  <td style={{ ...tdStyle, color: C.accent, fontSize: 10, fontWeight: 600 }}>{item.whitespace}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 14, padding: 12, background: C.card, borderRadius: 8 }}>
          <div style={{ fontWeight: 700, color: C.accent, fontSize: 11, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Price curve</div>
          <div style={{ color: C.text, fontSize: 12, marginBottom: 8 }}>{activeData.priceCurve}</div>
          <div style={{ fontWeight: 700, color: C.accent, fontSize: 11, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Inclusion gap → §7</div>
          <div style={{ color: C.muted, fontSize: 11, lineHeight: 1.6 }}>{activeData.gap}</div>
        </div>
      </Card>

      <H2>Đường Cong Giá — Cross-Category</H2>
      <Card>
        {priceCurveData.map((item, i) => {
          const maxVal = 14000;
          const pct = Math.min(100, (item.range[1] / maxVal) * 100);
          const pctMin = (item.range[0] / maxVal) * 100;
          return (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: C.text, fontWeight: 600 }}>{item.name}</span>
                <span style={{ fontSize: 12, color: item.color, fontWeight: 700 }}>{item.label}</span>
              </div>
              <div style={{ position: "relative", height: 18, background: C.border, borderRadius: 4 }}>
                <div style={{
                  position: "absolute",
                  left: `${pctMin}%`,
                  width: `${pct - pctMin}%`,
                  height: "100%",
                  background: item.color,
                  borderRadius: 4,
                  minWidth: 4,
                  opacity: 0.85,
                }} />
              </div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>Gap: {item.gap}</div>
            </div>
          );
        })}
        <div style={{ fontSize: 11, color: C.muted, marginTop: 10, padding: 10, background: C.card, borderRadius: 6 }}>
          Trục tỷ lệ tuyến tính từ $0 → $14K. <strong style={{ color: C.accent }}>Khoảng trống lớn nhất:</strong> $2.5K–4K (mid-premium culture) và combo cruise+land $3K–14K.
        </div>
      </Card>

      <H2>Review-Bias Triangulation Note</H2>
      <Card>
        <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
          {[
            "Google Business reviews cross-validated trên Back of the Bike, Vespa Adventures, Paradise Elegance — directionally consistent.",
            "Reddit r/VietnamTravel + r/travel 24-month threads — less-polished nhưng trusted peer opinion; flags consistent với OTA positive themes.",
            "Non-English reviews (Korean, Japanese pool trên local agoda/booking) under-represented ở đây; acknowledged bias.",
          ].map((item, i) => (
            <li key={i} style={{ color: C.muted, fontSize: 11, lineHeight: 1.7, marginBottom: 2 }}>{item}</li>
          ))}
        </ul>
      </Card>

      <H2>Gaps Flagged</H2>
      <Card>
        <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
          <li style={{ color: C.muted, fontSize: 11, lineHeight: 1.7 }}>[gap] Exact transaction volume per exemplar operator (book-count) là operator-private — ranked by review count + positioning only.</li>
          <li style={{ color: C.muted, fontSize: 11, lineHeight: 1.7 }}>[gap] Non-English review pool signal under-developed.</li>
          <li style={{ color: C.muted, fontSize: 11, lineHeight: 1.7 }}>[gap] 2025 H2 + 2026 Q1 ranking volatility trên Viator/TripAdvisor chưa observable — ranks hiện là Q4 2024 snapshot.</li>
        </ul>
      </Card>
    </>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "8px 6px",
  color: C.muted,
  borderBottom: `2px solid ${C.border}`,
  textTransform: "uppercase",
  fontSize: 10,
  letterSpacing: "0.5px",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "10px 6px",
  color: C.text,
  verticalAlign: "top",
};
