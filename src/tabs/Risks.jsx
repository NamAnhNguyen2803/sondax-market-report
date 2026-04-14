import { C } from "../data/colors.js";
import H2 from "../components/H2.jsx";
import Card from "../components/Card.jsx";
import KPI from "../components/KPI.jsx";

const riskData = [
  { risk: "Cruise itinerary shift ±10–15%", impact: "Cao", likelihood: "Trung bình", mitigation: "A3 trước $3–8K, pause A1 nếu yếu" },
  { risk: "PH outbound giảm tốc", impact: "Trung bình", likelihood: "Thấp", mitigation: "TikTok A/B test $500 trước khi commit" },
  { risk: "Viator commission tăng", impact: "Trung bình", likelihood: "Thấp", mitigation: "Diversify ShoreExGroup + TourRadar" },
  { risk: "A2 Luxury trade onboarding chậm", impact: "Trung bình", likelihood: "Cao", mitigation: "Queue A2 cho Q2 2026" },
];

const validationTests = [
  { name: "A3: ShoreExGroup A/B listing", duration: "1 tháng", budget: "$800", metrics: "CTR + booking rate", color: C.green },
  { name: "A1: Meta Ads hook A/B", duration: "2 tuần", budget: "$800", metrics: "CTR + lead form", color: C.accent },
  { name: "A5: TikTok PH influencer A/B", duration: "2 tuần", budget: "$500", metrics: "saves + shares", color: C.orange },
];

const dataGaps = [
    { gap: "Chi tiêu chính xác của khách theo quốc tịch", section: "Q1", impact: "Cao", mitigation: "Sử dụng dữ liệu thẻ tín dụng Visa/Mastercard" },
    { gap: "Tỷ lệ quay lại của khách du lịch", section: "Q2", impact: "Trung bình", mitigation: "Khảo sát sau chuyến đi, theo dõi qua email" },
    { gap: "Mức độ ảnh hưởng của KOC/Influencer", section: "A5", impact: "Cao", mitigation: "A/B testing, theo dõi mã giảm giá riêng" },
    { gap: "Dữ liệu booking từ các kênh B2B", section: "All", impact: "Trung bình", mitigation: "Tích hợp API với các đối tác lớn" },
    { gap: "Phản hồi chi tiết về đối thủ cạnh tranh", section: "All", impact: "Thấp", mitigation: "Phân tích review của đối thủ trên OTA" },
    { gap: "Độ co giãn của giá theo mùa", section: "Q3", impact: "Cao", mitigation: "Thử nghiệm giá linh hoạt theo thời gian thực" },
    { gap: "Dữ liệu chi tiêu cho các dịch vụ phụ trợ", section: "Q4", impact: "Trung bình", mitigation: "Tích hợp hệ thống POS tại điểm đến" },
    { gap: "Phân tích hành vi khách hàng trên web/app", section: "A1,A5", impact: "Cao", mitigation: "Cài đặt và phân tích Google Analytics 4" },
    { gap: "Tác động của các sự kiện văn hóa, lễ hội", section: "Q2,Q4", impact: "Trung bình", mitigation: "Phân tích tương quan dữ liệu lịch sử" },
];

const biasDisclaimers = [
    { title: "Q4: Non-Western Luxury", content: "Phân tích có thể chưa phản ánh đầy đủ định nghĩa và hành vi 'sang trọng' của các nền văn hóa ngoài phương Tây." },
    { title: "Q5: Nationality ≠ Persona", content: "Quốc tịch được dùng như một proxy, không đại diện cho tất cả các cá nhân trong nhóm đó. Mỗi persona có thể bao gồm nhiều quốc tịch." },
    { title: "Q6: 2020–2022 Excluded", content: "Dữ liệu trong giai đoạn 2020-2022 bị loại trừ do các biến động ngoại lệ từ đại dịch COVID-19, có thể làm sai lệch xu hướng dài hạn." },
];

