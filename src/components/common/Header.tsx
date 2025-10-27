import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLangStore } from '@/store/langStore';
import { t } from '@/utils/i18n';

export default function Header() {
  const { lang } = useLangStore();
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-blue-700 text-white shadow">
      <h1 className="text-xl font-bold">{t('login', lang)}</h1>
      <LanguageSwitcher />
    </header>
  );
}
