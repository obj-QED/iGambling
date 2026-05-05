import { ReactNode } from 'react';

import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';

import { queryClient } from '@/api/queryClient';
import { mantineColorSchemeManager, mantineTheme } from '@/shared/config';
import { MantineButtonsProvider } from '@/shared/ui';
import { store } from '@/store';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const isDev = import.meta.env.DEV;

  return (
    <Provider store={store}>
      {/* Palette: static `default-css-variables.css` on `:root`; avoid `withCssVariables` on `.mantine-buttons-theme` or Button variants lose resolved colors. */}
      <MantineProvider
        theme={mantineTheme}
        withCssVariables={false}
        cssVariablesSelector=".mantine-buttons-theme"
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
