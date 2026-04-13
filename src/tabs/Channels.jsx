import { C } from "../data/colors.js";
import H2 from "../components/H2.jsx";
import Card from "../components/Card.jsx";
import KPI from "../components/KPI.jsx";
import Badge from "../components/Badge.jsx";

const platformMatrix = [
  { g: "Global OTA",          s: "40-50%", p: "Klook, Traveloka, Trip.com, GetYourGuide",          d: "Theme parks, Vé tham quan, Tour đại trà",     f: "15-30%",           color: C.red },
  { g: "Lifestyle & Discovery",s: "20-30%", p: "Google Maps, TripAdvisor, Xiaohongshu, Naver",       d: "Ẩm thực, Café, Spa, Wellness",               f: "CPC / Quảng cáo",  color: C.orange },
  { g: "Direct & Social",      s: "20-25%", p: "Zalo Mini App, MoMo, Visit Vietnam, Website",         d: "Tour cá nhân, Y tế, Khách trung thành",       f: "Thấp (phí cổng TT)",color: C.green },
];

const miniApps = [
  { name: "Zalo Mini App",              desc: "75M user. Thanh toán tích hợp. OA chăm sóc tự động",                        color: C.accent },
  { name: "MoMo",                       desc: "34M user, ~70% thị phần ví ĐT. Cửa hàng số trong app",                      color: C.purple },
  { name: "Visit Vietnam (Q2/2026)",    desc: "VNAT + NDA + Sun Group. AI lịch trình + blockchain xác thực",               color: C.green },
];

const miniAppAdvantages = [
  "Phí xử lý chỉ vài % (vs 15-30% OTA)",
  "Giảm thao tác: tận dụng sẵn info + cổng TT",
  "Sở hữu data khách hàng → retargeting",
  "Zalo OA → nuôi dưỡng loyalty không chia sẻ data",
  "Visit Vietnam: blockchain xác thực + AI đề xuất",
];

const qrItems = [
  { icon: "🇨🇳", title: "NAPAS ↔ Alipay/WeChat Pay", desc: "Chuyển đổi CNY→VND real-time. Không phí ngoại tệ. Kích impulse buy: upsell hải sản, spa, quà lưu niệm." },
  { icon: "🇹🇭", title: "NAPAS ↔ PromptPay",          desc: "THB→VND liền mạch. Cảm giác 'như ở nhà'. Kéo giãn Average Transaction Value." },
  { icon: "💡", title: "Chiến lược",                   desc: "Trưng bày rõ logo Alipay/WeChat Pay tại quầy. Tăng AOV thông qua thanh toán không ma sát." },
];

