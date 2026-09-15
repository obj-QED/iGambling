import type { MenuItem as HeaderMenuItem } from '@/entities/menu';

import { useMediaState } from '@/shared/hooks';

import { resolveItemLabel, shouldRenderMenuItem } from '../lib';

export function useMenuItemRenderable(item: HeaderMenuItem) {
  const media = useMediaState(item);

  return {
    visible: shouldRenderMenuItem(item, media.imgFailed),
    label: resolveItemLabel(item),
    ...media,
  };
}
