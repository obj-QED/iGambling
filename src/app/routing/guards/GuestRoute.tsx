import type { ReactNode } from 'react';

import { memo } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAuthSession } from '@hooks/useAuthSession';

type GuestRouteProps = {
  children?: ReactNode;
};

function GuestRouteComponent({ children }: GuestRouteProps) {
  const { isAuthenticated } = useAuthSession();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children ?? <Outlet />}</>;
}

export const GuestRoute = memo(GuestRouteComponent);
GuestRoute.displayName = 'GuestRoute';
