import type { FooterSchema } from '../types/schema.types';

export const DEFAULT_FOOTER_SCHEMA: FooterSchema = {
  version: 1,
  layout: 'default',
  variant: 'default',
  behavior: {
    sticky: false,
    transparent: false,
    hideOnScroll: false,
  },
  capabilities: {
    footer: true,
  },
};
