import type { MenuItemImageProps } from '../../../types';

import { memo, useCallback, useRef, useState } from 'react';

import { useCmfIconStyle } from '@/shared/hooks/useCmfIconStyle';
import { resolveCmfIconRadius, resolveCmfIconShape } from '@/shared/lib/cmfIcon';

import { useConfig } from '../../../context/useConfig';
import { hasItemImg } from '../../../lib/itemUtils';
import { ItemIcon } from '../ItemIcon/ItemIcon';

function MenuItemImageComponent({
  item,
  alt,
  className,
  inActionIcon = false,
  onImgFailed,
}: MenuItemImageProps) {
  const config = useConfig();
  const iconRef = useRef<HTMLImageElement | HTMLSpanElement>(null);
  const cmfStyle = useCmfIconStyle(iconRef);
  const [imgFailed, setImgFailed] = useState(false);

  const handleError = useCallback(() => {
    setImgFailed(true);
    onImgFailed?.();
  }, [onImgFailed]);

  if (hasItemImg(item) === false) return null;

  if (imgFailed === true) return null;

  return (
    <ItemIcon
      ref={iconRef}
      className={className}
      inActionIcon={inActionIcon}
      src={item.img ?? ''}
      alt={alt}
      shape={resolveCmfIconShape(item, config, cmfStyle)}
      radius={resolveCmfIconRadius(item, config, cmfStyle)}
      onError={handleError}
    />
  );
}

export const MenuItemImage = memo(MenuItemImageComponent);
MenuItemImage.displayName = 'MenuItemImage';
