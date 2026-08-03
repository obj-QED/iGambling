import type { HeaderCustomBlockInput } from '@/shared/config';

/** Raw `page.blocks[]` entry: `type: menuHeaderTop`. */
export type MenuHeaderTopBlockMock = {
  skin: string;
  type: 'menuHeaderTop';
  menu: HeaderCustomBlockInput[];
};
