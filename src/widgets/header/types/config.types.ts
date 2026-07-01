import type { HeaderBlockVariants, HeaderMenuIconRadius, HeaderMenuIconShape } from './items.types';
import type {
  HeaderCustomBlockConfig,
  HeaderLayoutKey,
  HeaderTypeKey,
} from '@/shared/config/headerSettings';

export type { HeaderCustomBlockConfig, HeaderLayoutKey, HeaderTypeKey };

export type HeaderConfig = {
  layout: HeaderLayoutKey;
  type: HeaderTypeKey;
  blockVariants: HeaderBlockVariants;
  customBlocks?: HeaderCustomBlockConfig[];
  /** Default menu row icon aspect when item has no `imgShape`. */
  menuIconShape?: HeaderMenuIconShape;
  /** Default menu row icon radius when item has no `imgRadius`. */
  menuIconRadius?: HeaderMenuIconRadius;
};
