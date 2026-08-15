import { transliterateObject, stripMarkersObject } from "./transliterate";

export type Language = "cyrl" | "latn" | "en";

// Language cycle order for the switcher button
export const LANGUAGE_CYCLE: Language[] = ["cyrl", "latn", "en"];

// SINGLE SOURCE OF TRUTH: All text defined ONCE in Latin Uzbek!
// Tahrirlangan versiya — imlo, grammatika, leksika va mantiqiy tuzatishlar bilan.

const dictionaryLatin = {
  header: {
    brand: "Zotdor.uz",
    subBrand: "Chorva bozori",
    demoBtn: "Demo sayt",
    langSwitch: "English",
  },
  hero: {
    badge: "Platforma tez orada ishga tushadi",
    title: "Chorvadorlar uchun yangi onlayn bozor",
    subtitle:
      "O'zbekistonning istalgan nuqtasidan — qoramol, qo'y-echki, ot va boshqa chorva mollari. Yaqin atrofdagi hamyonbop mollarni, eng zotdor chorvalarni shu yerdan toping.",
    demoBtn: "Demo saytni ko'rish",
    trust1: "Har bir e'lon admin tomonidan tekshiriladi — firibgarlarsiz bozor",
    trust2: "Vositachisiz: sotuvchi bilan to'g'ridan-to'g'ri aloqa",
    trust3: "Respublikaning barcha 14 hududi va tumanlari bo'yicha",
  },
  form: {
    nameLabel: "Ism",
    namePlaceholder: "Masalan: Anvarjon",
    nameError: "Ism kamida 2 ta harfdan iborat bo'lishi kerak",
    regionLabel: "Hudud",
    regionPlaceholder: "Hududingizni tanlang",
    regionError: "Iltimos, hududingizni tanlang",
    phoneLabel: "Telefon raqami",
    phonePlaceholder: "+998 90 123 45 67",
    phoneError: "Raqamni to'liq kiriting",
    submitBtn: "Ariza qoldirish",
    submitting: "Yuborilmoqda...",
    trustNote:
      "Platforma ishga tushishi bilan birinchilardan bo'lib sizga xabar beramiz. Raqamingiz uchinchi shaxslarga oshkor qilinmaydi.",
    registeredCount: "Hozircha {247+**count**} ta chorvador ro'yxatdan o'tdi",
    offlineNotice:
      "Ma'lumotingiz qurilmangizda saqlandi va internet tiklanishi bilan avtomatik yuboriladi.",
  },
  // O'zbek lotin alifbosi tartibida saralangan
  regions: [
    "Andijon viloyati",
    "Buxoro viloyati",
    "Farg'ona viloyati",
    "Jizzax viloyati",
    "Namangan viloyati",
    "Navoiy viloyati",
    "Samarqand viloyati",
    "Sirdaryo viloyati",
    "Surxondaryo viloyati",
    "Toshkent viloyati",
    "Toshkent shahri",
    "Xorazm viloyati",
    "Qashqadaryo viloyati",
    "Qoraqalpog'iston Respublikasi",
  ],
  problem: {
    title: "Hozir chorva qanday sotilmoqda?",
    card1Title: "Mol bozori yaxshi, lekin tanlov cheklangan",
    card1Desc:
      "An'anaviy mol bozorida tanlov faqat o'sha kuni keltirilgan mol bilan cheklanadi. Ko'ngildagidek mol har doim ham uchrayvermaydi.",
    card2Title: "Zotdor hayvon topish oson emas",
    card2Desc:
      "Tanishlarga qo'ng'iroq qilasiz, surishtirasiz. Yaxshi hayvon topish uchun soatlab yo'l yurasiz yoki dallolga pul to'laysiz.",
    card3Title: "Onlayn savdoda ishonch past",
    card3Desc:
      "**Telegram** yoki **YouTube** kanallarida ko'rsatilgan mol videodagidek chiqmasligi mumkin.",
  },
  solution: {
    title: "Biz buni qanday hal qilamiz",
    step1Title: "1. Barcha e'lonlar bitta joyda",
    step1Desc:
      "Respublika bo'ylab e'lonlar bir platformada. Bozor kunini kutmaysiz — e'lonlar har kuni ochiq.",
    step2Title: "2. Tekshirilgan sotuvchi",
    step2Desc:
      "Har bir sotuvchi ro'yxatdan o'tadi, kimligi aniq bo'ladi. Nizoli holatlarda platforma yordam beradi.",
    step3Title: "3. Qulay filtrlar orqali eng mos natija",
    step3Desc:
      "Zot, yosh, vazn, narx va hudud bo'yicha qidiring. Yaqin atrofdagi natijalar avtomatik tavsiya etiladi.",
  },
  founder: {
    title: "Loyihani kim quryapti?",
    bio: "Men — Jahongir, Surxondaryodanman. Dasturchiman. Chorva oldi-sotdisida odamlar duch kelayotgan qiyinchiliklarni o'rganib, shu platformani qurishni boshladim.",
    contactLead: "Savolingiz bo'lsa, to'g'ridan-to'g'ri yozing:",
    telegramBtn: "Telegram orqali yozish",
    phoneBtn: "+998 93 884 89 10",
  },
  openState: {
    badge: "Ochiq ma'lumot",
    text: "Platforma hozir qurilmoqda. Biz chorvadorlar bilan gaplashib, aynan ularga kerak bo'lgan dasturni yaratmoqchimiz. Ro'yxatdan o'ting va ishga tushganda birinchilardan bo'lib foydalaning.",
  },
  secondCta: {
    title: "Ro'yxatdan o'ting",
  },
  footer: {
    brand: "**Zotdor.uz**",
    tagline: "Chorva oldi-sotdi platformasi",
    telegram: "Telegram kanalimiz",
    phone: "Aloqa: +998 93 884 89 10",
    copyright: "© 2026 **Zotdor.uz** — Barcha huquqlar himoyalangan.",
  },
  thankYou: {
    title: "Rahmat, {name}!",
    subtitle:
      "Sizni ro'yxatga oldik. Platforma ishga tushganda raqamingizga xabar beramiz.",
    surveyOfferTitle: "Platformani birgalikda quramiz",
    surveyOfferDesc:
      "Savollarga javob bersangiz, platformani sizga kerakli qilib quramiz. Bir daqiqa vaqtingizni oladi.",
    startSurveyBtn: "Javob berish",
    laterLink: "Keyinroq",
    closeLink: "Yopish",
    progress: "{current} / {total}",
    nextBtn: "Keyingisi",
    submitSurveyBtn: "Yuborish",
    questions: {
      q1Title: "Siz kimsiz?",
      q1Options: ["Chorva sotib olaman", "Chorva sotaman", "Ikkalasi ham"],
      q2Title: "Qanday mol bilan ishlaysiz?",
      q2Subtitle: "(Bir nechtasini tanlashingiz mumkin)",
      q2Options: ["Qoramol", "Qo'y va echki", "Ot", "Tuya", "Parranda", "Boshqa"],
      q3Title: "Odatda qanday narx oralig'ida savdo qilasiz?",
      q3Options: [
        "5 mln so'mgacha",
        "5–15 mln so'm",
        "15–30 mln so'm",
        "30–60 mln so'm",
        "60 mln so'mdan yuqori",
      ],
      q4Title: "Chorva oldi-sotdisida sizni eng ko'p qiynaydigan narsa nima?",
      q4Subtitle: "(Bir nechtasini tanlashingiz mumkin)",
      q4Options: [
        "Sotuvchiga ishonib bo'lmasligi (puldan kuyish)",
        "Haqiqiy narxni bilmaslik (qimmatga olish, arzonga sotish)",
        "Sifatli mol topishning qiyinligi",
        "Tanlovning kamligi",
        "Transport va yetkazib berish",
        "Hayvon sog'lig'ini bilmaslik (kasal mol sotib olish)",
      ],
      q5Title: "Qanday platforma sizga qulayroq?",
      q5Options: [
        "Telegram bot",
        "Telefon uchun ilova",
        "Veb-sayt (brauzer orqali)",
        "Barchasi bir xilda qulay",
        "Boshqa",
      ],
      q6Title: "Qaysi biri ustida ko'proq ishlashimiz kerak?",
      q6Options: [
        "Platformaning qulayligi",
        "E'lonlarning ko'pligi",
        "Har bir e'lonni tekshirib joylash",
        "Tezkor qidiruv",
        "Transport va yetkazib berish",
        "Veterinariya hujjatlari",
      ],
    },
    completed: {
      title: "Rahmat!",
      subtitle: "Javobingiz platformani yaxshiroq qiladi.",
      commentPlaceholder: "Yana nima qo'shgan bo'lardingiz?",
      submitBtn: "Yuborish",
      closeBtn: "Yopish",
      shareText: "Tanishlaringizga ulashing",
      shareTelegram: "Telegramda ulashish",
      resetBtn: "Qayta ariza to'ldirish",
    },
  },
};

