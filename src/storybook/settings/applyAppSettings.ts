import type { AppSettings } from '@/shared/config';

import { STORYBOOK_APP_SETTINGS_DEFAULTS } from './defaults';
import { buildAsideSettingsFromGlobals, buildHeaderSettingsFromGlobals } from './globals';

export function applyStorybookAppSettings(globals: Record<string, unknown>): AppSettings {
  const settings: AppSettings = {
    ...STORYBOOK_APP_SETTINGS_DEFAULTS,
    header: {
      ...STORYBOOK_APP_SETTINGS_DEFAULTS.header,
      ...buildHeaderSettingsFromGlobals(globals),
    },
    aside: {
      ...STORYBOOK_APP_SETTINGS_DEFAULTS.aside,
      ...buildAsideSettingsFromGlobals(globals),
    },
  };

  if (typeof globalThis !== 'undefined') {
    (globalThis as unknown as Window).__SETTINGS__ = settings;
  }

  return settings;
}
