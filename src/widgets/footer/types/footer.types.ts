import type { FooterSchema } from './schema.types';
import type { HeaderMenuModel } from '@/widgets/header';

export type AppFooterProps = {
  menu: HeaderMenuModel;
  schema: FooterSchema;
  className?: string;
};
