import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { resetSettingsCache } from '@/shared/config/settings';
import { resolveAppLanguage } from '@/hooks/useLanguage';

describe('resolveAppLanguage', () => {
  const originalLang = document.documentElement.lang;

  beforeEach(() => {
    resetSettingsCache();
    delete (globalThis as { __SETTINGS__?: unknown }).__SETTINGS__;
  });

  afterEach(() => {
    document.documentElement.lang = originalLang;
    resetSettingsCache();
    delete (globalThis as { __SETTINGS__?: unknown }).__SETTINGS__;
  });

  it('prefers params.language over html lang', () => {
    document.documentElement.lang = 'en';
    (globalThis as { __SETTINGS__?: unknown }).__SETTINGS__ = { params: { language: 'ru-MD' } };
    expect(resolveAppLanguage()).toBe('ru');
  });

  it('falls back to html lang when settings omit language', () => {
    document.documentElement.lang = 'en-US';
    (globalThis as { __SETTINGS__?: unknown }).__SETTINGS__ = {};
    expect(resolveAppLanguage()).toBe('en');
  });

  it('uses settings.language when params.language is omitted', () => {
    document.documentElement.lang = 'en';
    (globalThis as { __SETTINGS__?: unknown }).__SETTINGS__ = { language: 'fr-FR' };
    expect(resolveAppLanguage()).toBe('fr');
  });
});