export default function Channels() {
  return (
    <>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
        <KPI icon="📱" label="Mobile booking"    value="72.77%"  sub="CAGR 13.14% → >75% by 2031" />
        <KPI icon="🏪" label="Global OTA"        value="40-50%"  sub="Klook, Traveloka, Trip.com" />
        <KPI icon="🔍" label="Lifestyle/Discovery"value="20-30%" sub="Google Maps, XHS, Naver" />
        <KPI icon="🏠" label="Direct/Social"     value="20-25%"  sub="Zalo, MoMo, Visit Vietnam" />
      </div>

      <H2>Ma trận thị phần nền tảng phân phối 2026</H2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, background: C.card, borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}`, fontSize: 11 }}>
          <thead>
            <tr style={{ background: "#1a2744" }}>
              {["Nhóm nền tảng", "Thị phần", "Nền tảng tiêu biểu", "Dịch vụ chủ lực", "Hoa hồng"].map((h, i) => (
                <th key={i} style={{ padding: "8px 10px", textAlign: "left", color: C.muted, fontWeight: 600, borderBottom: `1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {platformMatrix.map((r, i) => (
              <tr key={i}>
                <td style={{ padding: "8px 10px", fontWeight: 700 }}>{r.g}</td>
                <td style={{ padding: "8px 10px" }}><Badge color={r.color}>{r.s}</Badge></td>
                <td style={{ padding: "8px 10px", color: C.muted }}>{r.p}</td>
                <td style={{ padding: "8px 10px" }}>{r.d}</td>
                <td style={{ padding: "8px 10px" }}><Badge color={r.color}>{r.f}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Phân cực trong OTA: Theme Park vs Local Tour</H2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 10 }}>
        <Card style={{ borderTop: `3px solid ${C.red}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>🎢 Vui chơi giải trí (Klook, Traveloka)</div>
          <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.7 }}>
            Thống trị phân phối vé Sun Group, VinGroup. API tích hợp sâu + QR quét cổng. Rào cản gia nhập cực cao cho đại lý truyền thống. Trip.com mạnh riêng tệp TQ đại lục. <strong style={{ color: C.text }}>ROI thấp cho nhà cung cấp nhỏ</strong> do chiết khấu hoa hồng lớn.
          </div>
        </Card>
        <Card style={{ borderTop: `3px solid ${C.green}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>🏛️ Local Tours (GetYourGuide, Viator)</div>
          <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.7 }}>
            Tỷ lệ chuyển đổi vượt trội với khách Âu/Mỹ. Trải nghiệm xác thực, nhóm nhỏ, hướng dẫn viên đa ngôn ngữ. Hệ thống đánh giá khắt khe → chất lượng. <strong style={{ color: C.text }}>ROI cao hơn</strong> cho tour đi bộ phố cổ, sinh thái ĐBSCL.
          </div>
        </Card>
      </div>

      <H2>Lifestyle & Discovery: Kênh quyết định on-trip</H2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 10 }}>
        <Card>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.accent, marginBottom: 6 }}>🌐 Khách Âu/Mỹ/Tiếng Anh</div>
          <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.7 }}>Google Maps + TripAdvisor độc tôn. Google Business Profile với ảnh chất lượng + đánh giá tích cực = điều kiện tiên quyết. Tìm kiếm "nhà hàng/spa gần tôi" on-trip.</div>
        </Card>
        <Card>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.china, marginBottom: 6 }}>🇨🇳 Khách Trung Quốc</div>
          <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.7 }}>Bỏ qua Google. Xiaohongshu + Douyin = kim chỉ nam ẩm thực cao cấp & làm đẹp. 19M user du lịch QT. KOL/KOC trên XHS + video ngắn Douyin = kênh chuyển đổi chính.</div>
        </Card>
        <Card>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.korea, marginBottom: 6 }}>🇰🇷 Khách Hàn Quốc</div>
          <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.7 }}>Naver Map + Kakao Map tuyệt đối. Naver Blog cho review spa/café chi tiết. Papago dịch OCR biển hiệu. <strong style={{ color: C.text }}>Không có trên Naver = tàng hình</strong> trước hàng triệu khách HQ.</div>
        </Card>
      </div>

      <H2>Kênh Direct & Mini App</H2>
      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 14 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.green, marginBottom: 8 }}>Hệ sinh thái nội địa</div>
            {miniApps.map((p, i) => (
              <div key={i} style={{ marginBottom: 8, padding: "8px 10px", background: `${p.color}10`, borderRadius: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700 }}>{p.name}</div>
                <div style={{ fontSize: 10, color: C.muted }}>{p.desc}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.orange, marginBottom: 8 }}>Lợi thế Mini App vs OTA</div>
            {miniAppAdvantages.map((b, i) => (
              <div key={i} style={{ fontSize: 11, color: C.muted, lineHeight: 1.7, paddingLeft: 10, borderLeft: `2px solid ${C.green}40`, marginBottom: 4 }}>{b}</div>
            ))}
          </div>
        </div>
      </Card>

      <H2>QR xuyên biên giới: Chất xúc tác chi tiêu</H2>
      <Card style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 12 }}>
        {qrItems.map((q, i) => (
          <div key={i}>
            <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 4 }}>{q.icon} {q.title}</div>
            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>{q.desc}</div>
          </div>
        ))}
      </Card>

      <H2>Shoppertainment & KOC</H2>
      <Card>
        <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.8 }}>
          <strong style={{ color: C.text }}>TikTok:</strong> 67.7M user VN. GMV TikTok Shop +148% trong 2025. <strong style={{ color: C.text }}>KOC (Key Opinion Consumers)</strong> thay thế KOL cho dining/spa – review chân thực, ảnh hưởng vi mô. Video ngắn 3 giây đầu quyết định. Livestream + flash sale → chốt đơn ngay trong app. <strong style={{ color: C.accent }}>Khuyến nghị:</strong> Xây mạng lưới affiliate marketing với micro-creators TikTok = đội ngũ bán hàng không biên giới.
        </div>
      </Card>
    </>
  );
}
