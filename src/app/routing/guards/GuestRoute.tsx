import type { ReactNode } from 'react';

import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { selectIsAuthenticated } from '@/store/slices/authSlice';

type GuestRouteProps = {
  children?: ReactNode;
};

/** Для неавторизованных: если уже авторизован, не пускаем на /auth. */
export function GuestRoute({ children }: GuestRouteProps) {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children ?? <Outlet />}</>;
}

GuestRoute.displayName = 'GuestRoute';
