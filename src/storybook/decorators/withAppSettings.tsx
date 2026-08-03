import type { Decorator } from '@storybook/react-vite';

import { applyStorybookAppSettings } from '@/storybook/settings';

/** Syncs Storybook toolbar globals → `window.__SETTINGS__` before each story. */
export const withAppSettings: Decorator = (Story, context) => {
  applyStorybookAppSettings(context.globals);
  return <Story />;
};
