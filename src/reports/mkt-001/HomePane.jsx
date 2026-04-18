import { T } from "../../data/colors.js";

// 5 question cards = the 5 decisions the PO needs from this report.
// Each card → routes to a curated L2 sub-page (existing markdown section).
const CARDS = [
  {
    id: "executive",
    badge: "Tổng kết",
    pill: { kind: "lavender", text: "12 finding" },
    question: "5 phút — toàn cảnh Cafe + Cruise đang ra sao?",
    statHero: "$4.8–6.6M",
    statSub: "Revenue 2028 base · Cafe + Cruise + Cross-sell",
    body: "Bear / Base / Bull projection 2025–28, confidence rating 7 headlines, 12 key findings cô đọng từ 5 section dưới.",
    cta: "Đọc Executive Summary →",
    accent: "lavender",
  },
  {
    id: "cafe-market",
    badge: "Cafe · thị trường",
    pill: { kind: "mint", text: "+28–38% CAGR" },
    question: "Cafe Workshop HN đang ở giai đoạn nào? Khách là ai?",
    statHero: "$1.5–3.5M",
    statSub: "GMV bottom-up 2025 · ±30%",
    body: "15–25 operators active. 60–70% drop mùa thấp. Korean = top segment 22–28%. Mùa cao điểm 3–5K bookings/tháng. Dữ liệu kỹ — Tier 1/2/3 breakdown.",
    cta: "Mở thị trường + khách hàng cafe →",
    accent: "mint",
  },
  {
    id: "cafe-competition",
    badge: "Cafe · cạnh tranh",
    pill: { kind: "peach", text: "OTA 65–75%" },
    question: "Vì sao LBR là Tier 1 — và hold được moat trong bao lâu?",
    statHero: "Tier 1",
    statSub: "Top 3–4 trên 15–25 operators · 5,000+ reviews",
    body: "On-site roastery + vegan workshop = moat khó copy 18–24 tháng. Phủ 6 OTAs (vs ngành 2–3). 18–27% commission ăn margin. Target giảm OTA dependency 65→45%.",
    cta: "So sánh cạnh tranh + vận hành →",
    accent: "peach",
  },
  {
    id: "cruise-market",
    badge: "Cruise · thị trường",
    pill: { kind: "lavender", text: "$580–680M" },
    question: "Cruise Hạ Long lớn cỡ nào, ai đang đi, format nào ăn?",
    statHero: "70–80%",
    statSub: "Khách quốc tế HN cũng book Cruise · cross-sell tự nhiên",
    body: "GMV gấp 200–400× cafe nhưng CAGR thấp hơn (12–15%). 1N2D dominant. ADR $80–200 std, $350+ Premium tier. Cross-sell coffee→cruise hiện chưa ai khai thác.",
    cta: "Mở thị trường cruise →",
    accent: "lavender",
  },
  {
    id: "cruise-competition",
    badge: "Cruise · cạnh tranh",
    pill: { kind: "mint", text: "Whitespace Premium" },
    question: "Premium tier có chỗ trống không? Đối thủ Tier 1 đang làm gì?",
    statHero: "$350+",
    statSub: "ADR Premium tier · Net Margin 22–28% std",
    body: "Paradise & Dragon dominant Tier 1. Std OTA mix margin mỏng. Premium tier ($350+/pax/night) ít operator — moat low, opportunity high cho 2026.",
    cta: "Mở cạnh tranh cruise →",
    accent: "mint",
  },
  {
    id: "synthesis",
    badge: "Hành động 2026",
    pill: { kind: "peach", text: "3 priorities" },
    question: "Sondax phải làm gì 12 tháng tới — theo thứ tự nào?",
    statHero: "3 plays",
    statSub: "① Bundle ② OTA giảm ③ Premium",
    body: "Coffee→Cruise bundle (whitespace), OTA dependency 65→45% (margin recover), Premium cruise tier (margin upside). Roadmap quý-by-quý 2026.",
    cta: "Mở Synthesis & Roadmap →",
    accent: "peach",
  },
];

export default function HomePane({ goto }) {
  return (
    <>
      <Hero />
      <CardsGrid goto={goto} />
      <MetaStrip />
    </>
  );
}

