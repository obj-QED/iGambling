import type { ButtonProps } from '../types/Button.types';
import type { ButtonProps as MantineButtonProps } from '@mantine/core';
import type { ReactNode } from 'react';

import { Button as MantineButton } from '@mantine/core';
import cn from 'classnames';

import { getMantineAppHrefProps } from '@/shared/ui/AppLink';

import { createButtonVars } from '../lib/Button.styles';

const DEFAULT_SIZE = 'sm';

type ButtonRestProps = Omit<MantineButtonProps, 'component' | 'size' | 'variant'>;
type ButtonSharedProps = Pick<MantineButtonProps, 'className' | 'size' | 'style' | 'variant'>;

type RenderButtonParams = {
  buttonProps: ButtonRestProps;
  children: ReactNode;
  sharedProps: ButtonSharedProps;
  url?: string;
};

function renderButton({ buttonProps, children, sharedProps, url }: RenderButtonParams) {
  if (!url) {
    return (
      <MantineButton {...buttonProps} {...sharedProps}>
        {children}
      </MantineButton>
    );
  }

  const navProps = getMantineAppHrefProps(url);

  return (
    <MantineButton
      {...({
        ...buttonProps,
        ...sharedProps,
        ...navProps,
        children,
      } as unknown as MantineButtonProps)}
    />
  );
}

export function Button(props: ButtonProps) {
  const { varsKey, className, url, variant = 'custom', size: sizeProp, children, ...rest } = props;
  const size = sizeProp ?? DEFAULT_SIZE;
  const style = variant === 'custom' ? createButtonVars(varsKey) : undefined;

  const sharedProps = {
    size,
    variant,
    className: cn('button-default', className),
    style,
  };

  const buttonProps = rest as ButtonRestProps;

  return renderButton({ buttonProps, children, sharedProps, url });
}

Button.displayName = 'Button';

