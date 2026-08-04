import type {
  MantineColorScheme,
  MantineColorSchemeManager,
  MantineThemeOverride,
} from '@mantine/core';
import type { Decorator } from '@storybook/react-vite';

import { MantineProvider, mergeThemeOverrides } from '@mantine/core';

import { classNamesPrefix, mantineTheme } from '@/assets/theme';
import {
  readStorybookPrimaryColor,
  readStorybookPrimaryShade,
} from '@/storybook/settings/themeGlobals';

type ColorScheme = 'light' | 'dark';

const storybookColorSchemeManager: MantineColorSchemeManager = {
  get: (defaultValue) => defaultValue,
  set: () => undefined,
  subscribe: () => undefined,
  unsubscribe: () => undefined,
  clear: () => undefined,
};

function readColorScheme(globals: Record<string, unknown>): ColorScheme {
  return globals.colorScheme === 'light' ? 'light' : 'dark';
}

export const withMantineColorScheme: Decorator = (Story, context) => {
  const scheme = readColorScheme(context.globals);
  const primaryColor = readStorybookPrimaryColor(context.globals);
  const primaryShade = readStorybookPrimaryShade(context.globals);

  const themeOverride: MantineThemeOverride = {
    primaryColor,
    primaryShade: { light: primaryShade, dark: primaryShade },
  };

  const theme = mergeThemeOverrides(mantineTheme, themeOverride);
  const providerKey = `${scheme}-${primaryColor}-${primaryShade}`;

  return (
    <MantineProvider
      key={providerKey}
      theme={theme}
      classNamesPrefix={classNamesPrefix}
      defaultColorScheme={scheme satisfies MantineColorScheme}
      forceColorScheme={scheme}
      colorSchemeManager={storybookColorSchemeManager}
    >
      <div
        data-theme={scheme}
        data-primary-color={primaryColor}
        data-primary-shade={primaryShade}
        style={{
          padding: 'var(--spacing-md, 1rem)',
          background: 'var(--color-bg-body)',
          color: 'var(--color-text)',
          minHeight: '100%',
        }}
      >
        <Story />
      </div>
    </MantineProvider>
  );
};
