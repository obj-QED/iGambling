import { describe, expect, it } from 'vitest';

import { resolveButtonRootVars } from './buttonVars';

describe('resolveButtonRootVars', () => {
  it('maps default variant to --button-* CSS variables', () => {
    const vars = resolveButtonRootVars({ variant: 'default', size: 'md' });

    expect(vars['--button-bg']).toContain('var(--cmf-button-default-bg');
    expect(vars['--button-color']).toContain('var(--cmf-button-default-color');
    expect(vars['--button-hover']).toContain('var(--cmf-button-default-hover');
    expect(vars['--button-radius']).toContain('var(--cmf-button-radius');
  });

  it('falls back to default variant for unknown variant keys', () => {
    const vars = resolveButtonRootVars({ variant: 'not-a-real-variant' });

    expect(vars['--button-bg']).toContain('var(--cmf-button-default-bg');
  });

  it('resolves filled variant tokens', () => {
    const vars = resolveButtonRootVars({ variant: 'filled' });

    expect(vars['--button-bg']).toContain('var(--cmf-button-filled-bg');
    expect(vars['--button-loading-bg']).toContain('var(--cmf-button-filled-loading-bg');
  });
});
