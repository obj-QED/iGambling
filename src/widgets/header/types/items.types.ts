import {
  HEADER_SPECIAL_BLOCK_KEYS,
  type HeaderSpecialBlockKey,
} from '@/shared/config/headerSpecialBlockKeys';

export { HEADER_SPECIAL_BLOCK_KEYS, type HeaderSpecialBlockKey };

export type HeaderMenuItemType = 'button' | 'link';

export type HeaderMenuItem = {
  key?: string;
  url?: string;
  name?: string;
  /** Optional a11y / tooltip copy; wins over `name` where consumers resolve it. Tooltip may be HTML. */
  label?: string;
  /** Sidebar logo — render menu/burger trigger beside the mark. */
  menuIcon?: boolean;
  img?: string;
  imgShape?: string;
  imgRadius?: string;
  type?: string;
  /**
   * Mantine/CMF control variant override (`light`, `outline`, …).
   * When omitted, consumers default to `transparent` (or type-based rules where applicable).
   */
  variant?: string;
  badge?: string | number;
  subtitle?: string;
  /** Explicit active from API/schema — overrides URL matching. */
  active?: boolean;
  /** When `false`, skip route active matching. Default: `true`. */
  matchRoute?: boolean;
  /** Internal route match mode. Default: `exact`. */
  activeMatch?: 'exact' | 'prefix';
  items?: HeaderMenuItem[];
};

export type HeaderSection = {
  key: string;
  items: HeaderMenuItem[];
};

export type HeaderMenuModel = {
  sections: HeaderSection[];
};

export const HEADER_CONFIG_ONLY_BLOCK_KEYS = ['color_scheme', 'menu_toggle'] as const;

export type HeaderConfigOnlyBlockKey = (typeof HEADER_CONFIG_ONLY_BLOCK_KEYS)[number];

/**
 * Adapter variants from settings. Keys/values are open — new special blocks and
 * unregistered strings pass through; `useAdapter` falls back per block registry.
 */
export type HeaderBlockVariants = Partial<Record<string, string>>;
