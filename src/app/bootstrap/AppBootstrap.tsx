import { Suspense } from 'react';

import { LazyRoutes } from '@/app/routing/routes';

import { useInitData } from '@api/lobby';
import { useLanguage } from '@hooks/useLanguage';

import { ServerErrorPage } from '@/pages/ServerError/ServerErrorPage';

import { GlobalPreloader } from './GlobalPreloader';

function AppBootstrapComponent() {
  const language = useLanguage();
  const { bootstrapRouteState } = useInitData(language);

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
