import type { ReactNode } from 'react';

import { memo, Suspense } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { BlankLayout } from '@/app/layouts/BlankLayout';
import { MainLayout } from '@/app/layouts/MainLayout';
import { GuestRoute } from '@/app/routing/guards/GuestRoute';
import { ProtectedRoute } from '@/app/routing/guards/ProtectedRoute';

import { PageLoader } from '@elements/PageLoader';
import {
  HomePage,
  LoginPage,
  NotFoundPage,
  NotificationPage,
  ProfileActivationPage,
  ProfilePage,
  RegisterPage,
  ServerErrorPage,
} from '@pages';

type AppRoute = {
  path: string;
  element: ReactNode;
};

const PUBLIC_ROUTES: AppRoute[] = [
  { path: '/', element: <HomePage /> },
];

const PROTECTED_ROUTES: AppRoute[] = [
  { path: '/profile', element: <ProfilePage /> },
  { path: '/notification', element: <NotificationPage /> },
];

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
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          {PUBLIC_ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          <Route element={<ProtectedRoute />}>
            {PROTECTED_ROUTES.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>

        <Route element={<BlankLayout />}>
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
    </Suspense>
  );
}

export const LazyRoutes = memo(LazyRoutesComponent);
LazyRoutes.displayName = 'LazyRoutes';
