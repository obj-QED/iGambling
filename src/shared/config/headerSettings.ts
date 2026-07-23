import type { MenuItemDto } from '@/shared/types/menu';

export type HeaderLayoutKey = 'container' | 'container-fluid';

export type HeaderTypeKey = 'default' | 'custom';

export const HEADER_LAYOUT_KEYS = [
  'container',
  'container-fluid',
] as const satisfies readonly HeaderLayoutKey[];

export const HEADER_TYPE_KEYS = ['default', 'custom'] as const satisfies readonly HeaderTypeKey[];

export type HeaderCustomBlockPlacement =
  | 'prepend'
  | 'append'
  /** @deprecated Prefer `{ section: 'block3', at: 'end' }` */
  | { sectionKey: string; position: 'start' | 'end' }
  /** Items into an existing API section row (block3, block1, …) — no new section. */
  | { section: string; at: 'start' | 'end' | number }
  /** New custom section at the very start/end of the header. */
  | { header: 'start' | 'end' }
  /** New custom section before/after an API section. */
  | { beforeSection: string }
  | { afterSection: string };

/** Raw custom block item from `window.__SETTINGS__` — parsed in `resolveHeaderConfig`. */
export type HeaderCustomBlockInput = {
  url?: unknown;
  name?: unknown;
  key?: unknown;
  img?: unknown;
  type?: unknown;
  items?: unknown;
};

export type HeaderCustomBlockConfig = {
  key: string;
  placement: HeaderCustomBlockPlacement;
  items: MenuItemDto[];
};

/** Raw custom block from `window.__SETTINGS__`. */
export type HeaderCustomBlockSettings = {
  key?: unknown;
  placement: HeaderCustomBlockPlacement;
  items: HeaderCustomBlockInput[];
};

export type HeaderBlockVariantSettings = {
  search?: 'input' | 'icon' | 'modal';
  wallet?: 'compact' | 'full' | 'drawer';
  notification?: 'icon';
  logo?: 'default';
  bonus_box?: 'default';
};

export type HeaderMockAuthKey = 'authenticated' | 'guest';

export const HEADER_MOCK_AUTH_KEYS = [
  'authenticated',
  'guest',
] as const satisfies readonly HeaderMockAuthKey[];

export type HeaderSettings = {
  layout?: HeaderLayoutKey;
  type?: HeaderTypeKey;
  /** Use `widgets/header/mocks` instead of init API menu. */
  mockMenu?: boolean;
  /** Mock menu variant when `mockMenu` is true. App runtime prefers Redux auth when passed to `getHeaderMenuMock`. */
  mockAuth?: HeaderMockAuthKey;
  /** @deprecated Prefer `customBlocks` */
  customBlock?: HeaderCustomBlockSettings;
  customBlocks?: HeaderCustomBlockSettings[];
  blockVariants?: HeaderBlockVariantSettings;
};
