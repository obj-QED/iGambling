import { useMemo } from 'react';

import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from '@store/slices/authSlice';

type UseAuthSessionResult = {
  isAuthenticated: boolean;
};

/**
 * Source of truth is server session (httpOnly cookie); client keeps only a boolean flag.
 * Lobby `getPage` token (from initV2 or optional `__SETTINGS__.lobbyToken`) is kept in-memory
 * via `@api/lobby` session helpers — not in Redux or localStorage.
 */
export function useAuthSession(): UseAuthSessionResult {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return useMemo(() => ({ isAuthenticated }), [isAuthenticated]);
}
