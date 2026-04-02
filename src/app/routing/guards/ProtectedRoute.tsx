import type { ReactNode } from 'react';

import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { selectIsAuthenticated } from '@/store/slices/authSlice';

type ProtectedRouteProps = {
  children?: ReactNode;
};

/**
 * При отсутствии токена (isAuthenticated === false) редирект на /auth.
 * Токен на клиенте не храним; isAuthenticated выставляется из ответа init/сессии.
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children ?? <Outlet />}</>;
}

ProtectedRoute.displayName = 'ProtectedRoute';
