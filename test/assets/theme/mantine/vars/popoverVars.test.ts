import { describe, expect, it } from 'vitest';

import { buildPopoverPropToken } from '@/assets/theme/mantine/cmf/cmfCascadeResolve';
import { resolvePopoverDropdownVars } from '@/assets/theme/mantine/vars/popoverVars';

describe('buildPopoverPropToken', () => {
  it('nests key → component → base', () => {
    const token = buildPopoverPropToken('bg', 'fallback', {
      scope: { component: 'header', key: 'wallet' },
    });

    expect(token).toBe(
      'var(--popover-header-wallet-bg, var(--popover-header-bg, var(--popover-bg, fallback)))',
    );
  });

  it('falls back to base without scope', () => {
    expect(buildPopoverPropToken('padding', '0')).toBe('var(--popover-padding, 0)');
  });
});

describe('resolvePopoverDropdownVars', () => {
  it('emits private paint vars for default popover', () => {
    const vars = resolvePopoverDropdownVars({});

    expect(vars['--_cmf-popover-bg']).toContain('--popover-bg');
    expect(vars['--_cmf-popover-radius']).toContain('--popover-radius');
  });

  it('honors Mantine radius / shadow props as nest fallbacks', () => {
    const vars = resolvePopoverDropdownVars({ radius: 'lg', shadow: 'xl' });

    expect(vars['--_cmf-popover-radius']).toContain('var(--mantine-radius-lg)');
    expect(vars['--_cmf-popover-shadow']).toContain('var(--mantine-shadow-xl)');
  });
});
