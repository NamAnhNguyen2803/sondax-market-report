import H2 from "../components/H2.jsx";
import Card from "../components/Card.jsx";
import { C } from "../data/colors.js";

const personas = [
  {
    id: "P1",
    name: "North-American Winter Escape Couple",
    age: "45–65",
    markets: "US (chủ đạo), Canada (secondary)",
    cruiseOverlap: "H",
    peakMonth: "Dec 15 – Feb 15",
    budget: "$4–7K/pax 10–14D",
    color: C.accent,
    pain: "Tháng 12 Boston –15°C, Toronto đóng băng. Couple đã đi Caribbean 3 năm liên tiếp, thấy 'same-same'. Muốn một chuyến dài 2–3 tuần, ấm, lịch sự (không backpacker-chaotic), có 'cultural substance' để kể lại dinner party.",
    analogy: "Giống bạn thân rủ đi nghỉ dưỡng 'spa với câu chuyện' thay vì 'all-inclusive ồn ào'. Muốn ăn ngon, đi nhẹ, có guide giải thích, không tự drag vali qua 3 chặng taxi.",
    solution: "VN combo 12–16 ngày = 3N Ha Long luxury cruise + 4N HN/Hội An văn hóa + 3N Nha Trang/Phú Quốc beach. Ghép được với pre/post SG hoặc BKK homeport cruise nếu nối itinerary.",
    before: "Search 'Vietnam tour for seniors' trên Google → thấy Viator day tours + G Adventures tours có hostel/22-year-old focus → bounce.",
    after: "Tìm được premium-small-group operator (Backyard Travel, Trails of Indochina, Heritage Line combo) → $4K–$7K/pax → mua.",
    outcome: "14 ngày ấm, văn hóa đậm, ảnh đẹp, vợ hài lòng, về nhà kể dinner party suốt 3 tháng. Repeat rate 30–40% theo operator premium feedback.",
    tech: [
      { item: "Xe riêng hạng sang (luxury van)", why: "Couple 55+ không muốn chen xe bus tour — cần riêng tư, thoải mái" },
      { item: "Hướng dẫn viên tiếng Anh Level 4+", why: "Khách Mỹ/Canada kỳ vọng guide kể chuyện văn hóa, không chỉ dịch bảng hiệu" },
      { item: "Bảo hiểm Medevac (cấp cứu hàng không)", why: "Tuổi 45–65, di chuyển nhiều tỉnh — rủi ro y tế cần bảo hiểm sơ tán" },
      { item: "Gắn cờ chế độ ăn (chay/kiêng) trong booking", why: "Couple Mỹ thường có dietary restriction — cần biết trước khi book, không phải hỏi sau" },
      { item: "Công bố khả năng tiếp cận (cầu thang tàu, dốc)", why: "Khách 60+ cần biết trước tàu du thuyền có cầu thang dốc hay không — tránh sự cố" },
    ],
    unmetNeed: "Itinerary 'curated + private + story-rich' không có ở mass-market Viator/GYG; combo 'retail + cruise' seamless end-to-end không có",
  },
  {
    id: "P2",
    name: "UK/Irish Long-haul Culture Seeker",
    age: "35–60",
    markets: "UK, Ireland",
    cruiseOverlap: "M",
    peakMonth: "Feb half-term + Xmas/NY + Oct shoulder",
    budget: "$2.5–4K/pax 10–14D",
    color: C.orange,
    pain: "2-week UK holiday allowance phải count. 'Do it right or don't'. Không muốn Vietnam = 'bucket-list stop on 3-country Asia blur'. Muốn hiểu lịch sử, kiến trúc, food story, không bị guide đẩy qua 8 điểm/ngày.",
    analogy: "Giống reader đang đọc 500-trang Graham Greene — muốn chapter chậm, chi tiết, có 'place-narrative'. Không phải slide-show.",
    solution: "10–14 ngày N→S deep: HN (4N food + colonial quarter + bảo tàng) → Hội An (3N tailored textile + Cham museum) → HCM (3N chiến tranh + chợ + Mekong day). Ít điểm, mỗi điểm 2–3N.",
    before: "Đặt Intrepid 12-day North VN → tour đông 14 người, 1 guide, lịch dày → feel rushed → TripAdvisor review 3/5 'felt like a tourist factory'.",
    after: "Chuyển sang small-group (6–10 pax) hoặc private FIT qua Audley Travel / Trailfinders / Gecko's → £2.5–£4K/pax → satisfied.",
    outcome: "Về UK với 200 ảnh chọn lọc + notebook food/lịch sử → recommend bạn → repeat rate 20%.",
    tech: [
      { item: "Lịch trình nhẹ 5–6h/ngày (không 8h)", why: "Khách Anh ghét bị 'rush' — 2 tuần phép quý giá, muốn chậm rãi thấm văn hóa" },
      { item: "Guide kể chuyện (không đọc số liệu)", why: "P2 tìm narrative — guide phải biết kể lịch sử như đọc sách, không phải recite Wikipedia" },
      { item: "Email gợi ý sách đọc trước chuyến đi", why: "Khách UK thích chuẩn bị — gửi reading list (Graham Greene, báo travel) tạo kỳ vọng" },
      { item: "Đặt chỗ xưởng may/thêu Hội An", why: "Textile workshop là highlight P2 — cần đặt trước vì xưởng nhỏ, slot hạn chế" },
      { item: "Food tour buổi tối (tùy chọn thêm)", why: "P2 muốn ăn sâu, không ăn nhanh — buổi tối rảnh = cơ hội upsell food tour premium" },
    ],
    unmetNeed: "'Slow-paced premium' giữa backpacker (Intrepid $1.6K) và $5K+ luxury (Trails of Indochina) — whitespace tại $2.5–4K/pax mid-premium",
  },
  {
    id: "P3",
    name: "AU/NZ Short-haul Beach + Adventure",
    age: "25–45",
    markets: "Australia, New Zealand",
    cruiseOverlap: "L",
    peakMonth: "Oct + Feb–Mar",
    budget: "$1.5–3K/pax 7–10D",
    color: C.green,
    pain: "Cost-of-living AU 2024/25 cao (+30% so 2019). Melbourne/Sydney holiday rental trong AU summer 2 weeks = AUD 8K. Same budget đi VN + Phú Quốc = 3 weeks 4-star + diving + street food. 'Get more for less, relax, tan, story for Instagram.'",
    analogy: "Giống người Sài Gòn tháng 4 thấy Tết xong ngột — rủ nhau đi Phú Quốc 4 ngày 'gần, rẻ, đẹp'. AU/NZ coi VN same role Oct + Feb-Mar.",
    solution: "7–10 ngày fly-in fly-out: HCM 2N → Phú Quốc 4N resort + diving → Hội An 3N. HOẶC Đà Nẵng direct flight (Jetstar, Bamboo) + Hội An deep.",
    before: "Book Bali thứ 5 năm liên tiếp → bored + tourist crowds.",
    after: "Pivot Phú Quốc / Đà Nẵng → 'Bali nhưng mới' → Instagram post viral → bạn AU/NZ follow.",
    outcome: "AUD 2.5K/pax (vs 8K Bali-same-LOS) → satisfied → 2nd trip trong 18 tháng là likely. Refer bạn bè high.",
    tech: [
      { item: "Gộp vé bay nội địa (HAN→DAD, HCM→PQC)", why: "Khách AU/NZ muốn fly-in fly-out nhanh — gộp vé giảm ma sát đặt chỗ" },
      { item: "Đối tác PADI lặn biển Phú Quốc", why: "Diving là draw chính của P3 — cần đối tác uy tín có cert quốc tế" },
      { item: "Kiểm tra resort 4 sao phù hợp", why: "Budget $1.5–3K = 4 sao, không 5 sao — cần fit-check resort đúng tầm giá" },
      { item: "Danh sách điểm chụp ảnh Instagram", why: "P3 đi vì content — cung cấp shot list = khách post = marketing miễn phí" },
      { item: "SIM/eSIM đi kèm gói tour", why: "Khách AU/NZ cần data ngay khi đến — tránh phải tìm mua SIM tại sân bay" },
    ],
    unmetNeed: "Direct-flight-friendly beach+adventure combo không qua HN/HCM stopover bắt buộc — whitespace cho Đà Nẵng gateway archetype",
  },
  {
    id: "P4",
    name: "Digital Nomad / Long-stay",
    age: "25–40",
    markets: "All 10 (US, UK, CA skew remote-tech; IN + PH skew content creator; SG skew finance WFH)",
    cruiseOverlap: "L",
    peakMonth: "Nov–Mar (trải đều)",
    budget: "$80–150/pax add-on",
    color: C.purple,
    pain: "Remote worker Oct–Mar trốn lạnh (US/UK/CA) hoặc giảm chi phí (SG, AU). HN = winter clammy; HCM = hot ổn định; Hội An = charm + co-work; Đà Nẵng = beach+co-work + visa-friendly. Pain = tìm accom 1–3 tháng reliable wifi + no-tourist-trap dining + community.",
    analogy: "Giống freelance designer Hà Nội thuê AirBnb Đà Lạt 2 tháng để 'vừa làm vừa nghỉ'. Foreign nomad làm same thing nhưng chi 2.5–4x local rate.",
    solution: "1–3 tháng stay HCM / Đà Nẵng / Hội An / Hà Nội — combo với weekend tour (Ninh Bình, Phong Nha, Sa Pa) để 'break long stay'. NOT main tour purchase — add-on tour purchase.",
    before: "Book AirBnb 1 tháng qua AirBnb → không có weekend activity → bored.",
    after: "Attach 2 weekend tours Ninh Bình + Hạ Long qua Klook/Viator → life balance.",
    outcome: "Tour operator capture add-on volume — khách 1-month stay mà mua 2 tour weekend = 2x AOV. Unlock P4 = tour operator thoát '1-purchase' mindset.",
    tech: [
      { item: "Tour ngắn cuối tuần 1–2 đêm", why: "Nomad ở dài 1–3 tháng — chỉ mua tour weekend break, không mua tour 7 ngày" },
      { item: "Giảm giá co-working (Toong, Cirrus, Dreamplex)", why: "P4 làm việc remote — có deal co-work = lý do chọn operator này thay AirBnb tự book" },
      { item: "Danh sách chỗ ở wifi ổn định", why: "Wifi chập chờn = deal-breaker cho remote worker — cần cam kết tốc độ" },
      { item: "Hỗ trợ thông tin visa dài hạn (e-visa 90 ngày)", why: "Nomad cần biết rõ visa policy trước khi commit 1–3 tháng — giảm rào cản quyết định" },
    ],
    unmetNeed: "Weekend tour variant 1–2N price-right ($80–$150/pax) — whitespace vs standard 3-day tour",
  },
  {
    id: "P5",
    name: "Millennial / Gen-Z Bucket-list",
    age: "22–35",
    markets: "SG (30%), UK (20%), AU (15%), PH (15%), US/IN/CA (20%)",
    cruiseOverlap: "L",
    peakMonth: "Oct + Mar (shoulder) + Nov + Feb",
    budget: "$500–1.2K/pax 7–10D",
    color: C.india,
    pain: "'Chưa đi VN = FOMO'. TikTok trend Hà Giang loop, Ninh Bình rice paddy, Hội An lantern drone video. Muốn check-box nhưng ngân sách rẻ ($500–$1,200/pax), 7–10 ngày, social-first, đi group bạn 3–6 người.",
    analogy: "Giống Gen-Z VN lên Tiktok xem Seoul autumn view rồi book vé Seoul — bucket-list driven by feed, không research dày.",
    solution: "Budget 7–10 ngày: HN 2N + Ha Giang 3N loop (motorbike w/ easy-rider) OR HN 2N + Ninh Bình 1N + Sa Pa 2N + Ha Long 2N. Hostel/3-star + street food + 1–2 'Instagram spot' guarantee.",
    before: "Ghép group bạn → mỗi người Google 'best Vietnam itinerary' → 3 người 3 plan khác → đụng → book lastminute.com messy.",
    after: "Book Ha Giang loop qua local operator (~$250 3D2N easy-rider) + retail tour Ninh Bình-Hạ Long combo qua Klook ~$120 → clear plan → high-content trip.",
    outcome: "~$900/pax all-in VN 8D → 'best-value bucket-list trip I did'. Post content 20–50 TikTok/Instagram → operator earn organic reach.",
    tech: [
      { item: "Checklist điểm chụp ảnh UGC-ready", why: "Gen-Z đi vì content — cho sẵn spot list = 20–50 TikTok/IG posts miễn phí" },
      { item: "Booking flow nhóm 6 người qua WhatsApp", why: "Bạn bè Gen-Z book chung nhưng operator chỉ có form 1 người — cần group flow" },
      { item: "Tùy chọn hostel/hotel giường đôi-3", why: "Budget $500–1.2K = hostel OK nhưng cần multi-bed option cho nhóm" },
      { item: "Mạng lưới easy-rider Hà Giang", why: "Hà Giang loop = highlight TikTok — cần partner easy-rider đáng tin (an toàn + biết đường)" },
      { item: "Danh sách nhà hàng quay reel được", why: "P5 chọn nhà hàng theo 'có quay reel đẹp không' — cho list = tăng giá trị tour" },
    ],
    unmetNeed: "Pre-bundled group-of-6 itinerary price-fixed — operator hiện bán 1-pax pricing; và Hà Giang loop operator-mediated vs DIY",
  },
  {
    id: "P6",
    name: "Family School-holiday Multigen",
    age: "Parents 35–50 + kids 6–16, sometimes grandparent",
    markets: "US (25%), UK (20%), AU (20%), SG (20%), IN (10%), PH (5%)",
    cruiseOverlap: "M",
    peakMonth: "Dec 20–Jan 5 + Feb half-term UK + Mar spring break US",
    budget: "$3–6K/pax × 4 pax",
    color: C.cyan,
    pain: "School-holiday windows are hard constraints — US Dec 20–Jan 3; UK Oct/Feb half-term; AU Dec–Jan summer; SG inter-term Nov–Dec; IN winter + Diwali. Family cần: kid-friendly, grandma-friendly, 1 base, no-jump-city, activity có 'edu-value' cho kids.",
    analogy: "Giống family VN book Đà Lạt trong tuần vacation hè — 1 resort + 3 day-trip — chứ không 4 tỉnh trong 7 ngày.",
    solution: "7–10 ngày 1-base multi-daytrip: Hội An resort + Đà Nẵng day + Huế day + Bà Nà day + cooking class + lantern workshop. HOẶC Phú Quốc resort + diving-kid + VinWonders + Safari. HOẶC HN base + Ha Long 2N + Ninh Bình day + Bát Tràng workshop.",
    before: "Book Intrepid family 10-day 'Vietnam in Detail' → 4 cities + 3 overnight train → con khóc → bố bất lực → review 2/5.",
    after: "Chọn 1-base operator (Asia Transpacific, Audley, Abercrombie & Kent family, local DMC) → 1 hotel 7N + day-trip fleet → stress ↓.",
    outcome: "Family $3–6K/pax × 4 pax = $12–24K deal. LTV cao — repeat every 2–3 years + refer 1 family/year.",
    tech: [
      { item: "Phòng liên thông (interconnecting room)", why: "Family 4–6 người cần phòng kề nhau — bố mẹ + trẻ nhỏ, ông bà bên cạnh" },
      { item: "Ghế trẻ em trên xe (US/AU standard)", why: "Khách Mỹ/Úc kỳ vọng car-seat cho trẻ < 8 tuổi — bắt buộc theo thói quen" },
      { item: "Lớp nấu ăn có phân loại độ tuổi", why: "Trẻ 6 tuổi vs 14 tuổi cần activity khác — age-filter tránh bố mẹ thất vọng" },
      { item: "Danh sách phòng khám đối tác sẵn", why: "Đi với trẻ nhỏ + ông bà = cần biết trước clinic gần nhất mỗi điểm dừng" },
      { item: "Xe bậc thấp cho người lớn tuổi", why: "Bà 70 tuổi leo xe SUV cao = rủi ro — cần xe low-step hoặc có bậc phụ" },
    ],
    unmetNeed: "1-base family-all-ages với grandma accessibility disclosure + cooking class age-rating — gần như không có VN operator public disclosure này",
  },
  {
    id: "P7",
    name: "Luxury / Premium Small-Group HNWI",
    age: "45–70",
    markets: "US, UK, SG, IN, ZA (multi-market — NOT US/UK only)",
    cruiseOverlap: "H",
    peakMonth: "Dec + Jan + Feb",
    budget: "$15–30K/pax 12–18D",
    color: C.pink,
    pain: "HNWI 50+ đã đi Paris, Kyoto, Marrakech, Buenos Aires, Patagonia. 'Vietnam next — but NOT typical'. Không muốn same-as-neighbour itinerary. Muốn private-guide, off-the-beat + 5-star hybrid, chef's table, cultural access không có trên Viator.",
    analogy: "Giống audiophile mua 70K-USD speaker — họ biết khác biệt ở chỗ nào, operator phải show difference.",
    solution: "12–18 ngày private, 1–2 couple: HN Metropole 3N (private Long Biên dawn + Bảo tàng private docent) → Heritage Line Ylang 3N → Four Seasons Hoi An 4N (tailor + private cooking) → Nam Hải Đà Nẵng 3N → HCM Park Hyatt 3N (chef's-table + private Cu Chi sunrise).",
    before: "Search 'luxury Vietnam tour' → Viator/GYG không fit → email 3 operator → 2 weeks chờ quote → frustrated.",
    after: "Personal travel designer (Indagare, Trails of Indochina US, Asia DMC) → quote 72h → $15–$30K/pax → book.",
    outcome: "$60–120K/couple × reference-strong. LTV rất cao + word-of-mouth evangelism mạnh.",
    tech: [
      { item: "Guide riêng cấp docent (Anh/Pháp/Hoa)", why: "HNWI muốn guide như 'private art historian' — không phải tour guide thường" },
      { item: "Du thuyền Heritage Line / Aqua / Amansara", why: "P7 chỉ chấp nhận tàu hạng luxury — tên thương hiệu tàu = trust signal" },
      { item: "Tùy chọn trực thăng Đà Nẵng–Hội An", why: "Tiết kiệm 45 phút đi đường + trải nghiệm VIP — khách $15–30K sẵn sàng trả" },
      { item: "Đặt bàn chef's table riêng", why: "HNWI không ăn cùng tour group — cần private dining, đầu bếp giới thiệu trực tiếp" },
      { item: "Dịch vụ visa concierge tại sân bay", why: "Khách $15K+ không xếp hàng immigration — concierge đón ngay cửa máy bay" },
    ],
    unmetNeed: "'Combo cruise (Silversea SG-HK) + Vietnam-land post-disembark 7N private' — whitespace rất ít operator handle cả 2 sides",
    multiMarketNote: "IN: Taj Holidays + Thomas Cook India Signature; SG: Dynasty Travel + Chan Brothers Luxury; ZA: Travelshop SA + Silversea ZA agents. IN HNWI outbound +18% 2023→2024 (Ministry of Tourism India).",
  },
];

