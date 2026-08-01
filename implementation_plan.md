# Zotdor.uz validation landing page texnik rejasi

Zotdor.uz — O'zbekiston chorvadorlari uchun qoramol va boshqa chorvalarni sotish hamda sotib olishga mo'ljallangan marketplace platformasining validation landing page sahifasi. Sahifa foydalanuvchilar (25-55 yosh, viloyatlarda yashaydigan, arzon Android telefon va sekin 3G internet ishlatadigan chorvadorlar) uchun juda sodda, tez va tushunarli bo'ladi.

## User Review Required

> [!IMPORTANT]
> - **Shrift va Unumdorlik**: Sahifa 3G internetda 2 soniyadan kam vaqtda ochilishi uchun tashqi shriftlar (Google Fonts va h.k.) ishlatilmaydi, faqat tizim shriftlari (system font stack) qo'llaniladi.
> - **Ikki Alifbo (Kirill va Lotin)**: Sahifa standart holatda Krill alifbosida ochiladi, lekin Header'dagi tugma orqali darhol Lotin alifbosiga va aksincha o'tkazish imkoniyati yaratiladi.
> - **Forma ma'lumotlari**: Telegram Bot API va Supabase API route (`/api/submit`) orqali yuboriladi. Tarmoq uzilishi yoki server xatosi bo'lganda foydalanuvchiga xato ko'rsatmasdan `localStorage`ga saqlanadi va keyinroq qayta yuboriladi.

## Open Questions

> [!NOTE]
> 1. Telegram bot uchun `BOT_TOKEN` va `CHAT_ID` hamda Supabase kalitlari `.env.local` fayliga qo mezon qilinadi. Namuna sifatida `.env.example` fayli ham yaratiladi.

## Proposed Changes

---

### Project Setup & Configuration

#### [NEW] [package.json](file:///c:/Users/IT/Center/Zotdor/package.json)
- Next.js 14/15 App Router, React, TypeScript, Tailwind CSS, Lucide icons (yoki eng yengil SVG belgilari).

#### [NEW] [tailwind.config.ts](file:///c:/Users/IT/Center/Zotdor/tailwind.config.ts)
- Rang palitrasi sozlamalari:
  - To'q yashil / zaytun (`#1b3e2b`, `#2d5a3f`, `#122b1e`)
  - Qumtosh / bej (`#f7f4ee`, `#e8e2d5`, `#f0eae1`)
  - To'q jigarrang aksent (`#4a3728`, `#38271a`)
- System font stack: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`.

#### [NEW] [next.config.mjs](file:///c:/Users/IT/Center/Zotdor/next.config.mjs)
- Standart Next.js optimallashtirish va SVG/Image sozlamalari.

#### [NEW] [.env.example](file:///c:/Users/IT/Center/Zotdor/.env.example)
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` o'zgaruvchilari uchun namuna.

---

### Application Core & Layout

