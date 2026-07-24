import type { RouteObject } from 'react-router-dom';

import { createElement } from 'react';

import { createBrowserRouter, Navigate } from 'react-router-dom';

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

export const ROUTER_FUTURE = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
} as const;

const appRouteObjects: RouteObject[] = [
  {
    element: createElement(AppLayout),
    children: [
      {
        element: createElement(DefaultPageLayout),
        handle: DEFAULT_PAGE_LAYOUT_HANDLE,
        children: [
          { path: '/', element: createElement(HomePage) },
          { path: '/404', element: createElement(NotFoundPage) },
          { path: '/500', element: createElement(ServerErrorPage) },
          {
            element: createElement(GuestRoute),
            children: [
              { path: '/auth', element: createElement(LoginPage) },
              { path: '/register', element: createElement(RegisterPage) },
            ],
          },
        ],
      },
      {
        element: createElement(InfoPageLayout),
        handle: INFO_PAGE_LAYOUT_HANDLE,
        children: [{ path: '/profile/activation', element: createElement(ProfileActivationPage) }],
      },
    ],
  },
  { path: '*', element: createElement(Navigate, { to: '/404', replace: true }) },
];

export const appRouter = createBrowserRouter(appRouteObjects, {
  future: ROUTER_FUTURE,
});
