import styles from '@/styles/components/language-switcher.module.css';
import React from 'react';
import { useLangStore } from '@/store/langStore';

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'si', label: 'සිංහල' },
  { code: 'ta', label: 'தமிழ்' }
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLangStore();

  return (
  <div className={styles.languageSwitcher}>
      {LANGS.map(l => (
        <button
          key={l.code}
          onClick={() => setLang(l.code as 'en' | 'si' | 'ta')}
          disabled={l.code === lang}
          className={styles.langSwitchBtn}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