// English dictionary — fully translated
const dictionaryEnglish = {
  header: {
    brand: "Zotdor.uz",
    subBrand: "Livestock market",
    demoBtn: "Demo site",
    langSwitch: "Кирилл ёзуви",
  },
  hero: {
    badge: "Platform launching soon",
    title: "A new online marketplace for livestock",
    subtitle:
      "From anywhere in Uzbekistan — cattle, sheep, goats, horses, and other livestock. Find affordable animals nearby or the finest breeds right here.",
    demoBtn: "View demo site",
    trust1: "Every listing is verified by admins — a fraud-free marketplace",
    trust2: "No middlemen: connect directly with sellers",
    trust3: "Across all 14 regions and districts of the country",
  },
  form: {
    nameLabel: "Name",
    namePlaceholder: "e.g. John",
    nameError: "Name must be at least 2 characters",
    regionLabel: "Region",
    regionPlaceholder: "Select your region",
    regionError: "Please select your region",
    phoneLabel: "Phone number",
    phonePlaceholder: "+998 90 123 45 67",
    phoneError: "Please enter a complete phone number",
    submitBtn: "Submit application",
    submitting: "Submitting...",
    trustNote:
      "We'll notify you as soon as the platform launches. Your number will not be shared with third parties.",
    registeredCount: "{247+count} farmers have registered so far",
    offlineNotice:
      "Your data has been saved on your device and will be sent automatically when the internet connection is restored.",
  },
  regions: [
    "Andijan region",
    "Bukhara region",
    "Fergana region",
    "Jizzakh region",
    "Namangan region",
    "Navoi region",
    "Samarkand region",
    "Syrdarya region",
    "Surkhandarya region",
    "Tashkent region",
    "Tashkent city",
    "Khorezm region",
    "Kashkadarya region",
    "Republic of Karakalpakstan",
  ],
  problem: {
    title: "How is livestock traded today?",
    card1Title: "The bazaar is good, but choices are limited",
    card1Desc:
      "At traditional livestock markets, your options are limited to whatever is brought that day. You don't always find what you're looking for.",
    card2Title: "Finding quality breeds is not easy",
    card2Desc:
      "You call acquaintances, ask around. To find good livestock, you either travel for hours or pay middlemen.",
    card3Title: "Low trust in online trading",
    card3Desc:
      "Livestock shown on Telegram or YouTube channels may not match what was advertised in the video.",
  },
  solution: {
    title: "How we solve this",
    step1Title: "1. All listings in one place",
    step1Desc:
      "Listings from across the country on one platform. No waiting for market day — listings are available every day.",
    step2Title: "2. Verified sellers",
    step2Desc:
      "Every seller is registered and identified. The platform assists in case of disputes.",
    step3Title: "3. Best matches through smart filters",
    step3Desc:
      "Search by breed, age, weight, price, and region. Nearby results are recommended automatically.",
  },
  founder: {
    title: "Who is building this?",
    bio: "I'm Jahongir, from Surkhandarya. I'm a developer. After studying the challenges people face in livestock trading, I started building this platform.",
    contactLead: "Have questions? Reach out directly:",
    telegramBtn: "Write on Telegram",
    phoneBtn: "+998 93 884 89 10",
  },
  openState: {
    badge: "Transparency",
    text: "The platform is currently being built. We're talking to livestock farmers and building exactly what they need. Register now and be among the first to use it when it launches.",
  },
  secondCta: {
    title: "Register now",
  },
  footer: {
    brand: "Zotdor.uz",
    tagline: "Livestock trading platform",
    telegram: "Our Telegram channel",
    phone: "Contact: +998 93 884 89 10",
    copyright: "© 2026 Zotdor.uz — All rights reserved.",
  },
  thankYou: {
    title: "Thank you, {name}!",
    subtitle:
      "You've been added to the list. We'll notify you when the platform launches.",
    surveyOfferTitle: "Let's build this together",
    surveyOfferDesc:
      "Answer a few questions and we'll tailor the platform to your needs. It takes about a minute.",
    startSurveyBtn: "Answer questions",
    laterLink: "Later",
    closeLink: "Close",
    progress: "{current} / {total}",
    nextBtn: "Next",
    submitSurveyBtn: "Submit",
    questions: {
      q1Title: "Who are you?",
      q1Options: ["I buy livestock", "I sell livestock", "Both"],
      q2Title: "What kind of livestock do you work with?",
      q2Subtitle: "(You can select multiple)",
      q2Options: ["Cattle", "Sheep & goats", "Horses", "Camels", "Poultry", "Other"],
      q3Title: "What price range do you usually trade in?",
      q3Options: [
        "Up to 5 mln UZS",
        "5–15 mln UZS",
        "15–30 mln UZS",
        "30–60 mln UZS",
        "Over 60 mln UZS",
      ],
      q4Title: "What frustrates you most about livestock trading?",
      q4Subtitle: "(You can select multiple)",
      q4Options: [
        "Can't trust sellers (risk of losing money)",
        "Not knowing the real price (overpaying or underselling)",
        "Difficulty finding quality livestock",
        "Limited selection",
        "Transport and delivery",
        "Not knowing the animal's health (buying sick livestock)",
      ],
      q5Title: "Which platform would be most convenient for you?",
      q5Options: [
        "Telegram bot",
        "Mobile app",
        "Website (via browser)",
        "All equally convenient",
        "Other",
      ],
      q6Title: "What should we focus on most?",
      q6Options: [
        "Platform usability",
        "Large number of listings",
        "Verifying every listing",
        "Fast search",
        "Transport and delivery",
        "Veterinary documents",
      ],
    },
    completed: {
      title: "Thank you!",
      subtitle: "Your answers will help us build a better platform.",
      commentPlaceholder: "Anything else you'd like to add?",
      submitBtn: "Submit",
      closeBtn: "Close",
      shareText: "Share with your friends",
      shareTelegram: "Share on Telegram",
      resetBtn: "Submit another application",
    },
  },
};

// AUTOMATIC TRANSLITERATION FOR CYRILLIC
// Override button text for Cyrillic header button specifically to say "Lotin yozuvi"
const dictionaryCyrillic = transliterateObject(dictionaryLatin);
dictionaryCyrillic.header.langSwitch = "Lotin yozuvi";

const dictionaryLatinCleaned = stripMarkersObject(dictionaryLatin);

export const i18n = {
  latn: dictionaryLatinCleaned,
  cyrl: dictionaryCyrillic,
  en: dictionaryEnglish,
};

