import '@mantine/core';

/** CMF scope attrs — shared by all Mantine components except Container. */
export type CmfScopedProps = {
  cmfComponent?: string;
  cmfKey?: string;
};

declare module '@mantine/core' {
  export interface ActionIconProps {
    cmfComponent?: string;
    cmfKey?: string;
  }
  export interface ButtonProps {
    cmfComponent?: string;
    cmfKey?: string;
    /** CMF layout: stretch control to container width (menu rows, sidebar). */
    fullscreen?: boolean;
  }
  export interface CodeProps {
    cmfComponent?: string;
    cmfKey?: string;
  }
  export interface CollapseProps {
    cmfComponent?: string;
    cmfKey?: string;
  }
  export interface GroupProps {
    cmfComponent?: string;
    cmfKey?: string;
  }
  export interface MenuProps {
    cmfComponent?: string;
    cmfKey?: string;
  }
  export interface SegmentedControlProps {
    cmfComponent?: string;
    cmfKey?: string;
  }
  export interface StackProps {
    cmfComponent?: string;
    cmfKey?: string;
  }
  export interface SwitchProps {
    cmfComponent?: string;
    cmfKey?: string;
  }
  export interface TextProps {
    cmfComponent?: string;
    cmfKey?: string;
  }
  export interface TextInputProps {
    cmfComponent?: string;
    cmfKey?: string;
  }
  export interface TitleProps {
    cmfComponent?: string;
    cmfKey?: string;
  }
  export interface UnstyledButtonProps {
    cmfComponent?: string;
    cmfKey?: string;
  }
}
