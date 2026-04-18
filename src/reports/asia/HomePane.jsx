import { T } from "../../data/colors.js";

// Asia → Vietnam 2025 — L1 question-cards landing.
// Each card maps to an existing tab (now treated as L2 sub-page).
const CARDS = [
  {
    id: "country",
    badge: "Tăng trưởng",
    pill: { kind: "peach", text: "Top growth" },
    question: "Thị trường nào tăng nhanh nhất 9T/2025?",
    statHero: "+93%",
    statSub: "Philippines YoY · 230K khách",
    body: "China +44%, India +42%, Nhật +16%. Korea là thị trường duy nhất giảm (-3.8%). Tiền cao nhất vẫn là TQ + HQ — quy mô gấp nhiều lần các thị trường tăng nhanh.",
    cta: "Xem 6 quốc gia trọng điểm →",
    accent: "peach",
  },
  {
    id: "channels",
    badge: "Kênh",
    pill: { kind: "lavender", text: "72.77% mobile" },
    question: "Khách book qua đâu — và đâu là kênh đáng đầu tư 2026?",
    statHero: "40–50%",
    statSub: "Global OTA · Klook + Trip.com + Traveloka",
    body: "OTA dominant nhưng commission 15–30% ăn margin. Mini App (Zalo 75M, MoMo 34M) + Visit Vietnam (Q2/2026) = lane direct, sở hữu data, phí xử lý vài %.",
    cta: "Mở phân phối kênh →",
    accent: "lavender",
  },
  {
    id: "behavior",
    badge: "Hành vi",
    pill: { kind: "mint", text: "Pre vs On-trip" },
    question: "Khách Western book trước hàng tháng, khách Asian book trong chuyến — chiến lược tách đôi?",
    statHero: "2 modes",
    statSub: "Western: 2–8 tuần · Asian: 1–7 ngày",
    body: "Một listing không tối ưu cho cả hai. Western = pre-trip via Viator/GYG/desktop. Asian = in-destination via Klook/mobile + flash sale. Cần 2 funnels riêng.",
    cta: "Mở hành vi du khách →",
    accent: "mint",
  },
  {
    id: "roi2026",
    badge: "ROI 2026",
    pill: { kind: "mint", text: "45% margin" },
    question: "Tour nào biên cao nhất, tour nào sắp \"chết\"?",
    statHero: "5 hotspots",
    statSub: "Wellness · Wedding/MICE · Night · Private · Mass(↓)",
    body: "Mass tours bị OTA ép biên 5%. Wellness/Medical đỉnh 45%, mỏ vàng $4B by 2033. Wedding Ấn Độ + Night economy = arbitrage cao. Mass cần dịch chuyển sang premium.",
    cta: "Mở ROI 2026 →",
    accent: "mint",
  },
  {
    id: "quarterly",
    badge: "Mùa vụ",
    pill: { kind: "peach", text: "Q3 đỉnh" },
    question: "Diễn biến theo quý — peak khi nào, dip khi nào?",
    statHero: "Q3",
    statSub: "Q1 1.6M / Q2 1.1M / Q3 1.2M (TQ)",
    body: "T1+T3 đỉnh Tết, T8 đỉnh hè 1.68M, T9 thấp nhất nhưng +19.5% YoY. Q2 mọi market dip — chuẩn bị inventory cho Q3 từ tháng 6.",
    cta: "Xem theo quý →",
    accent: "peach",
  },
  {
    id: "insights",
    badge: "Quyết định",
    pill: { kind: "lavender", text: "6 strategies" },
    question: "Nếu chỉ chọn 6 chiến lược cho 2026, là gì?",
    statHero: "6",
    statSub: "Wellness · MICE Ấn · Night · Mini App · QR · Direct",
    body: "Medical/Wellness mỏ vàng. Wedding/MICE Ấn (1M target). Night economy arbitrage. Mini App + QR cross-border. Chuyển OTA → Direct để own data + LTV.",
    cta: "Mở 6 nhận định →",
    accent: "lavender",
  },
];

