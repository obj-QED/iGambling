import type { HeaderMenuItem } from '@/widgets/header';

import { useMenuItemMediaState } from '@/shared/hooks/useMenuItemMediaState';

import { resolveItemLabel, shouldRenderMenuItem } from '../lib/itemUtils';

export function useMenuItemRenderable(item: HeaderMenuItem) {
  const media = useMenuItemMediaState(item);

  return {
    visible: shouldRenderMenuItem(item, media.imgFailed),
    label: resolveItemLabel(item),
    ...media,
  };
}
