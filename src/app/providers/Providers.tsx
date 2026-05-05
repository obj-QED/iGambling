import { ReactNode } from 'react';

import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';

import { queryClient } from '@/api/queryClient';
import { mantineTheme } from '@/shared/config/mantineTheme';
import { MantineButtonsProvider } from '@/shared/ui';
import { store } from '@/store';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const isDev = import.meta.env.DEV;

  return (
    <Provider store={store}>
      <MantineProvider
        theme={mantineTheme}
        withCssVariables={false}
        cssVariablesSelector=".mantine-buttons-theme"
        withGlobalClasses={false}
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
