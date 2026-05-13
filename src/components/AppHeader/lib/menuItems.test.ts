import type { AppHeaderMenuItem } from '@AppHeader/types/AppHeader.types';

import { describe, expect, it } from 'vitest';

import { normalizeAppHeaderMenuSections } from './menuItems';

const col = (key: string, childKeys: string[]): AppHeaderMenuItem => ({
  url: '#',
  name: key,
  key,
  img: '',
  items: childKeys.map((k) => ({ url: k, name: k, key: k, img: '' })),
});

describe('normalizeAppHeaderMenuSections', () => {
  it('returns the same array when there is not exactly one root item', () => {
    const a = col('block1', ['a']);
    const b = col('block2', ['b']);
    expect(normalizeAppHeaderMenuSections([])).toEqual([]);
    expect(normalizeAppHeaderMenuSections([a, b])).toEqual([a, b]);
  });

  it('lifts a single hash-url wrapper whose direct children are all hash-url rows', () => {
    const wrapped: AppHeaderMenuItem[] = [
      {
        url: '#',
        name: 'header',
        key: 'header',
        img: '',
        items: [col('block3', ['search']), col('block2', ['slots']), col('block1', ['profile'])],
      },
    ];
    expect(normalizeAppHeaderMenuSections(wrapped)).toEqual(wrapped[0].items);
  });

  it('does not lift when a direct child is not a hash-url row', () => {
    const wrapped: AppHeaderMenuItem[] = [
      {
        url: '#',
        name: 'header',
        key: 'header',
        img: '',
        items: [
          col('block3', ['search']),
          { url: 'promo', name: 'Promo', key: 'promo', img: '' },
        ],
      },
    ];
    expect(normalizeAppHeaderMenuSections(wrapped)).toEqual(wrapped);
  });

  it('does not lift when the root url is not exactly "#"', () => {
    const wrapped: AppHeaderMenuItem[] = [
      {
        url: '',
        name: 'header',
        key: 'header',
        img: '',
        items: [col('block3', ['search'])],
      },
    ];
    expect(normalizeAppHeaderMenuSections(wrapped)).toEqual(wrapped);
  });
});
