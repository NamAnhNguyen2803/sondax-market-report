import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { C } from "../data/colors.js";
import H2 from "../components/H2.jsx";
import Card from "../components/Card.jsx";
import Tip from "../components/Tip.jsx";

const heatmapData = [
  { p: "P1 NA", oct: "mid", nov: "str", dec: "PEAK", jan: "PEAK", feb: "str", mar: "mid" },
  { p: "P2 UK", oct: "str", nov: "mid", dec: "PEAK", jan: "mid", feb: "PEAK", mar: "mid" },
  { p: "P3 AU", oct: "str", nov: "mid", dec: "mid", jan: "str", feb: "str", mar: "PEAK" },
  { p: "P4 Nom", oct: "mid", nov: "str", dec: "str", jan: "str", feb: "str", mar: "mid" },
  { p: "P5 GenZ", oct: "PEAK", nov: "mid", dec: "mid", jan: "mid", feb: "str", mar: "PEAK" },
  { p: "P6 Fam", oct: "mid", nov: "mid", dec: "PEAK", jan: "PEAK", feb: "str", mar: "str" },
  { p: "P7 Lux", oct: "low", nov: "mid", dec: "PEAK", jan: "PEAK", feb: "PEAK", mar: "mid" },
];

const getCellStyle = (value) => {
  switch (value) {
    case "PEAK": return { background: C.red + "30", color: C.red, fontWeight: 700 };
    case "str": return { background: C.orange + "25", color: C.orange, fontWeight: 500 };
    case "mid": return { background: C.india + "20", color: C.india };
    case "low": return { background: C.border, color: C.muted };
    default: return {};
  }
};

const portCallData = [
  { month: "Thg 10", "Hạ Long": 8, "Phú Mỹ": 10, "Chân Mây": 6, "Nha Trang": 4 },
  { month: "Thg 11", "Hạ Long": 12, "Phú Mỹ": 14, "Chân Mây": 10, "Nha Trang": 6 },
  { month: "Thg 12", "Hạ Long": 18, "Phú Mỹ": 16, "Chân Mây": 14, "Nha Trang": 8 },
  { month: "Thg 1", "Hạ Long": 18, "Phú Mỹ": 16, "Chân Mây": 12, "Nha Trang": 8 },
  { month: "Thg 2", "Hạ Long": 15, "Phú Mỹ": 14, "Chân Mây": 12, "Nha Trang": 7 },
  { month: "Thg 3", "Hạ Long": 12, "Phú Mỹ": 12, "Chân Mây": 10, "Nha Trang": 6 },
];

const leadTimeData = [
    { p: "P7 Lux", time: "120–240 ngày", insight: "Cần kế hoạch chi tiết, dịch vụ đẳng cấp từ sớm" },
    { p: "P6 Fam", time: "90–180 ngày", insight: "Lên kế hoạch theo kỳ nghỉ học, cần phòng lớn/kết nối" },
    { p: "P1 NA", time: "90–150 ngày", insight: "Tìm hiểu kỹ, so sánh giá, chốt dịch vụ trọn gói" },
    { p: "P2 UK", time: "60–120 ngày", insight: "Ưu tiên các gói tour có sẵn, thương hiệu uy tín" },
    { p: "P3 AU", time: "30–75 ngày", insight: "Gần hơn, quyết định nhanh hơn, săn deal phút chót" },
    { p: "P5 GenZ", time: "21–60 ngày", insight: "Linh hoạt, ảnh hưởng bởi mạng xã hội, ưu tiên trải nghiệm" },
    { p: "P4 Nom", time: "14–45 ngày", insight: "Quyết định tại chỗ, nhu cầu tour ngắn, độc lạ" },
];

const months = ["oct", "nov", "dec", "jan", "feb", "mar"];
const monthLabels = ["Thg 10", "Thg 11", "Thg 12", "Thg 1", "Thg 2", "Thg 3"];

export default function SeasonalityTab() {
  return (
    <>
      <H2>Heatmap mùa cao điểm theo chân dung khách hàng</H2>
      <Card>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, textAlign: "center" }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, width: "16%" }}>Persona</th>
              {monthLabels.map((m) => <th key={m} style={thStyle}>{m}</th>)}
            </tr>
          </thead>
          <tbody>
            {heatmapData.map((row) => (
              <tr key={row.p} style={{ borderBottom: `1px solid ${C.border}` }}>
                <td style={{ ...tdStyle, fontWeight: 600, color: C.text }}>{row.p}</td>
                {months.map((m) => (
                  <td key={m} style={{ ...tdStyle, ...getCellStyle(row[m]) }}>
                    {row[m]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{display: "flex", justifyContent: "flex-end", gap: 14, marginTop: 12, fontSize: 10}}>
            <span style={{...getCellStyle("PEAK"), padding: "2px 6px", borderRadius: 4}}>🔴 PEAK</span>
            <span style={{...getCellStyle("str"), padding: "2px 6px", borderRadius: 4}}>🟠 STRONG</span>
            <span style={{...getCellStyle("mid"), padding: "2px 6px", borderRadius: 4}}>🟡 MID</span>
            <span style={{...getCellStyle("low"), padding: "2px 6px", borderRadius: 4}}>⚪ LOW</span>
        </div>
      </Card>

      <H2>Lịch cập cảng du lịch (Cruise Port-Calls)</H2>
      <Card>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={portCallData} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="month" tick={{ fill: C.muted, fontSize: 11 }} />
            <YAxis tick={{ fill: C.muted, fontSize: 11 }} label={{ value: "Số lượt tàu", angle: -90, position: 'insideLeft', fill: C.muted, fontSize: 11, dx: -5 }} />
            <Tooltip content={<Tip />} cursor={{ fill: `${C.accent}10` }} />
            <Legend wrapperStyle={{fontSize: 11, color: C.muted, paddingTop: 10}} />
            <Bar dataKey="Hạ Long" stackId="a" fill={C.accent} name="Hạ Long" />
            <Bar dataKey="Phú Mỹ" stackId="a" fill={C.india} name="Phú Mỹ" />
            <Bar dataKey="Chân Mây" stackId="a" fill={C.green} name="Chân Mây" />
            <Bar dataKey="Nha Trang" stackId="a" fill={C.purple} name="Nha Trang" radius={[4, 4, 0, 0]}/>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <H2>Thời gian đặt trước trung bình (Booking Lead-time)</H2>
      <Card>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
                <tr>
                    <th style={{...thStyle, width: "15%"}}>Persona</th>
                    <th style={{...thStyle, width: "25%"}}>Lead time</th>
                    <th style={thStyle}>Insight chính</th>
                </tr>
            </thead>
            <tbody>
                {leadTimeData.map((row, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                        <td style={{...tdStyle, color: C.text, fontWeight: 600}}>{row.p}</td>
                        <td style={{...tdStyle, color: C.accent, fontWeight: 500}}>{row.time}</td>
                        <td style={{...tdStyle, color: C.muted}}>{row.insight}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </Card>
    </>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "8px",
  color: C.muted,
  borderBottom: `2px solid ${C.border}`,
  textTransform: 'uppercase',
  fontSize: 10,
  letterSpacing: '0.5px'
};

const tdStyle = {
  padding: "10px 8px",
  verticalAlign: 'middle',
};
