const fs = require('fs');
const path = require('path');

const locales = ['en', 'ku', 'ar'];

const additions = {
  about: {
    subtitle: { en: "Learn more about our platform.", ku: "زیاتر بزانە دەربارەی پلاتفۆرمەکەمان.", ar: "تعرف أكثر على منصتنا." }
  },
  labs: {
    immunology: {
      name: { en: "Immunology", ku: "بەرگریزانی", ar: "علم المناعة" }
    },
    active: { en: "Active", ku: "چالاک", ar: "نشط" },
    enterLab: { en: "Enter Lab", ku: "چوونە ناو تاقیگە", ar: "دخول المختبر" }
  },
  dashboard: {
    subtitle: { en: "Manage your experiments.", ku: "بەڕێوەبردنی تاقیکردنەوەکانت.", ar: "إدارة تجاربك." },
    availableExperiments: { en: "Available Experiments", ku: "تاقیکردنەوە بەردەستەکان", ar: "التجارب المتاحة" },
    bestScore: { en: "Best Score", ku: "باشترین نمرە", ar: "أفضل نتيجة" }
  },
  instructor: {
    totalAttempts: { en: "Total Attempts", ku: "کۆی هەوڵەکان", ar: "إجمالي المحاولات" },
    subtitle: { en: "Manage your students.", ku: "بەڕێوەبردنی خوێندکارەکانت.", ar: "إدارة طلابك." },
    studentResults: { en: "Student Results", ku: "ئەنجامی خوێندکاران", ar: "نتائج الطلاب" },
    noStudentsDescription: { en: "No students have registered yet.", ku: "تا ئێستا هیچ خوێندکارێک خۆی تۆمار نەکردووە.", ar: "لم يسجل أي طلاب بعد." }
  },
  elisa: {
    ordering: { en: "Ordering", ku: "ڕیزبەندی", ar: "ترتيب" },
    orderingTitle: { en: "Step Ordering", ku: "ڕیزبەندی هەنگاوەکان", ar: "ترتيب الخطوات" },
    orderingSubtitle: { en: "Arrange the steps correctly.", ku: "هەنگاوەکان بە دروستی ڕیزبکە.", ar: "رتب الخطوات بشكل صحيح." },
    backToIntro: { en: "Back to Intro", ku: "گەڕانەوە بۆ پێشەکی", ar: "العودة للمقدمة" },
    procedureTitle: { en: "Procedure", ku: "ڕێکار", ar: "الإجراء" },
    procedureSubtitle: { en: "Follow the steps carefully.", ku: "بە وردی شوێن هەنگاوەکان بکەوە.", ar: "اتبع الخطوات بعناية." },
    completed: { en: "Completed!", ku: "تەواوبوو!", ar: "مكتمل!" },
    completedDescription: { en: "You have finished the experiment.", ku: "تاقیکردنەوەکەت تەواوکرد.", ar: "لقد أنهيت التجربة." },
    goToDashboard: { en: "Go to Dashboard", ku: "بڕۆ بۆ داشبۆرد", ar: "الذهاب للوحة التحكم" },
    retry: { en: "Retry", ku: "دووبارە", ar: "إعادة المحاولة" }
  },
  lab: {
    immunology: {
      subtitle: { en: "Immunology experiments", ku: "تاقیکردنەوەکانی بەرگریزانی", ar: "تجارب علم المناعة" }
    },
    availableExperiments: { en: "Available Experiments", ku: "تاقیکردنەوە بەردەستەکان", ar: "التجارب المتاحة" },
    minutes: { en: "minutes", ku: "خولەک", ar: "دقائق" },
    steps: { en: "steps", ku: "هەنگاو", ar: "خطوات" },
    viewExperiment: { en: "View", ku: "بینین", ar: "عرض" },
    moreExperiments: { en: "More", ku: "زیاتر", ar: "المزيد" },
    equipment: {
      function: { en: "Function", ku: "ئەرک", ar: "الوظيفة" },
      example: { en: "Example", ku: "نموونە", ar: "مثال" }
    },
    step: { en: "Step", ku: "هەنگاو", ar: "خطوة" }
  },
  login: {
    invalidCredentials: { en: "Invalid credentials", ku: "زانیارییەکان هەڵەن", ar: "بيانات الاعتماد غير صالحة" },
    subtitle: { en: "Sign in to continue.", ku: "چوونە ژوورەوە بۆ بەردەوامبوون.", ar: "تسجيل الدخول للمتابعة." },
    emailPlaceholder: { en: "Email", ku: "ئیمەیڵ", ar: "البريد الإلكتروني" },
    passwordPlaceholder: { en: "Password", ku: "وشەی تێپەڕ", ar: "كلمة المرور" },
    loggingIn: { en: "Logging in...", ku: "چوونە ژوورەوە...", ar: "جاري تسجيل الدخول..." },
    loginButton: { en: "Login", ku: "چوونە ژوورەوە", ar: "تسجيل الدخول" }
  },
  register: {
    emailTaken: { en: "Email already taken", ku: "ئیمەیڵەکە پێشتر بەکارهاتووە", ar: "البريد الإلكتروني مستخدم بالفعل" },
    error: { en: "Error registering", ku: "هەڵە لە خۆتۆمارکردن", ar: "خطأ في التسجيل" },
    subtitle: { en: "Create an account.", ku: "هەژمارێک دروستبکە.", ar: "إنشاء حساب." },
    namePlaceholder: { en: "Name", ku: "ناو", ar: "الاسم" },
    emailPlaceholder: { en: "Email", ku: "ئیمەیڵ", ar: "البريد الإلكتروني" },
    passwordPlaceholder: { en: "Password", ku: "وشەی تێپەڕ", ar: "كلمة المرور" },
    confirmPasswordPlaceholder: { en: "Confirm Password", ku: "دڵنیابوونەوەی وشەی تێپەڕ", ar: "تأكيد كلمة المرور" },
    registering: { en: "Registering...", ku: "خۆتۆمارکردن...", ar: "جاري التسجيل..." },
    registerButton: { en: "Register", ku: "خۆتۆمارکردن", ar: "تسجيل" }
  }
};

function deepMerge(target, source, lang) {
  for (const key in source) {
    if (typeof source[key] === 'object' && source[key] !== null) {
      if (source[key][lang] !== undefined) {
        target[key] = source[key][lang];
      } else {
        if (!target[key]) target[key] = {};
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
  console.log(`Updated ${lang}.json`);
});

