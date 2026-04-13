import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { C } from "../data/colors.js";
import { countryData, quarterlyData } from "../data/index.js";
import { fmt } from "../utils.js";
import H2 from "../components/H2.jsx";
import Card from "../components/Card.jsx";
import Tip from "../components/Tip.jsx";

export default function Quarterly() {
  return (
    <>
      <H2>So sánh Q1–Q3</H2>
      <Card>
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={quarterlyData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="quarter" tick={{ fill: C.muted, fontSize: 10 }} />
            <YAxis tickFormatter={fmt} tick={{ fill: C.muted, fontSize: 10 }} />
            <Tooltip content={<Tip />} />
            <Legend wrapperStyle={{ fontSize: 10 }} />
            <Bar dataKey="Trung Quốc"  fill={C.china}       radius={[3, 3, 0, 0]} />
            <Bar dataKey="Hàn Quốc"    fill={C.korea}       radius={[3, 3, 0, 0]} />
            <Bar dataKey="Nhật Bản"    fill={C.japan}       radius={[3, 3, 0, 0]} />
            <Bar dataKey="Ấn Độ"       fill={C.india}       radius={[3, 3, 0, 0]} />
            <Bar dataKey="Thái Lan"    fill={C.thailand}    radius={[3, 3, 0, 0]} />
            <Bar dataKey="Philippines" fill={C.philippines} radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <H2>Phân bổ theo quý</H2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 10 }}>
        {countryData.map(c => {
          const total = c.q1 + c.q2 + c.q3;
          return (
            <Card key={c.name} style={{ padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 12 }}>{c.flag} {c.name}</span>
                <span style={{ color: c.growth >= 0 ? C.green : C.red, fontWeight: 700, fontSize: 11 }}>
                  {c.growth > 0 ? "+" : ""}{c.growth}%
                </span>
              </div>
              <div style={{ display: "flex", height: 20, borderRadius: 5, overflow: "hidden", marginBottom: 4 }}>
                <div style={{ width: `${(c.q1 / total) * 100}%`, background: c.color, opacity: 0.5 }} />
                <div style={{ width: `${(c.q2 / total) * 100}%`, background: c.color, opacity: 0.75 }} />
                <div style={{ width: `${(c.q3 / total) * 100}%`, background: c.color }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: C.muted }}>
                <span>Q1: {fmt(c.q1)}</span>
                <span>Q2: {fmt(c.q2)}</span>
                <span>Q3: {fmt(c.q3)}</span>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
