import { T } from "../../data/colors.js";
import { INSIGHTS } from "./insights.js";

// V4 Soft Pastel rebuild. Each card = a question the salesperson asks → curated insight.
// 5 insights + 1 explorer entry = 6 cards on the landing.

// Map insight color → V4 accent token (mint/peach/lavender) for pill + cta + stat.
const ACCENT_BY_INSIGHT = {
  "quick-wins":     "mint",
  "whitespace":     "lavender",
  "growth-markets": "peach",
  "july-peak":      "peach",
  "revenue":        "lavender",
};

export default function HomePane({ goto }) {
  return (
    <>
      <Hero goto={goto} />
      <CardsGrid goto={goto} />
      <FooterHint />
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
        ✦ RPT-260416-001 · Vietnam Tours · EN-Speaking Inbound · May–Oct 2026
      </div>
      <h1 className="serif" style={{
        fontSize: 36, lineHeight: 1.1, color: T.ink, fontWeight: 600, marginBottom: 14,
      }}>
        Mùa thấp điểm 2026: thị trường nào nóng, sàn nào ăn, tour nào nên ship trước?
      </h1>
      <p style={{ fontSize: 14.5, color: T.inkSoft, lineHeight: 1.6 }}>
        5 ô insight + 1 ô explorer dưới đây = 6 quyết định Sondax cần ra trong tháng này.
        Bấm card để drill xuống danh sách tour curated. Cần xem hết{" "}
        <span
          onClick={() => goto("rpt-explorer")}
          style={{ color: T.peach, fontWeight: 700, cursor: "pointer", borderBottom: `1px dashed ${T.peach}` }}
        >18 tour cùng lúc</span> → mở Tour Explorer.
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
      {INSIGHTS.map(ins => (
        <InsightCard
          key={ins.id}
          insight={ins}
          accent={ACCENT_BY_INSIGHT[ins.id] ?? "lavender"}
          onClick={() => goto(ins.tabId)}
        />
      ))}
      <ExplorerCard onClick={() => goto("rpt-explorer")} />
    </div>
  );
}

const ACCENT_MAP = {
  mint:     { ink: T.mintInk,     soft: T.mintSoft,     base: T.mint },
  peach:    { ink: T.peachInk,    soft: T.peachSoft,    base: T.peach },
  lavender: { ink: T.lavenderInk, soft: T.lavenderSoft, base: T.lavender },
};

function InsightCard({ insight, accent, onClick }) {
  const A = ACCENT_MAP[accent];
  const previewIds = insight.tourIds?.slice(0, 5) ?? [];
  const remaining = (insight.tourIds?.length ?? 0) - previewIds.length;

  return (
    <button
      onClick={onClick}
      aria-label={`Open insight: ${insight.title}`}
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
        }}>
          {insight.title}
        </span>
        <span style={{
          display: "inline-flex", alignItems: "center",
          fontSize: 10.5, fontWeight: 700,
          padding: "3px 11px", borderRadius: 999,
          letterSpacing: 0.8, textTransform: "uppercase",
          background: A.soft, color: A.ink,
        }}>
          {insight.stat.value} {insight.stat.label}
        </span>
      </div>

      <h3 className="serif" style={{
        fontSize: 21, color: T.ink, fontWeight: 600, lineHeight: 1.25, marginBottom: 14,
      }}>
        {insight.question}
      </h3>

      <p style={{ fontSize: 13, color: T.inkSoft, lineHeight: 1.6, marginBottom: 16 }}>
        {insight.teaser}
      </p>

      {previewIds.length > 0 && (
        <div style={{
          marginBottom: 16,
          display: "flex", flexWrap: "wrap", gap: 5, alignItems: "center",
        }}>
          {previewIds.map(id => (
            <span key={id} style={{
              fontSize: 10, fontWeight: 700,
              padding: "2px 8px",
              background: A.soft,
              color: A.ink,
              borderRadius: 10,
            }}>T{id}</span>
          ))}
          {remaining > 0 && (
            <span style={{ fontSize: 10, fontWeight: 600, color: T.inkSoft, marginLeft: 2 }}>
              +{remaining} more
            </span>
          )}
        </div>
      )}

      <div style={{ fontSize: 12.5, fontWeight: 700, color: T.peach }}>
        {insight.icon} Explore {insight.tourIds?.length ?? 0} tours →
      </div>
    </button>
  );
}

function ExplorerCard({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open Tour Explorer (all 18 tours)"
      style={{
        textAlign: "left",
        background: T.lavenderSoft,
        border: `1px dashed ${T.lavender}`,
        borderRadius: 16,
        padding: "22px 22px 20px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        outline: "none",
        color: "inherit",
        fontFamily: "inherit",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderStyle = "solid";
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 16px 32px -16px rgba(168,143,191,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderStyle = "dashed";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{
          fontSize: 10, color: T.lavenderInk, fontWeight: 700,
          textTransform: "uppercase", letterSpacing: 1.4,
        }}>
          Tour Explorer
        </span>
        <span style={{
          fontSize: 10.5, fontWeight: 700,
          padding: "3px 11px", borderRadius: 999,
          background: T.surface, color: T.lavenderInk,
        }}>
          18 tours · 3 filters
        </span>
      </div>
      <h3 className="serif" style={{
        fontSize: 21, color: T.ink, fontWeight: 600, lineHeight: 1.25, marginBottom: 12,
      }}>
        🔎 Không biết bắt đầu từ đâu? Browse hết.
      </h3>
      <p style={{ fontSize: 13, color: T.inkSoft, lineHeight: 1.6, marginBottom: 16 }}>
        Tất cả 18 tours trong 1 bảng tương tác — filter theo Market / Category / Month.
        Phù hợp khi bạn muốn so sánh hoặc tìm tour cụ thể.
      </p>
      <div style={{ fontSize: 12.5, fontWeight: 700, color: T.peach }}>
        Browse all 18 →
      </div>
    </button>
  );
}

function FooterHint() {
  return (
    <div style={{
      fontSize: 12, color: T.inkSoft, textAlign: "center",
      padding: "16px 0 4px",
      borderTop: `1px solid ${T.line}`,
    }}>
      Cần xem dữ liệu gốc (S1–S9)? Mở sidebar → scroll xuống nhóm <b>Evidence · Section sources</b>.
    </div>
  );
}
