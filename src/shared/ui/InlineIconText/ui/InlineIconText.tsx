import type { InlineIconShape, InlineIconTextProps } from '../types/InlineIconText.types';

import { memo } from 'react';

import classNames from 'classnames';

const ICON_SHAPE_CLASS: Record<InlineIconShape, string> = {
  square: 'icon-shape-square',
  rect: 'icon-shape-rect',
  circle: 'icon-shape-circle',
};

function InlineIconTextComponent({
  className,
  iconClassName,
  iconShape = 'square',
  iconShapeClassName,
  children,
}: InlineIconTextProps) {
  return (
    <span className={classNames('inline-icon', className)}>
      <i className={classNames('icon-i', iconClassName, ICON_SHAPE_CLASS[iconShape], iconShapeClassName)} aria-hidden />
      {children}
    </span>
  );
}

export const InlineIconText = memo(InlineIconTextComponent);
InlineIconText.displayName = 'InlineIconText';
