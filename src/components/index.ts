import { lazy } from 'react';

export const AppBanner = lazy(() =>
  import('./AppBanner').then((m) => ({ default: m.AppBanner })),
);

export const AppFooter = lazy(() =>
  import('./AppFooter').then((m) => ({ default: m.AppFooter })),
);

/** Не lazy: скелетон внутри варианта завязан на запрос; при lazy чанк не даёт показать его до загрузки JS. */
export { AppHeader } from './AppHeader';

export const AppSidebar = lazy(() =>
  import('./AppSidebar').then((m) => ({ default: m.AppSidebar })),
);
