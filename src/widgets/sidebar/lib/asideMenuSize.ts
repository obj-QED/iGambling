import type { CmfButtonSize } from '@/assets/theme';

import { CMF_BUTTON_SIZES } from '@/assets/theme';

export const ASIDE_SIZE_BUTTON_VAR = '--aside-size-button';

export const DEFAULT_ASIDE_MENU_BUTTON_SIZE: CmfButtonSize = 'md';

function parseButtonSize(value: string): CmfButtonSize | undefined {
  if ((CMF_BUTTON_SIZES as readonly string[]).includes(value)) {
    return value as CmfButtonSize;
  }
  return undefined;
}

/** Read Mantine size from `--aside-size-button` on `[data-widget='sidebar']` (theme tokens). */
export function readAsideMenuButtonSize(sidebarEl: HTMLElement | null): CmfButtonSize {
  if (sidebarEl === null) return DEFAULT_ASIDE_MENU_BUTTON_SIZE;

  const value = getComputedStyle(sidebarEl).getPropertyValue(ASIDE_SIZE_BUTTON_VAR).trim();
  return parseButtonSize(value) ?? DEFAULT_ASIDE_MENU_BUTTON_SIZE;
}
