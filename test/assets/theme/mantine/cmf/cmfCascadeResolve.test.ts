import { describe, expect, it } from 'vitest';

import {
  buildCmfActionIconPropToken,
  buildCmfButtonPropToken,
  buildCmfGroupPropToken,
  resolveCmfScope,
} from '@/assets/theme/mantine/cmf/cmfCascadeResolve';

describe('cmfCascadeResolve', () => {
  it('builds component+key → component → variant chain', () => {
    const token = buildCmfButtonPropToken('bg', 'mantine-bg', {
      scope: { component: 'header', key: 'sign_in' },
      variant: 'filled',
      tail: 'variant',
    });

    expect(token).toBe(
      'var(--cmf-button-header-sign_in-bg, var(--cmf-button-header-bg, var(--cmf-button-filled-bg, mantine-bg)))',
    );
  });

  it('builds component+key → component+role → component → variant', () => {
    const token = buildCmfActionIconPropToken('bd', 'transparent', {
      scope: { component: 'sidebar-dropdown', key: 'casino', role: 'parent' },
      variant: 'transparent',
      tail: 'variant',
    });

    expect(token).toBe(
      'var(--cmf-action-icon-sidebar-dropdown-casino-bd, var(--cmf-action-icon-sidebar-dropdown-parent-bd, var(--cmf-action-icon-sidebar-dropdown-bd, var(--cmf-action-icon-transparent-bd, transparent))))',
    );
  });

  it('builds child role layer for nested dropdown rows', () => {
    const token = buildCmfActionIconPropToken('bd', 'transparent', {
      scope: { component: 'sidebar-dropdown', key: 'slots', role: 'child' },
      variant: 'transparent',
      tail: 'variant',
    });

    expect(token).toBe(
      'var(--cmf-action-icon-sidebar-dropdown-slots-bd, var(--cmf-action-icon-sidebar-dropdown-child-bd, var(--cmf-action-icon-sidebar-dropdown-bd, var(--cmf-action-icon-transparent-bd, transparent))))',
    );
  });

  it('builds component → variant without key', () => {
    const token = buildCmfButtonPropToken('color', '#000', {
      scope: { component: 'sidebar' },
      variant: 'outline',
      tail: 'variant',
    });

    expect(token).toBe('var(--cmf-button-sidebar-color, var(--cmf-button-outline-color, #000))');
  });

  it('builds shared radius tail', () => {
    const token = buildCmfButtonPropToken('radius', 'var(--mantine-radius-md)', {
      scope: { component: 'header', key: 'sign_up' },
      variant: 'default',
      tail: 'shared',
    });

    expect(token).toBe(
      'var(--cmf-button-header-sign_up-radius, var(--cmf-button-header-radius, var(--cmf-button-radius, var(--mantine-radius-md))))',
    );
  });

  it('builds Group layout cascade key → component → shared', () => {
    const token = buildCmfGroupPropToken('justify', 'flex-start', {
      scope: { component: 'sidebar-header', key: 'logo' },
    });

    expect(token).toBe(
      'var(--cmf-group-sidebar-header-logo-justify, var(--cmf-group-sidebar-header-justify, var(--cmf-group-justify, flex-start)))',
    );
  });

  it('includeVariantInShared inserts data-variant before shared control token', () => {
    const token = buildCmfButtonPropToken('icon-height', 'var(--cmf-icon-height)', {
      scope: { component: 'sidebar', key: 'home' },
      variant: 'outline',
      tail: 'shared',
      includeVariantInShared: true,
    });

    expect(token).toBe(
      'var(--cmf-button-sidebar-home-icon-height, var(--cmf-button-sidebar-icon-height, var(--cmf-button-outline-icon-height, var(--cmf-button-icon-height, var(--cmf-icon-height)))))',
    );
  });

  it('builds height via variant (not size)', () => {
    const token = buildCmfButtonPropToken('height', 'var(--button-height-sm)', {
      scope: { component: 'header' },
      variant: 'default',
      tail: 'variant',
    });

    expect(token).toBe(
      'var(--cmf-button-header-height, var(--cmf-button-default-height, var(--button-height-sm)))',
    );
  });

  it('without component: data-variant only', () => {
    const token = buildCmfButtonPropToken('bg', '#059669', {
      variant: 'filled',
      tail: 'variant',
    });

    expect(token).toBe('var(--cmf-button-filled-bg, #059669)');
  });

  it('without component + shared: data-variant → shared', () => {
    const token = buildCmfButtonPropToken('radius', 'var(--mantine-radius-md)', {
      variant: 'filled',
      tail: 'shared',
    });

    expect(token).toBe(
      'var(--cmf-button-filled-radius, var(--cmf-button-radius, var(--mantine-radius-md)))',
    );
  });

  it('key layer wins over component and variant', () => {
    const token = buildCmfButtonPropToken('bg', '#d97706', {
      scope: { component: 'sidebar', key: 'search_leftmenu' },
      variant: 'default',
      tail: 'variant',
    });

    expect(token).toBe(
      'var(--cmf-button-sidebar-search_leftmenu-bg, var(--cmf-button-sidebar-bg, var(--cmf-button-default-bg, #d97706)))',
    );
  });

  it('reads scope from data-* attrs and cmf* props', () => {
    expect(
      resolveCmfScope({
        'data-cmf-component': 'header',
        'data-cmf-key': 'link',
      }),
    ).toEqual({ component: 'header', key: 'link', role: undefined });

    expect(
      resolveCmfScope({
        cmfComponent: 'banner',
        cmfKey: 'cta',
      }),
    ).toEqual({ component: 'banner', key: 'cta', role: undefined });

    expect(
      resolveCmfScope({
        'data-cmf-component': 'sidebar-dropdown',
        'data-cmf-key': 'casino',
        'data-cmf-role': 'parent',
      }),
    ).toEqual({ component: 'sidebar-dropdown', key: 'casino', role: 'parent' });
  });
});
