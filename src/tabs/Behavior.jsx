import { C } from "../data/colors.js";
import H2 from "../components/H2.jsx";
import Card from "../components/Card.jsx";
import InfoCard from "../components/InfoCard.jsx";

const journey = [
  { stage: "Pre-trip", icon: "🔍", items: ["AI lập KH (TQ dẫn đầu)", "YouTube/TikTok cảm hứng", "Đặt sớm hơn (lead time tăng)", "Social proof từ UGC", "Xiaohongshu: 50-60 ngày trước"] },
  { stage: "Booking",  icon: "📱", items: ["OTA (Klook, Trip.com, Traveloka)", "Ví ĐT (GCash, Alipay, MoMo)", "Travel Mixology: AI→Social→OTA", "Billboard Effect → Direct", "Mobile chiếm 72.77% giao dịch"] },
  { stage: "On-trip",  icon: "🗺️", items: ["Booking phút chót (~1 ngày)", "Google Maps + Naver Map", "Snackpacking: ẩm thực local", "Shoppertainment via TikTok", "QR xuyên biên giới kích chi tiêu"] },
  { stage: "Post-trip",icon: "📸", items: ["UGC trên XHS/IG/TikTok", "Review trên OTA → SEO", "KOC > KOL cho dining/spa", "Loyalty re-engagement", "Word-of-mouth → viral loop"] },
];

const markets = [
  { color: C.china,       flag: "🇨🇳", name: "Trung Quốc (5.3M/2025 – #1)", lines: [
    ["Super-app:", "Trip.com (QT), Meituan (nội địa), Xiaohongshu (cảm hứng), Fliggy (Alipay)"],
    ["B2B → FIT:", "Zero-dollar tours giảm. Gen Z 'special forces travelers' – ngắn ngày, dày trải nghiệm"],
    ["Kênh phát hiện:", "XHS 19M user du lịch QT. Douyin video ngắn. Tìm 'điểm nóng viral' không phải danh thắng"],
    ["Hot trend:", "Self-drive, Glamping, Du thuyền, Chữa lành/yoga. Thanh toán Alipay/WeChat Pay QR"],
  ]},
  { color: C.korea,       flag: "🇰🇷", name: "Hàn Quốc (4.3M/2025 – #2)", lines: [
    ["Hệ sinh thái khép kín:", "Naver Map + Blog + Papago (dịch OCR biển hiệu). Kakao Map. Không dùng Google"],
    ["K-Dive:", "Từ phim trường → sống như người Hàn. K-pop dance, styling, café thẩm mỹ Seongsu"],
    ["Golf tourism:", "GOLFZON (60% thị phần screen golf) + Kakao Golf Reservation → sân VN"],
    ["Yêu cầu:", "Thực đơn tiếng Hàn, SEO Naver, biển hiệu tối ưu cho OCR Papago"],
  ]},
  { color: C.japan,       flag: "🇯🇵", name: "Nhật Bản", lines: [
    ["Phân tán:", "Rời Tokyo-Kyoto-Osaka → Sapporo, Fukuoka, Nagoya"],
    ["Klook #1:", "Dẫn đầu cho khách QT đặt tour (khảo sát Kansai). Rakuten/Jalan cho nội địa"],
    ["Sight-Doing:", "Học sushi, TeamLab, trượt tuyết. Ẩm thực = động lực #1"],
    ["Combo Pass:", "Ưa chuộng gói trọn gói tiết kiệm, vé QR tiện lợi"],
  ]},
  { color: C.india,       flag: "🇮🇳", name: "Ấn Độ (501K/2024 → mục tiêu 1M)", lines: [
    ["MakeMyTrip:", "Liên minh Sun Group. B2B Quest2Travel/MyBiz > $1B. Thay thế đại lý truyền thống"],
    ["Wedding tourism:", "50+ đám cưới tại Đà Nẵng 2025. Tỷ phú Ấn Độ chọn resort 5 sao Phú Quốc"],
    ["Ẩm thực:", "Nút thắt lớn nhất. Jain food/chay nghiêm ngặt. iVegan, Gujarat Indian, Tadka ở Đà Nẵng"],
    ["YouTube-first:", "DIY planning. Fulcrum Travel: 1 điểm gốc, ở lâu. Tâm linh dẫn đầu Châu Á"],
  ]},
  { color: C.thailand,    flag: "🇹🇭", name: "Thái Lan", lines: [
    ["Micro-travel:", "Nghỉ 1-3 ngày. Agoda #1. Traveloka + Klook cắm rễ sâu"],
    ["Wellness pivot:", "Nightlife → chữa lành. Y tế DL hàng tỷ USD/năm"],
    ["Super-App loyal:", "Combo Pass trọn gói. Rủi ro thấp khi thấy trên Klook/Traveloka"],
    ["QR Payment:", "PromptPay ↔ VietQR xuyên biên giới, kích impulse buy"],
  ]},
  { color: C.philippines, flag: "🇵🇭", name: "Philippines", lines: [
    ["Fintech:", "Klook + GCash = booking không ma sát. Hotels tăng mạnh"],
    ["Longevity:", "The Farm at San Benito – hình mẫu toàn cầu wellness resort"],
    ["Chuyển hướng SEA:", "Từ SG/HK sang VN & Đài Loan vì chi phí. +93% YoY"],
    ["Super-App:", "Traveloka/Klook = xác thực. Ưa combo pass tiết kiệm"],
  ]},
];

export default function Behavior() {
  return (
    <>
      <H2>Hành trình du khách 2026</H2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
        {journey.map((s, i) => (
          <Card key={i} style={{ padding: 14 }}>
            <div style={{ fontSize: 26, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.accent, marginBottom: 6 }}>{s.stage}</div>
            {s.items.map((b, j) => (
              <div key={j} style={{ fontSize: 11, color: C.muted, lineHeight: 1.6, paddingLeft: 10, borderLeft: `2px solid ${C.border}`, marginBottom: 3 }}>
                {b}
              </div>
            ))}
          </Card>
        ))}
      </div>

      <H2>Chi tiết hành vi từng thị trường</H2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 10 }}>
        {markets.map((m, i) => <InfoCard key={i} {...m} />)}
      </div>
    </>
  );
}