const overlapColor = { H: C.green, M: C.orange, L: C.muted };

const summaryMatrix = [
  { id: "P1", label: "P1 NA Winter Escape", markets: "US, CA, (UK)", overlap: "H", peak: "Dec 15–Feb 15", budget: "$4–7K", unmet: "Curated retail + cruise seamless combo" },
  { id: "P2", label: "P2 UK/IE Culture Seeker", markets: "UK, IE", overlap: "M", peak: "Feb half-term, Xmas/NY, Oct", budget: "$2.5–4K", unmet: "Slow-paced mid-premium ($2.5–4K gap)" },
  { id: "P3", label: "P3 AU/NZ Short-haul", markets: "AU, NZ", overlap: "L", peak: "Oct + Feb–Mar", budget: "$1.5–3K", unmet: "Direct-flight DAD gateway beach+adventure" },
  { id: "P4", label: "P4 Nomad Long-stay", markets: "All 10", overlap: "L", peak: "Nov–Mar", budget: "$80–150 add-on", unmet: "Weekend 1–2N micro-tour" },
  { id: "P5", label: "P5 Gen-Z Bucket-list", markets: "SG, UK, AU, PH", overlap: "L", peak: "Oct, Mar + Nov, Feb", budget: "$500–1.2K", unmet: "Group-of-6 fixed-price + Hà Giang mediated" },
  { id: "P6", label: "P6 Family Multigen", markets: "US, UK, AU, SG, IN", overlap: "M", peak: "Dec 20–Jan 5, Feb UK, Mar US", budget: "$3–6K × 4 pax", unmet: "1-base + grandma-accessibility + kid-age rating" },
  { id: "P7", label: "P7 Luxury HNWI", markets: "US, UK, SG, IN, ZA", overlap: "H", peak: "Dec, Jan, Feb", budget: "$15–30K", unmet: "Cruise + land combo + private-docent" },
];

