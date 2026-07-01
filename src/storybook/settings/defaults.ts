import type { AppSettings } from '@/shared/config';

/** Default `window.__SETTINGS__` for Storybook (mirrors `src/assets/settings/index.js`). */
export const COLOR_SCHEME_CUSTOM_BLOCK = {
  key: 'block3-tools',
  placement: { section: 'block3', at: 'end' as const },
  items: [{ key: 'color_scheme', url: '', name: '' }],
};

export const STORYBOOK_APP_SETTINGS_DEFAULTS: AppSettings = {
  appName: 'iGambling',
  version: '1.0.0',
  params: {
    fullWidth: true,
  },
  header: {
    layout: 'container',
    type: 'default',
    mockMenu: true,
    mockAuth: 'authenticated',
    customBlocks: [COLOR_SCHEME_CUSTOM_BLOCK],
  },
  aside: {
    width: 400,
    type: 'default',
    mockMenu: true,
    openedDropdowns: ['category', 'providers', 'live_games', 'casino', 'betting'],
    customBlocks: [],
  },
};
