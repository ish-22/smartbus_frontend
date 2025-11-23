import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LanguageCode, SUPPORTED_LANGUAGES } from '@/utils/translator';

interface TranslationState {
  currentLanguage: LanguageCode;
  isTranslating: boolean;
  translatedTexts: Record<string, string>;
  setLanguage: (language: LanguageCode) => void;
  setTranslating: (isTranslating: boolean) => void;
  addTranslation: (original: string, translated: string) => void;
  getTranslation: (text: string) => string;
  clearTranslations: () => void;
}

export const useTranslationStore = create<TranslationState>()(
  persist(
    (set, get) => ({
      currentLanguage: 'en',
      isTranslating: false,
      translatedTexts: {},

      setLanguage: (language: LanguageCode) => {
        set({ currentLanguage: language });
      },

      setTranslating: (isTranslating: boolean) => {
        set({ isTranslating });
      },

      addTranslation: (original: string, translated: string) => {
        set((state) => ({
          translatedTexts: {
            ...state.translatedTexts,
            [original]: translated
          }
        }));
      },

      getTranslation: (text: string) => {
        const { translatedTexts } = get();
        return translatedTexts[text] || text;
      },

      clearTranslations: () => {
        set({ translatedTexts: {} });
      }
    }),
    {
      name: 'smartbus-translation',
      partialize: (state) => ({
        currentLanguage: state.currentLanguage,
        translatedTexts: state.translatedTexts
      })
    }
  )
);