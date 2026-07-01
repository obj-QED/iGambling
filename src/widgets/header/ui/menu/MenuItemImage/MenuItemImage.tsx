import type { HeaderMenuItem } from '../../../types';

import { memo, useCallback, useRef, useState } from 'react';

import { useConfig } from '../../../context/useConfig';
import { useCmfMenuIconStyle } from '../../../hooks/useCmfMenuIconStyle';
import { hasItemImg } from '../../../lib/itemUtils';
import { resolveMenuItemIconRadius, resolveMenuItemIconShape } from '../../../lib/menuItemIcon';
import { HeaderPhotoFallback } from '../icons/HeaderPhotoFallback';
import { ItemIcon } from '../ItemIcon/ItemIcon';

type MenuItemImageProps = {
  item: HeaderMenuItem;
  alt: string;
  className?: string;
  inActionIcon?: boolean;
  onImgFailed?: () => void;
};

function MenuItemImageComponent({
  item,
  alt,
  className,
  inActionIcon = false,
  onImgFailed,
}: MenuItemImageProps) {
  const config = useConfig();
  const iconRef = useRef<HTMLImageElement | HTMLSpanElement>(null);
  const cmfStyle = useCmfMenuIconStyle(iconRef);
  const [imgFailed, setImgFailed] = useState(false);

  const handleError = useCallback(() => {
    setImgFailed(true);
    onImgFailed?.();
  }, [onImgFailed]);

  if (hasItemImg(item) === false) return null;

  if (imgFailed === true) return <HeaderPhotoFallback />;

  return (
    <ItemIcon
      ref={iconRef}
      className={className}
      inActionIcon={inActionIcon}
      src={item.img ?? ''}
      alt={alt}
      shape={resolveMenuItemIconShape(item, config, cmfStyle)}
      radius={resolveMenuItemIconRadius(item, config, cmfStyle)}
      onError={handleError}
    />
  );
}

export const MenuItemImage = memo(MenuItemImageComponent);
MenuItemImage.displayName = 'MenuItemImage';
