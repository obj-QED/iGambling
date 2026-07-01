import { describe, expect, it } from 'vitest';

import {
  DEFAULT_HEADER_MENU_SIZES,
  readHeaderMenuSizes,
  resolveHeaderMenuActionIconSize,
  resolveHeaderMenuButtonSize,
} from '../headerMenuSize';

describe('headerMenuSize', () => {
  it('returns defaults when header element is null', () => {
    expect(readHeaderMenuSizes(null)).toEqual(DEFAULT_HEADER_MENU_SIZES);
  });

  it('reads size keys from header CSS variables', () => {
    const header = document.createElement('header');
    header.style.setProperty('--header-size-button', 'md');
    header.style.setProperty('--header-size-link', 'xs');
    header.style.setProperty('--header-size-action-icon', 'input-sm');
    document.body.appendChild(header);

    expect(readHeaderMenuSizes(header)).toEqual({
      button: 'md',
      link: 'xs',
      actionIcon: 'input-sm',
    });

    header.remove();
  });

  it('falls back to sm for invalid size tokens', () => {
    const header = document.createElement('header');
    header.style.setProperty('--header-size-button', 'not-a-size');
    document.body.appendChild(header);

    expect(readHeaderMenuSizes(header).button).toBe('sm');

    header.remove();
  });

  it('resolves button size by menu item type', () => {
    const sizes = { button: 'md' as const, link: 'xs' as const, actionIcon: 'sm' as const };

    expect(resolveHeaderMenuButtonSize({ key: 'promo', type: 'button' }, sizes)).toBe('md');
    expect(resolveHeaderMenuButtonSize({ key: 'home', type: 'link' }, sizes)).toBe('xs');
    expect(resolveHeaderMenuActionIconSize(sizes)).toBe('sm');
  });
});
