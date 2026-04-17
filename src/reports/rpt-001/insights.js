// 5 curated insights + 1 explorer entry = 6 cards on the landing.
// Each insight is editorial: a question the user (PO) would ask → curated tour IDs.

export const INSIGHTS = [
  {
    id: "quick-wins",
    tabId: "rpt-quick-wins",
    title: "Quick Wins",
    icon: "🏆",
    color: "#22C55E",
    question: "Tours nào có barrier thấp + ROI cao — có thể launch trong 30 ngày?",
    teaser: "10 tours có rào cản gia nhập THẤP hoặc RẤT THẤP, nguồn cung phân mảnh / chưa có brand dẫn dắt. Đây là những bet an toàn nhất cho first-mover advantage.",
    why: [
      "Barrier level = Thấp hoặc Rất thấp theo Business Case S6",
      "Supply fragmented — không có operator nắm >30% market share",
      "Có thể lắp ráp từ inventory hiện có, không cần xây mới từ số 0",
    ],
    tourIds: [10, 14, 18, 4, 9, 6, 15, 16, 17, 12],
    stat: { label: "Tours ready", value: "10" },
  },
  {
    id: "whitespace",
    tabId: "rpt-whitespace",
    title: "Whitespace Opportunities",
    icon: "💎",
    color: "#A78BFA",
    question: "Tours nào KHÔNG có đối thủ trực tiếp — first-mover tuyệt đối?",
    teaser: "5 phân khúc mà supply gap đã được xác nhận trong S6: chưa có operator dẫn dắt hoặc đối thủ trực tiếp nào trên Viator/Klook/GYG.",
    why: [
      "Supply gap được identify trong Section 6 Vendor Landscape",
      "Không có competitor trực tiếp trong price band + market segment",
      "First-mover = brand moat nếu chiếm lĩnh đánh giá sớm (reviews moat)",
    ],
    tourIds: [12, 14, 10, 18, 4],
    stat: { label: "Whitespace", value: "5" },
  },
  {
    id: "growth-markets",
    tabId: "rpt-growth-markets",
    title: "Growth Market Plays",
    icon: "📈",
    color: "#FB923C",
    question: "Tours nào khai thác 2 thị trường tăng nhanh nhất: India (+49%) và Philippines (+81%)?",
    teaser: "Các tour targeting hoặc hoạt động mạnh với thị trường IN + PH — nơi traffic tăng nhanh nhất 2025. Ride the wave trước khi competition đuổi kịp.",
    why: [
      "IN = 746K khách +49% YoY, #1 growth rate",
      "PH = 482K khách +81% YoY, ASEAN visa-free, 3h flight",
      "Cả 2 là mobile-first + Klook-primary — distribution channel rõ ràng",
    ],
    tourIds: [10, 18, 8, 5, 15],
    stat: { label: "IN+PH plays", value: "5" },
  },
  {
    id: "july-peak",
    tabId: "rpt-july-peak",
    title: "July Peak Convergence",
    icon: "☀️",
    color: "#F472B6",
    question: "Tháng nào tất cả source markets đều peak cùng lúc? Và tours nào sẵn sàng đón?",
    teaser: "Tháng 7 = cửa sổ hiếm khi US/UK/CA/AU/IN/SG/PH đều đạt đỉnh demand cùng thời điểm (S8). Chuẩn bị inventory cho 12 tours này 60 ngày trước.",
    why: [
      "Western markets: US/UK/CA/AU summer vacation peak cùng Jul-Aug",
      "Asian markets: SG June holiday tail + IN National Day + PH summer break chồng Jul",
      "Central Coast dry season + Festival calendar (DIFF, Hue, Full Moon) tạo demand",
    ],
    tourIds: [1, 3, 4, 5, 7, 8, 11, 13, 14, 15, 16, 17],
    stat: { label: "Jul-ready", value: "12" },
  },
  {
    id: "revenue",
    tabId: "rpt-revenue",
    title: "Revenue Leaders",
    icon: "💰",
    color: "#38BDF8",
    question: "Tours nào cho revenue / chuyến cao nhất?",
    teaser: "Top 6 tours xếp theo revenue ceiling. Phân khúc premium & combo — yêu cầu sourcing tốt hơn nhưng margin cao, suitable cho Sondax ở vị thế khác biệt hóa.",
    why: [
      "Revenue ceiling từ Business Case (price × group size)",
      "Premium positioning = review moat chậm hơn nhưng bền hơn",
      "Ít cần volume — phù hợp team nhỏ, focus quality",
    ],
    tourIds: [12, 3, 13, 5, 17, 2],
    stat: { label: "Top revenue", value: "$1,500" },
  },
];

export function findInsight(id) {
  return INSIGHTS.find(i => i.id === id || i.tabId === id);
}

export function getToursForInsight(insight, allTours) {
  const order = new Map(insight.tourIds.map((id, i) => [id, i]));
  return allTours
    .filter(t => order.has(t.id))
    .sort((a, b) => order.get(a.id) - order.get(b.id));
}
