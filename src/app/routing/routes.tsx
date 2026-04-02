import type { ReactNode } from 'react';

import { Suspense } from 'react';

import { Navigate,Route, Routes } from 'react-router-dom';

import { BlankLayout } from '@/app/layouts/BlankLayout';
import { MainLayout } from '@/app/layouts/MainLayout';
import { GuestRoute } from '@/app/routing/guards/GuestRoute';
import { ProtectedRoute } from '@/app/routing/guards/ProtectedRoute';

import {
  HomePage,
  LoginPage,
  NotFoundPage,
  NotificationPage,
  ProfileActivationPage,
  ProfilePage,
  ServerErrorPage,
} from '@/pages';

import { PageLoader } from '@/elements/PageLoader';

type AppRoute = {
  path: string;
  element: ReactNode;
};

/**
 * Публичные страницы с sidebar (MainLayout).
 * Доступны без токена: главная, игры, акции и т.д.
 */
const PUBLIC_ROUTES: AppRoute[] = [
  { path: '/', element: <HomePage /> },
];

/**
 * Защищённые страницы с sidebar (MainLayout).
 * Требуют токена — без него редирект на /auth.
 */
const PROTECTED_ROUTES: AppRoute[] = [
  { path: '/profile', element: <ProfilePage /> },
  { path: '/notification', element: <NotificationPage /> },
];

/**
 * Страницы без sidebar (BlankLayout).
 * /auth — только для неавторизованных (GuestRoute).
 * Системные (/404, /500, /profile/activation) — без ограничений.
 */
const GUEST_ONLY_ROUTES: AppRoute[] = [
  { path: '/auth', element: <LoginPage /> },
];

const SYSTEM_ROUTES: AppRoute[] = [
  { path: '/profile/activation', element: <ProfileActivationPage /> },
  { path: '/404', element: <NotFoundPage /> },
  { path: '/500', element: <ServerErrorPage /> },
];

export function LazyRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* MainLayout: с sidebar */}
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

        {/* BlankLayout: без sidebar */}
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

        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
}

LazyRoutes.displayName = 'LazyRoutes';
