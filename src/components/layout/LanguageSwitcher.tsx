'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { Locale } from '@/types';

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();

  const languages: { code: Locale; label: string }[] = [
    { code: 'ku', label: 'کوردی' },
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' }
  ];

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLocale(lang.code)}
          className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
            locale === lang.code
              ? 'bg-blue-100 text-blue-700 font-bold'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
