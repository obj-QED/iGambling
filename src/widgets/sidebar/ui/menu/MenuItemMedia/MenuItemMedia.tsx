import type { MenuItemMediaProps } from '../../../types';

import { memo, useCallback, useRef, useState } from 'react';

import { useCmfIconStyle } from '@/shared/hooks/useCmfIconStyle';
import { resolveCmfIconRadius, resolveCmfIconShape } from '@/shared/lib/cmfIcon';
import { CmfIcon } from '@/shared/ui/CmfIcon';

import { hasItemImg } from '../../../lib/itemUtils';

const SIDEBAR_ICON_DEFAULTS = {
  menuIconShape: 'square' as const,
  menuIconRadius: 'sm' as const,
};

function MenuItemMediaComponent({ item, alt, className, onImgError }: MenuItemMediaProps) {
  const iconRef = useRef<HTMLImageElement | HTMLSpanElement>(null);
  const cmfStyle = useCmfIconStyle(iconRef);
  const [imgFailed, setImgFailed] = useState(false);

  const handleError = useCallback(() => {
    setImgFailed(true);
    onImgError?.();
  }, [onImgError]);

  if (hasItemImg(item) === false || imgFailed === true) return null;

  return (
    <CmfIcon
      ref={iconRef}
      className={className}
      src={item.img ?? ''}
      alt={alt}
      shape={resolveCmfIconShape(item, SIDEBAR_ICON_DEFAULTS, cmfStyle)}
      radius={resolveCmfIconRadius(item, SIDEBAR_ICON_DEFAULTS, cmfStyle)}
      onError={handleError}
    />
  );
}

export const MenuItemMedia = memo(MenuItemMediaComponent);
MenuItemMedia.displayName = 'MenuItemMedia';
