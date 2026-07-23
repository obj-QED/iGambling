import type { HeaderMenuItem } from '@/widgets/header';

import { useMediaState } from '@/shared/hooks/useMediaState';

import { resolveItemLabel, shouldRenderMenuItem } from '../lib/itemUtils';

export function useMenuItemRenderable(item: HeaderMenuItem) {
  const media = useMediaState(item);

  return {
    visible: shouldRenderMenuItem(item, media.imgFailed),
    label: resolveItemLabel(item),
    ...media,
  };
}
