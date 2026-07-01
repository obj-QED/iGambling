import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { PromoBlock } from '../shared/PromoBlock';

function WheelMdlBlockComponent({ item, className }: BlockProps) {
  return <PromoBlock item={item} className={className} />;
}

export const WheelMdlBlock = memo(WheelMdlBlockComponent);
WheelMdlBlock.displayName = 'WheelMdlBlock';
