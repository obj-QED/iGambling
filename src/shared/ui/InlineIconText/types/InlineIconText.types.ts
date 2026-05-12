import type { ReactNode } from 'react';

export type InlineIconShape = 'square' | 'rect' | 'circle';
export type InlineIconTag = 'i' | 'svg' | 'img';

export type InlineIconTextProps = {
  className?: string;
  icon?: ReactNode;
  iconAlt?: string;
  iconClassName?: string;
  iconSrc?: string;
  iconShape?: InlineIconShape;
  iconShapeClassName?: string;
  children: ReactNode;
  iconTag?: InlineIconTag;
  iconKey?: string;
};
