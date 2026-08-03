import { describe, expect, it } from 'vitest';

import {
  DEFAULT_HEADER_MENU_SIZES,
  readHeaderMenuSizes,
  resolveHeaderMenuActionIconSize,
  resolveHeaderMenuButtonSize,
} from '@/widgets/header/lib/headerMenuSize';

describe('headerMenuSize', () => {
  it('returns defaults when header element is null', () => {
    expect(readHeaderMenuSizes(null)).toEqual(DEFAULT_HEADER_MENU_SIZES);
  });

  it('reads size keys from header CSS variables', () => {
    const header = document.createElement('header');
    header.style.setProperty('--header-size-button', 'lg');
    header.style.setProperty('--header-size-link', 'sm');
    header.style.setProperty('--header-size-action-icon', 'input-sm');
    document.body.appendChild(header);

    expect(readHeaderMenuSizes(header)).toEqual({
      button: 'lg',
      link: 'sm',
      actionIcon: 'input-sm',
    });

    header.remove();
  });

  it('falls back to default button size for invalid size tokens', () => {
    const header = document.createElement('header');
    header.style.setProperty('--header-size-button', 'not-a-size');
    document.body.appendChild(header);

    expect(readHeaderMenuSizes(header).button).toBe('xl');

    header.remove();
  });

  it('resolves button size by menu item type', () => {
    const sizes = { button: 'md' as const, link: 'md' as const, actionIcon: 'md' as const };

    expect(resolveHeaderMenuButtonSize({ key: 'promo', type: 'button' }, sizes)).toBe('md');
    expect(resolveHeaderMenuButtonSize({ key: 'home', type: 'link' }, sizes)).toBe('md');
    expect(resolveHeaderMenuActionIconSize(sizes)).toBe('md');
  });
});
