import { useLayoutEffect, useState } from 'react';

import {
  DEFAULT_HEADER_MENU_SIZES,
  type HeaderMenuSizes,
  readHeaderMenuSizes,
} from '../lib/headerMenuSize';

/** Sync Mantine size props with `--header-size-*` CSS vars on `[data-widget='header']`. */
export function useHeaderMenuSizesFromElement(headerEl: HTMLElement | null): HeaderMenuSizes {
  const [sizes, setSizes] = useState<HeaderMenuSizes>(DEFAULT_HEADER_MENU_SIZES);

  useLayoutEffect(() => {
    setSizes(readHeaderMenuSizes(headerEl));
  }, [headerEl]);

  return sizes;
}
