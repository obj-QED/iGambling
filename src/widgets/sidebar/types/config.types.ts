import type {
  AsideControlFit,
  AsideLayoutKey,
  AsideScrollAreaOverscrollBehavior,
  AsideScrollAreaSettings,
  AsideScrollAreaType,
  AsideTypeKey,
} from '@/shared/config/asideSettings';
import type { CmfActiveConfig } from '@/shared/config/cmfActiveSettings';
import type { HeaderCustomBlockConfig } from '@/shared/config/headerSettings';
import type { DrawerSettings } from '@/shared/config/overlaySettings';
import type { TooltipConfig } from '@/shared/config/tooltipSettings';
import type { SchemaVersion, WrapperMode } from '@/shared/schema';

export type { AsideControlFit, AsideLayoutKey, AsideTypeKey };

/** Resolved ScrollArea props: pack defaults → `aside.scrollArea` (typed Mantine passthrough). */
export type SidebarScrollAreaConfig = AsideScrollAreaSettings & {
  scrollbarSize: number;
  scrollHideDelay: number;
  type: AsideScrollAreaType;
  overscrollBehavior: AsideScrollAreaOverscrollBehavior;
};

export type SidebarRegionsConfig = {
  header: boolean;
  main: boolean;
  footer: boolean;
};

export type SidebarBehaviorConfig = {
  sticky: boolean;
  transparent: boolean;
  hideOnScroll: boolean;
};

export type SidebarWrappersConfig = Partial<Record<string, WrapperMode>>;

/** Settings `type` per domain (`modal` | `spotlight` | `input` | …). */
export type SidebarBehaviorsConfig = Partial<Record<string, string>>;

export type SidebarCapabilitiesConfig = Record<string, boolean>;

/**
 * Adapter variants from settings. Keys/values are open — custom blocks and
 * unregistered strings pass through; `useAdapter` falls back per block registry.
 */
export type SidebarBlockVariants = Partial<Record<string, string>>;

/**
 * Resolved sidebar schema — components receive this; they do not read settings.
 * `SidebarConfig` is an alias for backward compatibility.
 */
export type SidebarSchema = {
  version: SchemaVersion;
  /** Desktop width (px number or CSS length). Omit → token `--app-layout-sidebar-width`. */
  width?: number | string;
  layout: AsideLayoutKey;
  type: AsideTypeKey;
  /**
   * Control width mode (`max` | `fill`). Default `max`.
   * Wired to `[data-control-fit]` on the aside root (compact + non-compact tokens).
   */
  controlFit: AsideControlFit;
  /** Adapter variants from settings (`search` / `promo` / custom keys). Open strings. */
  blockVariants: SidebarBlockVariants;
  /** Default open dropdown keys — first visit only; then localStorage. */
  openedDropdowns: readonly string[];
  /**
   * Keys with dedicated block UI (Search / Promo / Logo / …).
   * From `aside.specialBlockKeys`; omit in settings → defaults.
   */
  specialBlockKeys: readonly string[];
  customBlocks?: HeaderCustomBlockConfig[];
  /** Which chrome regions Strategy may render. */
  regions: SidebarRegionsConfig;
  /** Resolved scrollArea: pack defaults → `aside.scrollArea`. */
  scrollArea: SidebarScrollAreaConfig;
  /** Resolved tooltip: pack defaults → `aside.tooltip`. */
  tooltip: TooltipConfig;
  /**
   * Mobile AppDrawer defaults — `params.drawer` → `aside.drawer` → instance.
   * @see https://mantine.dev/core/drawer/?t=props
   */
  drawer?: DrawerSettings;
  /** Active route chrome — omit in settings → `element` (CSS `::after`). */
  active: CmfActiveConfig;
  wrappers: SidebarWrappersConfig;
  /** Behavior mode from settings `type` (e.g. search → `spotlight`). */
  behaviors: SidebarBehaviorsConfig;
  behavior: SidebarBehaviorConfig;
  capabilities: SidebarCapabilitiesConfig;
};

/** @deprecated Prefer `SidebarSchema` */
export type SidebarConfig = SidebarSchema;
