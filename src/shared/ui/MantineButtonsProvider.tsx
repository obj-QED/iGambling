import type { ReactNode } from 'react';

type MantineButtonsProviderProps = {
  children: ReactNode;
};

/**
 * Wrapper with `.mantine-buttons-theme`; root `MantineProvider` in `Providers` targets this via `cssVariablesSelector`.
 * No nested `MantineProvider` — theme is not duplicated.
 */
export function MantineButtonsProvider({ children }: MantineButtonsProviderProps) {
  return <div className="mantine-buttons-theme">{children}</div>;
}

MantineButtonsProvider.displayName = 'MantineButtonsProvider';
