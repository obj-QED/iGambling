import { Suspense } from 'react';

import { AppRoutes } from '@/app/routing/routes';

import { ServerErrorPage } from '@pages/eager';

import { useLanguage } from '@hooks/useLanguage';

import { GlobalPreloader } from './GlobalPreloader';
import { useAppBootstrap } from './useAppBootstrap';

function AppBootstrapComponent() {
  const language = useLanguage();
  const { bootstrapRouteState } = useAppBootstrap(language);

  if (bootstrapRouteState.status === 'pending') {
    return <GlobalPreloader />;
  }

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
    <Suspense fallback={<GlobalPreloader />}>
      <AppRoutes />
    </Suspense>
  );
}

AppBootstrapComponent.displayName = 'AppBootstrap';

export const AppBootstrap = AppBootstrapComponent;
