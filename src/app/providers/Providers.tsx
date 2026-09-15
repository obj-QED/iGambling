import type { ProvidersProps } from '@/app/types';
import type { ComponentType, LazyExoticComponent } from 'react';

import { lazy, Suspense } from 'react';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
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
import { getModalDefaultProps } from '@/shared/config';

import { appModals } from './appModals';
import { DeviceBodySync } from './DeviceBodySync';
import { ScrollFullscreenSync } from './ScrollFullscreenSync';

function createQueryDevtoolsPanel(): LazyExoticComponent<ComponentType> | null {
  if (!import.meta.env.DEV) {
    return null;
  }
  // Vite only exposes `VITE_*`. Default: on in DEV; set `VITE_TANSTACK_ENABLED=false` to hide.
  if (import.meta.env.VITE_TANSTACK_ENABLED === 'false') {
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

/**
 * Modals host is a **sibling** of the app tree — not a parent.
 * `@mantine/modals` ModalsProvider re-renders on open; wrapping `{children}`
 * would reconcile the whole SPA. Events API (`modals.open*`) still works.
 */
function AppModalsHost() {
  return (
    <ModalsProvider modals={appModals} modalProps={getModalDefaultProps()}>
      {null}
    </ModalsProvider>
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
          <AppModalsHost />
        </MantineProvider>
        <QueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}

Providers.displayName = 'Providers';
