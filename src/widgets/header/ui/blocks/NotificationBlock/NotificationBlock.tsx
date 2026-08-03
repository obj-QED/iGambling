import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { IconBellRinging } from '@tabler/icons-react';

import { HEADER_TABLER_ICON_PROPS } from '../../items/icons/iconProps';
import { SpecialIconBlock } from '../shared/SpecialIconBlock';

function NotificationBlockComponent({ item }: BlockProps) {
  return (
    <SpecialIconBlock
      item={item}
      fallbackIcon={<IconBellRinging {...HEADER_TABLER_ICON_PROPS} />}
    />
  );
}

export const NotificationBlock = memo(NotificationBlockComponent);
NotificationBlock.displayName = 'NotificationBlock';
