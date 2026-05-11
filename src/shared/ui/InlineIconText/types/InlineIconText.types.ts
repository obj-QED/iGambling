import type { ReactNode } from 'react';

export type InlineIconShape = 'square' | 'rect' | 'circle';

export type InlineIconTextProps = {
  className?: string;
  iconClassName?: string;
  iconShape?: InlineIconShape;
  iconShapeClassName?: string;
  children: ReactNode;
};

