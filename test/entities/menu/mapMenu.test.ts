import { describe, expect, it } from 'vitest';

import { mapFlatMenu, mapMenuRoot, mergeMenuCustomBlock } from '@/entities/menu';

const ROOT = {
  key: 'header',
  name: 'Header',
  url: '',
  items: [
    {
      key: 'main',
      name: 'Main',
      url: '',
      items: [{ key: 'home', name: 'Home', url: '/', badge: 3 }],
    },
  ],
} as const;

describe('menu entity mappers', () => {
  it('maps DTO content once for every chrome widget', () => {
    expect(mapMenuRoot(ROOT)).toEqual({
      sections: [
        {
          key: 'main',
          items: [{ key: 'home', name: 'Home', url: '/', badge: 3, items: undefined }],
        },
      ],
    });
    expect(mapFlatMenu(ROOT, 'footer').sections[0]?.key).toBe('footer');
  });

  it('merges schema blocks without depending on a widget', () => {
    const menu = mapMenuRoot(ROOT);
    const result = mergeMenuCustomBlock(menu, {
      key: 'search',
      placement: 'prepend',
      items: [{ key: 'search', name: 'Search', url: '' }],
    });

    expect(result.sections.map((section) => section.key)).toEqual(['search', 'main']);
  });
});
