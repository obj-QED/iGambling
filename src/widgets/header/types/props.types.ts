import type { HeaderConfig } from './config.types';
import type { HeaderMenuItem, HeaderMenuModel, HeaderSection } from './items.types';

export type RootProps = {
  menu: HeaderMenuModel;
  config: HeaderConfig;
  className?: string;
};

export type BlockProps = {
  item: HeaderMenuItem;
};

export type SectionProps = {
  section: HeaderSection;
};
