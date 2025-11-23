import { useEffect, useState } from 'react';
import { useTranslationStore } from '@/store/translationStore';
import { translateWithCache, LanguageCode } from '@/utils/translator';

export function useTranslation() {
  const {
    currentLanguage,
    isTranslating,
    setTranslating,
    addTranslation,
    getTranslation
  } = useTranslationStore();

  const translate = async (text: string, targetLang?: LanguageCode): Promise<string> => {
    if (!text.trim()) return text;
    
    const target = targetLang || currentLanguage;
    if (target === 'en') return text; // Assume original text is English

    // Check if already translated
    const cached = getTranslation(text);
    if (cached !== text) return cached;

    try {
      setTranslating(true);
      const translated = await translateWithCache(text, target, 'en');
      addTranslation(text, translated);
      return translated;
    } catch (error) {
      console.error('Translation failed:', error);
      return text;
    } finally {
      setTranslating(false);
    }
  };

  return {
    currentLanguage,
    isTranslating,
    translate,
    t: translate // Alias for convenience
  };
}

// Hook for translating text with automatic updates
export function useTranslatedText(text: string): string {
  const [translatedText, setTranslatedText] = useState(text);
  const { translate, currentLanguage } = useTranslation();

  useEffect(() => {
    if (currentLanguage === 'en') {
      setTranslatedText(text);
      return;
    }

    translate(text).then(setTranslatedText);
  }, [text, currentLanguage, translate]);

  return translatedText;
}

// Hook for batch translation
export function useTranslatedTexts(texts: string[]): string[] {
  const [translatedTexts, setTranslatedTexts] = useState(texts);
  const { translate, currentLanguage } = useTranslation();

  useEffect(() => {
    if (currentLanguage === 'en') {
      setTranslatedTexts(texts);
      return;
    }

    Promise.all(texts.map(text => translate(text)))
      .then(setTranslatedTexts);
  }, [texts, currentLanguage, translate]);

  return translatedTexts;
}