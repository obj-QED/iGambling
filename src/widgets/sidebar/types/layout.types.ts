import type { ReactNode } from 'react';

/** Shared props for all sidebar layout shells (`config.layout`). */
export type SidebarLayoutProps = {
  children: ReactNode;
  /** Raw `config.layout` key — used by default shell as extra class. */
  layout: string;
};

export type ContainerLayoutProps = SidebarLayoutProps;
export type ContainerFluidLayoutProps = SidebarLayoutProps;
export type DefaultLayoutProps = SidebarLayoutProps;
