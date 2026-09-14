import { describe, expect, it } from 'vitest';

import { resolveSearchInputRootVars } from '@/assets/theme/mantine/vars/searchInputVars';

describe('resolveSearchInputRootVars', () => {
  it('cascades hover / section / code paint from --cmf-search-*', () => {
    const vars = resolveSearchInputRootVars({
      size: 'md',
      'data-cmf-component': 'header',
      'data-cmf-key': 'search',
    });

    expect(vars['--input-hover']).toContain('--cmf-search-header-search-hover');
    expect(vars['--input-hover']).toContain('--cmf-search-header-hover');
    expect(vars['--input-hover']).toContain('--cmf-search-hover');
    expect(vars['--input-section-color']).toContain('--cmf-search-header-search-section-color');
    expect(vars['--input-section-hover-color']).toContain(
      '--cmf-search-header-search-section-hover-color',
    );
    expect(vars['--input-code-bg']).toContain('--cmf-search-header-search-code-bg');
    expect(vars['--input-code-hover-bg']).toContain('--cmf-search-header-search-code-hover-bg');
    expect(vars['--input-code-focus-color']).toContain(
      '--cmf-search-header-search-code-focus-color',
    );
    expect(vars['--input-clear-color']).toContain('--cmf-search-header-search-clear-color');
    expect(vars['--input-clear-hover-bg']).toContain('--cmf-search-header-search-clear-hover-bg');
    expect(vars['--input-clear-size']).toContain('--cmf-search-header-search-clear-size');
    expect(vars['--input-icon-size']).toContain('--cmf-search-header-search-icon-size');
    expect(vars['--input-section-color']).toContain('--cmf-search-header-search-icon-color');
    expect(vars['--input-radius']).toContain('--cmf-search-header-search-radius');
    expect(vars['--input-radius']).toContain('--cmf-search-header-radius');
    expect(vars['--input-radius']).toContain('--cmf-search-radius');
    expect(vars['--input-radius']).toContain('--mantine-radius-md');
  });

  it('keeps field and code backgrounds distinct in default and hover fallbacks', () => {
    const vars = resolveSearchInputRootVars({
      'data-cmf-component': 'header',
      'data-cmf-key': 'search',
    });

    expect(vars['--input-bg']).toContain('--cmf-search-bg');
    expect(vars['--input-hover']).toContain('--cmf-search-hover');
    expect(vars['--input-code-bg']).toContain('--cmf-search-code-bg');
    expect(vars['--input-code-hover-bg']).toContain('--cmf-search-code-hover-bg');
    expect(vars['--input-code-bg']).toContain('dark-7');
    expect(vars['--input-code-hover-bg']).toContain('dark-4');
    expect(vars['--input-bg']).not.toContain('dark-7');
    expect(vars['--input-hover']).not.toContain('dark-4');
  });

  it('sets pointer cursor for overlay triggers', () => {
    const vars = resolveSearchInputRootVars({
      'data-cmf-component': 'sidebar',
      'data-cmf-key': 'search',
      'data-search-overlay': 'true',
    });

    expect(vars['--input-cursor']).toMatch(/pointer/);
  });
});
