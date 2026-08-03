import type { SidebarRegionsConfig, SidebarScrollAreaConfig } from '../types';
import type { AsideTypeStrategyKey } from '@/shared/config';
import type { TooltipConfig } from '@/shared/config/tooltipSettings';

export type SidebarTypeTunables = {
  scrollArea: SidebarScrollAreaConfig;
  tooltip: TooltipConfig;
  regions: SidebarRegionsConfig;
};

export const DEFAULT_SIDEBAR_SCROLL_AREA_CONFIG: SidebarScrollAreaConfig = {
  scrollbarSize: 2,
  scrollHideDelay: 3000,
  type: 'auto',
  overscrollBehavior: 'contain',
};

export const DEFAULT_SIDEBAR_REGIONS: SidebarRegionsConfig = {
  header: true,
  main: true,
  footer: true,
};

export const SIDEBAR_TYPE_TUNABLE_DEFAULTS: Record<AsideTypeStrategyKey, SidebarTypeTunables> = {
  default: {
    scrollArea: DEFAULT_SIDEBAR_SCROLL_AREA_CONFIG,
    tooltip: {
      enabled: false,
      position: 'top',
      delay: 0,
      withArrow: true,
      offset: 5,
    },
    regions: DEFAULT_SIDEBAR_REGIONS,
  },
  compact: {
    scrollArea: DEFAULT_SIDEBAR_SCROLL_AREA_CONFIG,
    tooltip: {
      enabled: true,
      position: 'right',
      delay: 200,
      withArrow: true,
      offset: 5,
    },
    regions: DEFAULT_SIDEBAR_REGIONS,
  },
};

export function resolveSidebarTypeTunableDefaults(type: string): SidebarTypeTunables {
  if (Object.hasOwn(SIDEBAR_TYPE_TUNABLE_DEFAULTS, type)) {
    return SIDEBAR_TYPE_TUNABLE_DEFAULTS[type as AsideTypeStrategyKey];
  }
  return SIDEBAR_TYPE_TUNABLE_DEFAULTS.default;
}
