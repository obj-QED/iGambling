import type { HeaderBlockVariants } from './items.types';
import type {
  HeaderCustomBlockConfig,
  HeaderLayoutKey,
  HeaderTypeKey,
} from '@/shared/config/headerSettings';
import type { TooltipConfig } from '@/shared/config/tooltipSettings';

export type { HeaderCustomBlockConfig, HeaderLayoutKey, HeaderTypeKey };

export type HeaderConfig = {
  layout: HeaderLayoutKey;
  type: HeaderTypeKey;
  blockVariants: HeaderBlockVariants;
  customBlocks?: HeaderCustomBlockConfig[];
  tooltip: TooltipConfig;
};
