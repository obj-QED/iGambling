import type { HeaderMenuModel } from '@/widgets/header/types';

import { describe, expect, it } from 'vitest';

import { filterRenderableMenu } from '@/widgets/header/lib/itemUtils';
import { mergeCustomBlocks } from '@/widgets/header/lib/mergeBlocks';

const BASE_MENU: HeaderMenuModel = {
  sections: [
    { key: 'block3', items: [{ key: 'search', url: '/search', name: 'Search' }] },
    { key: 'block1', items: [{ key: 'logo', url: '/', name: 'Logo' }] },
  ],
};

describe('mergeCustomBlocks', () => {
  it('applies multiple append sections in order', () => {
    const menu = mergeCustomBlocks(BASE_MENU, [
      {
        key: 'tools-a',
        placement: 'append',
        items: [{ key: 'color_scheme', url: '', name: '' }],
      },
      {
        key: 'tools-b',
        placement: 'append',
        items: [{ key: 'search', url: '/search', name: 'Search' }],
      },
    ]);

    expect(menu.sections.map((section) => section.key)).toEqual([
      'block3',
      'block1',
      'tools-a',
      'tools-b',
    ]);
  });

  it('applies prepend before existing sections', () => {
    const menu = mergeCustomBlocks(BASE_MENU, [
      {
        key: 'promo',
        placement: 'prepend',
        items: [{ key: 'bonus_box', url: '', name: '' }],
      },
      {
        key: 'tools',
        placement: 'append',
        items: [{ key: 'color_scheme', url: '', name: '' }],
      },
    ]);

    expect(menu.sections.map((section) => section.key)).toEqual([
      'promo',
      'block3',
      'block1',
      'tools',
    ]);
  });

  it('inserts section after a target API section', () => {
    const menu = mergeCustomBlocks(BASE_MENU, [
      {
        key: 'mid-tools',
        placement: { afterSection: 'block3' },
        items: [{ key: 'wallet', url: '', name: '' }],
      },
    ]);

    expect(menu.sections.map((section) => section.key)).toEqual(['block3', 'mid-tools', 'block1']);
  });

  it('inserts section before a target API section', () => {
    const menu = mergeCustomBlocks(BASE_MENU, [
      {
        key: 'leading-tools',
        placement: { beforeSection: 'block1' },
        items: [{ key: 'notification', url: '', name: '' }],
      },
    ]);

    expect(menu.sections.map((section) => section.key)).toEqual([
      'block3',
      'leading-tools',
      'block1',
    ]);
  });

  it('injects items into an existing section row', () => {
    const menu = mergeCustomBlocks(BASE_MENU, [
      {
        key: 'block3-tools',
        placement: { section: 'block3', at: 'end' },
        items: [{ key: 'color_scheme', url: '', name: '' }],
      },
    ]);

    expect(menu.sections).toHaveLength(2);
    expect(menu.sections[0]?.items.map((item) => item.key)).toEqual(['search', 'color_scheme']);
  });

  it('inserts items at index inside a section', () => {
    const menu = mergeCustomBlocks(
      {
        sections: [
          {
            key: 'block3',
            items: [
              { key: 'a', url: '', name: 'A' },
              { key: 'b', url: '', name: 'B' },
            ],
          },
        ],
      },
      [
        {
          key: 'block3-mid',
          placement: { section: 'block3', at: 1 },
          items: [{ key: 'color_scheme', url: '', name: '' }],
        },
      ],
    );

    expect(menu.sections[0]?.items.map((item) => item.key)).toEqual(['a', 'color_scheme', 'b']);
  });

  it('supports mixed placements in one config', () => {
    const menu = mergeCustomBlocks(BASE_MENU, [
      {
        key: 'left-promo',
        placement: 'prepend',
        items: [{ key: 'bonus_box', url: '', name: '' }],
      },
      {
        key: 'between',
        placement: { afterSection: 'block3' },
        items: [{ key: 'wallet', url: '', name: '' }],
      },
      {
        key: 'block1-inline',
        placement: { section: 'block1', at: 'start' },
        items: [{ key: 'color_scheme', url: '', name: '' }],
      },
      {
        key: 'right-tools',
        placement: { header: 'end' },
        items: [{ key: 'notification', url: '', name: '' }],
      },
    ]);

    expect(menu.sections.map((section) => section.key)).toEqual([
      'left-promo',
      'block3',
      'between',
      'block1',
      'right-tools',
    ]);
    expect(menu.sections[3]?.items.map((item) => item.key)).toEqual(['color_scheme', 'logo']);
  });

  it('keeps color_scheme after merge and visibility filter', () => {
    const menu = filterRenderableMenu(
      mergeCustomBlocks(BASE_MENU, [
        {
          key: 'block3-tools',
          placement: { section: 'block3', at: 'end' },
          items: [{ key: 'color_scheme', url: '', name: '' }],
        },
      ]),
    );

    expect(menu.sections[0]?.items.map((item) => item.key)).toEqual(['search', 'color_scheme']);
  });
});
