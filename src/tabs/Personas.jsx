import { C } from "../data/colors.js";
import H2 from "../components/H2.jsx";
import Card from "../components/Card.jsx";
import Badge from "../components/Badge.jsx";

const personas = [
  {
    name: "Khách Bắc Mỹ tránh đông",
    markets: "US, CA",
    cruise: "H",
    cruiseColor: C.green,
    peak: "15/12 – 15/02",
    budget: "$4,000–7,000",
    unmet: "Thiếu gói combo bán lẻ + du thuyền",
    pain: "Khó tìm được gói du lịch kết hợp mua sắm tại các trung tâm thương mại lớn với tour du thuyền.",
  },
  {
    name: "Khách văn hóa UK/Ireland",
    markets: "UK, IE",
    cruise: "M",
    cruiseColor: C.accent,
    peak: "Nghỉ giữa kỳ T2, Xmas, T10",
    budget: "$2,500–4,000",
    unmet: "Cần tour trung-cao cấp, nhịp độ chậm",
    pain: "Các tour thường quá nhanh, không đủ thời gian để tìm hiểu văn hóa địa phương sâu sắc.",
  },
  {
    name: "Khách chặng ngắn Úc/NZ",
    markets: "AU, NZ",
    cruise: "L",
    cruiseColor: C.muted,
    peak: "Tháng 10 & Tháng 2–3",
    budget: "$1,500–3,000",
    unmet: "Cần gói bay thẳng từ sân bay thứ cấp",
    pain: "Thiếu các gói bay thẳng từ các thành phố ngoài Sydney/Melbourne, ví dụ như từ Đà Nẵng (DAD).",
  },
  {
    name: "Digital Nomad",
    markets: "10 thị trường trọng điểm",
    cruise: "L",
    cruiseColor: C.muted,
    peak: "Tháng 11 – Tháng 3",
    budget: "$80–150 (add-on)",
    unmet: "Cần micro-tour cuối tuần 1-2 đêm",
    pain: "Khó tìm các tour ngắn ngày (1-2 đêm) vào cuối tuần để khám phá các địa điểm lân cận.",
  },
  {
    name: "Gen-Z săn trải nghiệm",
    markets: "SG, UK, AU, PH",
    cruise: "L",
    cruiseColor: C.muted,
    peak: "Tháng 10 & Tháng 3",
    budget: "$500–1,200",
    unmet: "Cần gói giá phẳng cho nhóm nhỏ (6 người)",
    pain: "Không có các gói tour với mức giá cố định cho nhóm bạn bè nhỏ, gây khó khăn trong việc lập ngân sách.",
  },
  {
    name: "Gia đình đa thế hệ",
    markets: "US, UK, AU, SG, IN",
    cruise: "M",
    cruiseColor: C.accent,
    peak: "20/12–05/01, Nghỉ giữa kỳ UK T2",
    budget: "$3–6K (x4 khách)",
    unmet: "Cần tour một điểm đến, dễ đi lại cho người lớn tuổi",
    pain: "Các tour thường yêu cầu di chuyển nhiều, không phù hợp cho gia đình có người lớn tuổi hoặc trẻ em.",
  },
  {
    name: "Khách siêu giàu (HNWI)",
    markets: "US, UK, SG, IN, ZA",
    cruise: "H",
    cruiseColor: C.green,
    peak: "Tháng 12, 1, 2",
    budget: "$15,000–30,000+",
    unmet: "Cần tour private kết hợp du thuyền và đất liền",
    pain: "Hạn chế các lựa chọn tour siêu sang, được cá nhân hóa hoàn toàn, kết hợp giữa trải nghiệm du thuyền và khám phá đất liền.",
  },
];

export default function PersonasTab() {
  return (
    <>
      <H2>Chân dung khách hàng mục tiêu (Personas)</H2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 10 }}>
        {personas.map((p, i) => (
          <Card key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{p.name} <span style={{ fontSize: 11, color: C.muted }}>({p.markets})</span></div>
              <Badge color={p.cruiseColor}>Cruise Overlap: {p.cruise}</Badge>
            </div>
            <div style={{ fontSize: 11, marginBottom: 10 }}>
              <div style={{ marginBottom: 4 }}>
                <strong>Mùa cao điểm:</strong> <span style={{ color: C.india, fontWeight: 600 }}>{p.peak}</span>
              </div>
              <div>
                <strong>Ngân sách/khách:</strong> <span style={{ fontWeight: 600 }}>{p.budget}</span>
              </div>
            </div>
            <div style={{ fontSize: 12, fontStyle: "italic", color: C.orange, marginBottom: 6, paddingLeft: 10, borderLeft: `3px solid ${C.orange}50` }}>
              " {p.unmet} "
            </div>
            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
              <strong style={{ color: C.text }}>Trở ngại chính:</strong> {p.pain}
            </div>
          </Card>
        ))}
      </div>

      <H2>Bảng tổng hợp Chân dung khách hàng</H2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, background: C.card, borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}`, fontSize: 11 }}>
          <thead>
            <tr style={{ background: C.bg }}>
              {["Persona", "Thị trường chính", "Cruise Overlap", "Mùa cao điểm", "Ngân sách/khách"].map((h) => (
                <th key={h} style={{ padding: "8px 10px", textAlign: "left", color: C.muted, fontWeight: 600, borderBottom: `1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {personas.map((p, i) => (
              <tr key={i} style={{ borderBottom: i < personas.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <td style={{ padding: "8px 10px", fontWeight: 700, color: C.text }}>{p.name}</td>
                <td style={{ padding: "8px 10px", color: C.muted }}>{p.markets}</td>
                <td style={{ padding: "8px 10px" }}><Badge color={p.cruiseColor}>{p.cruise}</Badge></td>
                <td style={{ padding: "8px 10px", color: C.india }}>{p.peak}</td>
                <td style={{ padding: "8px 10px", fontWeight: 600 }}>{p.budget}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
