import type { RouteObject } from 'react-router-dom';

import { createElement } from 'react';

import { createBrowserRouter } from 'react-router-dom';

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

/**
 * All app routes live under `AppLayout` so header/sidebar stay mounted across
 * navigations (including unknown paths → NotFound). A sibling `*` catch-all
 * would unmount chrome and remount icons on every miss.
 */
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
          { path: '*', element: createElement(NotFoundPage) },
        ],
      },
      {
        element: createElement(InfoPageLayout),
        handle: INFO_PAGE_LAYOUT_HANDLE,
        children: [{ path: '/profile/activation', element: createElement(ProfileActivationPage) }],
      },
    ],
  },
];

export const appRouter = createBrowserRouter(appRouteObjects);
