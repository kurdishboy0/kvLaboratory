'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Locale, I18nContextType } from '@/types';

import ku from './ku.json';
import en from './en.json';
import ar from './ar.json';

const translations: Record<Locale, Record<string, unknown>> = { ku, en, ar };

const RTL_LOCALES: Locale[] = ['ku', 'ar'];

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path; // fallback: return the key itself
    }
  }
  return typeof current === 'string' ? current : path;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ku');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('kvl_locale') as Locale | null;
    if (saved && ['ku', 'en', 'ar'].includes(saved)) {
      setLocaleState(saved);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const dir = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', dir);
      document.documentElement.setAttribute('lang', locale);
    }
  }, [locale, mounted]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('kvl_locale', newLocale);
  }, []);

  const t = useCallback((key: string): string => {
    return getNestedValue(translations[locale] as Record<string, unknown>, key);
  }, [locale]);

  const dir = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';

  if (!mounted) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation(): I18nContextType {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslation must be used within I18nProvider');
  return ctx;
}

export { type Locale };

