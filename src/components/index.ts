import { lazy } from 'react';

export const AppBanner = lazy(() => import('./AppBanner').then((m) => ({ default: m.AppBanner })));

export const AppFooter = lazy(() => import('./AppFooter').then((m) => ({ default: m.AppFooter })));

/** Not lazy: skeleton inside variant depends on request state; lazy chunk would delay it until JS loads. */
export { AppHeader } from './AppHeader';

export const AppSidebar = lazy(() =>
  import('./AppSidebar').then((m) => ({ default: m.AppSidebar })),
);
