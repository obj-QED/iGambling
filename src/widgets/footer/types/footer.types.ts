import type { FooterSchema } from './schema.types';
import type { MenuModel as HeaderMenuModel } from '@/entities/menu';

export type AppFooterProps = {
  menu: HeaderMenuModel;
  schema: FooterSchema;
  className?: string;
};
