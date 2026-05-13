import { LazyRoutes } from '@/app/routing/routes';

import { useInitData } from '@api/lobby';
import { useLanguage } from '@hooks/useLanguage';

function AppRoutesInner() {
  const language = useLanguage();

  useInitData(language);

  return <LazyRoutes />;
}

AppRoutesInner.displayName = 'AppRoutesInner';

export function AppRoutes() {
  return <AppRoutesInner />;
}

AppRoutes.displayName = 'AppRoutes';
