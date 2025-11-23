// Free Google Translate API utility
export interface TranslationResponse {
  translatedText: string;
  sourceLanguage: string;
}

export const SUPPORTED_LANGUAGES = {
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

export type LanguageCode = keyof typeof SUPPORTED_LANGUAGES;

// Free Google Translate endpoint
const TRANSLATE_API_URL = 'https://translate.googleapis.com/translate_a/single';

export async function translateText(
  text: string, 
  targetLang: LanguageCode, 
  sourceLang: LanguageCode = 'auto' as LanguageCode
): Promise<TranslationResponse> {
  if (!text.trim()) {
    return { translatedText: text, sourceLanguage: sourceLang };
  }

  try {
    const params = new URLSearchParams({
      client: 'gtx',
      sl: sourceLang,
      tl: targetLang,
      dt: 't',
      q: text
    });

    const response = await fetch(`${TRANSLATE_API_URL}?${params}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Translation failed: ${response.status}`);
    }

    const data = await response.json();
    
    // Parse Google Translate response format
    const translatedText = data[0]?.[0]?.[0] || text;
    const detectedSourceLang = data[2] || sourceLang;

    return {
      translatedText,
      sourceLanguage: detectedSourceLang
    };
  } catch (error) {
    console.error('Translation error:', error);
    return { translatedText: text, sourceLanguage: sourceLang };
  }
}

// Batch translate multiple texts
export async function translateBatch(
  texts: string[], 
  targetLang: LanguageCode, 
  sourceLang: LanguageCode = 'auto' as LanguageCode
): Promise<string[]> {
  const translations = await Promise.all(
    texts.map(text => translateText(text, targetLang, sourceLang))
  );
  
  return translations.map(t => t.translatedText);
}

// Cache translations to avoid repeated API calls
const translationCache = new Map<string, string>();

export async function translateWithCache(
  text: string, 
  targetLang: LanguageCode, 
  sourceLang: LanguageCode = 'auto' as LanguageCode
): Promise<string> {
  const cacheKey = `${text}-${sourceLang}-${targetLang}`;
  
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  const result = await translateText(text, targetLang, sourceLang);
  translationCache.set(cacheKey, result.translatedText);
  
  return result.translatedText;
}