import { describe, expect, it } from 'vitest';

import {
  buildCmfActionIconPropToken,
  buildCmfButtonPropToken,
  buildCmfCodePropToken,
  buildCmfGroupPropToken,
  buildCmfModalPropToken,
  buildCmfTextPropToken,
  parentCmfComponent,
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

  it('builds component+key → role → component → variant → parent widget', () => {
    const token = buildCmfActionIconPropToken('bd', 'transparent', {
      scope: { component: 'sidebar-dropdown', key: 'casino', role: 'parent' },
      variant: 'transparent',
      tail: 'variant',
    });

    expect(token).toBe(
      'var(--cmf-action-icon-sidebar-dropdown-casino-bd, var(--cmf-action-icon-sidebar-dropdown-parent-bd, var(--cmf-action-icon-sidebar-dropdown-bd, var(--cmf-action-icon-transparent-bd, var(--cmf-action-icon-sidebar-bd, transparent)))))',
    );
  });

  it('builds child role layer for nested dropdown rows', () => {
    const token = buildCmfActionIconPropToken('bd', 'transparent', {
      scope: { component: 'sidebar-dropdown', key: 'slots', role: 'child' },
      variant: 'transparent',
    });

    expect(token).toBe(
      'var(--cmf-action-icon-sidebar-dropdown-slots-bd, var(--cmf-action-icon-sidebar-dropdown-child-bd, var(--cmf-action-icon-sidebar-dropdown-bd, var(--cmf-action-icon-transparent-bd, var(--cmf-action-icon-sidebar-bd, transparent)))))',
    );
  });

  it('sanitizes menu keys with spaces for valid CSS custom properties', () => {
    const token = buildCmfActionIconPropToken('bg', 'transparent', {
      scope: { component: 'sidebar-dropdown', key: 'instant game', role: 'child' },
      variant: 'subtle',
    });

    expect(token).toBe(
      'var(--cmf-action-icon-sidebar-dropdown-instant-game-bg, var(--cmf-action-icon-sidebar-dropdown-child-bg, var(--cmf-action-icon-sidebar-dropdown-bg, var(--cmf-action-icon-subtle-bg, var(--cmf-action-icon-sidebar-bg, transparent)))))',
    );
    expect(token).not.toContain('instant game');
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

  it('builds Group layout cascade key → component → parent → shared', () => {
    const token = buildCmfGroupPropToken('justify', 'flex-start', {
      scope: { component: 'sidebar-header', key: 'logo' },
    });

    expect(token).toBe(
      'var(--cmf-group-sidebar-header-logo-justify, var(--cmf-group-sidebar-header-justify, var(--cmf-group-sidebar-justify, var(--cmf-group-justify, flex-start))))',
    );
  });

  it('builds Group gap with shared --cmf-group-gap last before fallback', () => {
    const token = buildCmfGroupPropToken('gap', 'var(--mantine-spacing-sm)', {
      scope: { component: 'sidebar-footer', key: 'logout' },
    });

    expect(token).toBe(
      'var(--cmf-group-sidebar-footer-logout-gap, var(--cmf-group-sidebar-footer-gap, var(--cmf-group-sidebar-gap, var(--cmf-group-gap, var(--mantine-spacing-sm)))))',
    );
  });

  it('falls back sidebar-header active tokens to sidebar widget layer after variant', () => {
    const token = buildCmfButtonPropToken('active-inset', 'auto 0 0 0', {
      scope: { component: 'sidebar-header', key: 'account' },
      variant: 'default',
      tail: 'variant',
    });

    expect(token).toBe(
      'var(--cmf-button-sidebar-header-account-active-inset, var(--cmf-button-sidebar-header-active-inset, var(--cmf-button-default-active-inset, var(--cmf-button-sidebar-active-inset, auto 0 0 0))))',
    );
  });

  it('falls back sidebar-footer active tokens to sidebar widget layer after variant', () => {
    const token = buildCmfButtonPropToken('active-color', 'var(--brand-color-5)', {
      scope: { component: 'sidebar-footer', key: 'support' },
      variant: 'default',
      tail: 'variant',
    });

    expect(token).toBe(
      'var(--cmf-button-sidebar-footer-support-active-color, var(--cmf-button-sidebar-footer-active-color, var(--cmf-button-default-active-color, var(--cmf-button-sidebar-active-color, var(--brand-color-5)))))',
    );
  });

  it('variant paint wins over parent widget paint', () => {
    const token = buildCmfButtonPropToken('bg', 'var(--mantine-color-white)', {
      scope: { component: 'sidebar-footer', key: 'logout' },
      variant: 'white',
      tail: 'variant',
    });

    expect(token).toBe(
      'var(--cmf-button-sidebar-footer-logout-bg, var(--cmf-button-sidebar-footer-bg, var(--cmf-button-white-bg, var(--cmf-button-sidebar-bg, var(--mantine-color-white)))))',
    );
  });

  it('parentCmfComponent splits widget-chrome', () => {
    expect(parentCmfComponent('sidebar-header')).toBe('sidebar');
    expect(parentCmfComponent('sidebar-dropdown')).toBe('sidebar');
    expect(parentCmfComponent('sidebar')).toBeUndefined();
  });

  it('builds Modal cascade key → component → shared', () => {
    const token = buildCmfModalPropToken('bg', 'var(--mantine-color-body)', {
      scope: { component: 'layout', key: 'search' },
    });

    expect(token).toBe(
      'var(--cmf-modal-layout-search-bg, var(--cmf-modal-layout-bg, var(--cmf-modal-bg, var(--mantine-color-body))))',
    );
  });

  it('builds Text cascade key → component → default → parent', () => {
    const token = buildCmfTextPropToken('color', 'inherit', {
      scope: { component: 'sidebar-header', key: 'account' },
    });

    expect(token).toBe(
      'var(--cmf-text-sidebar-header-account-color, var(--cmf-text-sidebar-header-color, var(--cmf-text-default-color, var(--cmf-text-sidebar-color, inherit))))',
    );
  });

  it('builds Code cascade component → default', () => {
    const token = buildCmfCodePropToken('bg', 'var(--mantine-color-dark-6)', {
      scope: { component: 'layout' },
    });

    expect(token).toBe(
      'var(--cmf-code-layout-bg, var(--cmf-code-default-bg, var(--mantine-color-dark-6)))',
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

  it('reads scope from data-cmf-* attrs only', () => {
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
    ).toEqual({ component: undefined, key: undefined, role: undefined });

    expect(
      resolveCmfScope({
        'data-cmf-component': 'sidebar-dropdown',
        'data-cmf-key': 'casino',
        'data-cmf-role': 'parent',
      }),
    ).toEqual({ component: 'sidebar-dropdown', key: 'casino', role: 'parent' });
  });
});
