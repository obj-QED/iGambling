import type { CmfButtonSize } from '@/assets/theme';

import { useLayoutEffect, useState } from 'react';

import { DEFAULT_ASIDE_MENU_BUTTON_SIZE, readAsideMenuButtonSize } from '../lib/asideMenuSize';

/** Sync Mantine size with `--aside-size-button` on `[data-widget='sidebar']`. */
export function useAsideMenuButtonSizeFromElement(sidebarEl: HTMLElement | null): CmfButtonSize {
  const [size, setSize] = useState<CmfButtonSize>(DEFAULT_ASIDE_MENU_BUTTON_SIZE);

  useLayoutEffect(() => {
    setSize(readAsideMenuButtonSize(sidebarEl));
  }, [sidebarEl]);

  return size;
}
