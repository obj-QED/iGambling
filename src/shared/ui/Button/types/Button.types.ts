import type { ButtonProps as MantineButtonProps } from '@mantine/core';
import type { ReactNode } from 'react';

export type ButtonIconPosition = 'left' | 'right';
export type ButtonIcon = ReactNode | string;

type BaseButtonProps = {
  children: ReactNode;
  varsKey: string;
  className?: string;
  icon?: ButtonIcon;
  iconPosition?: ButtonIconPosition;
  variant?: MantineButtonProps['variant'] | 'custom';
  size?: MantineButtonProps['size'];
};

export type ButtonProps = BaseButtonProps &
  Omit<MantineButtonProps, 'component' | 'href' | 'size' | 'target' | 'to' | 'variant'> & {
    url?: string;
  };

