import type { CmfActiveSettings } from './cmfActiveSettings';
import type {
  HeaderCustomBlockInput,
  HeaderCustomBlockPlacement,
  HeaderCustomBlockSettings,
} from './headerSettings';
import type { TooltipSettings } from './tooltipSettings';
import type { BehaviorFlags, SchemaVersion, WrapperMode } from '@/shared/schema';
import type { ScrollAreaProps } from '@mantine/core';

/** Open string from settings; empty → `container`. Known shells: `ASIDE_LAYOUT_KEYS`. */
export type AsideLayoutKey = string;

/** Open string from settings; empty → `default`. Known strategies: `ASIDE_TYPE_KEYS`. */
export type AsideTypeKey = string;

export const ASIDE_LAYOUT_KEYS = ['container', 'container-fluid'] as const;

export const ASIDE_TYPE_KEYS = ['default', 'compact'] as const;

export type AsideLayoutStrategyKey = (typeof ASIDE_LAYOUT_KEYS)[number];
export type AsideTypeStrategyKey = (typeof ASIDE_TYPE_KEYS)[number];

export const ASIDE_SCROLL_AREA_TYPES = ['auto', 'always', 'scroll', 'hover', 'never'] as const;

export type AsideScrollAreaType = (typeof ASIDE_SCROLL_AREA_TYPES)[number];

export const ASIDE_SCROLL_AREA_OVERSCROLL = ['auto', 'contain', 'none'] as const;

export type AsideScrollAreaOverscrollBehavior = (typeof ASIDE_SCROLL_AREA_OVERSCROLL)[number];

/**
 * Any Mantine `ScrollArea` prop from settings (excludes render/slot chrome).
 * Keys not on `ScrollAreaProps` are not typed and must not be relied on.
 */
export type AsideScrollAreaSettings = Partial<
  Omit<
    ScrollAreaProps,
    'children' | 'className' | 'classNames' | 'style' | 'styles' | 'vars' | 'mod' | 'variant'
  >
>;

/** Which chrome regions the active type Strategy may render. */
export type AsideRegionsSettings = {
  header?: boolean;
  main?: boolean;
  footer?: boolean;
};

/** Adapter variant keys per domain (`search` → `row` | `icon`). Open strings from settings. */
export type AsideBlockVariantSettings = Partial<Record<string, string>>;

/** Per-type layout/blocks only — do not duplicate scrollArea/tooltip here. */
export type AsideTypeTunablesSettings = {
  regions?: AsideRegionsSettings;
  customBlocks?: HeaderCustomBlockSettings[];
  blockVariants?: AsideBlockVariantSettings;
};

export type AsideCapabilitiesSettings = Partial<Record<string, boolean>>;

export type AsideWrappersSettings = Partial<Record<string, WrapperMode>>;

export type AsideBehaviorSettings = BehaviorFlags;
export type AsideSettings = {
  /** Schema major; omit → 1. */
  version?: SchemaVersion | number | string;
  /** Desktop width: px number or CSS length (`30%`, `4.5rem`). Omit → token. Mobile: 100% via CSS. */
  width?: number | string;
  layout?: AsideLayoutKey;
  /** Active type pack (`default` | `compact` | …). Structure lives in code type packs. */
  type?: AsideTypeKey;
  /**
   * Plugin adapter variants (`search`: `row` | `icon`).
   * Nested `types.<type>.blockVariants` overrides when present.
   * Omit → derive from `type` (`compact` → search `icon`, else `row`).
   */
  blockVariants?: AsideBlockVariantSettings;
  /** `true` → sidebar menu from `src/widgets/sidebar/mocks` */
  mockMenu?: boolean;
  /** Menu keys open on first visit; user toggles persist in localStorage. */
  openedDropdowns?: readonly string[];
  customBlocks?: HeaderCustomBlockSettings[];
  /** Global ScrollArea tunables for aside (all types). Omit → pack defaults. */
  scrollArea?: AsideScrollAreaSettings;
  /**
   * Tooltip for aside menu rows (icon rail, etc.).
   * Cascade: pack defaults → `aside.tooltip` → place override in UI.
   */
  tooltip?: TooltipSettings;
  /**
   * Active route chrome: `line` → DOM `CmfActiveLine`; `element` → CSS `::after`.
   * Omit → `element` (aside has no `active` in default settings).
   */
  active?: CmfActiveSettings;
  wrappers?: AsideWrappersSettings;
  behavior?: AsideBehaviorSettings;
  capabilities?: AsideCapabilitiesSettings;
  /** Per-type regions + extra customBlocks (appended after global). */
  types?: Partial<Record<string, AsideTypeTunablesSettings>>;
};

export type { HeaderCustomBlockInput, HeaderCustomBlockPlacement, HeaderCustomBlockSettings };
