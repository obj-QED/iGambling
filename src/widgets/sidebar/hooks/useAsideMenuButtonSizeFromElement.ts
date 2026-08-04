import type { CmfButtonSize } from '@/assets/theme';

import { useMemo } from 'react';

import { DEFAULT_ASIDE_MENU_BUTTON_SIZE, readAsideMenuButtonSize } from '../lib/asideMenuSize';

/** Sync Mantine size with `--aside-size-button` on `[data-widget='sidebar']`. */
export function useAsideMenuButtonSizeFromElement(sidebarEl: HTMLElement | null): CmfButtonSize {
  return useMemo(
    () => (sidebarEl ? readAsideMenuButtonSize(sidebarEl) : DEFAULT_ASIDE_MENU_BUTTON_SIZE),
    [sidebarEl],
  );
}
