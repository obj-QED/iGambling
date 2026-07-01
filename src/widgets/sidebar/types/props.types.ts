import type { SidebarConfig } from './config.types';
import type { HeaderMenuItem, HeaderMenuModel, HeaderSection } from '@/widgets/header';

export type RootProps = {
  menu: HeaderMenuModel | null;
  config: SidebarConfig;
  className?: string;
};

export type BlockProps = {
  item: HeaderMenuItem;
};

export type SectionProps = {
  section: HeaderSection;
};
