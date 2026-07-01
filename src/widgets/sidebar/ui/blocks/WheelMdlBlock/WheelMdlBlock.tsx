import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { PromoBlock } from '../shared/PromoBlock';

function WheelMdlBlockComponent({ item }: BlockProps) {
  return <PromoBlock item={item} />;
}

export const WheelMdlBlock = memo(WheelMdlBlockComponent);
WheelMdlBlock.displayName = 'WheelMdlBlock';
