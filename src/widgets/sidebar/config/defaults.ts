import type { SidebarConfig, SidebarScrollAreaConfig } from '../types';

export const DEFAULT_SIDEBAR_SCROLL_AREA_CONFIG: SidebarScrollAreaConfig = {
  scrollbarSize: 2,
  scrollHideDelay: 3000,
  type: 'auto',
  overscrollBehavior: 'contain',
};

export const DEFAULT_SIDEBAR_CONFIG: SidebarConfig = {
  width: 400,
  type: 'default',
  openedDropdowns: [],
  scrollArea: DEFAULT_SIDEBAR_SCROLL_AREA_CONFIG,
};
