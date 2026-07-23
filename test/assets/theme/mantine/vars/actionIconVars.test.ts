import { describe, expect, it } from 'vitest';

import { resolveActionIconRootVars } from '@/assets/theme/mantine/vars/actionIconVars';

describe('resolveActionIconRootVars', () => {
  it('writes size + visual cascade', () => {
    const vars = resolveActionIconRootVars({ variant: 'default', size: 'sm' });

    expect(vars['--ai-size']).toBe(
      'var(--cmf-action-icon-default-size, var(--cmf-action-icon-sm-size, var(--ai-size-sm)))',
    );
    expect(vars['--ai-bg']).toBe(
      'var(--cmf-action-icon-default-bg, var(--cmf-action-icon-sm-bg, var(--mantine-color-default)))',
    );
    expect(vars['--ai-color']).toContain('var(--cmf-action-icon-default-color');
    expect(vars['--ai-color']).toContain('var(--cmf-action-icon-sm-color');
    expect(vars['--ai-bd']).toContain('var(--cmf-action-icon-default-bd');
    expect(vars['--ai-hover']).toContain('var(--cmf-action-icon-default-hover');
    expect(vars['--ai-hover-color']).toContain('var(--cmf-action-icon-default-hover-color');
    expect(vars['--ai-radius']).toContain('var(--cmf-action-icon-default-radius');
    expect(vars['--ai-radius']).toContain('var(--cmf-action-icon-sm-radius');
  });

  it('applies component + key → component → variant cascade', () => {
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
    expect(vars['--ai-size']).toBe(
      'var(--cmf-action-icon-header-search-size, var(--cmf-action-icon-header-size, var(--cmf-action-icon-xs-size, var(--ai-size-xs))))',
    );
  });

  it('falls back to default variant for unknown keys', () => {
    const vars = resolveActionIconRootVars({ variant: 'not-real' });

    expect(vars['--ai-bg']).toContain('var(--cmf-action-icon-default-bg');
  });

  it('emits icon scale/aspect/width/height cascade on the control', () => {
    const vars = resolveActionIconRootVars({
      variant: 'transparent',
      size: 'md',
      'data-cmf-component': 'header',
      'data-cmf-key': 'home',
    });

    expect(vars['--cmf-control-icon-scale']).toBe(
      'var(--cmf-action-icon-header-home-icon-scale, var(--cmf-action-icon-header-icon-scale, var(--cmf-action-icon-md-icon-scale, var(--cmf-action-icon-icon-scale, var(--cmf-icon-scale, 0.7)))))',
    );
    expect(vars['--cmf-control-icon-aspect']).toBe(
      'var(--cmf-action-icon-header-home-icon-aspect, var(--cmf-action-icon-header-icon-aspect, var(--cmf-action-icon-md-icon-aspect, var(--cmf-action-icon-icon-aspect, var(--cmf-icon-aspect, 1)))))',
    );
    expect(vars['--cmf-control-icon-width']).toBe(
      'var(--cmf-action-icon-header-home-icon-width, var(--cmf-action-icon-header-icon-width, var(--cmf-action-icon-md-icon-width, var(--cmf-action-icon-icon-width, var(--cmf-icon-width)))))',
    );
    expect(vars['--cmf-control-icon-height']).toBe(
      'var(--cmf-action-icon-header-home-icon-height, var(--cmf-action-icon-header-icon-height, var(--cmf-action-icon-md-icon-height, var(--cmf-action-icon-icon-height, var(--cmf-icon-height)))))',
    );
    expect(vars['--cmf-icon-width']).toBeUndefined();
  });
});
