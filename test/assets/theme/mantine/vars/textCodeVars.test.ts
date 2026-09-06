import { describe, expect, it } from 'vitest';

import { resolveCodeRootVars } from '@/assets/theme/mantine/vars/codeVars';
import { resolveTextRootVars } from '@/assets/theme/mantine/vars/textVars';

describe('resolveTextRootVars', () => {
  it('nests component → default for fz/lh/color', () => {
    const vars = resolveTextRootVars({ 'data-cmf-component': 'layout' });

    expect(vars['--text-fz']).toBe(
      'var(--cmf-text-layout-fz, var(--cmf-text-default-fz, var(--mantine-font-size-md)))',
    );
    expect(vars['--text-lh']).toBe(
      'var(--cmf-text-layout-lh, var(--cmf-text-default-lh, var(--mantine-line-height-md)))',
    );
    expect(vars['--text-color']).toBe(
      'var(--cmf-text-layout-color, var(--cmf-text-default-color, var(--color-text, var(--mantine-color-text))))',
    );
  });

  it('nests default color without component scope', () => {
    const vars = resolveTextRootVars({ size: 'sm' });

    expect(vars['--text-color']).toBe(
      'var(--cmf-text-default-color, var(--color-text, var(--mantine-color-text)))',
    );
    expect(vars['--text-fz']).toBe('var(--cmf-text-default-fz, var(--mantine-font-size-sm))');
  });

  it('uses dimmed cascade segment and mantine dimmed fallback when c=dimmed', () => {
    const vars = resolveTextRootVars({
      'data-cmf-component': 'test',
      c: 'dimmed',
    });

    expect(vars['--text-color']).toBe(
      'var(--cmf-text-test-color, var(--cmf-text-dimmed-color, var(--mantine-color-dimmed)))',
    );
    // Size tokens stay on default segment
    expect(vars['--text-fz']).toContain('--cmf-text-default-fz');
  });

  it('uses bright cascade segment when c=bright', () => {
    const vars = resolveTextRootVars({
      'data-cmf-component': 'layout',
      c: 'bright',
    });

    expect(vars['--text-color']).toBe(
      'var(--cmf-text-layout-color, var(--cmf-text-bright-color, var(--mantine-color-bright)))',
    );
  });
});

describe('resolveCodeRootVars', () => {
  it('nests component → default for bg and paint', () => {
    const vars = resolveCodeRootVars({
      'data-cmf-component': 'layout',
      'data-cmf-key': 'href',
    });

    expect(vars['--code-bg']).toBe(
      'var(--cmf-code-layout-href-bg, var(--cmf-code-layout-bg, var(--cmf-code-default-bg, light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6)))))',
    );
    expect(vars['--code-color']).toContain('--cmf-code-layout-href-color');
    expect(vars['--code-color']).toContain('--cmf-code-default-color');
    expect(vars['--code-fz']).toContain('--cmf-code-default-fz');
  });
});
