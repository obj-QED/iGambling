import type { ReactNode } from 'react';

type MantineButtonsProviderProps = {
  children: ReactNode;
};

/**
 * Обёртка с классом `.mantine-buttons-theme`: под неё настроен `cssVariablesSelector` у корневого `MantineProvider` в `Providers`.
 * Отдельный `MantineProvider` здесь не нужен — дублирования темы нет.
 */
export function MantineButtonsProvider({ children }: MantineButtonsProviderProps) {
  return <div className="mantine-buttons-theme">{children}</div>;
}

MantineButtonsProvider.displayName = 'MantineButtonsProvider';
