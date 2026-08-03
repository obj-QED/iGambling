import { memo } from 'react';

import { IconPhotoAlt } from '@tabler/icons-react';

import { HEADER_TABLER_ICON_PROPS } from './iconProps';

function HeaderPhotoFallbackComponent() {
  return <IconPhotoAlt {...HEADER_TABLER_ICON_PROPS} aria-hidden />;
}

export const HeaderPhotoFallback = memo(HeaderPhotoFallbackComponent);
HeaderPhotoFallback.displayName = 'HeaderPhotoFallback';
