import { describe, expect, it } from 'vitest';

import { DEFAULT_HEADER_CONFIG } from '../../config/defaults';
import {
  isSvgMediaSrc,
  resolveMenuItemIconRadius,
  resolveMenuItemIconShape,
} from '../menuItemIcon';

describe('menuItemIcon', () => {
  it('detects svg sources', () => {
    expect(isSvgMediaSrc('/uploads/web.svg')).toBe(true);
    expect(isSvgMediaSrc('/uploads/logo.png')).toBe(false);
  });

  it('resolves shape and radius from item, cmf theme, then config', () => {
    expect(resolveMenuItemIconShape({ imgShape: 'rect' }, { menuIconShape: 'square' })).toBe(
      'rect',
    );
    expect(resolveMenuItemIconRadius({ imgRadius: 'round' }, { menuIconRadius: 'sm' })).toBe(
      'round',
    );
    expect(resolveMenuItemIconShape({}, { menuIconShape: 'square' }, { shape: 'rect' })).toBe(
      'rect',
    );
    expect(resolveMenuItemIconRadius({}, { menuIconRadius: 'sm' }, { radiusMode: 'round' })).toBe(
      'round',
    );
    expect(resolveMenuItemIconShape({}, DEFAULT_HEADER_CONFIG)).toBe('square');
    expect(resolveMenuItemIconRadius({}, DEFAULT_HEADER_CONFIG)).toBe('sm');
  });
});
