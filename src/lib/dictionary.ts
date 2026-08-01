export type Language = "cyrl" | "latn";

export const dictionary = {
  cyrl: {
    header: {
      logo: "Zotdor.uz",
      status: "Тез орада ишга тушади",
      langBtn: "Lotin yozuviga o'tish",
    },
    hero: {
      badge: "Ўзбекистоннинг 1-сонли рақамли чорва бозори",
      title: "Чорваларни сотиш ва сотиб олиш",
      subtitle:
        "Ўзбекистон бўйлаб зотдор қорамол, қўй ва бошқа чорваларни тўғридан-тўғри эгасидан ва сотувчилардан топинг ва сотинг. Воситачиларсиз, ҳалол ва қулай.",
      benefit1: "0% комиссия — бепул эълон бериш",
      benefit2: "Тўғридан-тўғри телефон орқали алоқа",
      benefit3: "Барча вилоят ва туманлар бўйича",
    },
    form: {
      title: "Биринчилардан бўлиб қўшилинг",
      subtitle:
        "Маълумотларингизни қолдиринг, платформа ишга тушиши билан сизга бепул эълон жойлаш ва қулай харид имконияти берилади.",
      step1: "1-савол: Мақсадингиз нима?",
      intents: {
        sell: "Чорва сотмоқчиман",
        buy: "Чорва сотиб олмоқчиман",
        both: "Иккаласи ҳам (сотаман ва оламан)",
      },
      step2: "2-савол: Қайси чорва тури билан шуғулланасиз?",
      animals: {
        cattle: "Қорамол (сигир, буқа, новвос, бузоқ)",
        sheep: "Қўй ва эчки (Ҳисор, Араби ва б.)",
        horse: "От ва бошқа туёқлилар",
        all: "Барча турдаги чорвалар",
      },
      step3: "3-савол: Сиз учун энг муҳими нима?",
      priorities: {
        fast: "Тезроқ харидор ёки сотувчи топиш",
        price: "Маъқул ва ҳалол нарх олиш",
        region: "Ўз вилоятимдан яқинроқ топиш",
      },
      contactTitle: "Боғланиш маълумотларингиз:",
      nameLabel: "Исмингиз",
      namePlaceholder: "Масалан: Анваржон",
      regionLabel: "Вилоятингиз",
      regionPlaceholder: "Вилоятни танланг",
      phoneLabel: "Телефон рақамингиз",
      submitBtn: "Ариза қолдириш",
      submitting: "Юборилмоқда...",
      successTitle: "Аризангиз қабул қилинди!",
      successDesc:
        "Раҳмат! Zotdor.uz ишга тушиши билан сизга биринчилардан бўлиб СМС ёки телефон орқали хабар берамиз.",
      offlineNotice:
        "Маълумотингиз телефон хотирасида сақланди va интернет тикланиши билан автоматик юборилади.",
    },
    regions: [
      "Андижон вилояти",
      "Бухоро вилояти",
      "Фарғона вилояти",
      "Жиззах вилояти",
      "Хоразм вилояти",
      "Наманган вилояти",
      "Навоий вилояти",
      "Қашқадарё вилояти",
      "Қорақалпоғистон Республикаси",
      "Самарқанд вилояти",
      "Сирдарё вилояти",
      "Сурхондарё вилояти",
      "Тошкент вилояти",
      "Тошкент шаҳри",
    ],
    mockListings: {
      badge: "Тайёрланаётган эълонлар намунаси",
      title: "Платформада кутилаётган чорвалар",
      subtitle:
        "Ишга тушгандан сўнг сиз ҳам ўз чорвангизни худди шундай бепул жойлаштиришингиз мумкин.",
      items: [
        {
          id: 1,
          title: "Симентал зотли соғин сигир",
          region: "Самарқанд вилояти, Ургут",
          price: "18 000 000 сўм",
          desc: "3-туғим, кунига 22 литр сут беради. Соғлом, барча эмлашлари қилинган.",
          tag: "Соғилувчи",
          imageAlt: "Симентал сигир",
        },
        {
          id: 2,
          title: "Ҳисор зотидан тоза буғоз қўйлар",
          region: "Қашқадарё вилояти, Қамаши",
          price: "4 500 000 сўм",
          desc: "Зотдор, бақувват, яйловда боқилган. Сифатига пўлатдек кафолат берилади.",
          tag: "Зотдор",
          imageAlt: "Ҳисор қўйлари",
        },
        {
          id: 3,
          title: "2 ёшли новвос (семиртирилган)",
          region: "Фарғона вилояти, Олтиариқ",
          price: "15 500 000 сўм",
          desc: "Гўшт йўналишидаги семиз новвос, тирик вазни 480 кг атрофида.",
          tag: "Сўйимлик",
          imageAlt: "Новвос",
        },
      ],
    },
    features: {
      title: "Zotdor.uz қандай ишлайди?",
      subtitle: "3 та оддий қадамда чорва савдоси",
      step1Title: "1. Эълон жойланг",
      step1Desc:
        "Чорвангизнинг расми, нархи ва жойлашган вилоятини бепул киритинг.",
      step2Title: "2. Тўғридан-тўғри гаплашинг",
      step2Desc:
        "Харидорлар сизга тўғридан-тўғри телефон орқали қўнғироқ қилади.",
      step3Title: "3. Ҳалол ва тез сотинг",
      step3Desc:
        "Ортакчи ва воситачиларга ортиқча пул тўламасдан, баракали савдо қилинг.",
    },
    faq: {
      title: "Кўп бериладиган саволлар",
      items: [
        {
          q: "Zotdor.uz хизмати бепулми?",
          a: "Ҳа, платформада эълон кўриш ва жойлаштириш мутлақо бепул. Ҳеч қандай яширин комиссия ёки тўлов йўқ.",
        },
        {
          q: "Қачон тўлиқ ишга тушади?",
          a: "Тез кунларда! Ҳозирда тизим якуний синовдан ўтказилмоқда. Ариза қолдирганларга биринчи бўлиб алоқага чиқилади.",
        },
        {
          q: "Секин интернетда ҳам ишлайдими?",
          a: "Ҳа, Zotdor.uz махсус олис вилоятлар ва 3G интернетда жуда тез юкланиши учун енгил шаклда лойиҳалаштирилган.",
        },
        {
          q: "Сотмоқчи ёки олмоқчи бўлсам нима қилишим керак?",
          a: "Юқоридаги шаклни тўлдириб, телефон рақамингизни қолдиринг. Платформа очилиши билан сизга хабар берамиз.",
        },
      ],
    },
    footer: {
      logo: "Zotdor.uz",
      tagline:
        "Ўзбекистон чорвадорлари учун махсус яратилган рақамли чорва бозори platformasi.",
      badge: "Осон · Тез · Ҳалол",
      copyright: "© 2026 Zotdor.uz — Барча ҳуқуқлар ҳимояланган.",
    },
  },
  latn: {
    header: {
      logo: "Zotdor.uz",
      status: "Tez orada ishga tushadi",
      langBtn: "Кирилл алифбосига ўтиш",
    },
    hero: {
      badge: "O'zbekistonning 1-sonli raqamli chorva bozori",
      title: "Chorvalarni sotish va sotib olish",
      subtitle:
        "O'zbekiston bo'ylab zotdor qoramol, qo'y va boshqa chorvalarni to'g'ridan-to'g'ri egasidan va sotuvchilardan toping va soting. Vositachilarsiz, halol va qulay.",
      benefit1: "0% komissiya — bepul e'lon berish",
      benefit2: "To'g'ridan-to'g'ri telefon orqali aloqa",
      benefit3: "Barcha viloyat va tumanlar bo'yicha",
    },
    form: {
      title: "Birinchilardan bo'lib qo'shiling",
      subtitle:
        "Ma'lumotlaringizni qoldiring, platforma ishga tushishi bilan sizga bepul e'lon joylash va qulay xarid imkoniyati beriladi.",
      step1: "1-savol: Maqsadingiz nima?",
      intents: {
        sell: "Chorva sotmoqchiman",
        buy: "Chorva sotib olmoqchiman",
        both: "Ikkalasi ham (sotaman va olaman)",
      },
      step2: "2-savol: Qaysi chorva turi bilan shug'ullanasiz?",
      animals: {
        cattle: "Qoramol (sigir, buqa, novvos, buzoq)",
        sheep: "Qo'y va echki (Hisor, Arabi va b.)",
        horse: "Ot va boshqa tuyoqlilar",
        all: "Barcha turdagi chorvalar",
      },
      step3: "3-savol: Siz uchun eng muhimi nima?",
      priorities: {
        fast: "Tezroq xaridor yoki sotuvchi topish",
        price: "Ma'qul va halol narx olish",
        region: "O'z viloyatimdan yaqinroq topish",
      },
      contactTitle: "Bog'lanish ma'lumotlaringiz:",
      nameLabel: "Ismingiz",
      namePlaceholder: "Masalan: Anvarjon",
      regionLabel: "Viloyatingiz",
      regionPlaceholder: "Viloyatni tanlang",
      phoneLabel: "Telefon raqamingiz",
      submitBtn: "Ariza qoldirish",
      submitting: "Yuborilmoqda...",
      successTitle: "Arizangiz qabul qilindi!",
      successDesc:
        "Rahmat! Zotdor.uz ishga tushishi bilan sizga birinchilardan bo'lib SMS yoki telefon orqali xabar beramiz.",
      offlineNotice:
        "Ma'lumotingiz telefon xotirasida saqlandi va internet tiklanishi bilan avtomatik yuboriladi.",
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
    mockListings: {
      badge: "Tayyorlanayotgan e'lonlar namunasi",
      title: "Platformada kutilayotgan chorvalar",
      subtitle:
        "Ishga tushgandan so'ng siz ham o'z chorvangizni xuddi shunday bepul joylashtirishingiz mumkin.",
      items: [
        {
          id: 1,
          title: "Simental zotli sog'in sigir",
          region: "Samarqand viloyati, Urgut",
          price: "18 000 000 so'm",
          desc: "3-tug'im, kuniga 22 litr sut beradi. Sog'lom, barcha emlashlari qilingan.",
          tag: "Sog'iluvchi",
          imageAlt: "Simental sigir",
        },
        {
          id: 2,
          title: "Hisor zotidan toza bug'oz qo'ylar",
          region: "Qashqadaryo viloyati, Qamashi",
          price: "4 500 000 so'm",
          desc: "Zotdor, baquvvat, jaylovda boqilgan. Sifatiga po'latdek kafolat beriladi.",
          tag: "Zotdor",
          imageAlt: "Hisor qo'ylari",
        },
        {
          id: 3,
          title: "2 yoshli novvos (semirtirilgan)",
          region: "Farg'ona viloyati, Oltiariq",
          price: "15 500 000 so'm",
          desc: "G'osht yo'nalishidagi semiz novvos, tirik vazni 480 kg atrofiga kelgan.",
          tag: "So'yimlik",
          imageAlt: "Novvos",
        },
      ],
    },
    features: {
      title: "Zotdor.uz qanday ishlaydi?",
      subtitle: "3 ta oddiy qadamda chorva savdosi",
      step1Title: "1. E'lon joylang",
      step1Desc:
        "Chorvangizning rasmi, narxi va joylashgan viloyatini bepul kiriting.",
      step2Title: "2. To'g'ridan-to'g'ri gaplashing",
      step2Desc:
        "Xaridorlar sizga to'g'ridan-to'g'ri telefon orqali qo'ng'iroq qiladi.",
      step3Title: "3. Halol va tez soting",
      step3Desc:
        "Ortakchi va vositachilarga ortiqcha pul to'lamasdan, barakali savdo qiling.",
    },
    faq: {
      title: "Ko'p beriladigan savollar",
      items: [
        {
          q: "Zotdor.uz xizmati bepulmi?",
          a: "Ha, platformada e'lon ko'rish va joylashtirish mutlaqo bepul. Hech qanday yashirin komissiya yoki to'lov yo'q.",
        },
        {
          q: "Qachon to'liq ishga tushadi?",
          a: "Tez kunlarda! Hozirda tizim yakuniy sinovdan o'tkazilmoqda. Ariza qoldirganlarga birinchi bo'lib aloqaga chiqiladi.",
        },
        {
          q: "Sekin internetda ham ishlaydimi?",
          a: "Ha, Zotdor.uz maxsus olis viloyatlar va 3G internetda juda tez yuklanishi uchun yengil shaklda loyihalashtirilgan.",
        },
        {
          q: "Sotmoqchi yoki olmoqchi bo'lsam nima qilishim kerak?",
          a: "Yuqoridagi shaklni to'ldirib, telefon raqamingizni qoldiring. Platforma ochilishi bilan sizga xabar beramiz.",
        },
      ],
    },
    footer: {
      logo: "Zotdor.uz",
      tagline:
        "O'zbekiston chorvadorlari uchun maxsus yaratilgan raqamli chorva bozori platformasi.",
      badge: "Oson · Tez · Halol",
      copyright: "© 2026 Zotdor.uz — Barcha huquqlar himoyalangan.",
    },
  },
};
