import { describe, expect, it } from 'vitest';

import { DEFAULT_FOOTER_SCHEMA, resolveFooterSchema } from '@/widgets/footer/config';

describe('resolveFooterSchema', () => {
  it('returns defaults', () => {
    expect(resolveFooterSchema()).toEqual(DEFAULT_FOOTER_SCHEMA);
  });

  it('merges props over global', () => {
    expect(
      resolveFooterSchema({
        global: { layout: 'columns', capabilities: { footer: true } },
        props: { variant: 'minimal', capabilities: { footer: false } },
      }),
    ).toMatchObject({
      layout: 'columns',
      variant: 'minimal',
      capabilities: { footer: false },
    });
  });
});
