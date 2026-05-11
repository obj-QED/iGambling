import type { ButtonProps as MantineButtonProps } from '@mantine/core';
import type { ReactNode } from 'react';

type BaseButtonProps = {
  children: ReactNode;
  varsKey: string;
  className?: string;
  variant?: MantineButtonProps['variant'] | 'custom';
  size?: MantineButtonProps['size'];
};

export type ButtonProps = BaseButtonProps &
  Omit<MantineButtonProps, 'component' | 'href' | 'size' | 'target' | 'to' | 'variant'> & {
    url?: string;
  };

