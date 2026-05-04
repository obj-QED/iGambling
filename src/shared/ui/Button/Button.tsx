import type { ButtonProps } from './Button.types';
import type { ButtonProps as MantineButtonProps } from '@mantine/core';
import type { ComponentProps } from 'react';

import { memo, useMemo } from 'react';

import { Button as MantineButton } from '@mantine/core';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import { useCssVarValue } from '@/shared/lib/useCssVarValue';

import { createButtonVars } from './Button.styles';
import { btnCssPrefix } from './Button.vars';

const DEFAULT_SIZE = 'sm';

type ButtonRestProps = Omit<MantineButtonProps, 'component' | 'size' | 'variant'>;

function ButtonComponent(props: ButtonProps) {
  const { varsKey, className, url, variant = 'custom', size: sizeProp, children, ...rest } = props;

  const prefix = btnCssPrefix(varsKey);

  // ⚠️ читаем 1 раз → избегаем лишних расчетов
  const sizeFromCss = useCssVarValue(`--${prefix}-size`, DEFAULT_SIZE);
  const size = sizeProp ?? sizeFromCss;

  const style = useMemo(() => {
    if (variant !== 'custom') return undefined;
    return createButtonVars(varsKey);
  }, [varsKey, variant]);

  const sharedProps = {
    size,
    variant,
    className: cn('button-default', className),
    style,
    ...(url ? ({ component: Link, to: url } as ComponentProps<typeof MantineButton>) : {}),
  };



  const buttonProps = rest as ButtonRestProps;

  return (
    <MantineButton {...buttonProps} {...sharedProps} >
      {children}
    </MantineButton>
  );
}

export type { ButtonProps } from './Button.types';
export const Button = memo(ButtonComponent);
Button.displayName = 'Button';