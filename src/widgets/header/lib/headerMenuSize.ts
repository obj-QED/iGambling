import type { HeaderMenuItem } from '../types';
import type { CmfActionIconSize, CmfButtonSize } from '@/assets/theme';

import { CMF_ACTION_ICON_SIZES, CMF_BUTTON_SIZES } from '@/assets/theme';

import { isSpecialBlockKey } from './itemUtils';

export const HEADER_SIZE_BUTTON_VAR = '--header-size-button';
export const HEADER_SIZE_LINK_VAR = '--header-size-link';
export const HEADER_SIZE_ACTION_ICON_VAR = '--header-size-action-icon';

export type HeaderMenuSizes = {
  button: CmfButtonSize;
  link: CmfButtonSize;
  actionIcon: CmfActionIconSize;
};

export const DEFAULT_HEADER_MENU_SIZES: HeaderMenuSizes = {
  button: 'md',
  link: 'md',
  actionIcon: 'md',
};

function parseButtonSize(value: string): CmfButtonSize | undefined {
  if ((CMF_BUTTON_SIZES as readonly string[]).includes(value)) {
    return value as CmfButtonSize;
  }
  return undefined;
}

function parseActionIconSize(value: string): CmfActionIconSize | undefined {
  if ((CMF_ACTION_ICON_SIZES as readonly string[]).includes(value)) {
    return value as CmfActionIconSize;
  }
  return undefined;
}

/** Read Mantine size keys from header CSS vars (set in `header/tokens.scss` or theme). */
export function readHeaderMenuSizes(headerEl: HTMLElement | null): HeaderMenuSizes {
  if (headerEl === null) return DEFAULT_HEADER_MENU_SIZES;

  const styles = getComputedStyle(headerEl);
  const button =
    parseButtonSize(styles.getPropertyValue(HEADER_SIZE_BUTTON_VAR).trim()) ??
    DEFAULT_HEADER_MENU_SIZES.button;
  const link =
    parseButtonSize(styles.getPropertyValue(HEADER_SIZE_LINK_VAR).trim()) ??
    DEFAULT_HEADER_MENU_SIZES.link;
  const actionIcon =
    parseActionIconSize(styles.getPropertyValue(HEADER_SIZE_ACTION_ICON_VAR).trim()) ??
    DEFAULT_HEADER_MENU_SIZES.actionIcon;

  return { button, link, actionIcon };
}

export function resolveHeaderMenuButtonSize(
  item: Pick<HeaderMenuItem, 'key' | 'type'>,
  sizes: HeaderMenuSizes,
): CmfButtonSize {
  if (!isSpecialBlockKey(item.key) && item.type === 'link') return sizes.link;
  return sizes.button;
}

export function resolveHeaderMenuActionIconSize(sizes: HeaderMenuSizes): CmfActionIconSize {
  return sizes.actionIcon;
}
