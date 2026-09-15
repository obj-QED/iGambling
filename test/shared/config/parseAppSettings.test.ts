import { afterEach, describe, expect, it } from 'vitest';

import { parseAppSettings } from '@/shared/config/parseAppSettings';
import { getSettings, resetSettingsCache } from '@/shared/config/settings';

describe('parseAppSettings', () => {
  it('returns empty object for non-records', () => {
    expect(parseAppSettings(null)).toEqual({});
    expect(parseAppSettings('x')).toEqual({});
  });

  it('keeps language and unknown widget keys', () => {
    const parsed = parseAppSettings({
      language: 'ru',
      params: { language: 'en', search: { type: 'spotlight' } },
      header: { type: 'dropdown' },
    });

    expect(parsed.language).toBe('ru');
    expect(parsed.params?.language).toBe('en');
    expect(parsed.header).toEqual({ type: 'dropdown' });
  });
});

describe('getSettings cache', () => {
  afterEach(() => {
    resetSettingsCache();
    delete (globalThis as { __SETTINGS__?: unknown }).__SETTINGS__;
  });

  it('parses window.__SETTINGS__', () => {
    (globalThis as { __SETTINGS__?: unknown }).__SETTINGS__ = { language: 'ru' };
    expect(getSettings().language).toBe('ru');
  });
});
