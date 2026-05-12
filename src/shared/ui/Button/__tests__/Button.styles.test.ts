import { describe, expect, it } from 'vitest';

import { createButtonVars } from '../lib/Button.styles';

describe('createButtonVars', () => {
  it('maps size spacing token to button padding without overriding mantine spacing token', () => {
    const vars = createButtonVars('header-btn-login') as Record<string, string>;

    expect(vars['--button-padding-x']).toBe(
      'var(--header-btn-login-padding-x, var(--header-btn-login-spacing-sm, var(--mantine-spacing-xs)))',
    );
    expect(vars).not.toHaveProperty('--mantine-spacing-xs');
  });

  it('exposes dedicated section margin vars for left and right icons', () => {
    const vars = createButtonVars('header-btn-login') as Record<string, string>;

    expect(vars['--button-left-section-margin']).toBe(
      'var(--header-btn-login-left-section-margin, var(--header-btn-login-section-gap, var(--mantine-spacing-xs)))',
    );
    expect(vars['--button-right-section-margin']).toBe(
      'var(--header-btn-login-right-section-margin, var(--header-btn-login-section-gap, var(--mantine-spacing-xs)))',
    );
  });

  it('applies custom button font weight without overriding mantine token recursively', () => {
    const vars = createButtonVars('header-btn-login') as Record<string, string>;

    expect(vars.fontWeight).toBe(
      'var(--header-btn-login-font-weight, var(--mantine-font-weight-regular, 400))',
    );
    expect(vars).not.toHaveProperty('--mantine-font-weight-medium');
  });
});
