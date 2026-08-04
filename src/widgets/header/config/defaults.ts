import type { HeaderSchema } from '../types';

import { DEFAULT_TOOLTIP_CONFIG } from '@/shared/config';
import { HEADER_SPECIAL_BLOCK_KEYS } from '@/shared/config/headerSpecialBlockKeys';

const DEFAULT_CAPABILITIES: HeaderSchema['capabilities'] = Object.fromEntries(
  HEADER_SPECIAL_BLOCK_KEYS.map((key) => [key, true]),
);

export const DEFAULT_HEADER_CONFIG: HeaderSchema = {
  version: 1,
  layout: 'container',
  type: 'dropdown',
  blockVariants: {},
  wrappers: {},
  behavior: {
    sticky: false,
    transparent: false,
    hideOnScroll: false,
  },
  capabilities: { ...DEFAULT_CAPABILITIES },
  tooltip: { ...DEFAULT_TOOLTIP_CONFIG },
};
