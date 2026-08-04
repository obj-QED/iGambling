import { memo } from 'react';

import { RouterProvider } from 'react-router-dom';

import { appRouter } from '@/app/routing/appRouter';

function AppRoutesComponent() {
  return <RouterProvider router={appRouter} />;
}

export const AppRoutes = memo(AppRoutesComponent);
AppRoutes.displayName = 'AppRoutes';

/** @deprecated Use `AppRoutes`. */
export const LazyRoutes = AppRoutes;