#### [NEW] [src/app/layout.tsx](file:///c:/Users/IT/Center/Zotdor/src/app/layout.tsx)
- O'zbek tilidagi SEO meta-teglari (Title: "Zotdor.uz — Chorvalarni sotish va sotib olish bozori", Description, OpenGraph teglari).
- Tizim shriftlari sozlanishi (hech qanday tashqi shrift so'rovi yuborilmaydi).

#### [NEW] [src/app/globals.css](file:///c:/Users/IT/Center/Zotdor/src/app/globals.css)
- Custom CSS gradientlar va rang o'zgaruvchilari. Glassmorphism va ortiqcha neon soyalar ishlatilmaydi. Yuqori kontrast va minimalistik yer bilan bog'liq (earthy) ko'rinish.

---

### Translation & State Management

#### [NEW] [src/lib/dictionary.ts](file:///c:/Users/IT/Center/Zotdor/src/lib/dictionary.ts)
- Krill va Lotin alifbolaridagi barcha matnlar lug'ati (Header, Hero, Questionnaire, Features, Mock Listings, FAQ, Footer).

#### [NEW] [src/context/LanguageContext.tsx](file:///c:/Users/IT/Center/Zotdor/src/context/LanguageContext.tsx)
- Alifbo almashtirish konteksti (Kirill <-> Lotin).

---

### Page Components

#### [NEW] [src/components/Header.tsx](file:///c:/Users/IT/Center/Zotdor/src/components/Header.tsx)
- Logotip: `Zotdor.uz` (chorva SVG belgisi bilan)
- O'ng tarafda: "Тез орада ишга тушади" status belgilari hamda Kirill/Lotin almashtirish tugmasi.

#### [NEW] [src/components/Hero.tsx](file:///c:/Users/IT/Center/Zotdor/src/components/Hero.tsx)
- H1 Sarlavha: "Чорваларни сотиш ва сотиб олиш"
- Subtitle: O'zbekiston viloyatlari bo'yicha to'g'ridan-to'g mezon va xaridor topish imkoniyati.
- Asosiy ariza va qisqa so'rovnoma formasi bo'limi.

#### [NEW] [src/components/ValidationForm.tsx](file:///c:/Users/IT/Center/Zotdor/src/components/ValidationForm.tsx)
- Qisqa so'rovnoma savollari:
  1. Maqsad (Sotmoqchiman / Sotib olmoqchiman / Ikkalasi ham)
  2. Chorva turi (Qoramol, Qo'y-echki, Ot, Boshqa)
  3. Muhim mezon (Tez sotish, Ma'qul narx, Ishonchli xaridor)
- Kontak ma'lumotlari:
  - Ism (Input)
  - Viloyat (Dropdown: 14 ta hudud)
  - Telefon raqam (+998 maskali input, 48px balandlik)
- Yuborish tugmasi (Katta, qalin, barmoq bilan bosish uchun min 48px).
- Offline fallback: Yuborilganda `localStorage`ga zaxiralash va `/api/submit`ga yuborish. Internet/Server xatosi bo'lsa ham foydalanuvchiga muvaffaqiyatli qabul qilinganligi haqida xabar berish.

#### [NEW] [src/components/MockListings.tsx](file:///c:/Users/IT/Center/Zotdor/src/components/MockListings.tsx)
- Foydalanuvchida real mahsulot taassurotini uyg'otuvchi e'lonlar kartochkalari (Simental buqa, Hisor qo'yi, Golshtin sigiri) - SVG/CSS rasmlar va viloyat narxlari bilan.

#### [NEW] [src/components/Features.tsx](file:///c:/Users/IT/Center/Zotdor/src/components/Features.tsx)
- 3 ta oddiy qadam va platformaning afzalliklari (0% komissiya, To'g'ridan-to'g'ri aloqa, Barcha viloyatlar).

#### [NEW] [src/components/FAQ.tsx](file:///c:/Users/IT/Center/Zotdor/src/components/FAQ.tsx)
- Ko'p beriladigan savollarga javoblar (Tekinmi?, Qanday bog'lanaman?, Qachon ishga tushadi?).

#### [NEW] [src/components/Footer.tsx](file:///c:/Users/IT/Center/Zotdor/src/components/Footer.tsx)
- Zotdor.uz brendi, mualliflik huquqi va "O'zbekiston chorvadorlari uchun" belgisi.

---

### Backend API Route

#### [NEW] [src/app/api/submit/route.ts](file:///c:/Users/IT/Center/Zotdor/src/app/api/submit/route.ts)
- POST so'rovi ishlov beruvchisi:
  1) Telegram Bot API `sendMessage` funksiyasi (chiroyli formatlangan HTML xabar: Ism, Raqam, Viloyat, So'rovnoma javoblari, Sana).
  2) Supabase REST API ga ma'lumotlarni yozish.
  3) Xatolar bo'lsa `200 OK` bilan `{ success: true, savedOffline: true }` qaytarish yoki graceful javob.

---

## Verification Plan

### Automated Verification
- Code compilation va build tekshiruvi:
  ```bash
  cmd /c npm run build
  ```
- Linting va TypeScript tip tekshiruvlari.

### Manual Verification & Mobile Testing
- Formani to'ldirish va Telegram Bot/Supabase API yuborilishini test qilish.
- Offline rejimda (tarmoq uzilganda) formani to'ldirish va `localStorage`ga ma'lumot muvaffaqiyatli yozilishini tekshirish.
- Kirill va Lotin yozuvi almashtirgichining to'liq va to'g'ri ishlashini tekshirish.
- Mobile viewport-da (360px-412px Android ekranlarida) tugmalar va matnlarning o'qilishini hamda barmog' bilan oson bosilishini (min 48px height) tekshirish.
