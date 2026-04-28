import { useMemo } from 'react';

import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from '@/store/slices/authSlice';

type UseAuthSessionResult = {
  isAuthenticated: boolean;
};

/**
 * Source of truth is server session (httpOnly cookie); client keeps only a boolean flag.
 * Token is never stored in JS/sessionStorage per security requirements.
 */
export function useAuthSession(): UseAuthSessionResult {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return useMemo(() => ({ isAuthenticated }), [isAuthenticated]);
}
