'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/context/TranslationContext';

// Hook for translating single text
export function useTranslate(text: string): string {
  const [translatedText, setTranslatedText] = useState(text);
  const { translateText, currentLanguage } = useTranslation();

  useEffect(() => {
    if (currentLanguage === 'en') {
      setTranslatedText(text);
      return;
    }

    translateText(text).then(setTranslatedText);
  }, [text, currentLanguage, translateText]);

  return translatedText;
}

// Hook for translating multiple texts
export function useTranslateArray(texts: string[]): string[] {
  const [translatedTexts, setTranslatedTexts] = useState(texts);
  const { translateText, currentLanguage } = useTranslation();

  useEffect(() => {
    if (currentLanguage === 'en') {
      setTranslatedTexts(texts);
      return;
    }

    Promise.all(texts.map(text => translateText(text)))
      .then(setTranslatedTexts);
  }, [texts, currentLanguage, translateText]);

  return translatedTexts;
}

// Hook for translating object properties
export function useTranslateObject<T extends Record<string, string>>(obj: T): T {
  const [translatedObj, setTranslatedObj] = useState(obj);
  const { translateText, currentLanguage } = useTranslation();

  useEffect(() => {
    if (currentLanguage === 'en') {
      setTranslatedObj(obj);
      return;
    }

    const translateObjectValues = async () => {
      const entries = Object.entries(obj);
      const translatedEntries = await Promise.all(
        entries.map(async ([key, value]) => [key, await translateText(value)])
      );
      setTranslatedObj(Object.fromEntries(translatedEntries) as T);
    };

    translateObjectValues();
  }, [obj, currentLanguage, translateText]);

  return translatedObj;
}