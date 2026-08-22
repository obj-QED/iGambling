import { describe, expect, it } from 'vitest';

import {
  asideMenuButtonSizeForType,
  DEFAULT_ASIDE_MENU_BUTTON_SIZE,
  readAsideMenuButtonSize,
} from '@/widgets/sidebar/lib';

describe('asideMenuButtonSizeForType', () => {
  it('matches default sidebar token sm', () => {
    expect(DEFAULT_ASIDE_MENU_BUTTON_SIZE).toBe('sm');
    expect(asideMenuButtonSizeForType('default')).toBe('sm');
  });

  it('matches compact sidebar token md', () => {
    expect(asideMenuButtonSizeForType('compact')).toBe('md');
  });
});

describe('readAsideMenuButtonSize', () => {
  it('returns default when element is null', () => {
    expect(readAsideMenuButtonSize(null)).toBe(DEFAULT_ASIDE_MENU_BUTTON_SIZE);
  });

  it('reads --aside-size-button from element', () => {
    const aside = document.createElement('aside');
    aside.style.setProperty('--aside-size-button', 'xl');
    document.body.appendChild(aside);

    expect(readAsideMenuButtonSize(aside)).toBe('xl');

    aside.remove();
  });

  it('falls back on invalid token', () => {
    const aside = document.createElement('aside');
    aside.style.setProperty('--aside-size-button', 'not-a-size');
    document.body.appendChild(aside);

    expect(readAsideMenuButtonSize(aside)).toBe(DEFAULT_ASIDE_MENU_BUTTON_SIZE);

    aside.remove();
  });
});
