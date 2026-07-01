import '@mantine/core';

/** CMF scope attrs — shared by all Mantine components except Container. */
export type CmfScopedProps = {
  cmfComponent?: string;
  cmfKey?: string;
};

declare module '@mantine/core' {
  export interface ActionIconProps extends CmfScopedProps {}
  export interface ButtonProps extends CmfScopedProps {}
  export interface CodeProps extends CmfScopedProps {}
  export interface CollapseProps extends CmfScopedProps {}
  export interface GroupProps extends CmfScopedProps {}
  export interface MenuProps extends CmfScopedProps {}
  export interface SegmentedControlProps extends CmfScopedProps {}
  export interface StackProps extends CmfScopedProps {}
  export interface SwitchProps extends CmfScopedProps {}
  export interface TextProps extends CmfScopedProps {}
  export interface TextInputProps extends CmfScopedProps {}
  export interface TitleProps extends CmfScopedProps {}
  export interface UnstyledButtonProps extends CmfScopedProps {}
}
