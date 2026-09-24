const fs = require('fs');
const path = require('path');

const locales = ['en', 'ku', 'ar'];

const goalsObj = {
  en: {
    goal1: "Help students learn interactively.",
    goal2: "Allow virtual practice.",
    goal3: "Teach correct equipment usage.",
    goal4: "Teach procedure order.",
    goal5: "Allow instructor supervision.",
    goal6: "Provide a safe learning environment."
  },
  ku: {
    goal1: "یارمەتیدانی خوێندکاران بۆ فێربوون.",
    goal2: "ڕێگەدان بە مەشقی گریمانەیی.",
    goal3: "فێرکردنی بەکارهێنانی ئامێرەکان.",
    goal4: "فێرکردنی ڕیزبەندی هەنگاوەکان.",
    goal5: "ڕێگەدان بە چاودێری مامۆستا.",
    goal6: "دابینکردنی ژینگەیەکی سەلامەت."
  },
  ar: {
    goal1: "مساعدة الطلاب على التعلم بشكل تفاعلي.",
    goal2: "السماح بالممارسة الافتراضية.",
    goal3: "تعليم الاستخدام الصحيح للمعدات.",
    goal4: "تعليم ترتيب الإجراءات.",
    goal5: "السماح بإشراف المعلم.",
    goal6: "توفير بيئة تعليمية آمنة."
  }
};

locales.forEach(lang => {
  const filePath = path.join(__dirname, 'src', 'lib', 'i18n', `${lang}.json`);
  let content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  content.about.goals = goalsObj[lang];
  
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
  console.log(`Updated goals for ${lang}.json`);
});

