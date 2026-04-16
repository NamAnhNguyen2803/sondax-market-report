# S4: OTA Platform Landscape & Booking Behavior

---

## 4.1 Bối cảnh ngành: Tours & Activities trên OTA toàn cầu

Theo Arival & Phocuswright, ngành tours, activities & attractions toàn cầu đạt **US$271 tỷ trong 2025**, dự kiến tăng lên US$342 tỷ vào 2029. `[HIGH]`

Điểm quan trọng cho Vietnam inbound:
- **Chỉ ~33% gross bookings** được thực hiện qua kênh online (2025), so với 64% của ngành travel nói chung — nghĩa là **phần lớn tour vẫn book offline/in-destination** `[HIGH]`
- OTAs là kênh phân phối **tăng trưởng nhanh nhất** — gross bookings qua OTA tăng hơn 5 lần trong giai đoạn 2019-2025 `[HIGH]`
- OTAs chiếm **~1/3 tổng bookings** của ngành tours & activities (2024), tăng từ 24% năm 2019 `[HIGH]`

**Hàm ý cho operator**: Thị trường Vietnam tours đang ở giao điểm — offline vẫn lớn nhưng online shift đang tăng tốc. Operator nào chiếm vị trí tốt trên OTAs sớm sẽ hưởng lợi từ đợt chuyển dịch này.

---

## 4.2 Platform Comparison — Vietnam Tour Listings

### Bảng so sánh nền tảng OTA

| Platform | Strength | Primary Markets | Booking Mode | Commission Range (operator) | Vietnam Listing Estimate | Data Confidence |
|----------|----------|----------------|-------------|---------------------------|------------------------|-----------------|
| **Viator** (TripAdvisor) | Breadth lớn nhất, review ecosystem mạnh, TripAdvisor traffic funnel | US, UK, AU, CA, NZ, IE | Desktop-dominant, pre-trip là chính | 20-30% | ~4,000-5,000+ listings | `[MEDIUM]` — không có con số chính xác công khai; ước tính từ category pages |
| **GetYourGuide** | Curated quality, UX sạch, free cancellation policy mạnh | UK, DE, EU, AU, US | Desktop + mobile cân bằng | 20-30% | ~2,000-3,000 listings | `[MEDIUM]` — ước tính từ regional pages |
| **Klook** | Asia-first, mobile-first, flash sales/promo codes, instant confirmation | SG, HK, TW, IN, PH, AU | **Mobile-dominant**, in-destination + same-day | 15-35% (negotiable) | ~500-800 listings (tours + attractions) | `[MEDIUM]` — một category page hiển thị 126 activities, nhưng tổng bao gồm attractions/passes cao hơn |
| **TripAdvisor Experiences** | Review ecosystem khổng lồ, SEO dominance, trust factor | US, UK, AU, CA | Desktop-dominant, research-heavy | 20-30% (shared với Viator backend) | ~10,000+ results (bao gồm cả Viator-powered listings) | `[MEDIUM]` — con số bao gồm duplicate với Viator |
| **Airbnb Experiences** | Unique/hyper-local, host-led, authentic feel | US, UK, AU, EU | Mobile app + desktop | 20% (flat, từ guest service fee) | ~200-400 experiences | `[LOW]` — Airbnb không công khai số lượng; ước tính từ browse |
| **Traveloka** | SEA-native, 50M+ users, "super app" (flight+hotel+xperience), strong mobile | SG, ID, MY, TH, PH, VN domestic | **Mobile-dominant** (app-first) | ~15-25% (ước tính) | ~50-100 curated activities | `[LOW]` — listings ít nhưng growing; focus Vietnam domestic + SEA inbound |
| **KKday** | Asia-focused, 30,000+ experiences globally, young traveler (20-45) | TW, HK, KR, SG, JP | Mobile-first | 15-30% | ~300-500 listings | `[LOW]` — ước tính |
| **TourRadar** | Multi-day tour specialist, package tours | US, UK, AU, CA, DE | Desktop, pre-trip | 20-25% | ~500-800 multi-day tours | `[MEDIUM]` |

### Directional Platform Ranking (Vietnam tours, theo listing volume + traffic proxy)

