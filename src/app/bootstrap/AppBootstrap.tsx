import { Suspense } from 'react';

import { LazyRoutes } from '@/app/routing/routes';

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
    return <ServerErrorPage />;
  }

  return (
    <Suspense fallback={<GlobalPreloader />}>
      <LazyRoutes />
    </Suspense>
  );
}

AppBootstrapComponent.displayName = 'AppBootstrap';

export const AppBootstrap = AppBootstrapComponent;
