import { memo } from 'react';

import { RouterProvider } from 'react-router-dom';

import { appRouter, ROUTER_FUTURE } from '@/app/routing/appRouter';

function AppRoutesComponent() {
  return <RouterProvider router={appRouter} future={ROUTER_FUTURE} />;
}

export const AppRoutes = memo(AppRoutesComponent);
AppRoutes.displayName = 'AppRoutes';

/** @deprecated Use `AppRoutes`. */
export const LazyRoutes = AppRoutes;
