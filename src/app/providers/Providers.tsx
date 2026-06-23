import { type ReactNode } from 'react';

import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';

import { queryClient } from '@api/queryClient';
import { store } from '@store';

import { classNamesPrefix, defaultColorScheme, mantineTheme } from '@/assets/theme';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const isDev = import.meta.env.DEV;

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={mantineTheme} defaultColorScheme={defaultColorScheme} classNamesPrefix={classNamesPrefix}>
          {children}
        </MantineProvider>
        {isDev && <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />}
      </QueryClientProvider>
    </Provider>
  );
}

Providers.displayName = 'Providers';
