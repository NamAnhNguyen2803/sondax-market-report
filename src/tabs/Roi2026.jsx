import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { C } from "../data/colors.js";
import H2 from "../components/H2.jsx";
import Card from "../components/Card.jsx";
import KPI from "../components/KPI.jsx";

const marginData = [
  { name: "Mass Tours",       margin: 5,  roi: "Thấp",      color: C.red },
  { name: "Private Tours",    margin: 25, roi: "Cao",       color: C.accent },
  { name: "Wedding/MICE",     margin: 35, roi: "Rất cao",   color: C.india },
  { name: "Wellness/Medical", margin: 45, roi: "Đỉnh cao",  color: C.green },
  { name: "Night Economy",    margin: 40, roi: "Rất cao",   color: C.purple },
];

const hotspots = [
  { border: C.red,    title: "🚌 Mass Tours",                        tag: "Báo động đỏ",     tagColor: C.red,    desc: "Biên LN mỏng, bị ép bởi OTA 15-30%. Chi phí nhiên liệu + cước bay nội địa tăng. Chỉ sống sót bằng volume khổng lồ.", strong: "Khuyến nghị: Giảm tỷ trọng, chuyển dịch sang premium." },
  { border: C.accent, title: "🚴 Private Personalized Tours",        tag: "Travel Deeper",   tagColor: C.accent, desc: "Tour đạp xe bản làng, sinh thái, ẩm thực riêng. Elasticity of demand thấp → khách trả premium. Dễ chuyển chi phí tăng sang khách. Biên LN ròng hai con số.", strong: "Phân phối qua GetYourGuide/Viator cho khách Âu/Mỹ." },
  { border: C.green,  title: "🏥 Medical/Wellness Tourism",          tag: "Mỏ vàng $4B",     tagColor: C.green,  desc: "$700M (2024) → $4B (2033), CAGR 18%. Lợi thế chi phí: tim mạch, IVF, nha khoa, thẩm mỹ rẻ hơn gấp nhiều lần vs Mỹ/Thái. Bộ Y tế: 15 BV đạt chuẩn QT.", strong: "Chuyển từ bán vé → concierge y tế: phiên dịch, phòng phục hồi, vận chuyển chuyên dụng. Biên LN vượt trội." },
  { border: C.india,  title: "💒 Wedding/MICE Ấn Độ",                tag: "Siêu lợi nhuận",  tagColor: C.india,  desc: "50+ đám cưới Đà Nẵng 2025. Tỷ phú Ấn Độ thuê trọn resort 5 sao Phú Quốc. MakeMyTrip + Sun Group liên minh. Nhu cầu Jain/chay chuyên biệt = rào cản → ai giải được = lợi thế.", strong: "ROI cực cao: mỗi event = trăm phòng × nhiều đêm × dịch vụ premium." },
  { border: C.purple, title: "🌙 Night Economy",                     tag: "Biên LN cao",     tagColor: C.purple, desc: "Travel + Leisure: VN redefining after-dark Asia. Sunset Town Phú Quốc: 750 đêm pháo hoa + Symphony/Kiss of the Sea. Hà Nội: Tinh Hoa Bắc Bộ, 3D mapping Hoàng Thành, Văn Miếu tour đêm.", strong: 'Chiến lược: Gói "Dinner & Show" kết hợp nhà hàng + vé VIP → arbitrage mua sỉ = biên gộp khổng lồ.' },
];

const preTripList  = ["Du thuyền Hạ Long, vé bay, tàu hỏa, trekking Sapa", "OTA mạnh: GetYourGuide, Klook, Viator", "Khách chấp nhận giá cao hơn → an tâm hoàn hủy", "TQ: 50-60 ngày trước (Xiaohongshu)", "Âu/Mỹ: hàng tháng trước (Viator/GYG)"];
const onTripList   = ["Ẩm thực, café, spa, tour ngắn ngày (Củ Chi, thuyền thúng)", "Quyết định theo thời tiết + tâm trạng", "Google Maps, lễ tân KS, TikTok link, Grab", "Du lịch hè VN rút ngắn: 3-4 đêm → ưu tiên tự phát", "Flash sale livestream kích chốt đơn ngay"];

