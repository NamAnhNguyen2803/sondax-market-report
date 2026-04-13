import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import { C } from "../data/colors.js";
import { countryData } from "../data/index.js";
import { fmt } from "../utils.js";
import H2 from "../components/H2.jsx";
import Card from "../components/Card.jsx";

const tableHeaders = ["#", "Quốc gia", "9T/2025", "YoY", "%", "Q1", "Q2", "Q3"];

export default function Country() {
  const pieData = [...countryData, { name: "Khác", share: 43.2, color: "#475569" }];

  return (
    <>
      <H2>Bảng xếp hạng 6 thị trường</H2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, background: C.card, borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}`, fontSize: 11 }}>
          <thead>
            <tr style={{ background: "#1a2744" }}>
              {tableHeaders.map((h, i) => (
                <th key={i} style={{ padding: "8px 10px", textAlign: i > 1 ? "right" : "left", color: C.muted, fontWeight: 600, borderBottom: `1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {countryData.map((c, i) => (
              <tr key={i}>
                <td style={{ padding: "8px 10px", color: C.muted, fontWeight: 700 }}>{i + 1}</td>
                <td style={{ padding: "8px 10px", fontWeight: 600 }}>{c.flag} {c.name}</td>
                <td style={{ padding: "8px 10px", textAlign: "right", fontWeight: 700 }}>{c.total9m.toLocaleString("vi-VN")}</td>
                <td style={{ padding: "8px 10px", textAlign: "right", fontWeight: 700, color: c.growth >= 0 ? C.green : C.red }}>{c.growth > 0 ? "+" : ""}{c.growth}%</td>
                <td style={{ padding: "8px 10px", textAlign: "right" }}>{c.share}%</td>
                <td style={{ padding: "8px 10px", textAlign: "right", color: C.muted }}>{fmt(c.q1)}</td>
                <td style={{ padding: "8px 10px", textAlign: "right", color: C.muted }}>{fmt(c.q2)}</td>
                <td style={{ padding: "8px 10px", textAlign: "right", color: C.muted }}>{fmt(c.q3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Tăng trưởng YoY</H2>
      <Card>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={countryData.map(c => ({ name: c.name, growth: c.growth }))} layout="vertical"
            margin={{ top: 5, right: 30, left: 70, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis type="number" tick={{ fill: C.muted, fontSize: 10 }} unit="%" />
            <YAxis dataKey="name" type="category" tick={{ fill: C.muted, fontSize: 10 }} width={75} />
            <Tooltip formatter={v => `${v}%`} contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8 }} labelStyle={{ color: C.text }} itemStyle={{ color: C.text }} />
            <Bar dataKey="growth" radius={[0, 6, 6, 0]}>
              {countryData.map((c, i) => <Cell key={i} fill={c.growth >= 0 ? C.green : C.red} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <H2>Thị phần</H2>
      <Card>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={105} innerRadius={50}
              dataKey="share" nameKey="name"
              label={({ name, share }) => `${name}: ${share.toFixed(1)}%`}
              labelLine={{ stroke: C.muted }}>
              {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
            <Tooltip formatter={v => `${v}%`} contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8 }} />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </>
  );
}
