import type {
  HeaderCustomBlockInput,
  HeaderCustomBlockPlacement,
  HeaderCustomBlockSettings,
} from './headerSettings';

export type AsideTypeKey = 'default';

export const ASIDE_TYPE_KEYS = ['default'] as const satisfies readonly AsideTypeKey[];

export const ASIDE_SCROLL_AREA_TYPES = ['auto', 'always', 'scroll', 'hover', 'never'] as const;

export type AsideScrollAreaType = (typeof ASIDE_SCROLL_AREA_TYPES)[number];

export const ASIDE_SCROLL_AREA_OVERSCROLL = ['auto', 'contain', 'none'] as const;

export type AsideScrollAreaOverscrollBehavior = (typeof ASIDE_SCROLL_AREA_OVERSCROLL)[number];

export type AsideScrollAreaSettings = {
  /** Mantine ScrollArea thumb track width (px). From `settings.aside.scrollArea.scrollbarSize`. */
  scrollbarSize?: number;
  /** Hide delay (ms) for `hover` / `scroll` types. */
  scrollHideDelay?: number;
  type?: AsideScrollAreaType;
  overscrollBehavior?: AsideScrollAreaOverscrollBehavior;
};

export type AsideSettings = {
  /** Sidebar width on desktop (px). Mobile uses 100% via CSS. */
  width?: number;
  type?: AsideTypeKey;
  /** `true` → sidebar menu from `src/widgets/sidebar/mocks` */
  mockMenu?: boolean;
  /** Menu keys open on first visit; user toggles persist in localStorage. */
  openedDropdowns?: readonly string[];
  customBlocks?: HeaderCustomBlockSettings[];
  scrollArea?: AsideScrollAreaSettings;
};

export type { HeaderCustomBlockInput, HeaderCustomBlockPlacement, HeaderCustomBlockSettings };
