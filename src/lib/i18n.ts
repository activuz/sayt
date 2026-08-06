import { transliterateObject } from "./transliterate";

export type Language = "cyrl" | "latn";

// SINGLE SOURCE OF TRUTH: All text defined ONCE in Latin Uzbek!
const dictionaryLatin = {
  header: {
    brand: "Zotdor.uz",
    subBrand: "Chorva bozori",
    langSwitch: "Кирилл алифбоси",
  },
  hero: {
    badge: "Tez orada ishga tushadi",
    title: "Chorvani sotish va sotib olish",
    subtitle:
      "O'zbekistonning istalgan nuqtasidan — qoramol, qo'y-echki, ot va boshqa chorva mollari. Sotuvchi ham, xaridor ham bir joyda.",
    trust1: "0% komissiya — bepul e'lon berish",
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
    registeredCount: "Hozircha {count} ta chorvador ro'yxatdan o'tdi",
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
    card1Title: "O'nlab kanal, bitta qidiruv yo'q",
    card1Desc:
      "Kerakli molni topish uchun 20 ta Telegram kanalini qo'lda kuzatasiz. Eski e'lonlar yo'qolib ketadi.",
    card2Title: "Sotuvchini tekshirib bo'lmaydi",
    card2Desc:
      "Video bir xil, mol boshqa chiqadi. Oldindan to'lov qilib aldanganlar ko'p.",
    card3Title: "Transport va hujjat",
    card3Desc:
      "Boshqa viloyatdan mol keltirish uchun maxsus transport va me'yoriy mezonlar kerak. Buni hech kim tashkil qilib bermaydi.",
  },
  solution: {
    title: "Biz nima qilamiz",
    step1Title: "1. Bitta joyda barcha e'lon",
    step1Desc: "Zot, yosh, vazn, narx va viloyat bo'yicha qidiring.",
    step2Title: "2. Tekshirilgan sotuvchi",
    step2Desc: "Har bir sotuvchi ro'yxatdan o'tadi. Kim kimligi ma'lum.",
    step3Title: "3. Yetkazib berish",
    step3Desc: "Transport va me'yoriy hujjatlarni biz tashkil qilamiz.",
  },
  founder: {
    title: "Loyihani kim quryapti?",
    bio: "Men — Baxtiyor, Surxondaryodanman. Dasturchiman va IT o'quv markazi asoschisiman. Chorva oldi-sottisida odamlar aldanayotganini ko'rib, buni tartibga solish uchun platforma quryapman.",
    contactLead: "Savolingiz bo'lsa — to'g'ridan-to'g'ri yozing:",
    telegramBtn: "Telegram orqali yozish",
    phoneBtn: "+998 93 884 89 10",
  },
  openState: {
    badge: "Ochiq ma'lumot",
    text: "Platforma hozir qurilmoqda. Biz avval chorvadorlar bilan gaplashib, ularga kerakli narsani quryapmiz — keyin ishga tushiramiz. Ro'yxatdan o'tganlar birinchi bo'lib kirish huquqini oladi va birinchi e'lonini bepul joylashtiradi.",
  },
  secondCta: {
    title: "Ro'yxatdan o'ting",
  },
  footer: {
    brand: "Zotdor.uz",
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
};

// AUTOMATIC TRANSLITERATION FOR CYRILLIC
// Override button text for Cyrillic header button specifically to say "Lotin yozuvi"
const dictionaryCyrillic = transliterateObject(dictionaryLatin);
dictionaryCyrillic.header.langSwitch = "Lotin yozuvi";

export const i18n = {
  latn: dictionaryLatin,
  cyrl: dictionaryCyrillic,
};
