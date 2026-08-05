import type { SidebarLayoutModel } from '../lib';
import type { SidebarConfig } from './config.types';
import type { HeaderMenuItem, HeaderMenuModel, HeaderSection } from '@/widgets/header';

export type RootProps = {
  menu: HeaderMenuModel | null;
  config: SidebarConfig;
  className?: string;
};

/** Full split layout owned by type pack Strategy (header + main + footer). */
export type SidebarTypeStrategyProps = {
  layout: SidebarLayoutModel;
  config: SidebarConfig;
};

export type BlockProps = {
  item: HeaderMenuItem;
  className?: string;
};

export type SectionProps = {
  section: HeaderSection;
  className?: string;
};
