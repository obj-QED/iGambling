import type { ReactNode } from 'react';

/** Единый объект классов из `AppHeaderBase.module.scss` — импортируется только в `AppHeader` и прокидывается вниз. */
export type AppHeaderBaseStyles = typeof import('../styles/base/AppHeaderBase.module.scss').default;

export type AppHeaderLayout = 'container' | 'container-fluid';
export type AppHeaderVariant = 'default' | 'classic';

export type AppHeaderLayoutProps = {
  children: ReactNode;
};

export type AppHeaderParams = {
  layout: AppHeaderLayout;
  variant: AppHeaderVariant;
};

export type AppHeaderMenuItem = {
  url: string;
  name: string;
  key: string;
  img: string;
  items?: AppHeaderMenuItem[];
};

export type AppHeaderData = {
  buttonSearch: string;
  type: string;
  menu: AppHeaderMenuItem[];
} | undefined;

export type AppHeaderViewProps = {
  params: AppHeaderParams;
  data: AppHeaderData;
  /** Скелетон: true пока нет `data` (menuHeaderTop) и запрос в pending/fetching (см. useAppHeaderState). */
  loading: boolean;
  /** Ошибка запроса страницы/init; при ошибке скелетон не показываем. */
  error: unknown | null;
  isAuthenticated: boolean;
};