1. **TripAdvisor / Viator** — Vượt trội về listing volume (~10,000+ kết hợp) và traffic từ Western markets. Viator.com global ranking #1,889, traffic tăng +8.3% MoM. `[HIGH]`
2. **GetYourGuide** — #2 về breadth cho Western travelers. Global ranking #1,258. Curated approach = ít listings hơn nhưng conversion rate cao hơn. `[MEDIUM]`
3. **Klook** — **Tăng trưởng nhanh nhất**: traffic tăng +21.15% MoM, global ranking cải thiện từ #1,570 lên #1,282. Dominant cho Asian markets. `[HIGH]`
4. **TourRadar** — Niche nhưng mạnh cho multi-day packages
5. **KKday / Traveloka** — Regional players, đang grow nhanh trong SEA segment
6. **Airbnb Experiences** — Niche, unique, ít listings nhưng high engagement

---

## 4.3 Platform-Market Fit: Ai dùng sàn nào?

### Western Markets (US, UK, CA, AU, NZ, IE, ZA)

| Market Segment | Primary Platform | Secondary Platform | Lý do |
|---------------|-----------------|-------------------|-------|
| US travelers | **Viator** | GetYourGuide | TripAdvisor ecosystem = natural discovery funnel cho US users; Viator là brand quen thuộc |
| UK travelers | **Viator** / **GetYourGuide** | Airbnb Experiences | GYG mạnh ở EU; UK users quen cả hai platform |
| AU/NZ travelers | **Viator** | **Klook** | AU có behavior split: pre-trip dùng Viator, in-destination chuyển sang Klook (proximity với Asia) |
| CA travelers | **Viator** | GetYourGuide | Hành vi tương tự US |

`[MEDIUM]` — Inferred từ platform traffic by geography + industry reports; không có proprietary market share data.

### Asian English-Speaking Markets (SG, IN, PH)

| Market Segment | Primary Platform | Secondary Platform | Lý do |
|---------------|-----------------|-------------------|-------|
| SG travelers | **Klook** | Traveloka | Klook = dominant travel app ở SG; Traveloka mạnh cho SEA; mobile-first behavior |
| IN travelers | **Klook** | Viator / MakeMyTrip | Klook đang push mạnh India market; mobile-first, price-sensitive = flash sales appeal |
| PH travelers | **Klook** / **Traveloka** | KKday | SEA-native platforms dominate; English proficiency cao nên cũng dùng Viator |

`[MEDIUM]` — Directional signal từ platform presence + app rankings; India và Philippines data còn gaps.

**Insight quan trọng**: Có sự phân tách rõ ràng giữa **Western stack (Viator → GYG → Airbnb)** và **Asian stack (Klook → Traveloka → KKday)**. Operator cần list trên CẢ HAI stacks để maximize reach. (Cross-ref S1: Western vs. Asian behavioral split)

---

## 4.4 Booking Behavior: Pre-Trip vs. In-Destination

### Behavioral Insights từ nghiên cứu thị trường

**Insight #1: Vietnam có tỷ lệ in-destination booking cao bất thường** `[MEDIUM]`

Theo forum analysis (TripAdvisor Vietnam Forum) và industry data:
- **Day tours** (Cu Chi Tunnels, Mekong Delta, city food tours): Phần lớn travelers **book 1-2 ngày trước hoặc same-day** khi đã tới Vietnam. Giá tại chỗ thường **rẻ hơn 10-30%** so với OTA, nhưng thiếu social proof và cancellation policy.
- **Multi-day tours** (Ha Long Bay cruise, Sapa trekking, Ha Giang loop): **Pre-book 1-4 tuần trước**, đặc biệt mùa cao điểm June-August. Ha Long Bay là category "phải book trước" — high-demand junks sell out.
- **Niche/premium experiences** (cooking classes, photography tours): Thường pre-book qua OTA vì limited spots.

**Insight #2: Klook users = mobile-first, in-destination behavior** `[MEDIUM]`

- Klook được thiết kế cho **last-minute booking**: instant confirmation, QR code tickets, same-day availability
- Users report book cooking class tại Hanoi **cùng ngày** qua Klook app
- Flash sales và promo codes drive impulse booking — phù hợp với SG/IN travelers hay tìm deals
- Tuy nhiên, app UX "hơi crowded" — operator cần optimize listing title + hero image cho mobile viewport nhỏ

