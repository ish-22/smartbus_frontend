import en from '../locales/en.json';
import si from '../locales/si.json';
import ta from '../locales/ta.json';

// Use index signature to allow dynamic key access
const enT = en as Record<string, string>;
const siT = si as Record<string, string>;
const taT = ta as Record<string, string>;

// For Tamil, fallback to Sinhala if not present
export function t(key: string, lang: 'en' | 'si' | 'ta' = 'en'): string {
	if (lang === 'ta') {
		return taT[key] || siT[key] || key;
	}
	if (lang === 'si') {
		return siT[key] || key;
	}
	return enT[key] || key;
}
export function getCurrentLang(query: Record<string, unknown>): 'en' | 'si' | 'ta' {
	if (query?.lang === 'ta') return 'ta';
	if (query?.lang === 'si') return 'si';
	return 'en';
}
