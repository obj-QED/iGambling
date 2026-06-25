import type { RouteObject } from 'react-router-dom';

import { memo } from 'react';

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { AppLayout } from '@/app/layouts/AppLayout';
import {
  DEFAULT_PAGE_LAYOUT_HANDLE,
  INFO_PAGE_LAYOUT_HANDLE,
} from '@/app/layouts/lib/resolvePageLayout';
import { DefaultPageLayout, InfoPageLayout } from '@/app/layouts/page';
import { GuestRoute } from '@/app/routing/guards/GuestRoute';

import {
  HomePage,
  LoginPage,
  NotFoundPage,
  ProfileActivationPage,
  RegisterPage,
  ServerErrorPage,
} from '@pages';

const ROUTER_FUTURE = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
} as const;

const appRouteObjects: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      {
        element: <DefaultPageLayout />,
        handle: DEFAULT_PAGE_LAYOUT_HANDLE,
        children: [
          { path: '/', element: <HomePage /> },
          { path: '/404', element: <NotFoundPage /> },
          { path: '/500', element: <ServerErrorPage /> },
          {
            element: <GuestRoute />,
            children: [
              { path: '/auth', element: <LoginPage /> },
              { path: '/register', element: <RegisterPage /> },
            ],
          },
        ],
      },
      {
        element: <InfoPageLayout />,
        handle: INFO_PAGE_LAYOUT_HANDLE,
        children: [{ path: '/profile/activation', element: <ProfileActivationPage /> }],
      },
    ],
  },
  { path: '*', element: <Navigate to="/404" replace /> },
];

export const appRouter = createBrowserRouter(appRouteObjects, {
  future: ROUTER_FUTURE,
});

function AppRoutesComponent() {
  return <RouterProvider router={appRouter} future={ROUTER_FUTURE} />;
}

export const AppRoutes = memo(AppRoutesComponent);
AppRoutes.displayName = 'AppRoutes';

/** @deprecated Use `AppRoutes`. */
export const LazyRoutes = AppRoutes;