function Hero() {
  return (
    <div style={{ marginBottom: 32, maxWidth: 760 }}>
      <div style={{
        fontSize: 10, color: T.lavender, fontWeight: 700,
        textTransform: "uppercase", letterSpacing: 1.6, marginBottom: 10,
      }}>
        ✦ MKT-001 · Cafe Workshop HN + Cruise Vịnh Hạ Long · Treasure-hunt 6 quyết định
      </div>
      <h1 className="serif" style={{
        fontSize: 36, lineHeight: 1.1, color: T.ink, fontWeight: 600, marginBottom: 14,
      }}>
        Cafe niche tăng tốc, Cruise volume khổng lồ — Sondax bet vào đâu, kéo bằng cách nào?
      </h1>
      <p style={{ fontSize: 14.5, color: T.inkSoft, lineHeight: 1.6 }}>
        6 ô bên dưới = 6 câu hỏi PO đang phải trả lời cho team trong tháng này.
        Bấm 1 ô để drill xuống full data + reasoning. Không có wall-of-text — mỗi card gắn 1 section báo cáo.
      </p>
    </div>
  );
}

function CardsGrid({ goto }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: 18,
      marginBottom: 36,
    }}>
      {CARDS.map(card => (
        <QuestionCard key={card.id} card={card} onClick={() => goto(card.id)} />
      ))}
    </div>
  );
}

function QuestionCard({ card, onClick }) {
  const accentMap = {
    mint:     { ink: T.mintInk,     soft: T.mintSoft,     base: T.mint },
    peach:    { ink: T.peachInk,    soft: T.peachSoft,    base: T.peach },
    lavender: { ink: T.lavenderInk, soft: T.lavenderSoft, base: T.lavender },
  };
  const A = accentMap[card.accent] ?? accentMap.lavender;

  return (
    <button
      onClick={onClick}
      aria-label={`Mở: ${card.question}`}
      style={{
        textAlign: "left",
        background: T.surface,
        border: `1px solid ${T.line}`,
        borderRadius: 16,
        padding: "22px 22px 20px",
        cursor: "pointer",
        transition: "transform .25s ease, box-shadow .25s ease",
        outline: "none",
        color: "inherit",
        fontFamily: "inherit",
        boxShadow: "0 1px 2px rgba(168,143,191,0.08), 0 8px 24px -16px rgba(168,143,191,0.18)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 16px 32px -16px rgba(168,143,191,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 2px rgba(168,143,191,0.08), 0 8px 24px -16px rgba(168,143,191,0.18)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{
          fontSize: 10, color: T.lavender, fontWeight: 700,
          textTransform: "uppercase", letterSpacing: 1.4,
        }}>{card.badge}</span>
        <Pill kind={card.pill.kind}>{card.pill.text}</Pill>
      </div>

      <h3 className="serif" style={{
        fontSize: 21, color: T.ink, fontWeight: 600, lineHeight: 1.25, marginBottom: 16,
      }}>
        {card.question}
      </h3>

      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
        <span className="serif num" style={{
          fontSize: 36, fontWeight: 600, color: A.base, lineHeight: 1,
        }}>{card.statHero}</span>
      </div>
      <div style={{ fontSize: 12, color: T.inkSoft, marginBottom: 14, lineHeight: 1.5 }}>
        {card.statSub}
      </div>

      <p style={{ fontSize: 13, color: T.inkSoft, lineHeight: 1.6, marginBottom: 16 }}>
        {card.body}
      </p>

      <div style={{ fontSize: 12.5, fontWeight: 700, color: T.peach }}>
        {card.cta}
      </div>
    </button>
  );
}

function Pill({ kind, children }) {
  const map = {
    mint:     { bg: T.mintSoft,     fg: T.mintInk },
    peach:    { bg: T.peachSoft,    fg: T.peachInk },
    lavender: { bg: T.lavenderSoft, fg: T.lavenderInk },
  };
  const c = map[kind] ?? map.lavender;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      fontSize: 10.5, fontWeight: 700,
      padding: "3px 11px", borderRadius: 999,
      letterSpacing: 0.8, textTransform: "uppercase",
      background: c.bg, color: c.fg,
    }}>
      {children}
    </span>
  );
}

function MetaStrip() {
  return (
    <div style={{
      background: T.surface,
      border: `1px solid ${T.line}`,
      borderRadius: 16,
      padding: "16px 22px",
      display: "flex", flexWrap: "wrap",
      gap: "8px 32px",
      fontSize: 12, color: T.inkSoft,
    }}>
      <span><b className="num" style={{ color: T.ink }}>17.5–18M</b> Vietnam inbound 2025</span>
      <span><b className="num" style={{ color: T.ink }}>22–28% / 18–22%</b> Korean share cafe / cruise</span>
      <span><b className="num" style={{ color: T.ink }}>$580–680M</b> GMV Cruise Hạ Long</span>
      <span><b className="num" style={{ color: T.ink }}>$1.5–3.5M</b> GMV Cafe Workshop HN</span>
      <span><b className="num" style={{ color: T.ink }}>15–18%</b> Cross-sell take rate (target)</span>
    </div>
  );
}
