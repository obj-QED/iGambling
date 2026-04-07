import type { ReactNode } from 'react';
import type { ComponentType } from 'react';

/** Элемент из `window.__SETTINGS__.header.providers`. */
export type HeaderProviderItem = {
  name: string;
  icon: string;
  url: string;
};

/** Единый объект классов из `AppHeaderBase.module.scss` — импортируется только в `AppHeader` и прокидывается вниз. */
export type AppHeaderBaseStyles = typeof import('../styles/base/AppHeaderBase.module.scss').default;

export type AppHeaderLayout = 'container' | 'container-fluid';
export type AppHeaderVariant = 'default' | 'classic';

/** Сколько слотов шапки задействовано (для `data-sections` и скелетона). */
export type AppHeaderSlotCount = 1 | 2 | 3;

export type AppHeaderRenderContext = {
  isAuthenticated: boolean;
  loading: boolean;
};

export type AppHeaderSectionSlot = ReactNode | ((context: AppHeaderRenderContext) => ReactNode);

export type AppHeaderProps = {
  layout?: AppHeaderLayout;
  variant?: AppHeaderVariant;
  /** Переопределение слотов слева направо (до 3). Пусто — дефолтные Guest / заголовок / Login. */
  sections?: AppHeaderSectionSlot[];
};

export type AppHeaderLayoutProps = {
  children: ReactNode;
};

export type AppHeaderResolvedSlotProps = {
  baseStyles: AppHeaderBaseStyles;
  loading: boolean;
  isAuthenticated: boolean;
  title: string;
  logoUrl: string | undefined;
  providers: HeaderProviderItem[];
  /** Если true — колонки из `leftSlot` / `centerSlot` / `rightSlot`; иначе дефолтная сборка блоков default-варианта. */
  hasSectionOverrides: boolean;
  slotCount: AppHeaderSlotCount;
  leftSlot: ReactNode;
  centerSlot: ReactNode | null;
  rightSlot: ReactNode | null;
  SkeletonComponent: ComponentType<{ sectionCount: number }>;
};
