import type { RouteObject } from 'react-router-dom';

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
    Component: AppLayout,
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

export const appRouter = createBrowserRouter(appRouteObjects);
