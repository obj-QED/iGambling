import { describe, expect, it } from 'vitest';

import { resolveCmfScope } from '@/shared/lib';

describe('resolveCmfScope', () => {
  const item = { key: 'casino' };

  it('maps widget to base component', () => {
    expect(resolveCmfScope(item, { widget: 'sidebar' })).toEqual({
      component: 'sidebar',
      key: 'casino',
    });
  });

  it('maps chrome to {widget}-header / {widget}-footer', () => {
    expect(resolveCmfScope(item, { widget: 'sidebar', chrome: 'header' })).toEqual({
      component: 'sidebar-header',
      key: 'casino',
    });
    expect(resolveCmfScope(item, { widget: 'header', chrome: 'footer' })).toEqual({
      component: 'header-footer',
      key: 'casino',
    });
  });

  it('maps dropdown flags to {widget}-dropdown + roles', () => {
    expect(resolveCmfScope(item, { widget: 'sidebar', dropdownTrigger: true })).toEqual({
      component: 'sidebar-dropdown',
      key: 'casino',
      role: 'parent',
    });
    expect(resolveCmfScope(item, { widget: 'header', dropdown: true })).toEqual({
      component: 'header-dropdown',
      key: 'casino',
    });
  });

  it('allows key override', () => {
    expect(resolveCmfScope(item, { widget: 'sidebar', chrome: 'header', key: 'logo' })).toEqual({
      component: 'sidebar-header',
      key: 'logo',
    });
  });
});
