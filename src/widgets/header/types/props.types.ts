import type { HeaderConfig } from './config.types';
import type { HeaderMenuItem, HeaderMenuModel, HeaderSection } from './items.types';

export type RootProps = {
  menu: HeaderMenuModel;
  config: HeaderConfig;
  className?: string;
};

export type BlockProps = {
  item: HeaderMenuItem;
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
};
