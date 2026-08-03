import type { ItemImageProps } from '../../../types';

import { memo, useCallback, useRef, useState } from 'react';

import { useCmfIconStyle } from '@/shared/hooks';
import { resolveCmfIconRadius, resolveCmfIconShape } from '@/shared/lib';

import { hasItemImg } from '../../../lib';
import { ItemIcon } from '../ItemIcon/ItemIcon';

function ItemImageComponent({ item, alt, className, onImgFailed }: ItemImageProps) {
  const iconRef = useRef<HTMLImageElement | HTMLSpanElement>(null);
  const cmfStyle = useCmfIconStyle(iconRef);
  const [imgFailed, setImgFailed] = useState(false);

  const handleError = useCallback(() => {
    setImgFailed(true);
    onImgFailed?.();
  }, [onImgFailed]);

  if (!hasItemImg(item)) return null;

  if (imgFailed) return null;

  return (
    <ItemIcon
      ref={iconRef}
      className={className}
      src={item.img ?? ''}
      alt={alt}
      shape={resolveCmfIconShape(item, cmfStyle)}
      radius={resolveCmfIconRadius(item, cmfStyle)}
      onError={handleError}
    />
  );
}

export const ItemImage = memo(ItemImageComponent);
ItemImage.displayName = 'ItemImage';
