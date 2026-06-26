import type { HeaderMenuItem } from '../../../types';

import { memo, useCallback, useState } from 'react';

import { hasItemImg } from '../../../lib/itemUtils';
import { HeaderPhotoFallback } from '../icons/HeaderPhotoFallback';
import { ItemIcon } from '../ItemIcon/ItemIcon';

type MenuItemImageProps = {
  item: HeaderMenuItem;
  alt: string;
  className?: string;
  onImgFailed?: () => void;
};

function MenuItemImageComponent({ item, alt, className, onImgFailed }: MenuItemImageProps) {
  const [imgFailed, setImgFailed] = useState(false);

  const handleError = useCallback(() => {
    setImgFailed(true);
    onImgFailed?.();
  }, [onImgFailed]);

  if (hasItemImg(item) === false) return null;

  if (imgFailed === true) return <HeaderPhotoFallback />;

  return <ItemIcon className={className} src={item.img ?? ''} alt={alt} onError={handleError} />;
}

export const MenuItemImage = memo(MenuItemImageComponent);
MenuItemImage.displayName = 'MenuItemImage';
