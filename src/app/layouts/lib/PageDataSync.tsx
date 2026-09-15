import { memo } from 'react';

import { useCurrentPageDataState } from '@api/lobby/queries/useCurrentPageData';
import { useLanguage } from '@hooks/useLanguage';

import { usePathname } from '@/shared/hooks';

/**
 * Keeps lobby getPage (client nav) / entry init wired to the active pathname.
 * Allowlist merge happens inside those requests — not here.
 */
function PageDataSyncComponent() {
  const language = useLanguage();
  const pathname = usePathname();
  useCurrentPageDataState(language, pathname);
  return null;
}

export const PageDataSync = memo(PageDataSyncComponent);
PageDataSync.displayName = 'PageDataSync';
