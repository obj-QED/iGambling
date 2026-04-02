import { useMemo } from 'react';

const FALLBACK_LANGUAGE = 'en';

/**
 * Синхронно возвращает код языка из браузера (для использования вне компонентов, напр. при bootstrap).
 */
export function getBrowserLanguage(): string {
  if (typeof navigator === 'undefined') return FALLBACK_LANGUAGE;
  const lang = navigator.language ?? (navigator as { userLanguage?: string }).userLanguage;
  if (!lang || typeof lang !== 'string') return FALLBACK_LANGUAGE;
  const code = lang.split('-')[0]?.toLowerCase() ?? FALLBACK_LANGUAGE;
  return code || FALLBACK_LANGUAGE;
}

/**
 * Определяет язык из браузера (navigator.language).
 * Возвращает короткий код языка (например 'en', 'ru').
 */
export function useLanguage(): string {
  return useMemo(() => getBrowserLanguage(), []);
}
