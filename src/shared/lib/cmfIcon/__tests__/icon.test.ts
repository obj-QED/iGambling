import { describe, expect, it } from 'vitest';

import { DEFAULT_HEADER_CONFIG } from '@/widgets/header/config/defaults';

import {
  cmfIconDataAttrs,
  isSvgMediaSrc,
  resolveCmfIconRadius,
  resolveCmfIconShape,
} from '../icon';

describe('cmfIcon', () => {
  it('detects svg sources', () => {
    expect(isSvgMediaSrc('/uploads/web.svg')).toBe(true);
    expect(isSvgMediaSrc('/uploads/logo.png')).toBe(false);
  });

  it('exposes cmf icon data attrs with src', () => {
    expect(cmfIconDataAttrs('/uploads/web.svg', 'square', 'sm')).toEqual({
      'data-cmf-icon-src': '/uploads/web.svg',
      'data-cmf-icon-shape': 'square',
      'data-cmf-icon-radius': 'sm',
    });
  });

  it('resolves shape and radius from item, cmf theme, then config', () => {
    expect(resolveCmfIconShape({ imgShape: 'rect' }, { menuIconShape: 'square' })).toBe('rect');
    expect(resolveCmfIconRadius({ imgRadius: 'round' }, { menuIconRadius: 'sm' })).toBe('round');
    expect(resolveCmfIconShape({}, { menuIconShape: 'square' }, { shape: 'rect' })).toBe('rect');
    expect(resolveCmfIconRadius({}, { menuIconRadius: 'sm' }, { radiusMode: 'round' })).toBe(
      'round',
    );
    expect(resolveCmfIconShape({}, DEFAULT_HEADER_CONFIG)).toBe('square');
    expect(resolveCmfIconRadius({}, DEFAULT_HEADER_CONFIG)).toBe('sm');
  });
});
