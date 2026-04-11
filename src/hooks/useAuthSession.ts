import { useMemo } from 'react';

import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from '@/store/slices/authSlice';

type UseAuthSessionResult = {
  isAuthenticated: boolean;
};

/**
 * Источник правды — серверная сессия (httpOnly cookie), а в клиенте используем только флаг.
 * Токен в JS/sessionStorage не сохраняем по требованиям безопасности.
 */
export function useAuthSession(): UseAuthSessionResult {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return useMemo(() => ({ isAuthenticated }), [isAuthenticated]);
}
