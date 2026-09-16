import { memo } from 'react';

import { useGetPage } from '@api/lobby/queries/useGetPage';

/**
 * Entry: init page payload. After SPA navigation: getPage for active pathname.
 */
function PageDataSyncComponent() {
  useGetPage();
  return null;
}

export const PageDataSync = memo(PageDataSyncComponent);
PageDataSync.displayName = 'PageDataSync';
