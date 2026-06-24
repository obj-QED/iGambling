import { useMemo } from 'react';

const FALLBACK_LANGUAGE = 'en';

/**
 * Returns browser language code synchronously (usable outside components, e.g. during bootstrap).
 */
export function getBrowserLanguage(): string {
  if (typeof navigator === 'undefined') return FALLBACK_LANGUAGE;

  const code = navigator.language.split('-')[0].toLowerCase();
  return code === '' ? FALLBACK_LANGUAGE : code;
}

/**
 * Resolves language from browser settings (navigator.language).
 * Returns short language code (e.g. 'en', 'ru').
 */
export function useLanguage(): string {
  return useMemo(() => getBrowserLanguage(), []);
}
