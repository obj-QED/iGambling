import { memo } from 'react';

import { Outlet } from 'react-router-dom';

/** Route shell only — page `Container` lives in `AppLayout.content`. */
function InfoPageLayoutComponent() {
  return <Outlet />;
}

export const InfoPageLayout = memo(InfoPageLayoutComponent);
InfoPageLayout.displayName = 'InfoPageLayout';
