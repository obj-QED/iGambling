import type { HeaderBlockVariants } from './items.types';
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
};
