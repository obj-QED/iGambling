import { describe, expect, it } from 'vitest';

import {
  DEFAULT_HEADER_CONFIG,
  resolveHeaderConfig,
  resolveHeaderSchema,
} from '@/widgets/header/config';

describe('resolveHeaderConfig / resolveHeaderSchema', () => {
  it('returns defaults when settings.header is missing', () => {
    expect(resolveHeaderConfig({})).toEqual(DEFAULT_HEADER_CONFIG);
  });

  it('merges nested types.blockVariants over legacy', () => {
    expect(
      resolveHeaderConfig({
        header: {
          type: 'dropdown',
          blockVariants: { search: 'input', wallet: 'full' },
          types: {
            dropdown: {
              blockVariants: { search: 'compact' },
            },
          },
        },
      }).blockVariants,
    ).toEqual({
      search: 'compact',
      wallet: 'full',
    });
  });

  it('remaps legacy wallet drawer / search modal onto wrappers and keeps extra variant keys', () => {
    const schema = resolveHeaderConfig({
      header: {
        blockVariants: { search: 'mega', wallet: 'drawer', promo: 'card' },
      },
    });

    expect(schema.blockVariants).toEqual({
      search: 'mega',
      wallet: 'compact',
      promo: 'card',
    });
    expect(schema.wrappers.wallet).toBe('drawer');
  });

  it('keeps arbitrary type strings; empty falls back', () => {
    expect(resolveHeaderConfig({ header: { type: 'mega' } }).type).toBe('mega');
    expect(resolveHeaderConfig({ header: { type: '   ' } }).type).toBe('dropdown');
    expect(resolveHeaderConfig({ header: {} }).type).toBe('dropdown');
  });

  it('resolveHeaderSchema merges props over global and fills schema fields', () => {
    const schema = resolveHeaderSchema({
      global: {
        layout: 'container-fluid',
        capabilities: { wallet: false },
        behavior: { sticky: true, transparent: false, hideOnScroll: false },
      },
      props: {
        wrappers: { search: 'modal' },
        blockVariants: { search: 'input' },
      },
    });

    expect(schema.layout).toBe('container-fluid');
    expect(schema.capabilities.wallet).toBe(false);
    expect(schema.capabilities.search).toBe(true);
    expect(schema.behavior.sticky).toBe(true);
    expect(schema.wrappers.search).toBe('modal');
    expect(schema.blockVariants.search).toBe('input');
    expect(schema.version).toBe(1);
  });

  it('resolves header.active from settings; omit → element', () => {
    expect(resolveHeaderConfig({}).active).toEqual({ type: 'element', position: 'bottom' });
    expect(
      resolveHeaderConfig({
        header: { active: { type: 'line', position: 'left' } },
      }).active,
    ).toEqual({ type: 'line', position: 'left' });
  });
});