export default function Roi2026() {
  return (
    <>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
        <KPI icon="🎯" label="Mục tiêu 2026"     value="25M QT"       sub="150M nội địa" />
        <KPI icon="🏥" label="Medical Tourism"   value="$700M → $4B"  sub="CAGR 18% đến 2033" />
        <KPI icon="🌙" label="Kinh tế đêm"       value="Bùng nổ"      sub="Pháo hoa 750 đêm Phú Quốc" />
        <KPI icon="📈" label="Kinh tế số VN"     value="$80B by 2030" sub="Smartphone 87%" />
      </div>

      <H2>So sánh biên lợi nhuận theo loại hình dịch vụ</H2>
      <Card>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={marginData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="name" tick={{ fill: C.muted, fontSize: 10 }} />
            <YAxis unit="%" tick={{ fill: C.muted, fontSize: 10 }}
              label={{ value: "Biên LN ước tính", angle: -90, position: "insideLeft", fill: C.muted, fontSize: 10 }} />
            <Tooltip formatter={v => `~${v}%`}
              contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8 }}
              labelStyle={{ color: C.text }} itemStyle={{ color: C.text }} />
            <Bar dataKey="margin" name="Biên LN" radius={[6, 6, 0, 0]}>
              {marginData.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <H2>Phân tích chi tiết từng Profit Hotspot</H2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 10 }}>
        {hotspots.map((h, i) => (
          <Card key={i} style={{ borderLeft: `4px solid ${h.border}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>
              {h.title} – <span style={{ color: h.tagColor }}>{h.tag}</span>
            </div>
            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.7 }}>
              {h.desc} <strong style={{ color: C.text }}>{h.strong}</strong>
            </div>
          </Card>
        ))}
      </div>

      <H2>Lead Time: Pre-trip vs On-trip</H2>
      <Card style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 14 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.accent, marginBottom: 8 }}>✈️ Pre-trip (đặt trước)</div>
          {preTripList.map((b, i) => (
            <div key={i} style={{ fontSize: 11, color: C.muted, lineHeight: 1.7, paddingLeft: 10, borderLeft: `2px solid ${C.accent}40`, marginBottom: 3 }}>{b}</div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.orange, marginBottom: 8 }}>📍 On-trip (tại điểm đến)</div>
          {onTripList.map((b, i) => (
            <div key={i} style={{ fontSize: 11, color: C.muted, lineHeight: 1.7, paddingLeft: 10, borderLeft: `2px solid ${C.orange}40`, marginBottom: 3 }}>{b}</div>
          ))}
        </div>
      </Card>

      <H2>Khuyến nghị phân bổ nguồn lực chiến lược</H2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 10 }}>
        <Card style={{ background: `${C.green}08`, border: `1px solid ${C.green}30` }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.green, marginBottom: 8 }}>🎯 Dịch vụ trọng tâm</div>
          <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.7 }}>
            Rời mass tour giá rẻ. Phát triển Medical/Wellness Tourism + B2B với BV/thẩm mỹ. Sản phẩm cá nhân hóa cho khách Ấn Độ (wedding, Jain food). Gói Dinner & Show kinh tế đêm.
          </div>
        </Card>
        <Card style={{ background: `${C.accent}08`, border: `1px solid ${C.accent}30` }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.accent, marginBottom: 8 }}>📡 Nền tảng trọng tâm</div>
          <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.7 }}>
            OTA = biển hiệu (branding) → duy trì. Dồn lực vào Zalo Mini App + MoMo + tích hợp Visit Vietnam Q2/2026. SEO Naver cho khách HQ. KOC TikTok/XHS cho khách TQ. MakeMyTrip cho khách Ấn Độ.
          </div>
        </Card>
      </div>
    </>
  );
}
