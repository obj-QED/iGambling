import { describe, expect, it } from 'vitest';

import { resolveActionIconRootVars } from '@/assets/theme/mantine/vars/actionIconVars';

describe('resolveActionIconRootVars', () => {
  it('writes data-variant cascade (no size CMF layer)', () => {
    const vars = resolveActionIconRootVars({ variant: 'default', size: 'sm' });

    expect(vars['--ai-size']).toBe('var(--cmf-action-icon-default-size, var(--ai-size-sm))');
    expect(vars['--ai-bg']).toBe('var(--cmf-action-icon-default-bg, var(--mantine-color-default))');
    expect(vars['--ai-color']).toContain('var(--cmf-action-icon-default-color');
    expect(vars['--ai-color']).not.toContain('var(--cmf-action-icon-sm-color');
    expect(vars['--ai-bd']).toContain('var(--cmf-action-icon-default-bd');
    expect(vars['--ai-hover']).toContain('var(--cmf-action-icon-default-hover');
    expect(vars['--ai-hover-color']).toContain('var(--cmf-action-icon-default-hover-color');
    expect(vars['--ai-shadow']).toBe('var(--cmf-action-icon-default-shadow, none)');
    expect(vars['--ai-active-position']).toBe(
      'var(--cmf-action-icon-default-active-position, bottom)',
    );
    expect(vars['--ai-radius']).toContain('var(--cmf-action-icon-default-radius');
    expect(vars['--ai-radius']).not.toContain('var(--cmf-action-icon-sm-radius');
  });

  it('applies component + key → component → data-variant cascade', () => {
    const vars = resolveActionIconRootVars({
      variant: 'filled',
      size: 'xs',
      'data-cmf-component': 'header',
      'data-cmf-key': 'search',
    });

    expect(vars['--ai-bg']).toBe(
      'var(--cmf-action-icon-header-search-bg, var(--cmf-action-icon-header-bg, var(--cmf-action-icon-filled-bg, var(--mantine-color-brand-4))))',
    );
    expect(vars['--ai-color']).toBe(
      'var(--cmf-action-icon-header-search-color, var(--cmf-action-icon-header-color, var(--cmf-action-icon-filled-color, var(--mantine-primary-color-contrast))))',
    );
    expect(vars['--ai-hover']).toContain('--cmf-action-icon-header-search-hover');
    expect(vars['--ai-shadow']).toBe(
      'var(--cmf-action-icon-header-search-shadow, var(--cmf-action-icon-header-shadow, var(--cmf-action-icon-filled-shadow, none)))',
    );
    expect(vars['--ai-size']).toBe(
      'var(--cmf-action-icon-header-search-size, var(--cmf-action-icon-header-size, var(--cmf-action-icon-filled-size, var(--ai-size-xs))))',
    );
  });

  it('falls back to default variant for unknown keys', () => {
    const vars = resolveActionIconRootVars({ variant: 'not-real' });

    expect(vars['--ai-bg']).toContain('var(--cmf-action-icon-default-bg');
  });

  it('emits icon cascade with data-variant (not size)', () => {
    const vars = resolveActionIconRootVars({
      variant: 'transparent',
      size: 'md',
      'data-cmf-component': 'header',
      'data-cmf-key': 'home',
    });

    expect(vars['--cmf-control-icon-scale']).toBe(
      'var(--cmf-action-icon-header-home-icon-scale, var(--cmf-action-icon-header-icon-scale, var(--cmf-action-icon-transparent-icon-scale, var(--cmf-action-icon-icon-scale, var(--cmf-icon-scale, 0.7)))))',
    );
    expect(vars['--cmf-control-icon-aspect']).toBe(
      'var(--cmf-action-icon-header-home-icon-aspect, var(--cmf-action-icon-header-icon-aspect, var(--cmf-action-icon-transparent-icon-aspect, var(--cmf-action-icon-icon-aspect, var(--cmf-icon-aspect, 1)))))',
    );
    expect(vars['--cmf-control-icon-width']).toBe(
      'var(--cmf-action-icon-header-home-icon-width, var(--cmf-action-icon-header-icon-width, var(--cmf-action-icon-transparent-icon-width, var(--cmf-action-icon-icon-width, var(--cmf-icon-width)))))',
    );
    expect(vars['--cmf-control-icon-height']).toBe(
      'var(--cmf-action-icon-header-home-icon-height, var(--cmf-action-icon-header-icon-height, var(--cmf-action-icon-transparent-icon-height, var(--cmf-action-icon-icon-height, var(--cmf-icon-height)))))',
    );
    expect(vars['--cmf-icon-width']).toBeUndefined();
  });
});
