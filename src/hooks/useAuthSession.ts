import { useEffect, useMemo, useState } from 'react';

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
  const isAuthenticatedFromStore = useSelector(selectIsAuthenticated);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isAuthenticatedFromStore);

  useEffect(() => {
    setIsAuthenticated(isAuthenticatedFromStore);
  }, [isAuthenticatedFromStore]);

  const result = useMemo(
    () => ({
      isAuthenticated,
    }),
    [isAuthenticated],
  );

  return result;
}
