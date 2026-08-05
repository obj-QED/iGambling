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

  it('maps chrome to {widget}-{chrome}', () => {
    expect(resolveCmfScope(item, { widget: 'sidebar', chrome: 'header' })).toEqual({
      component: 'sidebar-header',
      key: 'casino',
    });
    expect(resolveCmfScope(item, { widget: 'header', chrome: 'footer' })).toEqual({
      component: 'header-footer',
      key: 'casino',
    });
    expect(resolveCmfScope(item, { widget: 'header', chrome: 'dropdown' })).toEqual({
      component: 'header-dropdown',
      key: 'casino',
    });
  });

  it('maps chrome + role for dropdown parent/child', () => {
    expect(
      resolveCmfScope(item, { widget: 'sidebar', chrome: 'dropdown', role: 'parent' }),
    ).toEqual({
      component: 'sidebar-dropdown',
      key: 'casino',
      role: 'parent',
    });
    expect(resolveCmfScope(item, { widget: 'sidebar', chrome: 'dropdown', role: 'child' })).toEqual(
      {
        component: 'sidebar-dropdown',
        key: 'casino',
        role: 'child',
      },
    );
  });

  it('maps role-only to {widget}-dropdown + role', () => {
    expect(resolveCmfScope(item, { widget: 'header', role: 'child' })).toEqual({
      component: 'header-dropdown',
      key: 'casino',
      role: 'child',
    });
  });

  it('allows key override', () => {
    expect(resolveCmfScope(item, { widget: 'sidebar', chrome: 'header', key: 'logo' })).toEqual({
      component: 'sidebar-header',
      key: 'logo',
    });
  });
});
