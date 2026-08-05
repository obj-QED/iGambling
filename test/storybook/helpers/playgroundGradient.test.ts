import { describe, expect, it } from 'vitest';

import {
  playgroundGradientFromColor,
  playgroundPaintStyle,
} from '@/storybook/helpers/playgroundGradient';

describe('playgroundGradientFromColor', () => {
  it('maps color to Mantine gradient from/to shades', () => {
    expect(playgroundGradientFromColor('blue')).toEqual({
      from: 'blue.6',
      to: 'blue.8',
      deg: 45,
    });
  });

  it('falls back to brand when color is empty', () => {
    expect(playgroundGradientFromColor(undefined).from).toBe('brand.6');
    expect(playgroundGradientFromColor('').from).toBe('brand.6');
  });
});

describe('playgroundPaintStyle', () => {
  it('paints filled button from color tokens', () => {
    const style = playgroundPaintStyle('button', 'filled', 'red') as Record<string, string>;
    expect(style['--button-bg']).toBe('var(--mantine-color-red-filled)');
    expect(style['--button-hover']).toBe('var(--mantine-color-red-filled-hover)');
  });

  it('paints outline action icon from color tokens', () => {
    const style = playgroundPaintStyle('ai', 'outline', 'blue') as Record<string, string>;
    expect(style['--ai-color']).toBe('var(--mantine-color-blue-outline)');
    expect(style['--ai-bd']).toContain('var(--mantine-color-blue-outline)');
  });

  it('paints light / subtle / transparent / white / default', () => {
    expect(
      (playgroundPaintStyle('button', 'light', 'teal') as Record<string, string>)['--button-bg'],
    ).toBe('var(--mantine-color-teal-light)');
    expect(
      (playgroundPaintStyle('button', 'subtle', 'grape') as Record<string, string>)[
        '--button-hover'
      ],
    ).toBe('var(--mantine-color-grape-light-hover)');
    expect(
      (playgroundPaintStyle('ai', 'transparent', 'orange') as Record<string, string>)['--ai-color'],
    ).toContain('orange');
    expect(
      (playgroundPaintStyle('ai', 'white', 'pink') as Record<string, string>)['--ai-color'],
    ).toBe('var(--mantine-color-pink-filled)');
    expect(
      (playgroundPaintStyle('button', 'default', 'cyan') as Record<string, string>)[
        '--button-hover'
      ],
    ).toBe('var(--mantine-color-cyan-light-hover)');
  });

  it('paints gradient via CSS vars', () => {
    const style = playgroundPaintStyle('button', 'gradient', 'lime') as Record<string, string>;
    expect(style['--button-bg']).toContain('var(--mantine-color-lime-6)');
    expect(style['--button-bg']).toContain('var(--mantine-color-lime-8)');
  });
});
