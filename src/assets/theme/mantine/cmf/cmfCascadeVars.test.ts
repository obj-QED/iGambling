import { describe, expect, it } from 'vitest';

import {
  cmfComponentButtonVar,
  cmfComponentKeyButtonVar,
  cmfGlobalButtonVar,
} from './cmfCascadeVars';
import { cmfComponentIconVar, cmfComponentKeyIconVar, cmfGlobalIconVar } from './cmfIconVars';

describe('cmfCascadeVars', () => {
  it('builds global button token names', () => {
    expect(cmfGlobalButtonVar('filled-bg')).toBe('--cmf-button-filled-bg');
  });

  it('builds component button token names', () => {
    expect(cmfComponentButtonVar('header', 'outline-color')).toBe(
      '--cmf-header-button-outline-color',
    );
  });

  it('builds key button token names', () => {
    expect(cmfComponentKeyButtonVar('sidebar', 'tournaments', 'transparent-bg')).toBe(
      '--cmf-sidebar-tournaments-button-transparent-bg',
    );
  });
});

describe('cmfIconVars', () => {
  it('builds icon cascade token names', () => {
    expect(cmfGlobalIconVar('width')).toBe('--cmf-icon-width');
    expect(cmfComponentIconVar('header', 'shape')).toBe('--cmf-header-icon-shape');
    expect(cmfComponentKeyIconVar('header', 'link', 'radius-mode')).toBe(
      '--cmf-header-link-icon-radius-mode',
    );
  });
});