**Insight #3: Viator/GYG users = research-heavy, pre-trip planners** `[MEDIUM]`

- Discovery funnel: **Google search → TripAdvisor reviews → Viator booking** (hoặc trực tiếp từ TripAdvisor Experiences)
- Desktop-dominant research phase, nhưng mobile conversion đang tăng
- **Social proof là yếu tố quyết định**: "Bestseller" badge, "Booked X times today", star rating 4.5+ — tất cả tăng conversion đáng kể
- Free cancellation policy (cả Viator lẫn GYG) giảm friction cho pre-trip booking: "Book now, decide later"

### Booking Mode Distribution (Directional Estimate)

| Platform | Pre-Trip (Desktop, tuần trước) | In-Destination (Mobile, 0-2 ngày trước) | Data Confidence |
|----------|-------------------------------|----------------------------------------|-----------------|
| Viator | ~65-70% | ~30-35% | `[LOW]` |
| GetYourGuide | ~60-65% | ~35-40% | `[LOW]` |
| Klook | ~30-40% | ~60-70% | `[MEDIUM]` |
| TripAdvisor | ~70-75% (research/discovery) | ~25-30% | `[LOW]` |
| Airbnb Experiences | ~55-65% | ~35-45% | `[LOW]` |
| Traveloka | ~35-45% | ~55-65% | `[LOW]` |
| Direct/Local (walk-in, WhatsApp, Zalo) | ~10-20% | ~80-90% | `[MEDIUM]` |

**Lưu ý**: Các ước tính trên là directional dựa trên platform design, user behavior patterns, và forum/industry signals — KHÔNG phải proprietary data. Flagged for deep-dive nếu cần precision.

---

## 4.5 Booking Funnel: Discovery → Platform → Purchase Trigger

```
DISCOVERY CHANNELS                    PLATFORM SELECTION              PURCHASE TRIGGERS
─────────────────                    ──────────────────              ─────────────────

[Google Search]─────┐                                               ┌─ Free cancellation
  "Vietnam tours"   │                                               │
  "things to do     │   ┌──────────────┐                           ├─ "Bestseller" badge
   Hanoi"           ├──→│  TripAdvisor  │──→ Viator/GYG ──────────├─ 4.5★+ rating
                    │   │  (reviews)    │                           │
[Social Media]──────┤   └──────────────┘                           ├─ "Booked X times"
  Instagram reels   │                                               │
  TikTok            │   ┌──────────────┐                           ├─ Price match/deal
  YouTube vlogs     ├──→│  Direct OTA   │──→ Book on platform ────├─ Instant confirmation
                    │   │  (Viator/GYG/ │                           │
[Word of Mouth]─────┤   │   Klook)      │                           ├─ Small group cap
  Friends/family    │   └──────────────┘                           │  (limited availability)
  Reddit            │                                               │
  Travel forums     │   ┌──────────────┐                           ├─ Photo-rich listing
                    ├──→│  In-Dest      │──→ Walk-in/WhatsApp ────├─ Local price advantage
[Hotel Concierge]───┤   │  (street      │                           │
                    │   │   agencies)   │                           └─ Flexible timing
[Influencer]────────┘   └──────────────┘                             (same-day available)
```

### Funnel Insights

1. **Google → TripAdvisor → Viator** là funnel phổ biến nhất cho Western markets. TripAdvisor SEO dominance nghĩa là hầu hết Google searches cho "Vietnam tours" sẽ surface TripAdvisor results, dẫn sang Viator booking. `[HIGH]`

2. **Social media → Klook/Direct** là funnel đang grow nhanh cho Asian markets (SG, IN). Instagram/TikTok content về Vietnam tạo inspiration, users chuyển thẳng sang Klook app hoặc search trên Google. `[MEDIUM]`

3. **In-destination discovery** vẫn chiếm tỷ trọng lớn tại Vietnam: hotel concierge recommendations, street-level tour agencies, và WhatsApp/Zalo booking trực tiếp với operator. Đây là kênh mà OTA KHÔNG capture được. `[MEDIUM]`

4. **Social proof là purchase trigger #1** trên mọi OTA: star rating, review count, bestseller badge, và "booked X times today" counter. Listings thiếu reviews gần như invisible. (Cross-ref S5: success factors) `[HIGH]`

