import { memo } from 'react';

import { Outlet } from 'react-router-dom';

/** Route shell only — page `Container` lives in `AppLayout.content`. */
function DefaultPageLayoutComponent() {
  return <Outlet />;
}

export const DefaultPageLayout = memo(DefaultPageLayoutComponent);
DefaultPageLayout.displayName = 'DefaultPageLayout';
