import { create } from 'zustand';

interface LangState {
  lang: 'en' | 'si' | 'ta';
  setLang: (lang: 'en' | 'si' | 'ta') => void;
}

// Default to Sinhala unless user explicitly changes
function getInitialLang(): 'en' | 'si' | 'ta' {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('lang-demo');
    if (saved === 'si' || saved === 'ta') return saved;
    // If not set, default to Sinhala
    return 'si';
  }
  return 'si';
}

export const useLangStore = create<LangState>((set) => ({
  lang: getInitialLang(),
  setLang: (lang) => {
    set({ lang });
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang-demo', lang);
    }
  }
}));
