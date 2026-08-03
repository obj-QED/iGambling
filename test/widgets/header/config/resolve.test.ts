import { describe, expect, it } from 'vitest';

import { DEFAULT_HEADER_CONFIG, resolveHeaderConfig } from '@/widgets/header/config';

describe('resolveHeaderConfig', () => {
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
              blockVariants: { search: 'icon' },
            },
          },
        },
      }).blockVariants,
    ).toEqual({
      search: 'icon',
      wallet: 'full',
    });
  });

  it('keeps arbitrary type strings; empty falls back', () => {
    expect(resolveHeaderConfig({ header: { type: 'mega' } }).type).toBe('mega');
    expect(resolveHeaderConfig({ header: { type: '   ' } }).type).toBe('default');
  });
});
