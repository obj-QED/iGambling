import { describe, expect, it } from 'vitest';

import { parseMenuItemDto, parseMenuRootDto } from '@/shared/lib/menu/parseMenuItem';

describe('parseMenuItemDto (Zod boundary)', () => {
  it('accepts valid item', () => {
    expect(parseMenuItemDto({ key: 'search', url: '/search', name: 'Search' })).toEqual({
      key: 'search',
      url: '/search',
      name: 'Search',
      type: undefined,
    });
  });

  it('parses menu item type', () => {
    expect(parseMenuItemDto({ key: 'promo', url: '/promo', name: 'Promo', type: 'link' })).toEqual({
      key: 'promo',
      url: '/promo',
      name: 'Promo',
      type: 'link',
    });

    expect(parseMenuItemDto({ key: 'cta', url: '/cta', name: 'CTA', type: 'button' })).toEqual({
      key: 'cta',
      url: '/cta',
      name: 'CTA',
      type: 'button',
    });
  });

  it('parses variant and label', () => {
    expect(
      parseMenuItemDto({
        key: 'logout',
        url: '/logout',
        name: 'Logout',
        type: 'link',
        variant: 'filled',
        label: 'Sign out',
      }),
    ).toEqual({
      key: 'logout',
      url: '/logout',
      name: 'Logout',
      type: 'link',
      variant: 'filled',
      label: 'Sign out',
    });
  });

  it('passes through unknown menu item type', () => {
    expect(parseMenuItemDto({ key: 'bad', url: '/', name: 'Bad', type: 'modal' })?.type).toBe(
      'modal',
    );
  });

  it('keeps type for special block keys (control variant: link → transparent)', () => {
    expect(parseMenuItemDto({ key: 'search', url: '/search', name: '', type: 'link' })).toEqual({
      key: 'search',
      url: '/search',
      name: '',
      type: 'link',
    });

    expect(parseMenuItemDto({ key: 'logo', url: '/', name: 'Home', type: 'link' })?.type).toBe(
      'link',
    );
  });

  it('cleans empty api fields before coerce', () => {
    expect(
      parseMenuItemDto({
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
    expect(parseMenuItemDto(null)).toBeNull();
    expect(parseMenuItemDto('search')).toBeNull();
  });

  it('accepts whitespace-only key from backend', () => {
    expect(parseMenuItemDto({ key: '  ', name: 'x', url: '' })?.key).toBe('  ');
  });

  it('rejects empty key', () => {
    expect(parseMenuItemDto({ key: '', name: 'x' })).toBeNull();
    expect(parseMenuItemDto({ key: 123, name: 'x' })).toBeNull();
  });

  it('skips invalid nested items', () => {
    const item = parseMenuItemDto({
      key: 'profile',
      name: 'Profile',
      url: '/profile',
      items: [{ key: 'ok', name: 'Ok', url: '/' }, { key: '' }, null],
    });

    expect(item?.items).toHaveLength(1);
    expect(item?.items?.[0]?.key).toBe('ok');
  });
});

describe('parseMenuRootDto (Zod boundary)', () => {
  it('requires items array', () => {
    expect(parseMenuRootDto({ key: 'header', name: 'header', url: '#' })).toBeNull();
  });

  it('parses root with sections', () => {
    const root = parseMenuRootDto({
      key: 'header',
      name: 'header',
      url: '#',
      items: [{ key: 'block1', name: '', url: '', items: [] }],
    });

    expect(root?.key).toBe('header');
    expect(root?.items).toHaveLength(1);
  });
});
