import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";
import { C } from "../data/colors.js";
import KPI from "../components/KPI.jsx";
import H2 from "../components/H2.jsx";
import Card from "../components/Card.jsx";

const timelineData = [
  { name: "A5 kickoff", date: "Jun 15", color: C.orange },
  { name: "A1 kickoff", date: "Jul 6", color: C.accent },
  { name: "A3 kickoff", date: "Aug 17", color: C.green },
  { name: "A5 LIVE", date: "Sep 1", color: C.orange, bold: true },
  { name: "A1 LIVE", date: "Oct 1", color: C.accent, bold: true },
  { name: "A3 LIVE", date: "Nov 15", color: C.green, bold: true },
];

const budgetData = [
  { name: "A5 PH Barkada", min: 3, max: 6, range: [3, 6] },
  { name: "A3 Cruise-Extend", min: 3, max: 8, range: [3, 8] },
  { name: "A1 Winter Escape", min: 8, max: 20, range: [8, 20] },
];

const RangeBar = (props) => {
  const { fill, x, y, width, height, payload } = props;
  const { min, max } = payload;
  const total = 20; // Hardcoded max for now
  const yMin = y + height * (1 - max / total);
  const yMax = y + height * (1 - min / total);
  return <rect x={x} y={yMin} width={width} height={yMax - yMin} fill={fill} />;
};


const roadmapData = {
  A3: {
    color: C.green,
    name: "A3 Cruise-Extend",
    kpis: [
      { label: "Launch Date", value: "Nov 15" },
      { label: "Booking Target", value: "150" },
      { label: "Review Target", value: "25" },
    ],
    workstreams: ["Product build", "Listing+content", "Cruise-line (Year2)", "Paid marketing"],
  },
  A1: {
    color: C.accent,
    name: "A1 Winter Escape",
    kpis: [
      { label: "Launch Date", value: "Oct 1" },
      { label: "Booking Target", value: "300" },
      { label: "Review Target", value: "50" },
    ],
    workstreams: ["Product build", "Listing+content", "Review velocity", "Paid marketing"],
  },
  A5: {
    color: C.orange,
    name: "A5 PH Barkada",
    kpis: [
      { label: "Launch Date", value: "Sep 1" },
      { label: "Booking Target", value: "100" },
      { label: "Review Target", value: "20" },
    ],
    workstreams: ["Product build", "Listing+content", "TikTok+influencer", "Paid marketing"],
  },
};

const crossBundleData = [
    { from: "A1", to: "A2", opportunity: "Upsell opportunity" },
    { from: "A3", to: "A1", opportunity: "Upsell opportunity" },
    { from: "A3", to: "A2", opportunity: "Upsell opportunity" },
    { from: "A5", to: "A6", opportunity: "Upsell opportunity" },
    { from: "A4", to: "A1", opportunity: "Upsell opportunity" },
];

export default function GTMRoadmapTab() {
  return (
    <>
      <H2>Chuỗi sự kiện ra mắt</H2>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 0" }}>
          {timelineData.map((item, index) => (
            <div key={index} style={{ flex: 1, textAlign: "center", borderTop: `3px solid ${item.color}`, paddingTop: 8, position: "relative" }}>
              <div style={{ fontSize: 11, color: C.muted }}>{item.date}</div>
              <div style={{ fontSize: 13, color: C.text, fontWeight: item.bold ? 700 : 400 }}>{item.name}</div>
              <div style={{ position: "absolute", top: -8, left: '50%', transform: "translateX(-50%)", width: 12, height: 12, borderRadius: "50%", background: item.color, border: `2px solid ${C.card}` }}></div>
            </div>
          ))}
        </div>
      </Card>

      <H2>Phân bổ ngân sách theo Archetype (Ước tính)</H2>
      <Card>
          <ResponsiveContainer width="100%" height={250}>
              <BarChart data={budgetData} layout="vertical" margin={{ top: 20, right: 50, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis type="number" unit="K" domain={[0, 22]} tick={{ fill: C.muted, fontSize: 10 }} />
                  <YAxis type="category" dataKey="name" width={110} tick={{ fill: C.text, fontSize: 12 }} />
                  <Tooltip
                      contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8 }}
                      labelStyle={{ color: C.text }}
                      formatter={(value, name, props) => [`$${props.payload.min}K–$${props.payload.max}K`, "Range"]}
                  />
                  <Bar dataKey="range" fill={C.accent} shape={<RangeBar />}>
                     <LabelList dataKey="name" position="right" formatter={(value, name, props) => `$${props.payload.min}K–$${props.payload.max}K`} style={{fill: C.text, fontSize: 12}} />
                  </Bar>
              </BarChart>
          </ResponsiveContainer>
          <div style={{textAlign: 'right', color: C.text, fontWeight: 'bold', marginTop: '10px'}}>Total: $14–34K</div>
      </Card>

      <H2>Lộ trình thực thi chi tiết</H2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 16 }}>
        {Object.values(roadmapData).map((roadmap, i) => (
          <Card key={i} style={{ borderTop: `4px solid ${roadmap.color}` }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 12 }}>{roadmap.name}</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {roadmap.kpis.map((kpi, j) => (
                <div key={j} style={{ flex: 1, background: C.bg, borderRadius: 6, padding: "8px 10px", textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase" }}>{kpi.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{kpi.value}</div>
                </div>
              ))}
            </div>
             <div style={{fontSize: 12, color: C.muted, display: 'grid', gridTemplateColumns: '1fr 50px 50px 50px', alignItems: 'center', gap: 4, marginBottom: 8, textAlign: 'center'}}>
                <div>Workstream</div>
                <div>M1</div>
                <div>M2</div>
                <div>M3</div>
            </div>
            {roadmap.workstreams.map((ws, j) => (
              <div key={j} style={{ display: 'grid', gridTemplateColumns: '1fr 50px 50px 50px', alignItems: 'center', background: C.bg, borderRadius: 4, padding: "8px 10px", marginBottom: 5, fontSize: 12, color: C.text, gap: 4, textAlign: 'center' }}>
                <div style={{textAlign: 'left'}}>{ws}</div>
                <div style={{background: C.border, height: 20, borderRadius: 4}}></div>
                <div style={{background: C.border, height: 20, borderRadius: 4}}></div>
                <div style={{background: C.border, height: 20, borderRadius: 4}}></div>
              </div>
            ))}
          </Card>
        ))}
      </div>

      <H2>Cross-Bundle Opportunities</H2>
      <Card>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16}}>
            {crossBundleData.map((item, i) => (
                <div key={i} style={{background: C.bg, borderRadius: 8, padding: 12, textAlign: 'center'}}>
                    <span style={{color: C.accent, fontWeight: 'bold'}}>{item.from}</span>
                    <span style={{color: C.muted}}> → </span>
                    <span style={{color: C.green, fontWeight: 'bold'}}>{item.to}</span>
                    <div style={{fontSize: 11, color: C.muted, marginTop: 4}}>{item.opportunity}</div>
                </div>
            ))}
        </div>
      </Card>
    </>
  );
}
