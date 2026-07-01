import type { AsideTypeKey } from '@/shared/config/asideSettings';
import type { HeaderCustomBlockConfig } from '@/shared/config/headerSettings';

export type { AsideTypeKey };

export type SidebarConfig = {
  width: number;
  type: AsideTypeKey;
  customBlocks?: HeaderCustomBlockConfig[];
};
