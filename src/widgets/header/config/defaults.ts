import type { HeaderConfig } from '../types';

import { DEFAULT_TOOLTIP_CONFIG } from '@/shared/config';

export const DEFAULT_HEADER_CONFIG: HeaderConfig = {
  layout: 'container',
  type: 'dropdown',
  blockVariants: {},
  tooltip: { ...DEFAULT_TOOLTIP_CONFIG },
};
