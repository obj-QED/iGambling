import type { ProvidersProps } from '@/app/types';
import type { ComponentType, LazyExoticComponent } from 'react';

import { lazy, Suspense } from 'react';

import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';

import { queryClient } from '@api/queryClient';
import { store } from '@store';

import {
  classNamesPrefix,
  defaultColorScheme,
  mantineCssVariablesResolver,
  mantineTheme,
} from '@/assets/theme';

import { DeviceBodySync } from './DeviceBodySync';
import { ScrollFullscreenSync } from './ScrollFullscreenSync';

function createQueryDevtoolsPanel(): LazyExoticComponent<ComponentType> | null {
  if (!import.meta.env.DEV) {
    return null;
  }
  return lazy(() => import('./reactQueryDevtools.tsx'));
}

const QueryDevtoolsPanel = createQueryDevtoolsPanel();

function QueryDevtools() {
  if (QueryDevtoolsPanel === null) {
    return null;
  }

  const Panel = QueryDevtoolsPanel;
  return (
    <Suspense fallback={null}>
      <Panel />
    </Suspense>
  );
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          theme={mantineTheme}
          defaultColorScheme={defaultColorScheme}
          classNamesPrefix={classNamesPrefix}
          cssVariablesResolver={mantineCssVariablesResolver}
          deduplicateInlineStyles
        >
          <DeviceBodySync />
          <ScrollFullscreenSync />
          {children}
        </MantineProvider>
        <QueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}

Providers.displayName = 'Providers';
