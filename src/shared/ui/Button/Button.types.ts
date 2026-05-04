import type { ButtonProps as MantineButtonProps } from '@mantine/core';
import type { LinkProps } from 'react-router-dom';

export type BaseButtonProps = {
  children: React.ReactNode;
  varsKey: string;
  className?: string;
  variant?: MantineButtonProps['variant'] | 'custom';
  size?: MantineButtonProps['size'];
};

type ButtonAsLink = BaseButtonProps &
  Omit<MantineButtonProps, 'component' | 'size' | 'variant'> &
  Omit<LinkProps, 'children' | 'to'> & {
    url: string;
    to?: never;
    href?: never;
  };

type ButtonAsButton = BaseButtonProps &
  Omit<MantineButtonProps, 'component' | 'size' | 'variant'> & {
    url?: never;
    to?: never;
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;
