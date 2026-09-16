import { Suspense, useEffect } from 'react';

import { appRouter } from '@/app/routing/appRouter';
import { AppRoutes } from '@/app/routing/routes';
import { setLobbyNavigationReady } from '@/app/routing/state/lobbyNavigationGate';

import { ServerErrorPage } from '@pages/eager';

import { AdapterPendingProvider } from '@/shared/lib';
import { getInitialPath, resolveLobbyInitPage } from '@/shared/lib/routing';

import { BootGate } from './BootGate';
import { InitDataProvider } from './InitDataContext';
import { useAppBootstrap } from './useAppBootstrap';

function AppBootstrapComponent() {
  const { bootstrapRouteState, init, translation, initKey, translationKey, language } =
    useAppBootstrap();
  const bootstrapPending = bootstrapRouteState.status === 'pending';

  useEffect(() => {
    if (bootstrapRouteState.status !== 'ready') return;
    setLobbyNavigationReady();
    // Auth/error shells bootstrap init on `/` — re-run the leaf loader so `getPage`
    // fills the real pathname once navigation is allowed.
    const entryPath = getInitialPath();
    if (resolveLobbyInitPage(entryPath) !== entryPath) {
      void appRouter.revalidate();
    }
  }, [bootstrapRouteState.status]);

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
