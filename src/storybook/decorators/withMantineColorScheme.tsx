import type { Decorator } from '@storybook/react-vite';

import { MantineProvider } from '@mantine/core';

import { classNamesPrefix, mantineTheme } from '@/assets/theme/mantine/mantineTheme';

type ColorScheme = 'light' | 'dark';

function readColorScheme(globals: Record<string, unknown>): ColorScheme {
  return globals.colorScheme === 'light' ? 'light' : 'dark';
}

export const withMantineColorScheme: Decorator = (Story, context) => {
  const scheme = readColorScheme(context.globals);

  return (
    <MantineProvider
      theme={mantineTheme}
      classNamesPrefix={classNamesPrefix}
      forceColorScheme={scheme}
    >
      <Story />
    </MantineProvider>
  );
};
