'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '../data/translations';

export type Theme = 'dark' | 'light';

interface PortfolioContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: typeof translations.en;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('id');
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read persisted language and theme
    const savedLang = localStorage.getItem('ikhwan_lang') as Language | null;
    if (savedLang && (savedLang === 'id' || savedLang === 'en' || savedLang === 'zh')) {
      setLangState(savedLang);
      document.documentElement.lang = savedLang;
    }

    const savedTheme = localStorage.getItem('ikhwan_theme') as Theme | null;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme('dark');
    }

    setMounted(true);
  }, []);

  const applyTheme = (targetTheme: Theme) => {
    const root = document.documentElement;
    if (targetTheme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    }
  };

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('ikhwan_lang', newLang);
    document.documentElement.lang = newLang;
  };

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setThemeState(nextTheme);
    localStorage.setItem('ikhwan_theme', nextTheme);
    applyTheme(nextTheme);
  };

  const t = translations[lang] || translations.id;

  return (
    <PortfolioContext.Provider value={{ lang, setLang, theme, toggleTheme, t }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}

