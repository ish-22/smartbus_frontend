import { LanguageCode } from '@/context/TranslationContext';

// Free Google Translate API endpoint
const TRANSLATE_API_URL = 'https://translate.googleapis.com/translate_a/single';

export async function translateText(text: string, targetLang: LanguageCode): Promise<string> {
  if (!text.trim() || targetLang === 'en') return text;

  try {
    const params = new URLSearchParams({
      client: 'gtx',
      sl: 'en',
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

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    return data[0]?.[0]?.[0] || text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}

export async function translateBatch(texts: string[], targetLang: LanguageCode): Promise<string[]> {
  if (targetLang === 'en') return texts;
  
  const translations = await Promise.all(
    texts.map(text => translateText(text, targetLang))
  );
  
  return translations;
}

// Auto-translate all text nodes in the DOM
export function translatePageContent(targetLang: LanguageCode, translations: Record<string, string>) {
  if (targetLang === 'en') return;

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        
        // Skip script, style, and other non-visible elements
        const tagName = parent.tagName.toLowerCase();
        if (['script', 'style', 'noscript', 'meta', 'title'].includes(tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        
        // Skip empty or whitespace-only text
        const text = node.textContent?.trim();
        if (!text || text.length < 2) return NodeFilter.FILTER_REJECT;
        
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const textNodes: Text[] = [];
  let node;
  while (node = walker.nextNode()) {
    textNodes.push(node as Text);
  }

  textNodes.forEach(async (textNode) => {
    const originalText = textNode.textContent?.trim();
    if (!originalText) return;

    const cacheKey = `${originalText}-${targetLang}`;
    if (translations[cacheKey]) {
      textNode.textContent = translations[cacheKey];
    } else {
      try {
        const translated = await translateText(originalText, targetLang);
        textNode.textContent = translated;
      } catch (error) {
        console.error('Failed to translate text node:', error);
      }
    }
  });
}