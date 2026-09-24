const fs = require('fs');
const path = require('path');

const locales = ['en', 'ku', 'ar'];

const missingTranslations = {
  home: {
    featuresTitle: { en: "Key Features", ku: "تایبەتمەندییە سەرەکییەکان", ar: "الميزات الرئيسية" },
    featuresSubtitle: { en: "Everything you need to learn lab skills", ku: "هەموو ئەوەی پێویستتە بۆ فێربوونی تاقیگە", ar: "كل ما تحتاجه لتعلم مهارات المختبر" },
    features: {
      virtualLabs: {
        title: { en: "Virtual Laboratories", ku: "تاقیگە گریمانەییەکان", ar: "المختبرات الافتراضية" },
        description: { en: "Practice laboratory procedures step by step.", ku: "پراکتیزەی هەنگاوەکانی تاقیگە بکە.", ar: "تدرب على إجراءات المختبر خطوة بخطوة." }
      },
      realExperiments: {
        title: { en: "Interactive Equipment", ku: "ئامێری کارلێکەر", ar: "معدات تفاعلية" },
        description: { en: "Click on any equipment to learn its function.", ku: "کرتە لەسەر هەر ئامێرێک بکە بۆ زانینی کارەکەی.", ar: "انقر على أي جهاز لمعرفة وظيفته." }
      },
      tracking: {
        title: { en: "Performance Tracking", ku: "بەدواداچوونی ئاست", ar: "تتبع الأداء" },
        description: { en: "Receive immediate feedback and scores.", ku: "راستەوخۆ ئەنجام و هەڵسەنگاندن وەربگرە.", ar: "تلقي ردود فعل ودرجات فورية." }
      },
      instructorTools: {
        title: { en: "Instructor Tools", ku: "ئامرازەکانی مامۆستا", ar: "أدوات المعلم" },
        description: { en: "Instructors can track student progress.", ku: "مامۆستایان دەتوانن چاودێری خوێندکاران بکەن.", ar: "يمكن للمعلمين تتبع تقدم الطلاب." }
      }
    },
    ctaTitle: { en: "Ready to Start?", ku: "ئامادەی بۆ دەستپێکردن؟", ar: "هل أنت جاهز للبدء؟" },
    ctaDescription: { en: "Join hundreds of students practicing laboratory skills.", ku: "بەشداربە لەگەڵ سەدان خوێندکار بۆ فێربوون.", ar: "انضم إلى مئات الطلاب الذين يمارسون مهارات المختبر." },
    createAccount: { en: "Create Account", ku: "دروستکردنی هەژمار", ar: "إنشاء حساب" }
  },
  about: {
    missionTitle: { en: "Our Mission", ku: "ئەرکی ئێمە", ar: "مهمتنا" },
    missionDescription: { en: "To make laboratory education more accessible.", ku: "بۆ ئەوەی پەروەردەی تاقیگەیی ئاسانتر بێت.", ar: "لجعل التعليم المخبري أكثر سهولة." },
    goalsTitle: { en: "Our Goals", ku: "ئامانجەکانمان", ar: "أهدافنا" },
    goalsSubtitle: { en: "What we aim to achieve", ku: "ئەوەی دەمانەوێت بەدەستی بهێنین", ar: "ما نهدف إلى تحقيقه" },
    teamTitle: { en: "Our Team", ku: "تیمەکەمان", ar: "فريقنا" },
    teamSubtitle: { en: "The people behind the platform", ku: "ئەو کەسانەی لەپشت ئەم پلاتفۆرمەوەن", ar: "الأشخاص الذين يقفون وراء المنصة" },
    goals: {
      goal1: { en: "Help students learn interactively.", ku: "یارمەتیدانی خوێندکاران بۆ فێربوون.", ar: "مساعدة الطلاب على التعلم بشكل تفاعلي." },
      goal2: { en: "Allow virtual practice.", ku: "ڕێگەدان بە مەشقی گریمانەیی.", ar: "السماح بالممارسة الافتراضية." },
      goal3: { en: "Teach correct equipment usage.", ku: "فێرکردنی بەکارهێنانی ئامێرەکان.", ar: "تعليم الاستخدام الصحيح للمعدات." },
      goal4: { en: "Teach procedure order.", ku: "فێرکردنی ڕیزبەندی هەنگاوەکان.", ar: "تعليم ترتيب الإجراءات." },
      goal5: { en: "Allow instructor supervision.", ku: "ڕێگەدان بە چاودێری مامۆستا.", ar: "السماح بإشراف المعلم." },
      goal6: { en: "Provide a safe learning environment.", ku: "دابینکردنی ژینگەیەکی سەلامەت.", ar: "توفير بيئة تعليمية آمنة." }
    },
    team: {
      lead: { en: "Project Lead", ku: "سەرپەرشتیاری پڕۆژە", ar: "قائد المشروع" },
      leadName: { en: "Dr. Ahmed", ku: "د. ئەحمەد", ar: "د. أحمد" },
      developer: { en: "Lead Developer", ku: "گەشەپێدەری سەرەکی", ar: "المطور الرئيسي" },
      developerName: { en: "Kurdish Developer", ku: "گەشەپێدەری کورد", ar: "مطور كردي" },
      advisor: { en: "Scientific Advisor", ku: "ڕاوێژکاری زانستی", ar: "مستشار علمي" },
      advisorName: { en: "Prof. Sarah", ku: "پڕۆفیسۆر سارا", ar: "أ. سارة" }
    }
  },
  lab: {
    immunology: {
      title: { en: "Immunology Laboratory", ku: "تاقیگەی بەرگریزانی", ar: "مختبر علم المناعة" },
      experiment: { en: "Immunology Experiment", ku: "تاقیکردنەوەی بەرگریزانی", ar: "تجربة علم المناعة" }
    }
  },
  experiments: {
    elisa: {
      name: { en: "ELISA", ku: "ئێلایزا", ar: "إليزا" },
      fullName: { en: "Enzyme-Linked Immunosorbent Assay", ku: "Enzyme-Linked Immunosorbent Assay", ar: "Enzyme-Linked Immunosorbent Assay" },
      description: { en: "Learn and practice immunological techniques including ELISA.", ku: "فێربە و ڕاهێنان بکە لەسەر تەکنیکەکانی بەرگریزانی.", ar: "تعلم ومارس التقنيات المناعية بما في ذلك الإليزا." }
    }
  },
  elisa: {
    introductionTitle: { en: "Introduction", ku: "پێشەکی", ar: "مقدمة" },
    purposeDescription: { en: "To detect and quantify substances such as peptides, proteins, antibodies, and hormones.", ku: "بۆ دیاریکردن و پێوانەکردنی ماددەکانی وەک پرۆتین و دژەتەن.", ar: "للكشف وتحديد كمية المواد مثل الببتيدات والبروتينات والأجسام المضادة." },
    principleDescription: { en: "Based on the specific interaction between an antigen and an antibody.", ku: "بەپێی کارلێکی نێوان دژەپەیداکەر و دژەتەن.", ar: "بناءً على التفاعل المحدد بين المستضد والجسم المضاد." },
    sampleTypeDescription: { en: "Serum, plasma, cell culture supernates, or tissue homogenates.", ku: "خوێناوی، پلازما، یان شانەی خانە.", ar: "مصل الدم، البلازما، طاف استنبات الخلايا، أو مجانسات الأنسجة." },
    equipmentTitle: { en: "Equipment", ku: "ئامێرەکان", ar: "المعدات" },
    stepOrdering: { en: "Step Ordering", ku: "ڕیزبەندی هەنگاوەکان", ar: "ترتيب الخطوات" },
    startProcedure: { en: "Start Procedure", ku: "دەستپێکردنی تاقیکردنەوە", ar: "بدء الإجراء" }
  }
};

function deepMerge(target, source, lang) {
  for (const key in source) {
    if (typeof source[key] === 'object' && source[key] !== null) {
      if (source[key][lang] !== undefined) {
        // It's a translation node
        target[key] = source[key][lang];
      } else {
        // It's a nested object
        if (!target[key]) target[key] = {};
        deepMerge(target[key], source[key], lang);
      }
    }
  }
}

locales.forEach(lang => {
  const filePath = path.join(__dirname, 'src', 'lib', 'i18n', `${lang}.json`);
  let content = {};
  if (fs.existsSync(filePath)) {
    content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  
  deepMerge(content, missingTranslations, lang);
  
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
  console.log(`Updated ${lang}.json`);
});

