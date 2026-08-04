import { useMemo } from 'react';

import {
  DEFAULT_HEADER_MENU_SIZES,
  type HeaderMenuSizes,
  readHeaderMenuSizes,
} from '../lib/headerMenuSize';

/** Sync Mantine size props with `--header-size-*` CSS vars on `[data-widget='header']`. */
export function useHeaderMenuSizesFromElement(headerEl: HTMLElement | null): HeaderMenuSizes {
  return useMemo(
    () => (headerEl ? readHeaderMenuSizes(headerEl) : DEFAULT_HEADER_MENU_SIZES),
    [headerEl],
  );
}
