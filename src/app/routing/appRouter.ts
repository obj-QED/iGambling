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
import { RouterErrorPage } from '@pages/eager';

/**
 * All app routes live under `AppLayout` so header/sidebar stay mounted across
 * navigations (including unknown paths → NotFound). A sibling `*` catch-all
 * would unmount chrome and remount icons on every miss.
 */
const appRouteObjects: RouteObject[] = [
  {
    Component: AppLayout,
    errorElement: createElement(RouterErrorPage),
    children: [
      {
        Component: DefaultPageLayout,
        handle: DEFAULT_PAGE_LAYOUT_HANDLE,
        children: [
          { path: '/', Component: HomePage },
          { path: '/404', Component: NotFoundPage },
          { path: '/500', Component: ServerErrorPage },
          {
            Component: GuestRoute,
            children: [
              { path: '/auth', Component: LoginPage },
              { path: '/register', Component: RegisterPage },
            ],
          },
          { path: '*', Component: NotFoundPage },
        ],
      },
      {
        Component: InfoPageLayout,
        handle: INFO_PAGE_LAYOUT_HANDLE,
        children: [{ path: '/profile/activation', Component: ProfileActivationPage }],
      },
    ],
  },
];

export const appRouter = createBrowserRouter(appRouteObjects, {
  /** Vite `base` → trailing slash stripped for React Router. */
  basename: import.meta.env.BASE_URL.replace(/\/$/, '') || undefined,
});
