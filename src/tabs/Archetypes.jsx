import React from "react";
import { C } from "../data/colors.js";
import H2 from "../components/H2.jsx";
import Card from "../components/Card.jsx";
import Badge from "../components/Badge.jsx";

export default function ArchetypesTab() {
  const archetypes = [
    {
      id: "A1",
      name: "Winter Escape Cruise+Land",
      tagline: "Hành trình cao cấp trên biển và đất liền",
      persona: "P1 NA",
      peak: "Dec 15–Feb 15",
      durationPrice: "$3.2–4.8K",
      cruise: true,
      otas: "Viator, TA",
      differentiator: "Kết hợp du thuyền và tham quan đất liền cao cấp",
      portfolio: ["T-ID: WinterCruise", "T-ID: LandTour"],
      color: C.accent,
    },
    {
      id: "A2",
      name: "Luxury HNWI Cruise+Land",
      tagline: "Trải nghiệm sang trọng dành cho khách siêu giàu",
      persona: "P7 Luxury",
      peak: "Dec 15–Feb 15",
      durationPrice: "$8–14K",
      cruise: true,
      otas: "Luxury Travel VN, Virtuoso",
      differentiator: "Hành trình cá nhân hóa, linh hoạt với dịch vụ riêng tư",
      portfolio: ["T-ID: LuxuryCruise", "T-ID: CustomItinerary"],
      color: C.purple,
    },
    {
      id: "A3",
      name: "Cruise-Extend-HL Overnight",
      tagline: "Mở rộng kỳ nghỉ với đêm lưu trú tại điểm đến",
      persona: "P1 cruise-pax",
      peak: "Nov–Feb",
      durationPrice: "$550–850",
      cruise: true,
      otas: "ShoreExGroup, Viator Cruises",
      differentiator: "Kỳ nghỉ kéo dài sau khi rời du thuyền, bao gồm lưu trú qua đêm",
      portfolio: ["T-ID: CruiseExtension", "T-ID: OvernightStay"],
      color: C.green,
    },
    {
      id: "A4",
      name: "UK/IE Mid-Premium Slow Culture",
      tagline: "Du lịch văn hóa chậm rãi cho phân khúc tầm trung",
      persona: "P2 UK",
      peak: "Oct, Dec, Feb",
      durationPrice: "$2.6–3.8K",
      cruise: false,
      otas: "Viator, TripAdvisor",
      differentiator: "Trải nghiệm du lịch chậm rãi, 3 đêm mỗi thành phố",
      portfolio: ["T-ID: UKCulture", "T-ID: SlowTravel"],
      color: C.india,
    },
    {
      id: "A5",
      name: "PH Barkada Gen-Z Group",
      tagline: "Du lịch nhóm năng động của giới trẻ PH",
      persona: "P5 Gen-Z",
      peak: "Oct, Mar, Dec",
      durationPrice: "$480–680",
      cruise: false,
      otas: "Klook PH, Viator",
      differentiator: "Giá trọn gói cho nhóm 6 người, lấy cảm hứng từ TikTok",
      portfolio: ["T-ID: GenZGroup", "T-ID: PHBarkada"],
      color: C.orange,
    },
    {
      id: "A6",
      name: "AU/NZ Direct-Flight Beach+Adventure",
      tagline: "Biển và phiêu lưu cho khách AU/NZ bay thẳng",
      persona: "P3 AU",
      peak: "Oct, Feb, Mar",
      durationPrice: "$850–1.35K",
      cruise: false,
      otas: "Klook AU, Viator",
      differentiator: "Kỳ nghỉ 7 ngày tại bãi biển, điểm đến cửa ngõ",
      portfolio: ["T-ID: AUNZBeach", "T-ID: AdventureGetaway"],
      color: C.cyan,
    },
  ];

  return (
    <>
      <H2>Các chân dung khách du lịch</H2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {archetypes.map((arch) => (
          <Card key={arch.id}>
            <div
              style={{
                background: arch.color + "20",
                color: arch.color,
                padding: "8px 12px",
                borderRadius: "8px 8px 0 0",
                marginBottom: 10,
                fontWeight: 700,
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              {arch.id}: {arch.name}
            </div>
            <div style={{ padding: "0 12px 12px" }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 5 }}>
                {arch.tagline}
              </div>
              <div style={{ marginBottom: 8 }}>
                <Badge color={C.muted}>{arch.persona}</Badge>
              </div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
                <strong style={{ color: C.text }}>Cửa sổ cao điểm:</strong> {arch.peak}
              </div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
                <strong style={{ color: C.text }}>Ngân sách:</strong> {arch.durationPrice}
              </div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
                <strong style={{ color: C.text }}>Du thuyền:</strong>{" "}
                <Badge color={arch.cruise ? C.green : C.muted}>
                  {arch.cruise ? "Có Cruise" : "Không Cruise"}
                </Badge>
              </div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
                <strong style={{ color: C.text }}>Kênh OTA hàng đầu:</strong> {arch.otas}
              </div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
                <strong style={{ color: C.text }}>Điểm khác biệt:</strong> {arch.differentiator}
              </div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
                <strong style={{ color: C.text }}>Đòn bẩy danh mục:</strong>{" "}
                {arch.portfolio.join(", ")}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <H2>Bảng tổng hợp chân dung khách</H2>
      <Card>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 12,
              color: C.text,
            }}
          >
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                <th
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    color: C.muted,
                  }}
                >
                  Chân dung
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    color: C.muted,
                  }}
                >
                  Persona
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    color: C.muted,
                  }}
                >
                  Cao điểm
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    color: C.muted,
                  }}
                >
                  Ngân sách
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    color: C.muted,
                  }}
                >
                  Du thuyền?
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    color: C.muted,
                  }}
                >
                  OTA hàng đầu
                </th>
              </tr>
            </thead>
            <tbody>
              {archetypes.map((arch) => (
                <tr key={arch.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "8px" }}>
                    <strong style={{ color: arch.color }}>{arch.id}</strong>: {arch.name}
                  </td>
                  <td style={{ padding: "8px" }}>{arch.persona}</td>
                  <td style={{ padding: "8px" }}>{arch.peak}</td>
                  <td style={{ padding: "8px" }}>{arch.durationPrice}</td>
                  <td style={{ padding: "8px" }}>
                    <Badge color={arch.cruise ? C.green : C.muted}>
                      {arch.cruise ? "Có" : "Không"}
                    </Badge>
                  </td>
                  <td style={{ padding: "8px" }}>{arch.otas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
