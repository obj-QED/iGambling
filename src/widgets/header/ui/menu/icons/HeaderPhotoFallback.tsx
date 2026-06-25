import { memo } from 'react';

import { IconPhotoAlt } from '@tabler/icons-react';

import { HEADER_TABLER_ICON_PROPS } from './iconProps';

import menuIconStyles from '../../../styles/menu/HeaderMenuIcon.module.scss';

function HeaderPhotoFallbackComponent() {
  return (
    <IconPhotoAlt {...HEADER_TABLER_ICON_PROPS} className={menuIconStyles.glyph} aria-hidden />
  );
}

export const HeaderPhotoFallback = memo(HeaderPhotoFallbackComponent);
HeaderPhotoFallback.displayName = 'HeaderPhotoFallback';
