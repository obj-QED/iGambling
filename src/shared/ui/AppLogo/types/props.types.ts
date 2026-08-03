import type { ButtonProps } from '@mantine/core';
import type { MouseEventHandler } from 'react';

export type AppLogoProps = {
  /** Accessible name + text fallback when `img` is missing. */
  label: string;
  href?: string;
  img?: string;
  className?: string;
  /** Native `<button>` only — skip href click navigation. */
  native?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
} & Omit<
  ButtonProps,
  'children' | 'leftSection' | 'rightSection' | 'label' | 'component' | 'renderRoot'
>;
