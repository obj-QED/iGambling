import { describe, expect, it } from 'vitest';

import {
  buildCmfButtonPropToken,
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

  it('includeSizeInShared inserts size before shared control token', () => {
    const token = buildCmfButtonPropToken('icon-height', 'var(--cmf-icon-height)', {
      scope: { component: 'sidebar', key: 'home' },
      size: 'sm',
      tail: 'shared',
      includeSizeInShared: true,
    });

    expect(token).toBe(
      'var(--cmf-button-sidebar-home-icon-height, var(--cmf-button-sidebar-icon-height, var(--cmf-button-sm-icon-height, var(--cmf-button-icon-height, var(--cmf-icon-height)))))',
    );
  });

  it('builds size fz tail', () => {
    const token = buildCmfButtonPropToken('fz', '1rem', {
      scope: { component: 'header' },
      size: 'sm',
      tail: 'size',
    });

    expect(token).toBe('var(--cmf-button-header-fz, var(--cmf-button-sm-fz, 1rem))');
  });

  it('without component: variant → size', () => {
    const token = buildCmfButtonPropToken('bg', '#059669', {
      variant: 'hero',
      size: 'md',
      tail: 'variant',
    });

    expect(token).toBe('var(--cmf-button-hero-bg, var(--cmf-button-md-bg, #059669))');
  });

  it('without component + shared: variant → size → shared', () => {
    const token = buildCmfButtonPropToken('radius', 'var(--mantine-radius-md)', {
      variant: 'hero',
      size: 'md',
      tail: 'shared',
    });

    expect(token).toBe(
      'var(--cmf-button-hero-radius, var(--cmf-button-md-radius, var(--cmf-button-radius, var(--mantine-radius-md))))',
    );
  });

  it('prepends exception key token', () => {
    const token = buildCmfButtonPropToken('bg', '#d97706', {
      scope: { component: 'sidebar', key: 'search_leftmenu' },
      variant: 'exception',
      tail: 'variant',
    });

    expect(token).toBe(
      'var(--cmf-button-exception-search_leftmenu-bg, var(--cmf-button-sidebar-search_leftmenu-bg, var(--cmf-button-sidebar-bg, var(--cmf-button-exception-bg, #d97706))))',
    );
  });

  it('reads scope from data-* attrs and cmf* props', () => {
    expect(
      resolveCmfScope({
        'data-cmf-component': 'header',
        'data-cmf-key': 'link',
      }),
    ).toEqual({ component: 'header', key: 'link' });

    expect(
      resolveCmfScope({
        cmfComponent: 'banner',
        cmfKey: 'cta',
      }),
    ).toEqual({ component: 'banner', key: 'cta' });
  });
});