---

## 4.6 Commission Structure & Implications cho Operator

| Platform | Commission (Operator trả) | Payment Terms | Listing Miễn Phí? | Boost/Ads Option |
|----------|--------------------------|---------------|-------------------|-----------------|
| Viator | 20-30% | Net 30-45 days | Co | **Viator Accelerate** — tăng commission 1-2% để được placement tốt hơn |
| GetYourGuide | 20-30% | Net 30 days | Co | Sponsored placement (đang test) |
| Klook | 15-35% (negotiable) | Net 30 days | Co | Flash sales, Klook Pass bundles |
| TripAdvisor Experiences | Shared với Viator backend | — | — | — |
| Airbnb Experiences | ~20% (guest service fee) | Weekly payouts | Co | Không có paid boost |
| Traveloka Xperience | ~15-25% (ước tính) | Varies | Co | In-app promotions |

`[MEDIUM]` — Commission ranges từ platform documentation + industry reports; exact rates tuỳ negotiation.

**Hàm ý chiến lược**:
- **Klook** có commission range rộng nhất (15-35%) = room to negotiate nếu volume cao
- **Viator Accelerate** cho phép "mua" visibility — worth it cho listings mới cần bootstrap reviews
- **Airbnb Experiences** commission thấp nhất nhưng volume cũng thấp nhất — phù hợp cho niche/unique tours
- Multi-platform listing là best practice — KHÔNG exclusive cho 1 sàn

---

## 4.7 Kênh Direct Booking — Đừng bỏ qua

OTAs không phải kênh duy nhất. Tại Vietnam, các kênh direct vẫn rất mạnh:

| Kênh | Đặc điểm | Khi nào tourists dùng |
|------|----------|----------------------|
| **Street agencies** (phố Phạm Ngũ Lão, Old Quarter) | Giá rẻ hơn OTA 10-30%, negotiable, cash payment | Budget travelers, in-destination, walk-in |
| **WhatsApp / Zalo** | Direct contact với operator, flexible customization | Repeat visitors, referrals, group bookings |
| **Operator website** | Giá "best rate guarantee", direct relationship | Travelers đã research trên OTA, muốn giá tốt hơn |
| **Hotel concierge** | Convenience, trust factor, commission-based | First-time visitors, mid-premium segment |

`[MEDIUM]` — Dựa trên TripAdvisor forum analysis và industry knowledge.

**OTA vs. Direct**: Operator nên dùng OTAs để **acquire customers** (discovery + social proof), nhưng nurture **direct channel** cho repeat bookings và higher margins. Nhiều top operators tại Vietnam chạy dual strategy này.

---

> **Key Takeaways**
>
> 1. **Thị trường phân tách rõ Western vs. Asian stack**: Viator/GYG dominate US/UK/AU/CA; Klook/Traveloka dominate SG/IN/PH. Operator PHẢI list trên cả hai stacks để cover 10 source markets. `[HIGH]`
>
> 2. **Klook là platform tăng trưởng nhanh nhất** (+21% traffic MoM) và dominates mobile/in-destination booking cho Asian markets — đây là kênh cần ưu tiên optimize cho SG/IN segment. `[HIGH]`
>
> 3. **Google → TripAdvisor → Viator** là booking funnel #1 cho Western markets. Social proof (reviews, badges, ratings) là purchase trigger quan trọng nhất — listings mới cần chiến lược bootstrap reviews ngay từ đầu. `[HIGH]`
>
> 4. **Vietnam có tỷ lệ in-destination/offline booking cao** — street agencies và direct channels vẫn chiếm phần lớn. OTAs là công cụ discovery và acquisition, nhưng direct channel mang lại margin tốt hơn. `[MEDIUM]`
>
> 5. **Commission 20-30%** là standard across platforms — multi-platform listing + direct channel hybrid strategy là tối ưu cho margin. Klook có room to negotiate thấp hơn (từ 15%) nếu volume đủ lớn. `[MEDIUM]`

---

*Data sources: Arival Research, Phocuswright, Similarweb, TripAdvisor, Viator, GetYourGuide, Klook, Traveloka, TripAdvisor Vietnam Forum, industry reports 2025-2026. Listing counts là ước tính directional, không phải exact figures.*
