import { memo } from 'react';

import { IconPhotoAlt } from '@tabler/icons-react';

import { HEADER_TABLER_ICON_PROPS } from './iconProps';

import menuIconStyles from '../../../styles/menu/HeaderMenuIcon.module.scss';
import styles from '../../../styles/menu/HeaderPhotoFallback.module.scss';

function HeaderPhotoFallbackComponent() {
  return (
    <IconPhotoAlt
      {...HEADER_TABLER_ICON_PROPS}
      className={`${menuIconStyles.glyph} ${styles.root}`}
      aria-hidden
    />
  );
}

export const HeaderPhotoFallback = memo(HeaderPhotoFallbackComponent);
HeaderPhotoFallback.displayName = 'HeaderPhotoFallback';