export default function RisksTab() {
  const totalBudget = validationTests.reduce((acc, test) => acc + parseInt(test.budget.replace('$', '')), 0);

  const getImpactColor = (impact) => {
    if (impact === 'Cao') return C.red;
    if (impact === 'Trung bình') return C.orange;
    return C.green;
  }
  const getLikelihoodColor = (likelihood) => {
    if (likelihood === 'Cao') return C.red;
    if (likelihood === 'Trung bình') return C.orange;
    return C.green;
  }


  return (
    <>
      <H2>Ma trận rủi ro và phương án giảm thiểu</H2>
      <Card>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${C.border}` }}>
              <th style={{ textAlign: "left", padding: "8px 12px", fontSize: 12, color: C.muted }}>Rủi ro</th>
              <th style={{ textAlign: "left", padding: "8px 12px", fontSize: 12, color: C.muted }}>Tác động</th>
              <th style={{ textAlign: "left", padding: "8px 12px", fontSize: 12, color: C.muted }}>Khả năng</th>
              <th style={{ textAlign: "left", padding: "8px 12px", fontSize: 12, color: C.muted }}>Phương án giảm thiểu</th>
            </tr>
          </thead>
          <tbody>
            {riskData.map((item, index) => (
              <tr key={index} style={{ borderBottom: `1px solid ${C.border}` }}>
                <td style={{ padding: "10px 12px", fontSize: 13, color: C.text }}>{item.risk}</td>
                <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: "bold", color: getImpactColor(item.impact) }}>{item.impact}</td>
                <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: "bold", color: getLikelihoodColor(item.likelihood) }}>{item.likelihood}</td>
                <td style={{ padding: "10px 12px", fontSize: 13, color: C.muted }}>{item.mitigation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <H2>Các bài kiểm tra xác thực giả định (Validation Tests)</H2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginBottom: 16 }}>
        {validationTests.map((test, index) => (
          <Card key={index} style={{ borderLeft: `4px solid ${test.color}` }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 10 }}>{test.name}</div>
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.8 }}>
              <div><strong>Thời gian:</strong> {test.duration}</div>
              <div><strong>Ngân sách:</strong> {test.budget}</div>
              <div><strong>Metrics:</strong> {test.metrics}</div>
            </div>
          </Card>
        ))}
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
         <KPI label="Tổng ngân sách Validation" value={`$${totalBudget.toLocaleString()}`} />
      </div>

      <H2>Các lỗ hổng dữ liệu (Data Gaps)</H2>
       <Card>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${C.border}` }}>
              <th style={{ textAlign: "left", padding: "8px 12px", fontSize: 12, color: C.muted }}>Lỗ hổng</th>
              <th style={{ textAlign: "left", padding: "8px 12px", fontSize: 12, color: C.muted }}>Phân đoạn</th>
              <th style={{ textAlign: "left", padding: "8px 12px", fontSize: 12, color: C.muted }}>Tác động</th>
              <th style={{ textAlign: "left", padding: "8px 12px", fontSize: 12, color: C.muted }}>Phương án xử lý</th>
            </tr>
          </thead>
          <tbody>
            {dataGaps.map((item, index) => (
              <tr key={index} style={{ borderBottom: `1px solid ${C.border}` }}>
                <td style={{ padding: "10px 12px", fontSize: 13, color: C.text }}>{item.gap}</td>
                <td style={{ padding: "10px 12px", fontSize: 13, color: C.text }}>{item.section}</td>
                <td style={{ padding: "10px 12px", fontSize: 13, color: getImpactColor(item.impact) }}>{item.impact}</td>
                <td style={{ padding: "10px 12px", fontSize: 13, color: C.muted }}>{item.mitigation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <H2>Tuyên bố về các thiên kiến có thể có (Bias Disclaimers)</H2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {biasDisclaimers.map((item, index) => (
              <Card key={index} style={{background: `${C.orange}10`, border: `1px solid ${C.orange}30`}}>
                  <div style={{fontSize: 14, fontWeight: 700, color: C.orange, marginBottom: 8}}>{item.title}</div>
                  <div style={{fontSize: 12, color: C.muted, lineHeight: 1.6}}>{item.content}</div>
              </Card>
          ))}
      </div>

    </>
  );
}
