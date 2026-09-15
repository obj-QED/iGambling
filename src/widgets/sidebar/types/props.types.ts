import type { SidebarLayoutModel } from '../lib';
import type { SidebarSchema } from './config.types';
import type {
  MenuItem as HeaderMenuItem,
  MenuModel as HeaderMenuModel,
  MenuSection as HeaderSection,
} from '@/entities/menu';

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
  /** Overlay / command-center activate (modal | spotlight). */
  onActivate?: () => void;
  /** Show ⌘/Ctrl+K badge on input-style trigger (spotlight). */
  showHotkeyBadge?: boolean;
  /** Controlled query for `type: input` trigger. */
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
};

export type SectionProps = {
  section: HeaderSection;
  className?: string;
};
