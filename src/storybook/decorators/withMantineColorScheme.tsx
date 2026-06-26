import type { MantineColorScheme, MantineColorSchemeManager } from '@mantine/core';
import type { Decorator } from '@storybook/react-vite';

import { MantineProvider } from '@mantine/core';

import { classNamesPrefix, mantineTheme } from '@/assets/theme/mantine/mantineTheme';

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

  return (
    <MantineProvider
      key={scheme}
      theme={mantineTheme}
      classNamesPrefix={classNamesPrefix}
      defaultColorScheme={scheme satisfies MantineColorScheme}
      forceColorScheme={scheme}
      colorSchemeManager={storybookColorSchemeManager}
    >
      <div
        data-theme={scheme}
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
