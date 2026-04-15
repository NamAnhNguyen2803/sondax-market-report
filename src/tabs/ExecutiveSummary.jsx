import KPI from "../components/KPI.jsx";
import H2 from "../components/H2.jsx";
import Card from "../components/Card.jsx";
import { C } from "../data/colors.js";

export default function ExecutiveSummary() {
  const portfolioLeverage = [
    { id: "A3", name: "A3 — Cruise-Extend-Hạ Long Overnight", existing: "~100%", netNew: "Cruise-line approved-operator RFP (6–9 tháng)", color: C.accent },
    { id: "A1", name: "A1 — Winter Escape Cruise+Land", existing: "~60%", netNew: "1 hợp đồng Hội An DMC partner", color: C.orange },
    { id: "A5", name: "A5 — PH Barkada Gen-Z Group", existing: "~50%", netNew: "Sleeper train + Tagalog guide + TikTok kit", color: C.green },
  ];

  const launchSequence = [
    { date: "1/6/2026", label: "A5 kickoff", desc: "PH peak lead-time ngắn nhất", color: C.green },
    { date: "6/7/2026", label: "A1 kickoff", desc: "P1 lead-time 90–150 ngày", color: C.orange },
    { date: "17/8/2026", label: "A3 kickoff", desc: "Cruise-peak Nov–Feb", color: C.accent },
    { date: "1/9/2026", label: "A5 launch", desc: "Klook PH live", color: C.green },
    { date: "1/10/2026", label: "A1 launch", desc: "Viator + TripAdvisor live", color: C.orange },
    { date: "15/11/2026", label: "A3 launch", desc: "ShoreExGroup live", color: C.accent },
    { date: "1/12/2026", label: "Tất cả live", desc: "Peak-season wave đầu tiên", color: C.purple },
  ];

  const beforeAfter = [
    {
      label: "Before",
      content: "Launch peak-season 2026/27 dùng 12 tour cũ, paid-spend phân tán 7 persona, cruise pax 200K/mùa Hạ Long bị bỏ qua vì không có overnight combo. ROI/archetype không rõ.",
      color: C.red,
    },
    {
      label: "After (Top-3 launch)",
      content: "90-day paid-spend $14K–$34K tập trung Top-3. A3 validate thesis trước → nếu mạnh mới commit A1 $8–20K. 3 archetype với specific persona + price band + channel + test protocol.",
      color: C.green,
    },
  ];

  const outcomeItems = [
    "Launch sequence cho Oct–Mar 2026/27 đã lock-dated (§8.6)",
    "3 archetype với persona + peak window + price band + channel + 1 cheapest test ≤$800 (§9.5)",
    "2 archetype (A2 Luxury + A4 UK Culture) queued cho Q2 2026",
    "A6 AU/NZ DAD-gateway pending PO-confirm T12 Nha Trang vs Chan May",
    "Cross-archetype bundle map (§8.4) để upsell khi khách A3 có interest A1/A2",
  ];

  const checklistData = [
    { month: "Tháng 6", focus: "A5 (PH Barkada)", tasks: ["Kick-off chuẩn bị A5", "Tuyển dụng/Đào tạo HDV tiếng Tagalog", "Mua sắm TikTok kit & khảo sát điểm check-in"] },
    { month: "Tháng 7", focus: "A1 (Winter Escape)", tasks: ["Kick-off chuẩn bị A1", "Chốt hợp đồng DMC tại Hội An", "Khóa khối cabin du thuyền T6/T7"] },
    { month: "Tháng 8", focus: "A3 (Cruise-Extend)", tasks: ["Kick-off chuẩn bị A3", "Nộp đơn Approved-operator cho các hãng tàu (Năm 2)", "Chạy thử nghiệm (Pilot) A1 & A5"] },
    { month: "Tháng 9", focus: "Lượt Launch 1", tasks: ["RA MẮT A5 (Klook PH)", "Chốt hợp đồng khách sạn 4* tại HN", "Chạy thử nghiệm A3"] },
    { month: "Tháng 10", focus: "Lượt Launch 2", tasks: ["RA MẮT A1 (Viator/TripAdvisor)", "Chạy quảng cáo Meta/Google cho A1", "Giám sát vận hành A5 mùa giao mùa"] },
    { month: "Tháng 11", focus: "Lượt Launch 3", tasks: ["RA MẮT A3 (ShoreExGroup)", "Vận hành cao điểm du thuyền Hạ Long", "Bán thêm (Upsell) A1 cho khách A3"] },
    { month: "Tháng 12", focus: "Full Operations", tasks: ["Vận hành cao điểm cho cả Top-3", "Giám sát rủi ro lịch trình tàu du thuyền", "Thu thập review để duy trì thứ hạng OTA"] },
  ];

  return (
    <>
      <H2>Pain — Vấn đề cốt lõi</H2>
      <Card>
        <p style={{ color: C.text, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          PO đang bước vào peak season Oct–Mar 2026/27 với 12 tour sẵn có và 1 câu hỏi duy nhất:{" "}
          <strong style={{ color: C.accent }}>"Thiết kế archetype mới nào thì bắt được demand mà không đốt tiền Product sai chỗ?"</strong>
        </p>
        <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.65, margin: "12px 0 0" }}>
          Có 10 thị trường nguồn, 7 persona, 10 retail OTA + ≥6 cruise channel, 4 category benchmark — và 1 thesis chưa verify: cruise peak demand Dec–Feb ở VN = nguồn peak-season density lớn nhất mà portfolio 7/12 tour cruise+shore-ex chưa tận dụng ở cấp combo.
        </p>
        <div style={{ marginTop: 14, padding: "10px 14px", background: `${C.accent}10`, borderRadius: 8, borderLeft: `3px solid ${C.accent}` }}>
          <p style={{ color: C.muted, fontSize: 11, margin: 0 }}>
            <strong style={{ color: C.text }}>Analogy:</strong> Giống chủ chuỗi phở có sẵn 7 xe đẩy + 5 mặt bằng cố định. Không phải audit 12 quầy để nâng cấp — là <strong style={{ color: C.accent }}>thiết kế 3 menu set mới</strong> theo combo mà khách đi ngang đủ volume lớn nhất đang order. Vị trí xe đẩy + mặt bằng là building block — không phải đối tượng ranking.
          </p>
        </div>
      </Card>

      <H2>Checklist Vận hành hàng tháng (Cho Quản lý Tour)</H2>
      <Card>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.border}`, background: C.bg }}>
                {["Tháng", "Trọng tâm (Archetype)", "Checklist hành động"].map((h, i) => (
                  <th key={i} style={{ textAlign: "left", padding: "10px", color: C.muted, fontSize: 10, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {checklistData.map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "10px", color: C.accent, fontWeight: 700 }}>{row.month}</td>
                  <td style={{ padding: "10px", color: C.text, fontWeight: 600 }}>{row.focus}</td>
                  <td style={{ padding: "10px" }}>
                    <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11, color: C.muted }}>
                      {row.tasks.map((t, j) => <li key={j}>{t}</li>)}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <H2>Top-3 Archetype Mới (out of 6)</H2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
        {[
          {
            id: "A3", label: "A3 — Cruise-Extend-Hạ Long Overnight", tagline: '"Xuống tàu SG, lên tàu Vịnh — 3 ngày thêm, không book lại flight về"',
            persona: "P1 NA Winter Escape cruise-pax", peak: "Nov–Feb", price: "$550–$850/pax 3D (hoặc $1.1K–$1.5K 5D)",
            differentiator: "combo single-day shore-ex + 1N overnight Ha Long cruise — no comparator in market",
            leverage: "100% existing (T10 + T6/T7)", color: C.accent,
          },
          {
            id: "A1", label: "A1 — Winter Escape Cruise+Land Combo", tagline: '"14 ngày ấm, 2 đêm ngủ trên Vịnh, 0 chuyện phải giải thích lại cho vợ"',
            persona: "P1 NA Winter Escape (secondary P7)", peak: "Dec 15–Feb 15", price: "$3.2K–$4.8K/pax 12D",
            differentiator: "seamless 2N Ha Long cruise + 10N premium land — undercut $5K+ Trails of Indochina, over $1.6K Intrepid",
            leverage: "~60% (T6/T7 + T1 + T5) · net-new = Hội An DMC partner", color: C.orange,
          },
          {
            id: "A5", label: "A5 — PH Barkada Gen-Z Group", tagline: '"6 tụi bạn, 7 ngày, 1 giá cố định, từng check-in TikTok-ready"',
            persona: "P5 Gen-Z (PH + SG focus)", peak: "Oct + Mar shoulder + PH-Xmas Dec", price: "$480–$680/pax (group flat-price)",
            differentiator: "PH-tailored flat-price group-of-6 + Tagalog-guide option + TikTok-kit curation — no comparator",
            leverage: "~50% (T1 + T3) · net-new = sleeper train + Tagalog guide + TikTok kit", color: C.green,
          },
        ].map((a) => (
          <Card key={a.id} style={{ borderLeft: `3px solid ${a.color}` }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ minWidth: 36, height: 36, borderRadius: 8, background: `${a.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: a.color, flexShrink: 0 }}>{a.id}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.text, marginBottom: 2 }}>{a.label}</div>
                <div style={{ fontSize: 11, color: a.color, fontStyle: "italic", marginBottom: 8 }}>{a.tagline}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 6 }}>
                  {[
                    { k: "Persona", v: a.persona },
                    { k: "Peak", v: a.peak },
                    { k: "Giá", v: a.price },
                  ].map((kv) => (
                    <div key={kv.k} style={{ fontSize: 11 }}>
                      <span style={{ color: C.muted }}>{kv.k}: </span>
                      <span style={{ color: C.text, fontWeight: 600 }}>{kv.v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 8, fontSize: 11 }}>
                  <span style={{ color: C.muted }}>Differentiator: </span>
                  <span style={{ color: C.text }}>{a.differentiator}</span>
                </div>
                <div style={{ marginTop: 4, fontSize: 11 }}>
                  <span style={{ color: C.muted }}>Portfolio leverage: </span>
                  <span style={{ color: a.color, fontWeight: 600 }}>{a.leverage}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <H2>KPIs tổng hợp</H2>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        <KPI label="A3 Cruise-Extend-HL" value="$550–$850/pax" sub="3D/2N · Nov–Feb" />
        <KPI label="A1 Winter Escape" value="$3.2K–$4.8K" sub="12D · Dec–Feb" />
        <KPI label="A5 PH Barkada" value="$480–$680" sub="7D · Oct+Mar" />
        <KPI label="Total budget Top-3" value="$14K–$34K" sub="90-day paid spend" />
        <KPI label="Validation budget" value="$2,100" sub="3 tests trước commit" />
      </div>

      <H2>Before / After</H2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 12, marginBottom: 20 }}>
        {beforeAfter.map((item) => (
          <Card key={item.label} style={{ border: `1px solid ${item.color}30` }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: item.color, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>{item.label}</div>
            <p style={{ color: C.text, fontSize: 12, lineHeight: 1.65, margin: 0 }}>{item.content}</p>
          </Card>
        ))}
      </div>

      <H2>Outcome — PO có được gì</H2>
      <Card>
        <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
          {outcomeItems.map((item, i) => (
            <li key={i} style={{ color: C.text, fontSize: 12, lineHeight: 1.7, marginBottom: 4 }}>{item}</li>
          ))}
        </ul>
      </Card>

      <H2>Peak-Season Headline Insight</H2>
      <Card style={{ border: `1px solid ${C.accent}40`, background: `${C.accent}08` }}>
        <p style={{ color: C.accent, fontWeight: 700, fontSize: 13, lineHeight: 1.65, margin: 0 }}>
          Cruise-pax demand density tại VN ports Dec–Jan (Hạ Long 36 calls · Phú Mỹ 46 calls trong 2–3 tháng · ~200K pax captive per port) là peak-season whitespace lớn nhất mà portfolio hiện tại chạy ở cấp day-only — không có combo cruise-extension overnight SKU.
        </p>
        <p style={{ color: C.muted, fontSize: 11, marginTop: 8, marginBottom: 0 }}>
          3/6 archetypes (A1, A2, A3) explicitly leverage cruise inventory → đáp ứng cruise-leverage gate và thesis "7/12 cruise-leaning portfolio has under-utilized peak-season asset".
        </p>
      </Card>

      <H2>Biggest Risk + Cheapest Follow-up Test</H2>
      <Card style={{ border: `1px solid ${C.red}40`, background: `${C.red}08` }}>
        <div style={{ fontWeight: 700, fontSize: 12, color: C.red, marginBottom: 6 }}>Biggest Risk</div>
        <p style={{ color: C.text, fontSize: 12, lineHeight: 1.65, margin: "0 0 12px" }}>
          Cruise-pax demand segmentation ít seasonal-predictable hơn model — cruise lines shift itineraries ±10–15% trong 6 tháng trước sailing. Nếu RCL Spectrum redeploys từ SG homeport (đã xảy ra 2022/23), A3 + A1 demand density giảm một nửa.
        </p>
        <div style={{ fontWeight: 700, fontSize: 12, color: C.green, marginBottom: 6 }}>Mitigation</div>
        <p style={{ color: C.text, fontSize: 12, lineHeight: 1.65, margin: 0 }}>
          Launch A3 trước tại $3–8K spend; nếu A3 yếu tới Nov 2026 → PO dừng A1 ($8–20K) trước peak-commit. Sequential budget release = risk-gate.
        </p>
      </Card>

      <H2>Validation Tests ($2,100 total)</H2>
      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
          {[
            { arch: "A3", test: "1-month ShoreExGroup A/B — itinerary vs 'sleep-on-bay' variant", budget: "$800", timing: "4 tuần pre-launch" },
            { arch: "A1", test: "2-week Meta Ads A/B — 'Cruise HL + Land' vs 'Winter Escape 2 weeks warm'", budget: "$800", timing: "6 tuần pre-launch" },
            { arch: "A5", test: "2-week TikTok A/B — 'barkada travel' vs 'solo female Gen-Z'", budget: "$500", timing: "4 tuần pre-launch" },
          ].map((t) => (
            <div key={t.arch} style={{ padding: 12, background: C.card, borderRadius: 8 }}>
              <div style={{ fontWeight: 700, color: C.accent, fontSize: 12, marginBottom: 4 }}>{t.arch} — ${t.budget === "$800" ? "800" : "500"}</div>
              <p style={{ color: C.text, fontSize: 11, lineHeight: 1.6, margin: "0 0 6px" }}>{t.test}</p>
              <div style={{ fontSize: 11, color: C.muted }}>{t.timing}</div>
            </div>
          ))}
        </div>
      </Card>

      <H2>Portfolio Leverage Snapshot</H2>
      <Card>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                {["Archetype", "% Năng lực hiện có", "Net-new ops cần"].map((h, i) => (
                  <th key={i} style={{ textAlign: "left", padding: "8px 10px", color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {portfolioLeverage.map((row) => (
                <tr key={row.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "10px", color: row.color, fontWeight: 700, fontSize: 12 }}>{row.name}</td>
                  <td style={{ padding: "10px", color: C.accent, fontWeight: 700, fontSize: 13 }}>{row.existing}</td>
                  <td style={{ padding: "10px", color: C.text, fontSize: 12 }}>{row.netNew}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ color: C.muted, fontSize: 11, marginTop: 10, marginBottom: 0 }}>
          2 trong 3 Top archetypes reuse existing capability ≥60%. Chỉ A5 cần 3 net-new elements nhưng tất cả là "cheap ops" (hire 1 guide + train-berth contract + TikTok kit).
        </p>
      </Card>

      <H2>Trình tự ra mắt</H2>
      <Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {launchSequence.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 80, flexShrink: 0, color: step.color, fontWeight: 700, fontSize: 11 }}>{step.date}</div>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: step.color, flexShrink: 0, marginTop: 4 }} />
              <div>
                <div style={{ color: C.text, fontWeight: 600, fontSize: 12 }}>{step.label}</div>
                <div style={{ color: C.muted, fontSize: 11 }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <H2>Tech / Ops Milestones</H2>
      <Card>
        <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
          {[
            "GTM roadmaps 90-day với 5 workstream × 3 time-block × KPI per Top-3 archetype (§8.1–8.3)",
            "Cross-archetype bundle map + portfolio-as-add-on routing (§8.4)",
            "Validation-test budget $2,100 across Top-3 trước $14–34K paid-spend commit (§9.5)",
            "Clarify-flag: T1 food city · T5 museum city · T6–T9 cruise class · T12 port (§11.3) — không gate Top-3 GTM launch",
          ].map((item, i) => (
            <li key={i} style={{ color: C.muted, fontSize: 12, lineHeight: 1.7, marginBottom: 4 }}>{item}</li>
          ))}
        </ul>
      </Card>
    </>
  );
}
