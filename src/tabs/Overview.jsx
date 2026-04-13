import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Line, ComposedChart, Area,
} from "recharts";
import { C } from "../data/colors.js";
import { countryData, monthlyTotal, transportData, transportColors } from "../data/index.js";
import { fmt } from "../utils.js";
import KPI from "../components/KPI.jsx";
import H2 from "../components/H2.jsx";
import Card from "../components/Card.jsx";
import Tip from "../components/Tip.jsx";

export default function Overview() {
  return (
    <>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
        <KPI icon="✈️" label="Khách 9T/2025"    value="15.4 triệu"     sub="+21.5% YoY" />
        <KPI icon="🌏" label="Châu Á"            value="78.6%"          sub="~16.6M cả năm" />
        <KPI icon="💰" label="Thu 2025"           value="1 triệu tỷ ₫"  sub="~39 tỷ USD" />
        <KPI icon="🎯" label="Mục tiêu 2026"     value="25 triệu QT"    sub="DT ~1,125 triệu tỷ ₫" />
      </div>

      <H2>Lượng khách theo quốc gia (9T/2025)</H2>
      <Card>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={countryData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="name" tick={{ fill: C.muted, fontSize: 10 }} />
            <YAxis tickFormatter={fmt} tick={{ fill: C.muted, fontSize: 10 }} />
            <Tooltip content={<Tip />} />
            <Bar dataKey="total9m" name="Tổng 9T" radius={[6, 6, 0, 0]}>
              {countryData.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <H2>Phương thức vận tải</H2>
      <Card style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ flex: "1 1 240px", minHeight: 220 }}>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={transportData} cx="50%" cy="50%" outerRadius={85} innerRadius={45} dataKey="value"
                label={({ pct }) => `${pct}%`} labelLine={false}>
                {transportData.map((_, i) => <Cell key={i} fill={transportColors[i]} />)}
              </Pie>
              <Tooltip content={<Tip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: "1 1 160px" }}>
          {transportData.map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: transportColors[i] }} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{t.name}</div>
                <div style={{ fontSize: 10, color: C.muted }}>{t.value.toLocaleString("vi-VN")} ({t.pct}%)</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <H2>Lượng khách theo tháng</H2>
      <Card>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={monthlyTotal} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={C.accent} stopOpacity={0.3} />
                <stop offset="100%" stopColor={C.accent} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="month" tick={{ fill: C.muted, fontSize: 10 }} />
            <YAxis tickFormatter={fmt} tick={{ fill: C.muted, fontSize: 10 }} />
            <Tooltip content={<Tip />} />
            <Area type="monotone" dataKey="v" fill="url(#ag)" stroke="none" name="Khách" />
            <Line type="monotone" dataKey="v" stroke={C.accent} strokeWidth={2.5} dot={{ fill: C.accent, r: 3 }} name="Khách" />
          </ComposedChart>
        </ResponsiveContainer>
        <p style={{ fontSize: 10, color: C.muted, textAlign: "center", marginTop: 4 }}>
          T1&T3 đỉnh Tết · T8 đỉnh hè 1.68M · T9 thấp nhất nhưng +19.5%
        </p>
      </Card>
    </>
  );
}
