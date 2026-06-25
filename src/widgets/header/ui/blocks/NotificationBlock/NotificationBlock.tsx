import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { IconBellRinging } from '@tabler/icons-react';

import { HEADER_TABLER_ICON_PROPS } from '../../menu/icons/iconProps';
import { SpecialIconBlock } from '../shared/SpecialIconBlock';

import menuIconStyles from '../../../styles/menu/HeaderMenuIcon.module.scss';

function NotificationBlockComponent({ item }: BlockProps) {
  return (
    <SpecialIconBlock
      item={item}
      fallbackIcon={
        <IconBellRinging {...HEADER_TABLER_ICON_PROPS} className={menuIconStyles.glyph} />
      }
    />
  );
}

export const NotificationBlock = memo(NotificationBlockComponent);
NotificationBlock.displayName = 'NotificationBlock';
