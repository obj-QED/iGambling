import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { PromoBlock } from '../shared/PromoBlock';

function TimerBlockComponent({ item, className }: BlockProps) {
  return <PromoBlock item={item} className={className} />;
}

export const TimerBlock = memo(TimerBlockComponent);
TimerBlock.displayName = 'TimerBlock';
