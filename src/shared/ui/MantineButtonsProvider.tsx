import type { ReactNode } from 'react';

import { MantineProvider } from '@mantine/core';

import { mantineTheme } from '@/shared/config/mantineTheme';

type MantineButtonsProviderProps = {
  children: ReactNode;
};

/**
 * Local Mantine scope for button defaults.
 * Keeps button scope local and avoids global Mantine variable injection.
 */
export function MantineButtonsProvider({ children }: MantineButtonsProviderProps) {
  return (
    <MantineProvider
      theme={mantineTheme}
      withCssVariables={true}
      cssVariablesSelector=".mantine-buttons-theme"
      withGlobalClasses={false}
      defaultColorScheme="dark"
    >
      <div className="mantine-buttons-theme">{children}</div>
    </MantineProvider>
  );
}

MantineButtonsProvider.displayName = 'MantineButtonsProvider';
