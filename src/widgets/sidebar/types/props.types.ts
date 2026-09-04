import type { SidebarLayoutModel } from '../lib';
import type { SidebarSchema } from './config.types';
import type { HeaderMenuItem, HeaderMenuModel, HeaderSection } from '@/widgets/header';

export type RootProps = {
  menu: HeaderMenuModel | null;
  config: SidebarSchema;
  className?: string;
};

/** Full split layout owned by type pack Strategy (header + main + footer). */
export type SidebarTypeStrategyProps = {
  layout: SidebarLayoutModel;
  config: SidebarSchema;
};

export type BlockProps = {
  item: HeaderMenuItem;
  className?: string;
};

export type SectionProps = {
  section: HeaderSection;
  className?: string;
};
