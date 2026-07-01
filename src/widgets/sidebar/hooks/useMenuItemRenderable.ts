import type { HeaderMenuItem } from '@/widgets/header';

import { useCallback, useState } from 'react';

import { resolveItemLabel, shouldRenderMenuItem } from '../lib/itemUtils';

export function useMenuItemRenderable(item: HeaderMenuItem) {
  const [imgFailed, setImgFailed] = useState(false);
  const onImgError = useCallback(() => {
    setImgFailed(true);
  }, []);

  return {
    visible: shouldRenderMenuItem(item, imgFailed),
    onImgError,
    label: resolveItemLabel(item),
  };
}
