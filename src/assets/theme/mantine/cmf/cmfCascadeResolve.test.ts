import { describe, expect, it } from 'vitest';

import { buildCmfControlToken, resolveCmfScope } from './cmfCascadeResolve';

describe('cmfCascadeResolve', () => {
  it('builds 4-layer button token chain', () => {
    const token = buildCmfControlToken('button', 'filled-bg', 'mantine-bg', {
      component: 'header',
      key: 'sign_in',
    });

    expect(token).toBe(
      'var(--cmf-header-sign_in-button-filled-bg, var(--cmf-header-button-filled-bg, var(--cmf-button-filled-bg, mantine-bg)))',
    );
  });

  it('builds component + global layers without key', () => {
    const token = buildCmfControlToken('button', 'outline-color', '#000', {
      component: 'sidebar',
    });

    expect(token).toBe(
      'var(--cmf-sidebar-button-outline-color, var(--cmf-button-outline-color, #000))',
    );
  });

  it('builds global + mantine layers without scope', () => {
    expect(buildCmfControlToken('action-icon', 'filled-bg', 'mantine-ai')).toBe(
      'var(--cmf-action-icon-filled-bg, mantine-ai)',
    );
  });

  it('reads scope from data-* attrs and cmf* props', () => {
    expect(
      resolveCmfScope({
        'data-cmf-component': 'header',
        'data-menu-key': 'link',
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
