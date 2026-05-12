import type { InlineIconShape, InlineIconTextProps } from '../types/InlineIconText.types';
import type { CSSProperties } from 'react';

import { cloneElement, isValidElement, memo } from 'react';

import classNames from 'classnames';

const ICON_SHAPE_CLASS: Record<InlineIconShape, string> = {
  square: 'icon-shape-square',
  rect: 'icon-shape-rect',
  circle: 'icon-shape-circle',
};

function InlineIconTextComponent({
  className,
  icon,
  iconAlt,
  iconClassName,
  iconSrc,
  iconShape = 'square',
  iconShapeClassName,
  iconTag = 'i',
  iconKey,
  children,
}: InlineIconTextProps) {
  const iconClasses = classNames(iconClassName, ICON_SHAPE_CLASS[iconShape], iconShapeClassName);
  const iconMaskStyle = iconKey
    ? ({ '--icon-image': `var(--icon-${iconKey}-image)` } as CSSProperties)
    : undefined;

  const renderIcon = () => {
    if (iconTag === 'img' && iconSrc) {
      return (
        <img
          className={iconClasses}
          src={iconSrc}
          alt={iconAlt ?? ''}
          aria-hidden={iconAlt ? undefined : true}
        />
      );
    }

    if (iconTag === 'svg' && icon) {
      if (isValidElement<{ className?: string; 'aria-hidden'?: boolean }>(icon)) {
        return cloneElement(icon, {
          className: classNames(icon.props.className, iconClasses),
          'aria-hidden': icon.props['aria-hidden'] ?? true,
        });
      }

      return <span className={iconClasses} aria-hidden>{icon}</span>;
    }

    return (
      <i
        className={classNames('icon-i', iconClasses)}
        aria-hidden
        data-icon-key={iconKey}
        style={iconMaskStyle}
      />
    );
  };

  return (
    <span className={classNames('inline-icon', className)}>
      {renderIcon()}
      {children}
    </span>
  );
}

export const InlineIconText = memo(InlineIconTextComponent);
InlineIconText.displayName = 'InlineIconText';
