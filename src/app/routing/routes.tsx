import type { ReactNode } from 'react';

import { memo } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { BlankLayout } from '@/app/layouts/BlankLayout';
import { GuestRoute } from '@/app/routing/guards/GuestRoute';

import {
  HomePage,
  LoginPage,
  NotFoundPage,
  ProfileActivationPage,
  RegisterPage,
  ServerErrorPage,
} from '@pages';

type AppRoute = {
  path: string;
  element: ReactNode;
};

const PUBLIC_ROUTES: AppRoute[] = [{ path: '/', element: <HomePage /> }];

const GUEST_ONLY_ROUTES: AppRoute[] = [
  { path: '/auth', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
];

const SYSTEM_ROUTES: AppRoute[] = [
  { path: '/profile/activation', element: <ProfileActivationPage /> },
  { path: '/404', element: <NotFoundPage /> },
  { path: '/500', element: <ServerErrorPage /> },
];

const CATCH_ALL = <Navigate to="/404" replace />;

function LazyRoutesComponent() {
  return (
    <Routes>
      <Route element={<BlankLayout />}>
        {PUBLIC_ROUTES.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        <Route element={<GuestRoute />}>
          {GUEST_ONLY_ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        {SYSTEM_ROUTES.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      <Route path="*" element={CATCH_ALL} />
    </Routes>
  );
}

export const LazyRoutes = memo(LazyRoutesComponent);
LazyRoutes.displayName = 'LazyRoutes';
