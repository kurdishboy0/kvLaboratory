const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) { 
      results.push(file);
    }
  });
  return results;
}

const tsxFiles = walk(path.join(__dirname, 'src'));
const enJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/lib/i18n/en.json'), 'utf8'));

function getNestedValue(obj, path) {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return null;
    }
  }
  return current;
}

const regex = /t\(['"]([^'"]+)['"]\)/g;
const missingKeys = new Set();

tsxFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = regex.exec(content)) !== null) {
    const key = match[1];
    if (!getNestedValue(enJson, key)) {
      missingKeys.add(key);
    }
  }
});

console.log('Missing keys in en.json:');
console.log(Array.from(missingKeys));
