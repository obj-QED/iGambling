import type {
  AsideLayoutKey,
  AsideScrollAreaOverscrollBehavior,
  AsideScrollAreaType,
  AsideTypeKey,
} from '@/shared/config/asideSettings';
import type { HeaderCustomBlockConfig } from '@/shared/config/headerSettings';
import type { TooltipConfig } from '@/shared/config/tooltipSettings';

export type { AsideLayoutKey, AsideTypeKey };

export type SidebarScrollAreaConfig = {
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

export type SidebarConfig = {
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
};
