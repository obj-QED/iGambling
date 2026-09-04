import type { ItemMediaProps } from '../../../types';

import { memo, useCallback, useRef, useState } from 'react';

import { useCmfIconStyle } from '@/shared/hooks';
import { resolveCmfIconRadius, resolveCmfIconShape } from '@/shared/lib';
import { CmfIcon } from '@/shared/ui/CmfIcon';

import { hasItemImg } from '../../../lib';

function ItemMediaComponent({ item, alt, className, onImgError }: ItemMediaProps) {
  const iconRef = useRef<HTMLImageElement | SVGSVGElement>(null);
  const cmfStyle = useCmfIconStyle(iconRef);
  const imgSrc = item.img ?? '';
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const imgFailed = failedSrc !== null && failedSrc === imgSrc && imgSrc.length > 0;

  const handleError = useCallback(() => {
    setFailedSrc(imgSrc);
    onImgError?.();
  }, [imgSrc, onImgError]);

  if (!hasItemImg(item) || imgFailed) return null;

  return (
    <CmfIcon
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

export const ItemMedia = memo(ItemMediaComponent);
ItemMedia.displayName = 'ItemMedia';
