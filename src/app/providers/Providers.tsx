import type { ProvidersProps } from '@/app/types';

import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';

import { queryClient } from '@api/queryClient';
import { store } from '@store';

import { classNamesPrefix, defaultColorScheme, mantineTheme } from '@/assets/theme';

import { DeviceBodySync } from './DeviceBodySync';
import { ScrollFullscreenSync } from './ScrollFullscreenSync';

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          theme={mantineTheme}
          defaultColorScheme={defaultColorScheme}
          classNamesPrefix={classNamesPrefix}
          deduplicateInlineStyles
        >
          <DeviceBodySync />
          <ScrollFullscreenSync />
          {children}
        </MantineProvider>
        {import.meta.env.DEV ? (
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
        ) : null}
      </QueryClientProvider>
    </Provider>
  );
}

Providers.displayName = 'Providers';
