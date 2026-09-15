import { Suspense } from 'react';

import { AppRoutes } from '@/app/routing/routes';

import { ServerErrorPage } from '@pages/eager';

import { AdapterPendingProvider } from '@/shared/lib';

import { BootGate } from './BootGate';
import { InitDataProvider } from './InitDataContext';
import { useAppBootstrap } from './useAppBootstrap';

function AppBootstrapComponent() {
  const { bootstrapRouteState, init, translation, initKey, translationKey, language } =
    useAppBootstrap();

  if (bootstrapRouteState.status === 'error') {
    return (
      <ServerErrorPage
        detail={
          import.meta.env.DEV && bootstrapRouteState.error instanceof Error
            ? bootstrapRouteState.error.message
            : undefined
        }
      />
    );
  }

  const bootstrapPending = bootstrapRouteState.status === 'pending';

  return (
    <InitDataProvider value={{ language, init, translation, initKey, translationKey }}>
      <AdapterPendingProvider>
        <BootGate bootstrapPending={bootstrapPending}>
          <Suspense fallback={null}>
            <AppRoutes />
          </Suspense>
        </BootGate>
      </AdapterPendingProvider>
    </InitDataProvider>
  );
}

AppBootstrapComponent.displayName = 'AppBootstrap';

export const AppBootstrap = AppBootstrapComponent;
