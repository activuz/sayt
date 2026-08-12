import { transliterateObject, stripMarkersObject } from "./transliterate";

export type Language = "cyrl" | "latn";

// SINGLE SOURCE OF TRUTH: All text defined ONCE in Latin Uzbek!
/*const dictionaryLatin = {
  header: {
    brand: "Zotdor.uz",
    subBrand: "Chorva bozori",
    langSwitch: "Кирилл алифбоси",
  },
  hero: {
    badge: "Platforma o'z mijozlarini kutmoqda",
    title: "Chorvadorlar uchun yangi onlayn bozor",
    subtitle:
      "O'zbekistonning istalgan nuqtasidan - qoramol, qo'y-echki, ot va boshqa chorva mollari. Yaqin atrofdagi hamyonbop mollar yoki eng zotdor chorvalarni toping.",
    trust1: "Chorvalar adminlar tomonidan tekshiriladi. (firibgarlardan holi)",
    trust2: "To'g'ridan-to'g'ri sotuvchi va xaridorlar",
    trust3: "Barcha 14 viloyat va tumanlar bo'yicha",
  },
  form: {
    nameLabel: "Ism",
    namePlaceholder: "Masalan: Anvarjon",
    nameError: "Ism kamida 2 ta harfdan iborat bo'lishi kerak",
    regionLabel: "Viloyat",
    regionPlaceholder: "Viloyatni tanlang",
    regionError: "Iltimos, viloyatingizni tanlang",
    phoneLabel: "Telefon raqami",
    phonePlaceholder: "+998 90 123 45 67",
    phoneError: "Raqamni to'liq kiriting",
    submitBtn: "Ariza qoldirish",
    submitting: "Yuborilmoqda...",
    trustNote:
      "Platforma ishga tushganda birinchilardan bo'lib sizga xabar beramiz. Raqamingiz uchinchi shaxsga berilmaydi.",
    registeredCount: "Hozircha {247+**count**} ta chorvador ro'yxatdan o'tdi",
    offlineNotice:
      "Ma'lumotingiz qurilmangizda saqlandi va internet tiklanishi bilan avtomatik yuboriladi.",
  },
  regions: [
    "Andijon viloyati",
    "Buxoro viloyati",
    "Farg'ona viloyati",
    "Jizzax viloyati",
    "Xorazm viloyati",
    "Namangan viloyati",
    "Navoiy viloyati",
    "Qashqadaryo viloyati",
    "Qoraqalpog'iston Respublikasi",
    "Samarqand viloyati",
    "Sirdaryo viloyati",
    "Surxondaryo viloyati",
    "Toshkent viloyati",
    "Toshkent shahri",
  ],
  problem: {
    title: "Hozir chorva qanday sotiladi?",
    card1Title: "Mol bozor yaxshi, lekin tanlov kam",
    card1Desc:
      "An'anaviy mol bozorlarida hamma mol ham soyilmaydi yoki har doim ko'ngildagidek mol uchrayvermaydi.",
    card3Title: "Onlayn savdoda ishonch past",
    card3Desc:
      "**Telegram** yoki **YouTube** kanallarda ko'rsatilgan mol videoda aytilganidek chiqmasligi mumkin.",
    card2Title: "Zotdor hayvon topish oson emas",
    card2Desc:
      "Tanishlarga qo'ng'iroq qilasiz, surishtirasiz. Yaxshi hayvonni topish uchun soatlab sayohat qilishingiz yoki dallollarga pul sarflashingiz kerak. ",
  },
  solution: {
    title: "Biz nima qilamiz",
    step1Title: "1. Bitta joyda barcha e'lon",
    step1Desc: "Respublika bo'ylab e'lonlar bir joyda. Har yakshanba emas, har kuni mavjud.",
    step2Title: "2. Tekshirilgan sotuvchi",
    step2Desc: "Har bir sotuvchi ro'yxatdan o'tadi. Kim kimligi ma'lum. Qaytarish imkoniyati mavjud.",
    step3Title: "3. Eng mos natijalar qulay filtrlar orqali",
    step3Desc: "Zot, yosh, vazn, narx va viloyat bo'yicha qidiring. Yaqin atrofdagi natijalar avtomatik tavsiya qilinadi.",
  },
  founder: {
    title: "Loyihani kim quryapti?",
    bio: "Men - Jahongir, Surxondaryodanman. Dasturchiman. Chorva oldi-sottisida odamlar duch kelyotgan qiyinchiliklarni o'rganib platforma qurishni boshladim.",
    contactLead: "Savolingiz bo'lsa - to'g'ridan-to'g'ri yozing:",
    telegramBtn: "Telegram orqali yozish",
    phoneBtn: "+998 93 884 89 10",
  },
  openState: {
    badge: "Ochiq ma'lumot",
    text: "Platforma hozir qurilmoqda. Biz mukammal dasturni yaratishga ahd qilganmiz. Buning uchun chorvadorlar bilan gaplashib, ularga kerakli narsani quryapmiz. Ro'yxatdan o'ting va birinchilardan bo'lib bizdan foydalaning.",
  },
  secondCta: {
    title: "Ro'yxatdan o'ting",
  },
  footer: {
    brand: "**Zotdor.uz**",
    tagline: "Chorva oldi-sotti platformasi",
    telegram: "Telegram kanalimiz",
    phone: "Aloqa: +998 93 884 89 10",
    copyright: "© 2026 Zotdor.uz — Barcha huquqlar himoyalangan.",
  },
  thankYou: {
    title: "Rahmat, {name}!",
    subtitle:
      "Sizni ro'yxatga oldik. Platforma ishga tushganda raqamingizga xabar beramiz.",
    surveyOfferTitle: "Platformani birgalikda quramiz",
    surveyOfferDesc:
      "Savollarga javob bersangiz, platformani sizga kerakli qilib quramiz. Yarim daqiqa vaqt oladi.",
    startSurveyBtn: "Javob berish",
    laterLink: "Keyinroq",
    closeLink: "Yopish",
    progress: "{current} / {total}",
    nextBtn: "Keyingisi",
    submitSurveyBtn: "Yuborish",
    questions: {
      q1Title: "Siz kimsiz?",
      q1Options: [
        "Chorva sotib olaman",
        "Chorva sotaman",
        "Ikkalasi ham",
      ],
      q2Title: "Qanday chorva bilan ishlaysiz?",
      q2Subtitle: "(Bir nechtasini tanlashingiz mumkin)",
      q2Options: [
        "Qoramol",
        "Qo'y va echki",
        "Ot",
        "Tuya",
        "Parranda",
        "Boshqa",
      ],
      q3Title: "Odatda qanday narx oralig'ida?",
      q3Options: [
        "5 mln so'mgacha",
        "5–15 mln so'm",
        "15–30 mln so'm",
        "30–60 mln so'm",
        "60 mln so'mdan yuqori",
      ],
      q4Title: "Chorva oldi-sottisida sizni eng ko'p qiynaydigan narsa nima?",
      q4Subtitle: "(Bir nechtasini tanlashingiz mumkin)",
      q4Options: [
        "Sotuvchiga ishonish (Pulga kuyish)",
        "Haqiqiy narxni bilmaslik (Qimmat olish, arzon sotish)",
        "Zo'r mol topish qiyin",
        "Tanlov kamligi",
        "Transport va yetkazib berish",
        "Sog'ligini bilmaslik (kasal hayvon sotib olish)",
      ],
      q5Title: "Qanday platforma sizga qulayroq?",
      q5Options: [
        "Telegram bot",
        "Telefon uchun ilova",
        "Vebsayt (brauzer orqali)",
        "Barchasi bir xilda qulay",
        "Boshqa",
      ],
      q6Title: "Qaysi biri ustida ko'proq ishlashimiz kerak?",
      q6Options: [
        "Platforma qulayligi",
        "Tanlovlar ko'pligi",
        "Har bir chorvani tekshirib joylash",
        "Tezkor qidiruv",
        "Transport va yetkazib berish",
        "Veterinar hujjat",
      ],
    },
    completed: {
      title: "Rahmat!",
      subtitle: "Javobingiz platformani yaxshiroq qiladi.",
      commentPlaceholder: "Yana nima qo'shgan bo'lardingiz?",
      submitBtn: "Yuborish",
      closeBtn: "Yopish",
      shareText: "Tanishishingizga ulashing",
      shareTelegram: "Telegramda ulashish",
      resetBtn: "Qayta ariza to'ldirish",
    },
  },
};*/
// SINGLE SOURCE OF TRUTH: All text defined ONCE in Latin Uzbek!
// Tahrirlangan versiya — imlo, grammatika, leksika va mantiqiy tuzatishlar bilan.

const dictionaryLatin = {
  header: {
    brand: "Zotdor.uz",
    subBrand: "Chorva bozori",
    demoBtn: "Demo sayt",
    langSwitch: "Кирилл алифбоси",
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
// AUTOMATIC TRANSLITERATION FOR CYRILLIC
// Override button text for Cyrillic header button specifically to say "Lotin yozuvi"
const dictionaryCyrillic = transliterateObject(dictionaryLatin);
dictionaryCyrillic.header.langSwitch = "Lotin yozuvi";

const dictionaryLatinCleaned = stripMarkersObject(dictionaryLatin);

export const i18n = {
  latn: dictionaryLatinCleaned,
  cyrl: dictionaryCyrillic,
};
