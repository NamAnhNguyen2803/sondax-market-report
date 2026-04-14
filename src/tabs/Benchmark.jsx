import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { C } from "../data/colors.js";
import H2 from "../components/H2.jsx";
import Card from "../components/Card.jsx";

const categories = [
  { id: "city", name: "A. City Tours" },
  { id: "cruise", name: "B. Hạ Long Cruise" },
  { id: "shoreex", name: "C. Shore-ex" },
  { id: "multiday", name: "D. Multi-day" },
];

const benchmarkData = {
  city: [
    { exemplar: "Chef's Tour HN (4.9★)", price: "$65–95", platform: "Viator/TripAdvisor", signal: "Trải nghiệm ẩm thực cao cấp" },
    { exemplar: "Back of Bike HCM (4.9★)", price: "$65–95", platform: "TripAdvisor", signal: "Tour xe máy độc đáo, an toàn" },
    { exemplar: "Lớp học nấu ăn", price: "$30–50", platform: "Klook/Airbnb", signal: "Tương tác văn hóa, giá dễ tiếp cận" },
  ],
  cruise: [
    { exemplar: "Paradise Cruises", price: "$250–400", platform: "Website/Booking.com", signal: "Tàu lớn, nhiều hoạt động" },
    { exemplar: "Orchid Cruises", price: "$320–500", platform: "Agoda/Website", signal: "Tàu mới, bể bơi, ban công riêng" },
    { exemplar: "Heritage Line Y-Vân", price: "$600–900", platform: "Website/Luxury Agents", signal: "Du thuyền boutique, siêu sang" },
  ],
  shoreex: [
    { exemplar: "Hà Nội từ cảng Hạ Long", price: "$120–250", platform: "Viator/Cruise Critic", signal: "Yêu cầu cao về logistics, thời gian" },
    { exemplar: "Huế/Hội An từ Chân Mây", price: "$130–280", platform: "Viator/Tàu", signal: "Đòi hỏi hướng dẫn viên chất lượng" },
    { exemplar: "Nha Trang/Đà Lạt từ Nha Trang", price: "$90-200", platform: "Klook/Tàu", signal: "Cạnh tranh cao, cần khác biệt" },
  ],
  multiday: [
    { exemplar: "Intrepid 8-10 ngày", price: "$1,100–1,600", platform: "Website/Agents", signal: "Nhóm nhỏ, tập trung vào trải nghiệm" },
    { exemplar: "G Adventures", price: "$900-1,500", platform: "Website/Agents", signal: "Thiên về giới trẻ, phiêu lưu" },
    { exemplar: "Audley Travel (custom)", price: "$4,000–8,000+", platform: "Luxury Agents", signal: "Cá nhân hóa tuyệt đối, dịch vụ 6 sao" },
  ],
};

const priceCurveData = [
  { name: "Luxury private", range: [4000, 14000], color: C.purple, label: "$4K–14K" },
  { name: "Multi-day 8–10D", range: [1100, 2500], color: C.orange, label: "$1.1K–2.5K" },
  { name: "Overnight cruise", range: [200, 900], color: C.green, label: "$200–900" },
  { name: "Shore-ex", range: [120, 280], color: C.india, label: "$120–280" },
  { name: "Day tour", range: [30, 95], color: C.accent, label: "$30–95" },
  { name: "Free tip", range: [0, 0], color: C.muted, label: "$0" },
];

const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value, payload } = props;
  const isGap = payload.gap;
  if (isGap) return null;

  return (
    <g>
      <text x={x + width - 10} y={y + height / 2} fill={C.text} textAnchor="end" dominantBaseline="middle" fontSize={10} fontWeight={600}>
        {payload.label}
      </text>
    </g>
  );
};


export default function BenchmarkTab() {
  const [activeCategory, setActiveCategory] = useState("city");

  return (
    <>
      <H2>Phân tích đối thủ và khoảng trống thị trường</H2>
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
                outline: "none"
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, width: '30%' }}>Sản phẩm mẫu (Exemplar)</th>
              <th style={{ ...thStyle, width: '15%' }}>Khoảng giá</th>
              <th style={{ ...thStyle, width: '20%' }}>Nền tảng</th>
              <th style={{ ...thStyle, width: '35%' }}>Tín hiệu khoảng trống (Whitespace)</th>
            </tr>
          </thead>
          <tbody>
            {benchmarkData[activeCategory].map((item, index) => (
              <tr key={index} style={{ borderBottom: `1px solid ${C.border}` }}>
                <td style={tdStyle}>{item.exemplar}</td>
                <td style={tdStyle}>{item.price}</td>
                <td style={tdStyle}>{item.platform}</td>
                <td style={tdStyle}>{item.signal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <H2>Đường cong giá trị và các khoảng trống</H2>
      <Card>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={priceCurveData}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
            <XAxis type="number" scale="log" domain={[10, 20000]} tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fill: C.muted, fontSize: 11 }} width={110} axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ fill: `${C.accent}10` }}
              contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: C.text }}
              formatter={(value, name, props) => [`$${props.payload.range[0].toLocaleString()} - $${props.payload.range[1].toLocaleString()}`, "Khoảng giá"]}
            />
            <Bar dataKey="range[1]" name="Mức giá tối đa" barSize={25} radius={[0, 8, 8, 0]}>
              {priceCurveData.map((entry, index) => (
                <Bar key={`bar-${index}`} dataKey="range[1]" fill={entry.color} style={{ stroke: entry.gap ? C.muted : "none", strokeDasharray: "4 4", strokeWidth: 1 }} />
              ))}
              <LabelList dataKey="label" position="right" content={renderCustomizedLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
         <div style={{fontSize: 10, color: C.muted, textAlign: "center", marginTop: 8}}>Ghi chú: Các khoảng trống (gap) được thể hiện bằng đường viền nét đứt. Trục X ở thang logarit để dễ hình dung.</div>
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
  color: C.text,
  verticalAlign: 'top',
};
