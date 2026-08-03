import { describe, expect, it } from 'vitest';

import {
  findMenuBlockItems,
  findMenuHeaderTopItems,
  MENU_HEADER_TOP_BLOCK_TYPE,
} from '@/shared/lib/menu/findMenuBlockItems';

describe('findMenuBlockItems', () => {
  it('returns menu items from matching block type', () => {
    const items = findMenuBlockItems(
      {
        blocks: [
          {
            type: 'menuHeaderTop',
            menu: [{ key: 'logo', name: 'Logo', url: '/' }],
          },
        ],
      },
      MENU_HEADER_TOP_BLOCK_TYPE,
    );

    expect(items).toEqual([
      { key: 'logo', name: 'Logo', url: '/', img: undefined, items: undefined },
    ]);
  });

  it('returns null when block is missing', () => {
    expect(findMenuBlockItems({ blocks: [] }, MENU_HEADER_TOP_BLOCK_TYPE)).toBeNull();
    expect(findMenuBlockItems({}, MENU_HEADER_TOP_BLOCK_TYPE)).toBeNull();
  });
});

describe('findMenuHeaderTopItems', () => {
  it('delegates to menuHeaderTop block type', () => {
    const items = findMenuHeaderTopItems({
      blocks: [
        {
          type: 'menuHeaderTop',
          menu: [{ key: 'logo', name: 'Logo', url: '/' }],
        },
      ],
    });

    expect(items?.[0]?.key).toBe('logo');
  });
});
