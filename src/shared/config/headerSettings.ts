import type { TooltipSettings } from './tooltipSettings';
import type { BehaviorFlags, SchemaVersion, WrapperMode } from '@/shared/schema';
import type { MenuItemDto } from '@/shared/types/menu';

import { HEADER_SPECIAL_BLOCK_KEYS } from './headerSpecialBlockKeys';

/** Open string from settings; empty → `container`. Known shells: `HEADER_LAYOUT_KEYS`. */
export type HeaderLayoutKey = string;

/** Open string from settings; empty → `dropdown`. Known strategies: `HEADER_TYPE_KEYS`. */
export type HeaderTypeKey = string;

export const HEADER_LAYOUT_KEYS = ['container', 'container-fluid'] as const;

export const HEADER_TYPE_KEYS = ['default', 'custom', 'dropdown'] as const;

export type HeaderLayoutStrategyKey = (typeof HEADER_LAYOUT_KEYS)[number];
export type HeaderTypeStrategyKey = (typeof HEADER_TYPE_KEYS)[number];

/**
 * Stay outside the deep menu when `type: 'dropdown'` (bar on mobile / never in DeepMenu).
 * All header special blocks — including `color_scheme`, `bonus_box`.
 */
export const HEADER_DROPDOWN_OUTSIDE_KEYS = HEADER_SPECIAL_BLOCK_KEYS;

export type HeaderDropdownOutsideKey = (typeof HEADER_DROPDOWN_OUTSIDE_KEYS)[number];

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
  variant?: unknown;
  label?: unknown;
  menuIcon?: unknown;
  badge?: unknown;
  subtitle?: unknown;
  imgShape?: unknown;
  imgRadius?: unknown;
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

/**
 * Adapter variant per special block key (`search`, `wallet`, …).
 * Open strings — resolved against each block’s variant registry;
 * unknown / omitted → `compact` at render.
 */
export type HeaderBlockVariantSettings = Partial<Record<string, string>>;

export type HeaderMockAuthKey = 'authenticated' | 'guest';

export const HEADER_MOCK_AUTH_KEYS = [
  'authenticated',
  'guest',
] as const satisfies readonly HeaderMockAuthKey[];

/** Capability flags for special header blocks (settings → schema). */
export type HeaderCapabilitiesSettings = Partial<
  Record<(typeof HEADER_SPECIAL_BLOCK_KEYS)[number] | string, boolean>
>;

/** Overlay mode per special block key. */
export type HeaderWrappersSettings = Partial<Record<string, WrapperMode>>;

export type HeaderBehaviorSettings = BehaviorFlags;

export type HeaderSettings = {
  /** Schema major; omit → 1. */
  version?: SchemaVersion | number | string;
  layout?: HeaderLayoutKey;
  type?: HeaderTypeKey;
  /** Use `widgets/header/mocks` instead of init API menu. */
  mockMenu?: boolean;
  /** Mock menu variant when `mockMenu` is true. App runtime prefers Redux auth when passed to `getHeaderMenuMock`. */
  mockAuth?: HeaderMockAuthKey;
  /** @deprecated Prefer `customBlocks` */
  customBlock?: HeaderCustomBlockSettings;
  customBlocks?: HeaderCustomBlockSettings[];
  /**
   * Global adapter variants for special blocks (`search` / `wallet` / …).
   * Open strings resolved against each block registry; unknown → `compact`.
   * Nested `types.<type>.blockVariants` still overrides when present.
   * Legacy `drawer` / `modal` values are remapped onto `wrappers` at resolve time.
   */
  blockVariants?: HeaderBlockVariantSettings;
  /** Overlay mode per block (`drawer` / `popover` / `modal` / …). */
  wrappers?: HeaderWrappersSettings;
  /** Shell behavior (sticky / transparent / hideOnScroll). */
  behavior?: HeaderBehaviorSettings;
  /** Enable/disable special blocks without JSX conditions. */
  capabilities?: HeaderCapabilitiesSettings;
  /**
   * Tooltip for header menu rows.
   * Cascade: defaults → `header.tooltip` → place override in AppTooltip.
   */
  tooltip?: TooltipSettings;
  /** Per-type tunables keyed by `header.type`. */
  types?: Partial<Record<string, HeaderTypeTunablesSettings>>;
};

export type HeaderTypeTunablesSettings = {
  blockVariants?: HeaderBlockVariantSettings;
};
