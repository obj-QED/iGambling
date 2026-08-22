import type { CmfButtonSize } from '@/assets/theme';

import { useMemo } from 'react';

import { asideMenuButtonSizeForType, readAsideMenuButtonSize } from '../lib';

/** Sync Mantine size with `--aside-size-button` on `[data-widget='sidebar']`. */
export function useAsideMenuButtonSizeFromElement(
  sidebarEl: HTMLElement | null,
  type: string,
): CmfButtonSize {
  return useMemo(
    () => (sidebarEl ? readAsideMenuButtonSize(sidebarEl) : asideMenuButtonSizeForType(type)),
    [sidebarEl, type],
  );
}
