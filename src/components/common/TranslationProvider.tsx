'use client';

import { useEffect } from 'react';
import { useTranslationStore } from '@/store/translationStore';

interface TranslationProviderProps {
  children: React.ReactNode;
}

export default function TranslationProvider({ children }: TranslationProviderProps) {
  const { currentLanguage } = useTranslationStore();

  useEffect(() => {
    // Update document language attribute
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  return <>{children}</>;
}