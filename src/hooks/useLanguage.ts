import { useMemo } from 'react';

const FALLBACK_LANGUAGE = 'en';

/**
 * Returns browser language code synchronously (usable outside components, e.g. during bootstrap).
 */
export function getBrowserLanguage(): string {
  if (typeof navigator === 'undefined') return FALLBACK_LANGUAGE;
  const lang = navigator.language ?? (navigator as { userLanguage?: string }).userLanguage;
  if (!lang || typeof lang !== 'string') return FALLBACK_LANGUAGE;
  const code = lang.split('-')[0]?.toLowerCase() ?? FALLBACK_LANGUAGE;
  return code || FALLBACK_LANGUAGE;
}

/**
 * Resolves language from browser settings (navigator.language).
 * Returns short language code (e.g. 'en', 'ru').
 */
export function useLanguage(): string {
  return useMemo(() => getBrowserLanguage(), []);
}
