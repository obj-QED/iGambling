import { describe, expect, it } from 'vitest';

import { findMenuHeaderTopItems } from '../findMenuHeaderTop';

describe('findMenuHeaderTopItems', () => {
  it('returns menu items from menuHeaderTop block', () => {
    const items = findMenuHeaderTopItems({
      blocks: [
        {
          type: 'menuHeaderTop',
          menu: [{ key: 'logo', name: 'Logo', url: '/' }],
        },
      ],
    });

    expect(items).toEqual([
      { key: 'logo', name: 'Logo', url: '/', img: undefined, items: undefined },
    ]);
  });

  it('returns null when block is missing', () => {
    expect(findMenuHeaderTopItems({ blocks: [] })).toBeNull();
    expect(findMenuHeaderTopItems({})).toBeNull();
  });
});
