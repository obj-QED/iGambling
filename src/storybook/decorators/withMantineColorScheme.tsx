import type {
  MantineColorScheme,
  MantineColorSchemeManager,
  MantineColorShade,
  MantineThemeOverride,
} from '@mantine/core';
import type { Decorator } from '@storybook/react-vite';
import type { ReactNode } from 'react';

import { useLayoutEffect } from 'react';

import { MantineProvider, mergeThemeOverrides } from '@mantine/core';

import { classNamesPrefix, mantineCssVariablesResolver, mantineTheme } from '@/assets/theme';
import {
  readStorybookPrimaryColor,
  readStorybookPrimaryShade,
} from '@/storybook/settings/themeGlobals';

type ColorScheme = 'light' | 'dark';

const SHELL_BG: Record<ColorScheme, string> = {
  light: '#ffffff',
  dark: '#0b1220',
};

const SHELL_FG: Record<ColorScheme, string> = {
  light: '#0f172a',
  dark: '#f8fafc',
};

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

/** Keep brand palettes + iframe chrome in sync with Storybook toolbar. */
function applyDocumentColorScheme(scheme: ColorScheme) {
  const root = document.documentElement;
  const body = document.body;
  root.setAttribute('data-mantine-color-scheme', scheme);
  root.setAttribute('data-theme', scheme);
  root.style.setProperty('color-scheme', scheme);
  root.style.setProperty('background-color', scheme === 'dark' ? '#0b1220' : '#ffffff');
  body.style.setProperty('background-color', scheme === 'dark' ? '#0b1220' : '#ffffff');
  body.style.setProperty('color', scheme === 'dark' ? '#f8fafc' : '#0f172a');
}

function useDocumentColorScheme(scheme: ColorScheme) {
  // useLayoutEffect: before paint (avoids white flash). Must not mutate DOM during render
  // — react-hooks/immutability rejects documentElement/body writes outside effects.
  useLayoutEffect(() => {
    applyDocumentColorScheme(scheme);
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
      data-storybook-shell=""
      style={{
        colorScheme: scheme,
        boxSizing: 'border-box',
        padding: 'var(--spacing-sm, 0.5rem)',
        background: SHELL_BG[scheme],
        color: SHELL_FG[scheme],
        minHeight: 0,
        height: 'auto',
        width: '100%',
        alignSelf: 'flex-start',
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
  const settingsKey = [
    scheme,
    primaryColor,
    primaryShade,
    context.globals.headerLayout,
    context.globals.headerType,
    context.globals.headerAuth,
    context.globals.headerColorSchemeSlot,
    context.globals.asideLayout,
    context.globals.asideType,
    context.globals.asideMockMenu,
    context.globals.asideWidth,
  ].join('|');

  return (
    <MantineProvider
      key={settingsKey}
      theme={theme}
      classNamesPrefix={classNamesPrefix}
      cssVariablesResolver={mantineCssVariablesResolver}
      defaultColorScheme={scheme satisfies MantineColorScheme}
      forceColorScheme={scheme}
      colorSchemeManager={storybookColorSchemeManager}
    >
      <StorybookThemeShell scheme={scheme} primaryColor={primaryColor} primaryShade={primaryShade}>
        <Story key={settingsKey} />
      </StorybookThemeShell>
    </MantineProvider>
  );
};
