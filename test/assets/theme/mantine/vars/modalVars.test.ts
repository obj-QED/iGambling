import { describe, expect, it } from 'vitest';

import { buildCmfModalPropToken } from '@/assets/theme/mantine/cmf/cmfCascadeResolve';
import { resolveModalRootVars } from '@/assets/theme/mantine/vars/modalVars';

describe('buildCmfModalPropToken', () => {
  it('falls back to shared without scope', () => {
    expect(buildCmfModalPropToken('padding', '0')).toBe('var(--cmf-modal-padding, 0)');
  });

  it('nests key → component → shared', () => {
    const token = buildCmfModalPropToken('bg', 'fallback', {
      scope: { component: 'header', key: 'search' },
    });

    expect(token).toBe(
      'var(--cmf-modal-header-search-bg, var(--cmf-modal-header-bg, var(--cmf-modal-bg, fallback)))',
    );
  });
});

describe('resolveModalRootVars', () => {
  it('emits default nest for plain Modal', () => {
    const vars = resolveModalRootVars({});

    expect(vars['--modal-bg']).toBe(
      'var(--cmf-modal-bg, light-dark(var(--mantine-color-body), var(--mantine-color-dark-7)))',
    );
    expect(vars['--modal-padding']).toContain('--cmf-modal-padding');
    expect(vars['--modal-radius']).toContain('--cmf-modal-radius');
    expect(vars['--modal-title-fz']).toContain('--cmf-modal-title-fz');
    expect(vars['--modal-close-size']).toContain('--cmf-modal-close-size');
    expect(vars['--modal-overlay-opacity']).toContain('--cmf-modal-overlay-opacity');
  });

  it('nests component/key for scoped Modal', () => {
    const vars = resolveModalRootVars({
      'data-cmf-component': 'header',
      'data-cmf-key': 'search',
    });

    expect(vars['--modal-bg']).toContain('--cmf-modal-header-search-bg');
    expect(vars['--modal-size']).toContain('--cmf-modal-header-search-size');
    expect(vars['--modal-shadow']).toContain('--cmf-modal-header-shadow');
  });
});
