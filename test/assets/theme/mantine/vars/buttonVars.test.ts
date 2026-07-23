import { describe, expect, it } from 'vitest';

import { resolveButtonRootVars } from '@/assets/theme/mantine/vars/buttonVars';

describe('resolveButtonRootVars', () => {
  it('writes size + visual cascade (height / padding-x / hover included)', () => {
    const vars = resolveButtonRootVars({ variant: 'default', size: 'sm' });

    expect(vars['--button-height-sm']).toBeUndefined();
    expect(vars['--button-height']).toBe(
      'var(--cmf-button-default-height, var(--cmf-button-sm-height, var(--button-height-sm)))',
    );
    expect(vars['--button-padding-x']).toBe(
      'var(--cmf-button-default-padding-x, var(--cmf-button-sm-padding-x, var(--button-padding-x-sm)))',
    );
    expect(vars['--button-bg']).toBe(
      'var(--cmf-button-default-bg, var(--cmf-button-sm-bg, var(--mantine-color-default)))',
    );
    expect(vars['--button-bd']).toContain('var(--cmf-button-default-bd');
    expect(vars['--button-bd']).toContain('var(--cmf-button-sm-bd');
    expect(vars['--button-hover']).toContain('var(--cmf-button-default-hover');
    expect(vars['--button-hover-color']).toContain('var(--cmf-button-default-hover-color');
    expect(vars['--button-radius']).toContain('var(--cmf-button-default-radius');
    expect(vars['--button-radius']).toContain('var(--cmf-button-sm-radius');
    expect(vars['--button-fz']).toBe(
      'var(--cmf-button-default-fz, var(--cmf-button-sm-fz, var(--mantine-font-size-sm)))',
    );
  });

  it('falls back to default variant for unknown variant keys', () => {
    const vars = resolveButtonRootVars({ variant: 'not-a-real-variant' });

    expect(vars['--button-bg']).toContain('var(--cmf-button-default-bg');
    expect(vars['--button-hover']).toContain('var(--cmf-button-default-hover');
  });

  it('uses Mantine radius prop when provided', () => {
    const vars = resolveButtonRootVars({ variant: 'default', radius: 'xl' });

    expect(vars['--button-radius']).toBe('var(--mantine-radius-xl, var(--mantine-radius-md))');
  });

  it('applies component + key → component → variant cascade', () => {
    const vars = resolveButtonRootVars({
      variant: 'filled',
      size: 'xs',
      'data-cmf-component': 'header',
      'data-cmf-key': 'sign_in',
    });

    expect(vars['--button-bg']).toBe(
      'var(--cmf-button-header-sign_in-bg, var(--cmf-button-header-bg, var(--cmf-button-filled-bg, var(--mantine-color-brand-4))))',
    );
    expect(vars['--button-hover']).toBe(
      'var(--cmf-button-header-sign_in-hover, var(--cmf-button-header-hover, var(--cmf-button-filled-hover, var(--mantine-color-brand-3))))',
    );
    expect(vars['--button-hover-color']).toContain('--cmf-button-header-sign_in-hover-color');
    expect(vars['--button-height']).toBe(
      'var(--cmf-button-header-sign_in-height, var(--cmf-button-header-height, var(--cmf-button-xs-height, var(--button-height-xs))))',
    );
    expect(vars['--button-padding-x']).toBe(
      'var(--cmf-button-header-sign_in-padding-x, var(--cmf-button-header-padding-x, var(--cmf-button-xs-padding-x, var(--button-padding-x-xs))))',
    );
  });

  it('resolves exception key ahead of component layers', () => {
    const vars = resolveButtonRootVars({
      variant: 'exception',
      'data-cmf-component': 'sidebar',
      'data-cmf-key': 'search_leftmenu',
    });

    expect(vars['--button-bg']).toContain('--cmf-button-exception-search_leftmenu-bg');
    expect(vars['--button-bg']).toContain('--cmf-button-sidebar-bg');
    expect(vars['--button-bg']).toContain('--cmf-button-exception-bg');
    expect(vars['--button-hover']).toContain('--cmf-button-exception-search_leftmenu-hover');
  });

  it('maps exception-{key} data-variant onto exception cascade (not default)', () => {
    const vars = resolveButtonRootVars({
      variant: 'exception-timer',
      size: 'sm',
      'data-cmf-component': 'sidebar',
      'data-cmf-key': 'timer',
    });

    expect(vars['--button-bg']).toContain('--cmf-button-exception-timer-bg');
    expect(vars['--button-bg']).toContain('--cmf-button-exception-bg');
    expect(vars['--button-bg']).not.toContain('--cmf-button-default-bg');
    expect(vars['--button-hover']).toContain('--cmf-button-exception-timer-hover');
  });

  it('cascades gradient hover to app gradient hover token', () => {
    const vars = resolveButtonRootVars({ variant: 'gradient' });

    expect(vars['--button-hover']).toContain('--cmf-button-gradient-hover');
    expect(vars['--button-hover']).toContain('--app-gradient-default-hover');
  });

  it('does not double-wrap hero / exception CMF tokens in paint fallback', () => {
    const hero = resolveButtonRootVars({ variant: 'hero' });
    const exception = resolveButtonRootVars({ variant: 'exception' });

    expect(hero['--button-bg']).toBe('var(--cmf-button-hero-bg, var(--cmf-button-md-bg, #059669))');
    expect(hero['--button-hover']).toBe(
      'var(--cmf-button-hero-hover, var(--cmf-button-md-hover, #047857))',
    );
    expect(exception['--button-bg']).toBe(
      'var(--cmf-button-exception-bg, var(--cmf-button-md-bg, #d97706))',
    );
    expect(exception['--button-hover']).toBe(
      'var(--cmf-button-exception-hover, var(--cmf-button-md-hover, #b45309))',
    );
  });

  it('emits icon scale/aspect/width/height cascade on the control', () => {
    const vars = resolveButtonRootVars({
      variant: 'default',
      size: 'md',
      'data-cmf-component': 'sidebar',
      'data-cmf-key': 'casino',
    });

    expect(vars['--cmf-control-icon-scale']).toBe(
      'var(--cmf-button-sidebar-casino-icon-scale, var(--cmf-button-sidebar-icon-scale, var(--cmf-button-md-icon-scale, var(--cmf-button-icon-scale, var(--cmf-icon-scale, 0.7)))))',
    );
    expect(vars['--cmf-control-icon-aspect']).toBe(
      'var(--cmf-button-sidebar-casino-icon-aspect, var(--cmf-button-sidebar-icon-aspect, var(--cmf-button-md-icon-aspect, var(--cmf-button-icon-aspect, var(--cmf-icon-aspect, 1)))))',
    );
    expect(vars['--cmf-control-icon-width']).toBe(
      'var(--cmf-button-sidebar-casino-icon-width, var(--cmf-button-sidebar-icon-width, var(--cmf-button-md-icon-width, var(--cmf-button-icon-width, var(--cmf-icon-width)))))',
    );
    expect(vars['--cmf-control-icon-height']).toBe(
      'var(--cmf-button-sidebar-casino-icon-height, var(--cmf-button-sidebar-icon-height, var(--cmf-button-md-icon-height, var(--cmf-button-icon-height, var(--cmf-icon-height)))))',
    );
    expect(vars['--cmf-icon-width']).toBeUndefined();
  });
});
