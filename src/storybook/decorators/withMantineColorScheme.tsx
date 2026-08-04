import type {
  MantineColorScheme,
  MantineColorSchemeManager,
  MantineColorShade,
  MantineThemeOverride,
} from '@mantine/core';
import type { Decorator } from '@storybook/react-vite';
import type { ReactNode } from 'react';

import { useEffect } from 'react';

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

function toMantineColorShade(value: number): MantineColorShade {
  const shade = Math.min(9, Math.max(0, Math.trunc(value))) as MantineColorShade;
  return shade;
}

/** Keep `light-dark()` + brand palettes in sync with Storybook toolbar. */
function useDocumentColorScheme(scheme: ColorScheme) {
  useEffect(() => {
    const root = document.documentElement;
    const prevScheme = root.getAttribute('data-mantine-color-scheme');
    const prevTheme = root.getAttribute('data-theme');
    const prevColorScheme = root.style.colorScheme;

    root.setAttribute('data-mantine-color-scheme', scheme);
    root.setAttribute('data-theme', scheme);
    root.style.colorScheme = scheme;

    return () => {
      if (prevScheme) root.setAttribute('data-mantine-color-scheme', prevScheme);
      else root.removeAttribute('data-mantine-color-scheme');
      if (prevTheme) root.setAttribute('data-theme', prevTheme);
      else root.removeAttribute('data-theme');
      root.style.colorScheme = prevColorScheme;
    };
  }, [scheme]);
}

function StorybookThemeShell({
  scheme,
  primaryColor,
  primaryShade,
  children,
}: {
  scheme: ColorScheme;
  primaryColor: string;
  primaryShade: number;
  children: ReactNode;
}) {
  useDocumentColorScheme(scheme);

  return (
    <div
      data-theme={scheme}
      data-mantine-color-scheme={scheme}
      data-primary-color={primaryColor}
      data-primary-shade={primaryShade}
      style={{
        colorScheme: scheme,
        padding: 'var(--spacing-md, 1rem)',
        background: 'var(--color-bg-body)',
        color: 'var(--color-text)',
        minHeight: '100%',
      }}
    >
      {children}
    </div>
  );
}

export const withMantineColorScheme: Decorator = (Story, context) => {
  const scheme = readColorScheme(context.globals);
  const primaryColor = readStorybookPrimaryColor(context.globals);
  const primaryShade = toMantineColorShade(readStorybookPrimaryShade(context.globals));

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
      <StorybookThemeShell scheme={scheme} primaryColor={primaryColor} primaryShade={primaryShade}>
        <Story />
      </StorybookThemeShell>
    </MantineProvider>
  );
};
