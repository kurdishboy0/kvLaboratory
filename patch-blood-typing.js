const fs = require('fs');
const path = require('path');

const locales = ['en', 'ku', 'ar'];

const additions = {
  experiments: {
    bloodTyping: {
      name: { en: "Blood Typing", ku: "دیاریکردنی جۆری خوێن", ar: "تحديد فصيلة الدم" },
      fullName: { en: "ABO and Rh Blood Typing", ku: "جۆری خوێنی ABO و Rh", ar: "فصائل الدم ABO و Rh" },
      description: { en: "Learn how to determine human blood types.", ku: "فێربە چۆن جۆری خوێنی مرۆڤ دیاری دەکرێت.", ar: "تعلم كيفية تحديد فصائل دم الإنسان." }
    }
  },
  bloodTyping: {
    introductionTitle: { en: "Introduction", ku: "پێشەکی", ar: "مقدمة" },
    purposeDescription: { en: "To determine the ABO blood group and Rh factor of a blood sample.", ku: "بۆ دیاریکردنی جۆری خوێنی ABO و فاکتەری Rh.", ar: "لتحديد فصيلة الدم ABO وعامل Rh لعينة دم." },
    principleDescription: { en: "Based on agglutination (clumping) when antigens on red blood cells react with specific antibodies.", ku: "بەپێی مەین (کۆبوونەوە) کاتێک دژەپەیداکەرەکانی سەر خڕۆکە سوورەکان کارلێک دەکەن لەگەڵ دژەتەنی دیاریکراو.", ar: "بناءً على التراص (التجلط) عندما تتفاعل المستضدات الموجودة على خلايا الدم الحمراء مع أجسام مضادة معينة." },
    sampleTypeDescription: { en: "Whole blood (capillary or venous).", ku: "خوێنی تەواو (موولولە یان خوێنهێنەر).", ar: "دم كامل (شعيري أو وريدي)." },
    equipmentTitle: { en: "Equipment", ku: "ئامێرەکان", ar: "المعدات" },
    startProcedure: { en: "Start Procedure", ku: "دەستپێکردنی تاقیکردنەوە", ar: "بدء الإجراء" }
  }
};

function deepMerge(target, source, lang) {
  for (const key in source) {
    if (typeof source[key] === 'object' && source[key] !== null) {
      if (source[key][lang] !== undefined) {
        target[key] = source[key][lang];
      } else {
        if (!target[key] || typeof target[key] !== 'object') target[key] = {};
        deepMerge(target[key], source[key], lang);
      }
    }
  }
}

locales.forEach(lang => {
  const filePath = path.join(__dirname, 'src', 'lib', 'i18n', `${lang}.json`);
  let content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  deepMerge(content, additions, lang);
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
});
console.log('Blood typing translations added.');

