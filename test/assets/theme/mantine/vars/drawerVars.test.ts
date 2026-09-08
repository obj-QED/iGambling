import { describe, expect, it } from 'vitest';

import {
  buildDrawerPropToken,
  buildDrawerViewportSizeToken,
} from '@/assets/theme/mantine/cmf/cmfCascadeResolve';
import { resolveDrawerRootVars } from '@/assets/theme/mantine/vars/drawerVars';

describe('buildDrawerPropToken', () => {
  it('nests key → component → base', () => {
    const token = buildDrawerPropToken('bg', 'fallback', {
      scope: { component: 'layout', key: 'sidebar' },
    });

    expect(token).toBe(
      'var(--cmf-drawer-layout-sidebar-bg, var(--cmf-drawer-layout-bg, var(--cmf-drawer-bg, fallback)))',
    );
  });

  it('falls back to base without scope', () => {
    expect(buildDrawerPropToken('padding', '0')).toBe('var(--cmf-drawer-padding, 0)');
  });
});

describe('buildDrawerViewportSizeToken', () => {
  it('inserts key size before base size-tablet', () => {
    const token = buildDrawerViewportSizeToken('tablet', '35vw', {
      scope: { component: 'layout', key: 'sidebar' },
    });

    expect(token).toBe(
      [
        'var(--cmf-drawer-layout-sidebar-size-tablet',
        'var(--cmf-drawer-layout-size-tablet',
        'var(--cmf-drawer-layout-sidebar-size',
        'var(--cmf-drawer-layout-size',
        'var(--cmf-drawer-size-tablet',
        'var(--cmf-drawer-size, 35vw))))))',
      ].join(', '),
    );
  });

  it('uses base size-{band} without scope', () => {
    expect(buildDrawerViewportSizeToken('mobile', '100%')).toBe(
      'var(--cmf-drawer-size-mobile, var(--cmf-drawer-size, 100%))',
    );
  });
});

describe('resolveDrawerRootVars', () => {
  it('emits private paint vars for default drawer', () => {
    const vars = resolveDrawerRootVars({});

    expect(vars['--_cmf-drawer-bg']).toBe(
      'var(--cmf-drawer-bg, light-dark(var(--mantine-color-body), var(--mantine-color-dark-7)))',
    );
    expect(vars['--_cmf-drawer-color']).toContain('--cmf-drawer-color');
    expect(vars['--_cmf-drawer-title-fz']).toContain('--cmf-drawer-title-fz');
    expect(vars['--_cmf-drawer-close-size']).toContain('--cmf-drawer-close-size');
  });

  it('nests sidebar key for layout chrome', () => {
    const vars = resolveDrawerRootVars({
      'data-cmf-component': 'layout',
      'data-cmf-key': 'sidebar',
    });

    expect(vars['--_cmf-drawer-bg']).toContain('--cmf-drawer-layout-sidebar-bg');
    expect(vars['--_cmf-drawer-padding']).toContain('--cmf-drawer-layout-sidebar-padding');
    expect(vars['--_cmf-drawer-size']).toContain('--cmf-drawer-layout-sidebar-size');
    expect(vars['--_cmf-drawer-size-tablet']).toContain('--cmf-drawer-layout-sidebar-size-tablet');
    expect(vars['--_cmf-drawer-size-tablet']).toContain('--cmf-drawer-layout-sidebar-size');
    expect(vars['--_cmf-drawer-inset']).toContain('--cmf-drawer-layout-sidebar-inset');
    expect(vars['--_cmf-drawer-overlay-opacity']).toContain(
      '--cmf-drawer-layout-sidebar-overlay-opacity',
    );
  });
});
