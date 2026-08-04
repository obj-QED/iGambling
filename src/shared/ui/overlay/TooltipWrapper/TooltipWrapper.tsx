import type { OverlayTargetProps } from '../types';

import { isValidElement, memo } from 'react';

import { Tooltip } from '@mantine/core';

function TooltipWrapperComponent({ target, children, title, className }: OverlayTargetProps) {
  const label = title ?? children;
  if (!isValidElement(target) || label === undefined || label === null || label === false) {
    return target;
  }

  return (
    <Tooltip label={label} className={className}>
      <span>{target}</span>
    </Tooltip>
  );
}

export const TooltipWrapper = memo(TooltipWrapperComponent);
TooltipWrapper.displayName = 'TooltipWrapper';
