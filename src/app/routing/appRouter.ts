import type { RouteObject } from 'react-router-dom';

import { createElement } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from '@/app/layouts/AppLayout';
import { BlankLayout } from '@/app/layouts/BlankLayout';
import { DEFAULT_PAGE_LAYOUT_HANDLE } from '@/app/layouts/lib/resolvePageLayout';
import { DefaultPageLayout } from '@/app/layouts/page';
import { GuestRoute } from '@/app/routing/guards/GuestRoute';
import { loadLobbyPage } from '@/app/routing/loaders';

import {
  HomePage,
  InfoPage,
  LoginPage,
  NotFoundPage,
  ProfileActivationPage,
  RegisterPage,
  ServerErrorPage,
} from '@pages';
import { RouterErrorPage } from '@pages/eager';

/**
 * App chrome under `AppLayout`; activation under `BlankLayout` (no lobby shell).
 * Catch-all `*` → InfoPage (API page payload → CMS/lobby/404).
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
          // Leaf loaders re-run on every backend-driven pathname change.
          // A loader on this persistent layout would not revalidate reliably
          // when only its child route changes.
          { path: '/', Component: HomePage, loader: loadLobbyPage },
          { path: '/404', Component: NotFoundPage },
          { path: '/500', Component: ServerErrorPage },
          {
            Component: GuestRoute,
            children: [
              { path: '/signIn', Component: LoginPage, loader: loadLobbyPage },
              { path: '/signUp', Component: RegisterPage, loader: loadLobbyPage },
            ],
          },
          { path: '*', Component: InfoPage, loader: loadLobbyPage },
        ],
      },
    ],
  },
  {
    Component: BlankLayout,
    errorElement: createElement(RouterErrorPage),
    children: [{ path: '/profile/activation', Component: ProfileActivationPage }],
  },
];

export const appRouter = createBrowserRouter(appRouteObjects, {
  /** Vite `base` → trailing slash stripped for React Router. */
  basename: import.meta.env.BASE_URL.replace(/\/$/, '') || undefined,
});
