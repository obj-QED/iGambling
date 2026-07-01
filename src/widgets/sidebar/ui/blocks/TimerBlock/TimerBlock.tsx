import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { PromoBlock } from '../shared/PromoBlock';

function TimerBlockComponent({ item }: BlockProps) {
  return <PromoBlock item={item} />;
}

export const TimerBlock = memo(TimerBlockComponent);
TimerBlock.displayName = 'TimerBlock';
