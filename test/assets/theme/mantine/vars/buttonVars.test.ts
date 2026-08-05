import { describe, expect, it } from 'vitest';

import {
  resolveButtonCustomVariantPaintVars,
  resolveButtonRootVars,
} from '@/assets/theme/mantine/vars/buttonVars';

describe('resolveButtonRootVars', () => {
  it('writes data-variant cascade (no size CMF layer)', () => {
    const vars = resolveButtonRootVars({ variant: 'default', size: 'sm' });

    expect(vars['--button-height-sm']).toBeUndefined();
    expect(vars['--button-height']).toBe(
      'var(--cmf-button-default-height, var(--button-height-sm))',
    );
    expect(vars['--button-padding-x']).toBe(
      'var(--cmf-button-default-padding-x, var(--button-padding-x-sm))',
    );
    expect(vars['--button-bg']).toBe('var(--cmf-button-default-bg, var(--mantine-color-default))');
    expect(vars['--button-color']).toBe(
      'var(--cmf-button-default-color, var(--mantine-color-default-color))',
    );
    expect(vars['--button-bd']).toContain('var(--cmf-button-default-bd');
    expect(vars['--button-bd']).not.toContain('var(--cmf-button-sm-bd');
    expect(vars['--button-bd']).toMatch(/var\(--color-border\)\)$/);
    expect(vars['--button-bd']).not.toContain(' solid ');
    expect(vars['--button-bd-width']).toBe(
      'var(--cmf-button-default-bd-width, calc(0.0625rem * var(--mantine-scale)))',
    );
    expect(vars['--button-hover']).toContain('var(--cmf-button-default-hover');
    expect(vars['--button-hover-color']).toContain('var(--cmf-button-default-hover-color');
    expect(vars['--button-shadow']).toBe('var(--cmf-button-default-shadow, none)');
    expect(vars['--button-active-position']).toBe(
      'var(--cmf-button-default-active-position, bottom)',
    );
    expect(vars['--button-active-size']).toBe('var(--cmf-button-default-active-size, 2px)');
    expect(vars['--button-active-color']).toBe(
      'var(--cmf-button-default-active-color, var(--brand-color-5))',
    );
    expect(vars['--button-active-inset']).toBe(
      'var(--cmf-button-default-active-inset, auto 0 0 0)',
    );
    expect(vars['--button-active-width']).toBe('var(--cmf-button-default-active-width, 100%)');
    expect(vars['--button-active-height']).toBe('var(--cmf-button-default-active-height, 2px)');
    expect(vars['--button-active-radius-bl']).toContain('--cmf-button-default-active-radius-bl');
    expect(vars['--button-active-radius-bl']).toContain('--cmf-button-default-active-radius');
    expect(vars['--button-radius']).toContain('var(--cmf-button-default-radius');
    expect(vars['--button-radius']).not.toContain('var(--cmf-button-sm-radius');
    expect(vars['--button-radius-disabled']).toBe(
      'var(--cmf-button-default-radius-disabled, var(--cmf-button-radius-disabled, var(--button-radius)))',
    );
    expect(vars['--button-fz']).toBe('var(--cmf-button-default-fz, var(--mantine-font-size-sm))');
  });

  it('cascades custom variants by name; paint last-resort is Mantine default', () => {
    const vars = resolveButtonRootVars({ variant: 'not-a-real-variant' });

    expect(vars['--button-bg']).toBe(
      'var(--cmf-button-not-a-real-variant-bg, var(--mantine-color-default))',
    );
    expect(vars['--button-hover']).toBe(
      'var(--cmf-button-not-a-real-variant-hover, var(--mantine-color-default-hover))',
    );
  });

  it('uses Mantine radius prop when provided', () => {
    const vars = resolveButtonRootVars({ variant: 'default', radius: 'xl' });

    expect(vars['--button-radius']).toBe('var(--mantine-radius-xl, var(--mantine-radius-md))');
  });

  it('applies component + key → component → data-variant cascade', () => {
    const vars = resolveButtonRootVars({
      variant: 'filled',
      size: 'xs',
      'data-cmf-component': 'header',
      'data-cmf-key': 'sign_in',
    });

    expect(vars['--button-bg']).toBe(
      'var(--cmf-button-header-sign_in-bg, var(--cmf-button-header-bg, var(--cmf-button-filled-bg, light-dark(var(--brand-color-7), var(--brand-color-8)))))',
    );
    expect(vars['--button-color']).toBe(
      'var(--cmf-button-header-sign_in-color, var(--cmf-button-header-color, var(--cmf-button-filled-color, #fff)))',
    );
    expect(vars['--button-hover']).toBe(
      'var(--cmf-button-header-sign_in-hover, var(--cmf-button-header-hover, var(--cmf-button-filled-hover, light-dark(var(--brand-color-6), var(--brand-color-7)))))',
    );
    expect(vars['--button-hover-color']).toContain('--cmf-button-header-sign_in-hover-color');
    expect(vars['--button-shadow']).toBe(
      'var(--cmf-button-header-sign_in-shadow, var(--cmf-button-header-shadow, var(--cmf-button-filled-shadow, none)))',
    );
    expect(vars['--button-active-position']).toBe(
      'var(--cmf-button-header-sign_in-active-position, var(--cmf-button-header-active-position, var(--cmf-button-filled-active-position, bottom)))',
    );
    expect(vars['--button-height']).toBe(
      'var(--cmf-button-header-sign_in-height, var(--cmf-button-header-height, var(--cmf-button-filled-height, var(--button-height-xs))))',
    );
    expect(vars['--button-padding-x']).toBe(
      'var(--cmf-button-header-sign_in-padding-x, var(--cmf-button-header-padding-x, var(--cmf-button-filled-padding-x, var(--button-padding-x-xs))))',
    );
    expect(vars['--button-bd-width']).toBe(
      'var(--cmf-button-header-sign_in-bd-width, var(--cmf-button-header-bd-width, var(--cmf-button-filled-bd-width, calc(0.0625rem * var(--mantine-scale)))))',
    );
  });

  it('resolves sidebar key tokens ahead of component / variant layers', () => {
    const vars = resolveButtonRootVars({
      variant: 'default',
      'data-cmf-component': 'sidebar',
      'data-cmf-key': 'search_leftmenu',
    });

    expect(vars['--button-bg']).toContain('--cmf-button-sidebar-search_leftmenu-bg');
    expect(vars['--button-bg']).toContain('--cmf-button-sidebar-bg');
    expect(vars['--button-hover']).toContain('--cmf-button-sidebar-search_leftmenu-hover');
  });

  it('cascades gradient hover to app gradient hover token', () => {
    const vars = resolveButtonRootVars({ variant: 'gradient' });

    expect(vars['--button-hover']).toContain('--cmf-button-gradient-hover');
    expect(vars['--button-hover']).toContain('--app-gradient-default-hover');
  });

  it('cascades arbitrary custom variant by name with Mantine default paint fallback', () => {
    const custom = resolveButtonRootVars({ variant: 'promo-cta' });

    expect(custom['--button-bg']).toBe(
      'var(--cmf-button-promo-cta-bg, var(--mantine-color-default))',
    );
    expect(custom['--button-hover']).toBe(
      'var(--cmf-button-promo-cta-hover, var(--mantine-color-default-hover))',
    );
    expect(custom['--button-color']).toBe(
      'var(--cmf-button-promo-cta-color, var(--mantine-color-default-color))',
    );
  });

  it('paint-only custom variant bridge skips size/icon/active inline dump', () => {
    const paint = resolveButtonCustomVariantPaintVars({ variant: 'button-link', size: 'sm' });

    expect(paint['--button-bg']).toBe('var(--cmf-button-link-bg, var(--mantine-color-default))');
    expect(paint['--button-color']).toBe(
      'var(--cmf-button-link-color, var(--mantine-color-default-color))',
    );
    expect(paint['--button-radius']).toBe(
      'var(--cmf-button-link-radius, var(--cmf-button-radius, var(--mantine-radius-md)))',
    );
    expect(paint['--button-height']).toBeUndefined();
    expect(paint['--cmf-control-icon-scale']).toBeUndefined();
    expect(paint['--button-active-position']).toBeUndefined();
  });

  it('paint-only custom variant honors radius prop', () => {
    const paint = resolveButtonCustomVariantPaintVars({ variant: 'button-link', radius: 'xl' });

    expect(paint['--button-radius']).toBe('var(--mantine-radius-xl, var(--mantine-radius-md))');
  });

  it('emits icon cascade with data-variant (not size)', () => {
    const vars = resolveButtonRootVars({
      variant: 'default',
      size: 'md',
      'data-cmf-component': 'sidebar',
      'data-cmf-key': 'casino',
    });

    expect(vars['--cmf-control-icon-scale']).toBe(
      'var(--cmf-button-sidebar-casino-icon-scale, var(--cmf-button-sidebar-icon-scale, var(--cmf-button-default-icon-scale, var(--cmf-button-icon-scale, var(--cmf-icon-scale, 0.7)))))',
    );
    expect(vars['--cmf-control-icon-aspect']).toBe(
      'var(--cmf-button-sidebar-casino-icon-aspect, var(--cmf-button-sidebar-icon-aspect, var(--cmf-button-default-icon-aspect, var(--cmf-button-icon-aspect, var(--cmf-icon-aspect, 1)))))',
    );
    expect(vars['--cmf-control-icon-width']).toBe(
      'var(--cmf-button-sidebar-casino-icon-width, var(--cmf-button-sidebar-icon-width, var(--cmf-button-default-icon-width, var(--cmf-button-icon-width, var(--cmf-icon-width)))))',
    );
    expect(vars['--cmf-control-icon-height']).toBe(
      'var(--cmf-button-sidebar-casino-icon-height, var(--cmf-button-sidebar-icon-height, var(--cmf-button-default-icon-height, var(--cmf-button-icon-height, var(--cmf-icon-height)))))',
    );
    expect(vars['--cmf-icon-width']).toBeUndefined();
  });
});
