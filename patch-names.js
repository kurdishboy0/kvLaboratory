const fs = require('fs');
const path = require('path');

const locales = ['en', 'ku', 'ar'];

const additions = {
  about: {
    team: {
      leadName: { en: "Ahmed Bradosty", ku: "ئەحمەد برادۆستی", ar: "أحمد برادوستي" },
      advisorName: { en: "Kasya Aswad", ku: "کاسیا ئەسوەد", ar: "كاسيا أسود" }
    }
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
console.log('Names patched');

