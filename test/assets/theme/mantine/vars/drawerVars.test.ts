import { describe, expect, it } from 'vitest';

import { buildDrawerPropToken } from '@/assets/theme/mantine/cmf/cmfCascadeResolve';
import { resolveDrawerRootVars } from '@/assets/theme/mantine/vars/drawerVars';

describe('buildDrawerPropToken', () => {
  it('nests key → component → base', () => {
    const token = buildDrawerPropToken('bg', 'fallback', {
      scope: { component: 'layout', key: 'sidebar' },
    });

    expect(token).toBe(
      'var(--drawer-layout-sidebar-bg, var(--drawer-layout-bg, var(--drawer-bg, fallback)))',
    );
  });

  it('falls back to base without scope', () => {
    expect(buildDrawerPropToken('padding', '0')).toBe('var(--drawer-padding, 0)');
  });
});

describe('resolveDrawerRootVars', () => {
  it('emits private paint vars for default drawer', () => {
    const vars = resolveDrawerRootVars({});

    expect(vars['--_cmf-drawer-bg']).toBe(
      'var(--drawer-bg, light-dark(var(--mantine-color-body), var(--mantine-color-dark-7)))',
    );
    expect(vars['--_cmf-drawer-color']).toContain('--drawer-color');
    expect(vars['--_cmf-drawer-title-fz']).toContain('--drawer-title-fz');
    expect(vars['--_cmf-drawer-close-size']).toContain('--drawer-close-size');
  });

  it('nests sidebar key for layout chrome', () => {
    const vars = resolveDrawerRootVars({
      'data-cmf-component': 'layout',
      'data-cmf-key': 'sidebar',
    });

    expect(vars['--_cmf-drawer-bg']).toContain('--drawer-layout-sidebar-bg');
    expect(vars['--_cmf-drawer-padding']).toContain('--drawer-layout-sidebar-padding');
    expect(vars['--_cmf-drawer-overlay-opacity']).toContain(
      '--drawer-layout-sidebar-overlay-opacity',
    );
  });
});
