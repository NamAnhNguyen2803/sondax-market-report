import { C } from "../../data/colors.js";
import { INSIGHTS } from "./insights.js";

export default function HomePane({ goto }) {
  return (
    <>
      {/* Slim Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${C.card} 0%, #1a2744 100%)`,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: "24px 24px 22px",
        marginBottom: 20,
      }}>
        <div style={{ fontSize: 9, color: C.accent, textTransform: "uppercase", letterSpacing: 2, fontWeight: 800, marginBottom: 8 }}>
          RPT-260416-001 · Market Overview
        </div>
        <h1 style={{ color: C.text, fontSize: 22, fontWeight: 800, lineHeight: 1.3, marginBottom: 10 }}>
          Vietnam Tours · EN-Speaking Inbound · May–Oct
        </h1>
        <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.6, margin: 0 }}>
          Mỗi ô dưới đây là một câu hỏi kinh doanh bạn có thể đang hỏi — click để đi sâu.
          Cần toàn cảnh? → <span style={{ color: C.accent, cursor: "pointer", fontWeight: 700 }} onClick={() => goto("rpt-explorer")}>Tour Explorer (18)</span>.
        </p>
      </div>

      {/* 6 entry-point cards: 5 insights + 1 explorer */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 12,
        marginBottom: 20,
      }}>
        {INSIGHTS.map(ins => (
          <InsightCard key={ins.id} insight={ins} onClick={() => goto(ins.tabId)} />
        ))}
        <ExplorerCard onClick={() => goto("rpt-explorer")} />
      </div>

      {/* Thin footer pointing to evidence */}
      <div style={{
        fontSize: 11, color: C.muted, textAlign: "center",
        padding: "14px 0 4px",
        borderTop: `1px solid ${C.border}`,
      }}>
        Cần xem dữ liệu gốc (S1–S9)? Mở sidebar → scroll xuống nhóm section sources.
      </div>
    </>
  );
}

function InsightCard({ insight, onClick }) {
  const { title, icon, color, question, teaser, stat } = insight;
  return (
    <button
      onClick={onClick}
      aria-label={`Open insight: ${title}`}
      style={{
        textAlign: "left",
        background: `linear-gradient(135deg, ${color}12 0%, ${C.card} 70%)`,
        border: `1px solid ${color}40`,
        borderRadius: 12,
        padding: "16px 18px",
        cursor: "pointer",
        transition: "transform 0.15s, box-shadow 0.15s, border-color 0.15s",
        outline: "none",
        color: "inherit",
        fontFamily: "inherit",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.3), 0 0 0 1px ${color}60`;
        e.currentTarget.style.borderColor = color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = `${color}40`;
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <span style={{ fontSize: 26, lineHeight: 1 }}>{icon}</span>
        <div style={{
          fontSize: 10, color, fontWeight: 800,
          textTransform: "uppercase", letterSpacing: 1.2,
          background: `${color}15`,
          border: `1px solid ${color}40`,
          borderRadius: 6, padding: "3px 8px",
        }}>
          {stat.value} <span style={{ color: `${color}aa`, fontWeight: 600 }}>{stat.label}</span>
        </div>
      </div>
      <div style={{
        fontSize: 15, fontWeight: 800, color: C.text,
        marginBottom: 6, lineHeight: 1.3,
      }}>
        {title}
      </div>
      <div style={{ fontSize: 11, color, fontWeight: 600, marginBottom: 8, fontStyle: "italic", lineHeight: 1.4 }}>
        {question}
      </div>
      <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.55 }}>
        {teaser}
      </div>
      <div style={{
        marginTop: 12, fontSize: 11, color,
        fontWeight: 700, display: "flex", alignItems: "center", gap: 4,
      }}>
        Explore →
      </div>
    </button>
  );
}

function ExplorerCard({ onClick }) {
  const color = "#94A3B8";
  return (
    <button
      onClick={onClick}
      aria-label="Open Tour Explorer (all 18 tours)"
      style={{
        textAlign: "left",
        background: `linear-gradient(135deg, ${color}10 0%, ${C.card} 70%)`,
        border: `1px dashed ${color}60`,
        borderRadius: 12,
        padding: "16px 18px",
        cursor: "pointer",
        transition: "all 0.15s",
        outline: "none",
        color: "inherit",
        fontFamily: "inherit",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderStyle = "solid";
        e.currentTarget.style.borderColor = C.accent;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderStyle = "dashed";
        e.currentTarget.style.borderColor = `${color}60`;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <span style={{ fontSize: 26, lineHeight: 1 }}>🔎</span>
        <div style={{
          fontSize: 10, color: C.muted, fontWeight: 700,
          textTransform: "uppercase", letterSpacing: 1.2,
          background: `${C.muted}10`,
          border: `1px solid ${C.muted}40`,
          borderRadius: 6, padding: "3px 8px",
        }}>
          18 tours · 3 filters
        </div>
      </div>
      <div style={{
        fontSize: 15, fontWeight: 800, color: C.text,
        marginBottom: 6, lineHeight: 1.3,
      }}>
        Tour Explorer
      </div>
      <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, marginBottom: 8, fontStyle: "italic", lineHeight: 1.4 }}>
        Không biết bắt đầu từ đâu? Browse hết — filter theo Market / Category / Month.
      </div>
      <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.55 }}>
        Tất cả 18 tours trong 1 bảng tương tác. Thích hợp khi bạn muốn so sánh hoặc tìm tour cụ thể.
      </div>
      <div style={{
        marginTop: 12, fontSize: 11, color: C.accent,
        fontWeight: 700, display: "flex", alignItems: "center", gap: 4,
      }}>
        Browse all →
      </div>
    </button>
  );
}