export default function AsiaHomePane({ goto }) {
  return (
    <>
      <Hero goto={goto} />
      <CardsGrid goto={goto} />
      <DeepDiveStrip goto={goto} />
      <MetaStrip />
    </>
  );
}

function Hero({ goto }) {
  return (
    <div style={{ marginBottom: 32, maxWidth: 760 }}>
      <div style={{
        fontSize: 10, color: T.lavender, fontWeight: 700,
        textTransform: "uppercase", letterSpacing: 1.6, marginBottom: 10,
      }}>
        ✦ Asia → Vietnam · 9T/2025 · 6 câu hỏi PO Sondax đang phải trả lời
      </div>
      <h1 className="serif" style={{
        fontSize: 36, lineHeight: 1.1, color: T.ink, fontWeight: 600, marginBottom: 14,
      }}>
        15.4M khách 9T, +21.5% YoY — tiền chảy về đâu, mảng nào ăn 2026?
      </h1>
      <p style={{ fontSize: 14.5, color: T.inkSoft, lineHeight: 1.6 }}>
        6 ô bên dưới = 6 quyết định cần ra cho roadmap 2026. Mỗi card link vào 1 tab data chi tiết.
        Nếu cần Tour EN Inbound 2026–27 (7 personas, 6 archetypes) → mở nhóm{" "}
        <span
          onClick={() => goto("executive")}
          style={{ color: T.peach, fontWeight: 700, cursor: "pointer", borderBottom: `1px dashed ${T.peach}` }}
        >Tour EN Inbound</span> trong sidebar.
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
      marginBottom: 32,
    }}>
      {CARDS.map(card => (
        <QuestionCard key={card.id} card={card} onClick={() => goto(card.id)} />
      ))}
    </div>
  );
}

const ACCENT_MAP = {
  mint:     { ink: T.mintInk,     soft: T.mintSoft,     base: T.mint },
  peach:    { ink: T.peachInk,    soft: T.peachSoft,    base: T.peach },
  lavender: { ink: T.lavenderInk, soft: T.lavenderSoft, base: T.lavender },
};

function QuestionCard({ card, onClick }) {
  const A = ACCENT_MAP[card.accent] ?? ACCENT_MAP.lavender;
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

// Quick-launch strip for the "Tổng quan inbound 2025" full data tab + Tour EN nav.
function DeepDiveStrip({ goto }) {
  const link = (label, target, accent) => (
    <button
      onClick={() => goto(target)}
      style={{
        background: "transparent",
        border: `1px solid ${accent}`,
        color: accent,
        borderRadius: 999,
        padding: "5px 14px",
        fontSize: 11.5,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "inherit",
        whiteSpace: "nowrap",
      }}
    >{label}</button>
  );
  return (
    <div style={{
      display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center",
      marginBottom: 28,
    }}>
      <span style={{
        fontSize: 9.5, color: T.lavender, fontWeight: 800,
        textTransform: "uppercase", letterSpacing: 1.4, marginRight: 4,
      }}>Sub-pages khác:</span>
      {link("📊 Tổng quan inbound 2025", "overview", T.lavenderInk)}
      {link("📋 Tóm tắt EN Inbound", "executive", T.peach)}
      {link("👥 7 Persona", "personas", T.mintInk)}
      {link("🚀 GTM Roadmap", "gtm", T.peachInk)}
    </div>
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
      <span><b className="num" style={{ color: T.ink }}>15.4M</b> khách 9T/2025 (+21.5% YoY)</span>
      <span><b className="num" style={{ color: T.ink }}>78.6%</b> từ Châu Á</span>
      <span><b className="num" style={{ color: T.ink }}>1 triệu tỷ ₫</b> doanh thu 2025 (~$39B)</span>
      <span><b className="num" style={{ color: T.ink }}>25M</b> mục tiêu 2026 (+62% YoY)</span>
    </div>
  );
}
