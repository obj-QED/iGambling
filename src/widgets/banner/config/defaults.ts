import type { BannerSchema } from '../types/schema.types';

export const DEFAULT_BANNER_SCHEMA: BannerSchema = {
  version: 1,
  layout: 'default',
  variant: 'default',
  behavior: {
    sticky: false,
    transparent: false,
    hideOnScroll: false,
    autoplay: false,
  },
  capabilities: {
    banner: true,
  },
};
