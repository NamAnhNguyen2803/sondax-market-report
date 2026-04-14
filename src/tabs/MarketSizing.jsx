import KPI from "../components/KPI.jsx";
import H2 from "../components/H2.jsx";
import Card from "../components/Card.jsx";
import Tip from "../components/Tip.jsx";
import { C } from "../data/colors.js";
import { fmt } from "../utils.js";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function MarketSizingTab() {
  const marketData = [
    { name: "US", value: 780000, color: C.purple },
    { name: "SG", value: 880000, color: C.china },
    { name: "AU", value: 490000, color: C.green },
    { name: "IN", value: 500000, color: C.india },
    { name: "UK", value: 300000, color: C.orange },
    { name: "CA", value: 180000, color: C.cyan },
    { name: "PH", value: 175000, color: C.philippines },
    { name: "NZ", value: 80000, color: C.pink },
    { name: "IE", value: 35000, color: C.accent },
    { name: "ZA", value: 25000, color: C.red },
  ];

  const cruisePortCalls = [
    { port: "Hạ Long", oct: 8, nov: 12, dec: 18, jan: 18, feb: 15, mar: 12, total: 83 },
    { port: "Phú Mỹ", oct: 10, nov: 14, dec: 16, jan: 16, feb: 14, mar: 12, total: 82 },
    { port: "Chân Mây", oct: 6, nov: 10, dec: 14, jan: 12, feb: 12, mar: 10, total: 64 },
    { port: "Nha Trang", oct: 4, nov: 6, dec: 8, jan: 8, feb: 7, mar: 6, total: 39 },
  ];

  return (
    <>
      <H2>Số liệu thị trường 2024</H2>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        <KPI label="Khách QT đến VN" value="17.6M" sub="2024" />
        <KPI label="Philippines tăng" value="+95%" sub="YoY" />
        <KPI label="Ấn Độ tăng" value="+98%" sub="YoY" />
        <KPI label="Mỹ tăng" value="+25%" sub="YoY" />
      </div>

      <H2>10 thị trường nguồn khách hàng đầu</H2>
      <Card>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart layout="vertical" data={marketData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis type="number" tickFormatter={fmt} tick={{ fill: C.muted, fontSize: 10 }} />
            <YAxis type="category" dataKey="name" width={80} tick={{ fill: C.muted, fontSize: 10 }} />
            <Tooltip content={<Tip />} />
            <Bar dataKey="value" name="Lượng khách" barSize={20} radius={[0, 6, 6, 0]}>
              {marketData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <H2>Lượt ghé cảng tàu du lịch theo tháng</H2>
      <Card>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                <th style={{ textAlign: "left", padding: "8px 0", color: C.muted, fontSize: 12 }}>Cảng</th>
                {["Tháng 10", "Tháng 11", "Tháng 12", "Tháng 1", "Tháng 2", "Tháng 3", "Tổng"].map((month, i) => (
                  <th key={i} style={{ textAlign: "center", padding: "8px 0", color: C.muted, fontSize: 12 }}>{month}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cruisePortCalls.map((row, index) => (
                <tr key={index} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ textAlign: "left", padding: "8px 0", color: C.text, fontWeight: 600, fontSize: 13 }}>{row.port}</td>
                  <td style={{ textAlign: "center", padding: "8px 0", color: C.text, fontSize: 13 }}>{row.oct}</td>
                  <td style={{ textAlign: "center", padding: "8px 0", color: C.text, fontSize: 13 }}>{row.nov}</td>
                  <td style={{ textAlign: "center", padding: "8px 0", color: C.text, fontSize: 13 }}>{row.dec}</td>
                  <td style={{ textAlign: "center", padding: "8px 0", color: C.text, fontSize: 13 }}>{row.jan}</td>
                  <td style={{ textAlign: "center", padding: "8px 0", color: C.text, fontSize: 13 }}>{row.feb}</td>
                  <td style={{ textAlign: "center", padding: "8px 0", color: C.text, fontSize: 13 }}>{row.mar}</td>
                  <td style={{ textAlign: "center", padding: "8px 0", color: C.accent, fontWeight: 700, fontSize: 14 }}>{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <H2>Tỷ lệ chuyển đổi khách tàu du lịch</H2>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        <KPI label="Hạ Long" value="65–80%" sub="Tỷ lệ chuyển đổi" />
        <KPI label="Phú Mỹ" value="55–70%" sub="Tỷ lệ chuyển đổi" />
        <KPI label="Chân Mây" value="75–95%" sub="Tỷ lệ chuyển đổi (Cao nhất)" />
        <KPI label="Nha Trang" value="40–55%" sub="Tỷ lệ chuyển đổi" />
      </div>
    </>
  );
}
