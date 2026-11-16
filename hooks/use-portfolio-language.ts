'use client';
import { useEffect, useState } from 'react';
import dataPt from '@/content/portfolio.json';
import dataEn from '@/content/portfolio.en.json';
import dataEs from '@/content/portfolio.es.json';
import spanishLabels from '@/content/ui.es.json';
import englishLabels from '@/content/ui.en.json';
export type PortfolioLanguage = 'pt' | 'en' | 'es';
export type Translate = (text: string) => string;

export function usePortfolioLanguage() {
  const [language, setLanguage] = useState<PortfolioLanguage>('pt');
  const data = { pt: dataPt, en: dataEn, es: dataEs }[language];
  const labels: Record<string, string> =
    language === 'es' ? spanishLabels : language === 'en' ? englishLabels : {};
  const t: Translate = (text) => labels[text] ?? text;
  useEffect(() => {
    let preferred = new URLSearchParams(window.location.search).get('lang');
    if (!preferred) {
      try {
        preferred = localStorage.getItem('portfolio-language');
      } catch {
        /* Armazenamento indisponível: manter português. */
      }
    }
    if (preferred === 'en' || preferred === 'es') {
      const selected = preferred;
      queueMicrotask(() => setLanguage(selected));
    }
  }, []);
  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : language;
  }, [language]);
  function changeLanguage(value: PortfolioLanguage) {
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
