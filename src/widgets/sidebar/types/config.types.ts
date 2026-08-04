import type {
  AsideLayoutKey,
  AsideScrollAreaOverscrollBehavior,
  AsideScrollAreaSettings,
  AsideScrollAreaType,
  AsideTypeKey,
} from '@/shared/config/asideSettings';
import type { HeaderCustomBlockConfig } from '@/shared/config/headerSettings';
import type { TooltipConfig } from '@/shared/config/tooltipSettings';
import type { SchemaVersion, WrapperMode } from '@/shared/schema';

export type { AsideLayoutKey, AsideTypeKey };

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

export type SidebarCapabilitiesConfig = Record<string, boolean>;

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
  /** Default open dropdown keys — first visit only; then localStorage. */
  openedDropdowns: readonly string[];
  customBlocks?: HeaderCustomBlockConfig[];
  /** Which chrome regions Strategy may render. */
  regions: SidebarRegionsConfig;
  /** Resolved scrollArea: pack defaults → `aside.scrollArea`. */
  scrollArea: SidebarScrollAreaConfig;
  /** Resolved tooltip: pack defaults → `aside.tooltip`. */
  tooltip: TooltipConfig;
  wrappers: SidebarWrappersConfig;
  behavior: SidebarBehaviorConfig;
  capabilities: SidebarCapabilitiesConfig;
};

/** @deprecated Prefer `SidebarSchema` */
export type SidebarConfig = SidebarSchema;
