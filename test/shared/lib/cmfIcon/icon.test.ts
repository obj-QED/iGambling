import { describe, expect, it } from 'vitest';

import {
  cmfIconDataAttrs,
  isSvgMediaSrc,
  resolveCmfIconRadius,
  resolveCmfIconShape,
} from '@/shared/lib/cmfIcon/icon';

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

  it('resolves shape and radius from item, then CSS cascade', () => {
    expect(resolveCmfIconShape({ imgShape: 'rect' })).toBe('rect');
    expect(resolveCmfIconRadius({ imgRadius: 'round' })).toBe('round');
    expect(resolveCmfIconShape({}, { shape: 'rect' })).toBe('rect');
    expect(resolveCmfIconRadius({}, { radiusMode: 'round' })).toBe('round');
    expect(resolveCmfIconShape({})).toBe('square');
    expect(resolveCmfIconRadius({})).toBe('sm');
  });
});
