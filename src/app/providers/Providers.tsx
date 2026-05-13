import { ReactNode } from 'react';

import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';

import { MantineButtonsProvider } from '@ui';

import { queryClient } from '@api/queryClient';
import { mantineColorSchemeManager, mantineTheme } from '@shared/config';
import { store } from '@store';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const isDev = import.meta.env.DEV;

  return (
    <Provider store={store}>
      {/* Theme-driven palette on `html` (supports `virtualColor`); keep Button CSS scoped via `.mantine-buttons-theme` hooks below. */}
      <MantineProvider
        theme={mantineTheme}
        withCssVariables
        cssVariablesSelector="html"
        withGlobalClasses={false}
        colorSchemeManager={mantineColorSchemeManager}
        defaultColorScheme="dark"
      >
        <QueryClientProvider client={queryClient}>
          <MantineButtonsProvider>
            {children}
          </MantineButtonsProvider>
          {isDev && <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />}
        </QueryClientProvider>
      </MantineProvider>
    </Provider>
  );
}

Providers.displayName = 'Providers';
