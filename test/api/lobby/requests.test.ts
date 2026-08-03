import { describe, expect, it } from 'vitest';

import { toGetPageContent, toInitV2Content, toWords } from '@/api/lobby/requests';

describe('lobby response normalizers', () => {
  it('normalizes translation from envelope and ignores non-string values', () => {
    const words = toWords({
      content: {
        home: 'Главная',
        counter: 10,
      },
    });

    expect(words).toEqual({ home: 'Главная' });
  });

  it('keeps full init payload without dropping unknown fields', () => {
    const content = toInitV2Content({
      auth: { status: 'guest' },
      page: { info: { title: 'Lobby' }, menu: [{ key: 'home' }], custom: { foo: 'bar' } },
      featureFlags: ['a', 'b'],
    });

    expect(content).toEqual({
      auth: { status: 'guest' },
      page: { info: { title: 'Lobby' }, menu: [{ key: 'home' }], custom: { foo: 'bar' } },
      featureFlags: ['a', 'b'],
    });
  });

  it('keeps full getPage payload and nested page fields', () => {
    const content = toGetPageContent({
      page: {
        blocks: [{ type: 'slider' }],
        footer: { links: ['about'] },
      },
      meta: { build: '1.2.3' },
    });

    expect(content).toEqual({
      page: {
        blocks: [{ type: 'slider' }],
        footer: { links: ['about'] },
      },
      meta: { build: '1.2.3' },
    });
  });
});
