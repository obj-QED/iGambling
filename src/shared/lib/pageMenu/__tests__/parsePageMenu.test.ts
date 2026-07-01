import { describe, expect, it } from 'vitest';

import { parsePageMenuItemDto, parsePageMenuRootDto } from '../parsePageMenu';

describe('parsePageMenuItemDto (Zod boundary)', () => {
  it('accepts valid item', () => {
    expect(parsePageMenuItemDto({ key: 'search', url: '/search', name: 'Search' })).toEqual({
      key: 'search',
      url: '/search',
      name: 'Search',
      type: undefined,
    });
  });

  it('parses menu item type', () => {
    expect(
      parsePageMenuItemDto({ key: 'promo', url: '/promo', name: 'Promo', type: 'link' }),
    ).toEqual({
      key: 'promo',
      url: '/promo',
      name: 'Promo',
      type: 'link',
    });

    expect(parsePageMenuItemDto({ key: 'cta', url: '/cta', name: 'CTA', type: 'button' })).toEqual({
      key: 'cta',
      url: '/cta',
      name: 'CTA',
      type: 'button',
    });
  });

  it('passes through unknown menu item type', () => {
    expect(parsePageMenuItemDto({ key: 'bad', url: '/', name: 'Bad', type: 'modal' })?.type).toBe(
      'modal',
    );
  });

  it('drops type for special block keys', () => {
    expect(parsePageMenuItemDto({ key: 'search', url: '/search', name: '', type: 'link' })).toEqual(
      {
        key: 'search',
        url: '/search',
        name: '',
      },
    );
  });

  it('cleans empty api fields before coerce', () => {
    expect(
      parsePageMenuItemDto({
        key: 'promo',
        name: 'Promo',
        url: '/promo',
        img: '',
        items: [],
        meta: {},
        type: undefined,
      }),
    ).toEqual({
      key: 'promo',
      name: 'Promo',
      url: '/promo',
      type: undefined,
    });
  });

  it('rejects non-object', () => {
    expect(parsePageMenuItemDto(null)).toBeNull();
    expect(parsePageMenuItemDto('search')).toBeNull();
  });

  it('accepts whitespace-only key from backend', () => {
    expect(parsePageMenuItemDto({ key: '  ', name: 'x', url: '' })?.key).toBe('  ');
  });

  it('rejects empty key', () => {
    expect(parsePageMenuItemDto({ key: '', name: 'x' })).toBeNull();
    expect(parsePageMenuItemDto({ key: 123, name: 'x' })).toBeNull();
  });

  it('skips invalid nested items', () => {
    const item = parsePageMenuItemDto({
      key: 'profile',
      name: 'Profile',
      url: '/profile',
      items: [{ key: 'ok', name: 'Ok', url: '/' }, { key: '' }, null],
    });

    expect(item?.items).toHaveLength(1);
    expect(item?.items?.[0]?.key).toBe('ok');
  });
});

describe('parsePageMenuRootDto (Zod boundary)', () => {
  it('requires items array', () => {
    expect(parsePageMenuRootDto({ key: 'header', name: 'header', url: '#' })).toBeNull();
  });

  it('parses root with sections', () => {
    const root = parsePageMenuRootDto({
      key: 'header',
      name: 'header',
      url: '#',
      items: [{ key: 'block1', name: '', url: '', items: [] }],
    });

    expect(root?.key).toBe('header');
    expect(root?.items).toHaveLength(1);
  });
});
