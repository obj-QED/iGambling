import { describe, expect, it } from 'vitest';

import { mantineTheme } from '../mantineTheme';

describe('mantineTheme', () => {
  it('uses project breakpoint thresholds globally', () => {
    expect(mantineTheme.breakpoints).toEqual({
      xs: '0em',
      sm: '48em',
      md: '62.0625em',
      lg: '77.5em',
      xl: '120em',
    });
  });

  it('exposes mobile size range through theme.other', () => {
    expect(mantineTheme.other?.size.mobile).toEqual({
      min: 0,
      max: 992,
      media: '(max-width: 62em)',
    });
  });
});
