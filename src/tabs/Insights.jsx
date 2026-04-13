import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { C } from "../data/colors.js";
import H2 from "../components/H2.jsx";
import Card from "../components/Card.jsx";

const gapData = [
  { name: "Khách QT",    r: 20.4 },
  { name: "DT Lưu trú",  r: 14.8 },
  { name: "DT Lữ hành",  r: 20.5 },
];
const gapColors = [C.accent, C.india, C.green];

const strategies = [
  { icon: "🏥", title: "Medical/Wellness = Mỏ vàng", desc: "$700M→$4B. Chi phí VN rẻ gấp nhiều lần. 15 BV chuẩn QT. Concierge y tế thay vì bán vé." },
  { icon: "💒", title: "Wedding/MICE Ấn Độ",         desc: "1M khách mục tiêu. MakeMyTrip+Sun Group. Giải Jain food = chiến thắng." },
  { icon: "🌙", title: "Kinh tế đêm",                 desc: "Dinner & Show. 750 đêm pháo hoa PQ. 3D mapping Hà Nội. Arbitrage vé sỉ." },
  { icon: "📡", title: "Nền tảng may đo",             desc: "TQ: XHS/Douyin. HQ: Naver/Kakao. IN: MakeMyTrip. VN: Zalo/MoMo/Visit Vietnam." },
  { icon: "💳", title: "QR xuyên biên giới",          desc: "Alipay/WeChat Pay/PromptPay ↔ NAPAS. Xóa ma sát → kích impulse buy." },
  { icon: "🔄", title: "OTA → Direct",                desc: "OTA = branding giai đoạn đầu. Mini App + Visit Vietnam = sở hữu data + tối ưu LTV." },
];

export default function Insights() {
  return (
    <>
      <H2>Thị trường đột phá mùa hè 2025</H2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 12 }}>
        <div style={{ background: `linear-gradient(135deg,${C.card} 0%,#2d1a1a 100%)`, borderRadius: 12, padding: 20, border: `1px solid ${C.china}40` }}>
          <div style={{ fontSize: 10, color: C.china, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>🏆 Dung lượng</div>
          <div style={{ fontSize: 20, fontWeight: 800, margin: "6px 0 4px" }}>🇨🇳 Trung Quốc</div>
          <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>Q3 ~1.2M lượt, +~50% YoY. Vượt HQ lên #1. Chi tiêu: mua sắm → trải nghiệm. B2B → FIT Gen Z.</div>
        </div>
        <div style={{ background: `linear-gradient(135deg,${C.card} 0%,#1a2420 100%)`, borderRadius: 12, padding: 20, border: `1px solid ${C.accent}40` }}>
          <div style={{ fontSize: 10, color: C.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>🚀 Tỷ lệ %</div>
          <div style={{ fontSize: 20, fontWeight: 800, margin: "6px 0 4px" }}>🇵🇭 Philippines</div>
          <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>+93% YoY. Fintech booking Klook+GCash. Từ SG/HK sang VN.</div>
        </div>
      </div>

      <H2>Nghịch lý Volume vs Value</H2>
      <Card>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 280px" }}>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={gapData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="name" tick={{ fill: C.muted, fontSize: 9 }} />
                <YAxis unit="%" tick={{ fill: C.muted, fontSize: 9 }} />
                <Tooltip formatter={v => `+${v}%`} contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8 }} />
                <Bar dataKey="r" radius={[6, 6, 0, 0]}>
                  {gapColors.map((c, i) => <Cell key={i} fill={c} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ flex: "1 1 240px", fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
            <p style={{ margin: "0 0 8px" }}><strong style={{ color: C.text }}>Gap:</strong> Khách +20.4% nhưng DT lưu trú chỉ +14.8%.</p>
            <p style={{ margin: 0 }}><strong style={{ color: C.text }}>Giải pháp:</strong> Chuyển sang wellness/medical ($4B by 2033), wedding MICE Ấn Độ, kinh tế đêm. OTA → Direct pipeline. Cá nhân hóa theo thị trường.</p>
          </div>
        </div>
      </Card>

      <H2>Tổng hợp chiến lược 2026</H2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 10 }}>
        {strategies.map((item, i) => (
          <Card key={i} style={{ padding: 16 }}>
            <div style={{ fontSize: 24, marginBottom: 4 }}>{item.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>{item.desc}</div>
          </Card>
        ))}
      </div>
    </>
  );
}
