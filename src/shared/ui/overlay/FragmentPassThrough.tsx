import type { OverlayTargetProps } from './types';

import { memo } from 'react';

/** No overlay — render target only (children ignored). */
function FragmentPassThroughComponent({ target }: OverlayTargetProps) {
  return target;
}

export const FragmentPassThrough = memo(FragmentPassThroughComponent);
FragmentPassThrough.displayName = 'FragmentPassThrough';
