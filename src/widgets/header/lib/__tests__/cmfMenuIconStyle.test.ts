import { describe, expect, it } from 'vitest';

import { readCmfMenuIconStyle } from '../cmfMenuIconStyle';

describe('readCmfMenuIconStyle', () => {
  it('reads shape and radius-mode from menu key scope', () => {
    const scope = document.createElement('button');
    scope.setAttribute('data-menu-key', 'link');
    scope.style.setProperty('--cmf-icon-shape', 'rect');
    scope.style.setProperty('--cmf-icon-radius-mode', 'sm');
    document.body.appendChild(scope);

    expect(readCmfMenuIconStyle(scope)).toEqual({
      shape: 'rect',
      radiusMode: 'sm',
    });

    scope.remove();
  });

  it('returns empty object when vars are invalid', () => {
    const scope = document.createElement('div');
    scope.style.setProperty('--cmf-icon-shape', 'unknown');
    scope.style.setProperty('--cmf-icon-radius-mode', 'xl');

    expect(readCmfMenuIconStyle(scope)).toEqual({});
  });
});
