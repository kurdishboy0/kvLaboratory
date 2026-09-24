const fs = require('fs');
const path = require('path');

const locales = ['en', 'ku', 'ar'];

const additions = {
  labs: {
    immunology: {
      name: { en: "Immunology", ku: "بەرگریزانی", ar: "علم المناعة" },
      description: { en: "Learn and practice immunological techniques including ELISA and more.", ku: "فێربە و ڕاهێنان بکە لەسەر تەکنیکەکانی بەرگریزانی لەوانەش ئێلایزا.", ar: "تعلم ومارس التقنيات المناعية بما في ذلك الإليزا وغيرها." }
    },
    microbiology: {
      name: { en: "Microbiology", ku: "مایکرۆبایۆلۆجی", ar: "علم الأحياء الدقيقة" },
      description: { en: "Study microorganisms, bacteria culture, and antibiotic sensitivity tests.", ku: "لێکۆڵینەوە لە وردبینەزیندەوەران، کلتوری بەکتریا و پشکنینی هەستیاری دژەزیندەیی.", ar: "دراسة الكائنات الحية الدقيقة وزراعة البكتيريا واختبارات الحساسية للمضادات الحيوية." }
    },
    biochemistry: {
      name: { en: "Biochemistry", ku: "کیمیای زیندەیی", ar: "الكيمياء الحيوية" },
      description: { en: "Analyze chemical processes within and related to living organisms.", ku: "شیکردنەوەی پرۆسە کیمیاییەکان لە ناو زیندەوەراندا و پەیوەندیدار پێیانەوە.", ar: "تحليل العمليات الكيميائية داخل الكائنات الحية وفيما يتعلق بها." }
    },
    genetics: {
      name: { en: "Genetics", ku: "بۆماوەزانی", ar: "علم الوراثة" },
      description: { en: "Explore DNA extraction, PCR, and genetic sequencing techniques.", ku: "گەڕان بەدوای دەرهێنانی دی ئێن ئەی، پی سی ئاڕ، و تەکنیکەکانی زنجیرەکردنی بۆماوەیی.", ar: "استكشاف استخراج الحمض النووي، وتفاعل البوليميراز المتسلسل، وتقنيات التسلسل الجيني." }
    },
    anatomy: {
      name: { en: "Anatomy", ku: "توێکاری", ar: "علم التشريح" },
      description: { en: "Virtual dissections and 3D exploration of the human body systems.", ku: "توێکاری گریمانەیی و گەڕانی سێ ڕەهەندی بۆ سیستمەکانی جەستەی مرۆڤ.", ar: "التشريح الافتراضي والاستكشاف ثلاثي الأبعاد لأنظمة جسم الإنسان." }
    },
    pharmacology: {
      name: { en: "Pharmacology", ku: "دەرمانسازی", ar: "علم الأدوية" },
      description: { en: "Study drug action, interactions, and therapeutic effects.", ku: "لێکۆڵینەوە لە کاریگەری دەرمان، کارلێکەکان و کاریگەرییە چارەسەرییەکان.", ar: "دراسة عمل الأدوية والتفاعلات والتأثيرات العلاجية." }
    },
    hematology: {
      name: { en: "Hematology", ku: "خوێنزانی", ar: "علم الدم" },
      description: { en: "Perform blood cell counts, blood typing, and coagulation tests.", ku: "ئەنجامدانی ژماردنی خانەکانی خوێن، جۆری خوێن، و پشکنینی مەیینی خوێن.", ar: "إجراء تعداد خلايا الدم، وتحديد فصيلة الدم، واختبارات التخثر." }
    },
    title: { en: "Virtual Laboratories", ku: "تاقیگە گریمانەییەکان", ar: "المختبرات الافتراضية" },
    subtitle: { en: "Choose a laboratory to begin your virtual experience", ku: "تاقیگەیەک هەڵبژێرە بۆ دەستپێکردنی ئەزموونە گریمانەییەکەت", ar: "اختر مختبراً للبدء بتجربتك الافتراضية" },
    comingSoon: { en: "Coming Soon", ku: "بەمنزیکانە", ar: "قريباً" },
    active: { en: "Active", ku: "چالاک", ar: "نشط" },
    enterLab: { en: "Enter Lab", ku: "چوونە ناو تاقیگە", ar: "دخول المختبر" }
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
  
  // Clean up old flat keys if they conflict or just let deepMerge overwrite them.
  // Actually, deepMerge will convert string to object if we do `if (!target[key] || typeof target[key] !== 'object')`.
  
  deepMerge(content, additions, lang);
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
  console.log(`Updated labs in ${lang}.json`);
});

