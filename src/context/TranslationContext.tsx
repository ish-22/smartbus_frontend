'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type LanguageCode = 'en' | 'si' | 'ta' | 'hi' | 'fr' | 'es' | 'de' | 'zh' | 'ja' | 'ko';

export const LANGUAGES = {
  en: 'English',
  si: 'Sinhala',
  ta: 'Tamil',
  hi: 'Hindi',
  fr: 'French',
  es: 'Spanish',
  de: 'German',
  zh: 'Chinese',
  ja: 'Japanese',
  ko: 'Korean'
} as const;

interface TranslationContextType {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  translateText: (text: string) => Promise<string>;
  isTranslating: boolean;
  translations: Record<string, string>;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translations, setTranslations] = useState<Record<string, string>>({});

  // Load saved language and translations from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('smartbus-language') as LanguageCode;
    const savedTranslations = localStorage.getItem('smartbus-translations');
    
    if (savedLang && LANGUAGES[savedLang]) {
      setCurrentLanguage(savedLang);
    }
    
    if (savedTranslations) {
      try {
        setTranslations(JSON.parse(savedTranslations));
      } catch (e) {
        console.error('Failed to parse saved translations');
      }
    }
  }, []);

  const translateText = async (text: string): Promise<string> => {
    if (!text.trim() || currentLanguage === 'en') return text;

    const cacheKey = `${text}-${currentLanguage}`;
    if (translations[cacheKey]) {
      return translations[cacheKey];
    }

    try {
      setIsTranslating(true);
      const params = new URLSearchParams({
        client: 'gtx',
        sl: 'en',
        tl: currentLanguage,
        dt: 't',
        q: text
      });

      const response = await fetch(`https://translate.googleapis.com/translate_a/single?${params}`);
      const data = await response.json();
      const translatedText = data[0]?.[0]?.[0] || text;

      const newTranslations = { ...translations, [cacheKey]: translatedText };
      setTranslations(newTranslations);
      localStorage.setItem('smartbus-translations', JSON.stringify(newTranslations));

      return translatedText;
    } catch (error) {
      console.error('Translation failed:', error);
      return text;
    } finally {
      setIsTranslating(false);
    }
  };

  const setLanguage = (lang: LanguageCode) => {
    setCurrentLanguage(lang);
    localStorage.setItem('smartbus-language', lang);
    document.documentElement.lang = lang;
  };

  return (
    <TranslationContext.Provider value={{
      currentLanguage,
      setLanguage,
      translateText,
      isTranslating,
      translations
    }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
}