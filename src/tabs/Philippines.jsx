import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { C } from "../data/colors.js";
import { fmt } from "../utils.js";
import KPI from "../components/KPI.jsx";
import H2 from "../components/H2.jsx";
import Card from "../components/Card.jsx";
import Badge from "../components/Badge.jsx";
import Tip from "../components/Tip.jsx";

export default function PhilippinesTab() {
  const outboundGrowthData = [
    { year: "2023", pax: 90000 },
    { year: "2024", pax: 175000 },
    { year: "2025", pax: 210000 },
    { year: "2027", pax: 280000 },
  ];

  const personaMixData = [
    { name: "P3 Short-haul", value: 25, color: C.accent },
    { name: "P5 Gen-Z", value: 25, color: C.green },
    { name: "P6 Family", value: 20, color: C.india },
    { name: "P4 Nomad", value: 10, color: C.orange },
    { name: "Khác", value: 20, color: C.muted },
  ];

  return (
    <>
      <H2>Tổng quan thị trường Philippines</H2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <KPI label="Khách 2024" value="175K pax" sub="+95% YoY" />
        <KPI label="Mùa cao điểm" value="55%" sub="Tháng 10 - Tháng 3" />
        <KPI label="Kênh OTA chính" value="Klook PH" sub="Độc chiếm thị trường" />
      </div>

      <H2>Tăng trưởng khách outbound PH 2023-2027</H2>
      <Card>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart
            data={outboundGrowthData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="year" tick={{ fill: C.muted, fontSize: 12 }} />
            <YAxis tickFormatter={(value) => fmt(value)} tick={{ fill: C.muted, fontSize: 12 }} />
            <Tooltip content={<Tip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: C.muted, paddingTop: 10 }} />
            <Area type="monotone" dataKey="pax" stroke={C.accent} fill={C.accent + "40"} name="Lượt khách" />
            <Line type="monotone" dataKey="pax" stroke={C.accent} strokeWidth={2} name="Lượt khách" />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      <H2>Cơ cấu persona PH</H2>
      <Card>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={personaMixData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill={C.purple}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {personaMixData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<Tip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: C.muted, paddingTop: 10 }} />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <H2>8 đòn bẩy bản địa hóa</H2>
      <Card>
        <div style={{ fontSize: 14, color: C.text, marginBottom: 10, fontWeight: 700 }}>Các yếu tố cần cân nhắc để bản địa hóa thị trường Philippines:</div>
        <ul style={{ color: C.muted, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
          <li><strong style={{ color: C.text }}>Ngôn ngữ:</strong> Tiếng Anh + thành ngữ địa phương (barkada/tropa)</li>
          <li><strong style={{ color: C.text }}>Giá cả:</strong> Định giá bằng Peso Philippines</li>
          <li><strong style={{ color: C.text }}>Kênh phân phối:</strong> Klook PH, Traveloka, Facebook Messenger</li>
          <li><strong style={{ color: C.text }}>Gia đình:</strong> Tôn trọng lịch Công giáo địa phương</li>
          <li><strong style={{ color: C.text }}>Ăn uống:</strong> Cung cấp lựa chọn Halal (đặc biệt tại Mindanao)</li>
          <li><strong style={{ color: C.text }}>Thanh toán:</strong> Hỗ trợ GCash/PayMaya</li>
          <li><strong style={{ color: C.text }}>Niềm tin:</strong> Phản hồi Facebook trong vòng 3 giờ</li>
          <li><strong style={{ color: C.text }}>Mạng xã hội:</strong> Hợp tác với KOLs Philippines</li>
        </ul>
      </Card>

      <H2>Ưu tiên kênh OTA</H2>
      <Card>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <Badge color={C.accent}>Klook PH</Badge>
          <Badge color={C.green}>Traveloka</Badge>
          <Badge color={C.orange}>Facebook Messenger</Badge>
          <Badge color={C.muted}>Booking.com</Badge>
        </div>
      </Card>
    </>
  );
}
