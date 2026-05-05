import type { ReactNode } from 'react';

import { memo } from 'react';

import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuthSession } from '@/hooks/useAuthSession';

type ProtectedRouteProps = {
  children?: ReactNode;
};

/**
 * При отсутствии токена (isAuthenticated === false) редирект на /auth.
 * Токен на клиенте не храним; isAuthenticated выставляется из ответа init/сессии.
 */
function ProtectedRouteComponent({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthSession();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children ?? <Outlet />}</>;
}

export const ProtectedRoute = memo(ProtectedRouteComponent);
ProtectedRoute.displayName = 'ProtectedRoute';
