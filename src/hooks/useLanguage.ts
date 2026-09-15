import { getSettings } from '@/shared/config';

const FALLBACK_LANGUAGE = 'en';

function normalizeLanguage(code: string | undefined): string | null {
  if (code == null) return null;
  const short = code.split('-')[0]?.toLowerCase().trim() ?? '';
  return short.length > 0 ? short : null;
}

export function getBrowserLanguage(): string {
  if (typeof navigator === 'undefined') return FALLBACK_LANGUAGE;
  return normalizeLanguage(navigator.language) ?? FALLBACK_LANGUAGE;
}

/**
 * One language for translation/init: settings → html lang → browser.
 */
export function resolveAppLanguage(): string {
  const settings = getSettings();
  const fromParams = normalizeLanguage(settings.params?.language);
  if (fromParams) return fromParams;
  const fromSettings = normalizeLanguage(settings.language);
  if (fromSettings) return fromSettings;
  if (typeof document !== 'undefined') {
    const fromHtml = normalizeLanguage(document.documentElement.lang);
    if (fromHtml) return fromHtml;
  }
  return getBrowserLanguage();
}

export function useLanguage(): string {
  return resolveAppLanguage();
}
