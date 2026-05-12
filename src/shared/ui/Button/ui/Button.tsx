import type { ButtonIcon, ButtonProps } from '../types/Button.types';
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

type ResolveSectionPropsParams = Pick<
  MantineButtonProps,
  'leftSection' | 'rightSection'
> & {
  icon?: ButtonIcon;
  iconPosition: 'left' | 'right';
};

function renderIcon(icon: ButtonIcon): ReactNode {
  if (typeof icon === 'string') {
    return (
      <img
        className="button-default__icon-image"
        src={icon}
        alt=""
        aria-hidden
      />
    );
  }

  return icon;
}

function resolveSectionProps({
  leftSection,
  rightSection,
  icon,
  iconPosition,
}: ResolveSectionPropsParams): Pick<MantineButtonProps, 'leftSection' | 'rightSection'> {
  if (leftSection != null || rightSection != null || icon == null) {
    return { leftSection, rightSection };
  }

  const iconNode = renderIcon(icon);

  return iconPosition === 'right'
    ? { rightSection: iconNode }
    : { leftSection: iconNode };
}

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
  const {
    varsKey,
    className,
    url,
    variant = 'custom',
    size: sizeProp,
    icon,
    iconPosition = 'left',
    leftSection,
    rightSection,
    children,
    ...rest
  } = props;
  const size = sizeProp ?? DEFAULT_SIZE;
  const style = variant === 'custom' ? createButtonVars(varsKey) : undefined;
  const sectionProps = resolveSectionProps({ leftSection, rightSection, icon, iconPosition });

  const sharedProps = {
    size,
    variant,
    className: cn('button-default', className),
    style,
  };

  const buttonProps = {
    ...rest,
    ...sectionProps,
  } as ButtonRestProps;

  return renderButton({ buttonProps, children, sharedProps, url });
}

Button.displayName = 'Button';

