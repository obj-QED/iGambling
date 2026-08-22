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

  it('keeps extra init and nested page keys', () => {
    const content = toInitV2Content({
      token: 'abc',
      page: { info: { title: 'Lobby' }, menu: [{ key: 'home' }], custom: { foo: 'bar' } },
      featureFlags: ['a', 'b'],
    });

    expect(content).toEqual({
      token: 'abc',
      page: {
        info: { title: 'Lobby' },
        menu: [{ key: 'home' }],
        custom: { foo: 'bar' },
      },
      featureFlags: ['a', 'b'],
    });
  });

  it('keeps extra getPage and nested page keys', () => {
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
