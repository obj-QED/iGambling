import type {
  AsideScrollAreaOverscrollBehavior,
  AsideScrollAreaType,
  AsideTypeKey,
} from '@/shared/config/asideSettings';
import type { HeaderCustomBlockConfig } from '@/shared/config/headerSettings';

export type { AsideTypeKey };

export type SidebarScrollAreaConfig = {
  scrollbarSize: number;
  scrollHideDelay: number;
  type: AsideScrollAreaType;
  overscrollBehavior: AsideScrollAreaOverscrollBehavior;
};

export type SidebarConfig = {
  width: number;
  type: AsideTypeKey;
  /** Default open dropdown keys — first visit only; then localStorage. */
  openedDropdowns: readonly string[];
  customBlocks?: HeaderCustomBlockConfig[];
  scrollArea: SidebarScrollAreaConfig;
};
