'use client';
import { useEffect, useState } from 'react';
import dataPt from '@/content/portfolio.json';
import dataEn from '@/content/portfolio.en.json';
import englishLabels from '@/content/ui.en.json';
export type Translate = (text: string) => string;

export function usePortfolioLanguage() {
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  const data = language === 'en' ? dataEn : dataPt;
  const t: Translate = (text) =>
    language === 'en'
      ? ((englishLabels as Record<string, string>)[text] ?? text)
      : text;
  // A URL compartilhada prevalece sobre a preferência local após a hidratação.
  useEffect(() => {
    let preferred: string | null = new URLSearchParams(
      window.location.search,
    ).get('lang');
    if (!preferred) {
      try {
        preferred = localStorage.getItem('portfolio-language');
      } catch {
        /* Navegação privada pode impedir o armazenamento. */
      }
    }
    if (preferred === 'en') queueMicrotask(() => setLanguage('en'));
  }, []);
  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';
  }, [language]);
  function changeLanguage(value: 'pt' | 'en') {
    setLanguage(value);
    try {
      localStorage.setItem('portfolio-language', value);
    } catch {
      /* A troca continua funcionando durante a sessão. */
    }
    const url = new URL(window.location.href);
    url.searchParams.set('lang', value);
    window.history.replaceState(null, '', url);
  }

  return { language, data, t, changeLanguage };
}
