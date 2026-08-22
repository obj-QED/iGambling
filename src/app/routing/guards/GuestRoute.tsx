import type { GuestRouteProps } from '@/app/types';

import { memo } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAuthSession } from '@hooks/auth';

function GuestRouteComponent({ children }: GuestRouteProps) {
  const { isAuthenticated } = useAuthSession();

  if (isAuthenticated) {
    return <Navigate to="/profile/activation" replace />;
  }

  return <>{children ?? <Outlet />}</>;
}

export const GuestRoute = memo(GuestRouteComponent);
GuestRoute.displayName = 'GuestRoute';
