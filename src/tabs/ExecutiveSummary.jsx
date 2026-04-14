import KPI from "../components/KPI.jsx";
import H2 from "../components/H2.jsx";
import Card from "../components/Card.jsx";
import { C } from "../data/colors.js";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function ExecutiveSummaryTab() {
  const portfolioData = [
    { name: "A3", existing: 80, netNew: 20, color: C.accent },
    { name: "A1", existing: 60, netNew: 40, color: C.orange },
    { name: "A5", existing: 90, netNew: 10, color: C.green },
  ];

  return (
    <>
      <H2>KPIs</H2>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        <KPI label="A3 'Cruise-Extend-Hạ Long'" value="$550–$850/pax" sub="3D/2N, Nov–Feb" />
        <KPI label="A1 'Winter Escape Combo'" value="$3.2K–$4.8K" sub="12D, Dec–Feb" />
        <KPI label="A5 'PH Barkada Gen-Z'" value="$480–$680" sub="7D, Oct+Mar" />
      </div>

      <H2>Đòn bẩy Danh mục</H2>
      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 12, marginBottom: 12 }}>
          {portfolioData.map((item, index) => (
            <div key={index} style={{ borderBottom: `2px solid ${item.color}`, paddingBottom: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 8 }}>{item.name}</div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.muted }}>
                <span>% Khả năng hiện có:</span>
                <span style={{ color: C.text, fontWeight: 600 }}>{item.existing}%</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.muted }}>
                <span>Hoạt động hoàn toàn mới:</span>
                <span style={{ color: C.text, fontWeight: 600 }}>{item.netNew}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <H2>Rủi ro trọng yếu</H2>
      <Card style={{ border: `1px solid ${C.red}`, background: `${C.red}10` }}>
        <p style={{ color: C.red, fontWeight: 600, fontSize: 14 }}>
          Rủi ro lớn nhất: thay đổi lịch trình tàu du lịch ±10–15% — giảm thiểu: ưu tiên A3 ($3–8K), tạm dừng A1 nếu yếu
        </p>
      </Card>

      <H2>Ngân sách xác thực</H2>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ color: C.muted, fontSize: 13 }}>Tổng ngân sách:</span>
          <span style={{ color: C.text, fontWeight: 700, fontSize: 16 }}>$2,100</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${C.border}`, paddingTop: 8 }}>
          <span style={{ color: C.muted, fontSize: 12 }}>A3: $800</span>
          <span style={{ color: C.muted, fontSize: 12 }}>A1: $800</span>
          <span style={{ color: C.muted, fontSize: 12 }}>A5: $500</span>
        </div>
      </Card>

      <H2>Trình tự ra mắt</H2>
      <Card>
        <div style={{ overflowX: "auto", paddingBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", minWidth: 400, position: "relative", padding: "10px 0" }}>
            <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: C.border, top: "50%", transform: "translateY(-50%)" }}></div>
            {["Tháng 9", "Tháng 10", "15/11", "2026"].map((month, index, arr) => (
              <div key={index} style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.accent, border: `2px solid ${C.card}`, margin: "0 auto 5px" }}></div>
                <div style={{ color: C.text, fontSize: 12, fontWeight: 600 }}>{month}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
}