export default function Personas() {
  return (
    <>
      <H2>7 Persona Cards — Overview</H2>
      <Card>
        <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.65, margin: 0 }}>
          7 persona được thiết kế theo <strong>UC-card format</strong>: Nỗi đau → Tương đồng → Giải pháp → Trước/Sau → Kết quả.
        </p>
        <div style={{ marginTop: 10, display: "flex", gap: 20, flexWrap: "wrap", borderTop: `1px solid ${C.border}`, paddingTop: 10 }}>
          <div style={{ fontSize: 11, color: C.muted }}>
            <strong style={{ color: C.text }}>Cruise-overlap:</strong> H (Cao) / M (Trung bình) / L (Thấp)
          </div>
          <div style={{ fontSize: 11, color: C.muted }}>
            <strong style={{ color: C.text }}>Ký hiệu mùa:</strong> 🔴 (Đỉnh điểm) / 🟠 (Cao) / 🟡 (Trung bình) / ⚪ (Thấp)
          </div>
        </div>
      </Card>

      {personas.map((p) => (
        <div key={p.id} style={{ marginBottom: 20 }}>
          <H2>{p.id} — {p.name}</H2>
          <Card style={{ borderLeft: `4px solid ${p.color}` }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14, paddingBottom: 12, borderBottom: `1px solid ${C.border}` }}>
              <div style={{ padding: "4px 10px", background: `${p.color}20`, borderRadius: 6, fontSize: 11, color: p.color, fontWeight: 700 }}>Tuổi: {p.age}</div>
              <div style={{ padding: "4px 10px", background: C.border, borderRadius: 6, fontSize: 11, color: C.muted }}>Markets: {p.markets}</div>
              <div style={{ padding: "4px 10px", background: `${overlapColor[p.cruiseOverlap]}20`, borderRadius: 6, fontSize: 11, color: overlapColor[p.cruiseOverlap], fontWeight: 700 }}>Cruise overlap: {p.cruiseOverlap}</div>
              <div style={{ padding: "4px 10px", background: `${C.accent}15`, borderRadius: 6, fontSize: 11, color: C.accent }}>Peak: {p.peakMonth}</div>
              <div style={{ padding: "4px 10px", background: `${C.purple}15`, borderRadius: 6, fontSize: 11, color: C.purple }}>Budget: {p.budget}</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 12 }}>
              {[
                { label: "Pain", content: p.pain, color: C.red },
                { label: "Analogy", content: p.analogy, color: C.orange },
                { label: "Solution", content: p.solution, color: C.green },
              ].map((item) => (
                <div key={item.label} style={{ padding: 12, background: C.card, borderRadius: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: 11, color: item.color, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{item.label}</div>
                  <p style={{ color: C.text, fontSize: 12, lineHeight: 1.65, margin: 0 }}>{item.content}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12, marginTop: 12 }}>
              <div style={{ padding: 12, background: `${C.red}10`, borderRadius: 8, borderLeft: `2px solid ${C.red}` }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: C.red, marginBottom: 6 }}>BEFORE</div>
                <p style={{ color: C.text, fontSize: 12, lineHeight: 1.65, margin: 0 }}>{p.before}</p>
              </div>
              <div style={{ padding: 12, background: `${C.green}10`, borderRadius: 8, borderLeft: `2px solid ${C.green}` }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: C.green, marginBottom: 6 }}>AFTER</div>
                <p style={{ color: C.text, fontSize: 12, lineHeight: 1.65, margin: 0 }}>{p.after}</p>
              </div>
            </div>

            <div style={{ marginTop: 12, padding: 12, background: `${p.color}10`, borderRadius: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 11, color: p.color, marginBottom: 6 }}>OUTCOME</div>
              <p style={{ color: C.text, fontSize: 12, lineHeight: 1.65, margin: 0 }}>{p.outcome}</p>
            </div>

            <div style={{ marginTop: 12, padding: 12, background: C.card, borderRadius: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 11, color: C.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Yêu cầu vận hành — Operator cần chuẩn bị gì?</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {p.tech.map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                    <span style={{ color: C.accent, fontSize: 11, flexShrink: 0 }}>▸</span>
                    <div>
                      <span style={{ color: C.text, fontSize: 11, fontWeight: 600 }}>{t.item}</span>
                      <span style={{ color: C.muted, fontSize: 11 }}> — {t.why}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 10, padding: "8px 12px", background: `${C.accent}10`, borderRadius: 6, borderLeft: `2px solid ${C.accent}` }}>
              <span style={{ fontWeight: 700, fontSize: 11, color: C.accent }}>Unmet need: </span>
              <span style={{ color: C.text, fontSize: 11 }}>{p.unmetNeed}</span>
            </div>

            {p.multiMarketNote && (
              <div style={{ marginTop: 8, padding: "8px 12px", background: `${C.purple}10`, borderRadius: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 11, color: C.purple }}>Multi-market evidence (Q4/Q5): </span>
                <span style={{ color: C.muted, fontSize: 11 }}>{p.multiMarketNote}</span>
              </div>
            )}
          </Card>
        </div>
      ))}

      <H2>Cross-Persona Summary Matrix</H2>
      <Card>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                {["Persona", "Markets (top-3)", "Cruise", "Peak month(s)", "Budget band", "Key unmet need → §7"].map((h, i) => (
                  <th key={i} style={{ textAlign: "left", padding: "8px 6px", color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.4, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {summaryMatrix.map((row) => (
                <tr key={row.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "8px 6px", color: C.text, fontWeight: 700, fontSize: 12, whiteSpace: "nowrap" }}>{row.label}</td>
                  <td style={{ padding: "8px 6px", color: C.muted }}>{row.markets}</td>
                  <td style={{ padding: "8px 6px", textAlign: "center" }}>
                    <span style={{ padding: "2px 6px", background: `${overlapColor[row.overlap]}20`, color: overlapColor[row.overlap], borderRadius: 4, fontWeight: 700, fontSize: 11 }}>{row.overlap}</span>
                  </td>
                  <td style={{ padding: "8px 6px", color: C.accent }}>{row.peak}</td>
                  <td style={{ padding: "8px 6px", color: C.green, fontWeight: 600 }}>{row.budget}</td>
                  <td style={{ padding: "8px 6px", color: C.muted, fontSize: 11 }}>{row.unmet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 12, padding: 10, background: C.card, borderRadius: 8 }}>
          <p style={{ color: C.muted, fontSize: 11, lineHeight: 1.65, margin: 0 }}>
            <strong style={{ color: C.text }}>Read-across §7:</strong> P1 + P7 anchor cruise archetypes (≥2 archetype cruise gate). P4 + P5 anchor low-ticket add-on + group-of-6. P6 anchor family 1-base. P2 + P3 anchor mid-premium land + direct-flight DAD beach archetype.
          </p>
        </div>
      </Card>

      <H2>Bias Disclosure</H2>
      <Card>
        <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
          {[
            "Q4: P7 explicitly drew IN/SG/ZA evidence với market-specific operator citations (Taj Holidays, Dynasty Travel, Cleaver's). Không phải US/UK-only.",
            "Q5: Mỗi persona card nêu multi-market evidence. Không có nationality = single persona. P5 Gen-Z explicitly SG + UK + AU + PH, không phải 'Americans = Gen-Z bucket-list'.",
            "Q6: Không dùng data pre-2023, ngoại trừ calibration note ('phục hồi 98% so 2019').",
            "[gap] Quantitative persona-sizing % share — requires primary survey; qualitative only.",
            "[gap] ADR banding by persona là operator-triangulated, không public.",
          ].map((item, i) => (
            <li key={i} style={{ color: C.muted, fontSize: 11, lineHeight: 1.7, marginBottom: 4 }}>{item}</li>
          ))}
        </ul>
      </Card>
    </>
  );
}
