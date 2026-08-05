import type { SidebarChromeRegion } from '../../lib';
import type { SidebarBlockRegistryKey } from '../../registry/keys';
import type { BlockProps, SidebarTypeStrategyProps } from '../../types';
import type { SidebarTypeTunables } from './tunableDefaults';
import type { AsideTypeStrategyKey } from '@/shared/config';
import type { HeaderMenuItem } from '@/widgets/header';
import type { ComponentType, MouseEventHandler, ReactNode } from 'react';

export type SidebarItemKind = 'button' | 'actionIcon';

export type SidebarItemPresentationProps = {
  item: HeaderMenuItem;
  className?: string;
  dropdownItem?: boolean;
  dropdownTrigger?: boolean;
  /** Aside header/footer strip CMF component. */
  chrome?: SidebarChromeRegion;
  rightSection?: ReactNode;
  indicator?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  'aria-expanded'?: boolean;
  'aria-haspopup'?: boolean | 'menu';
};

export type SidebarTypeStyles = {
  readonly root: string;
};

export type SidebarTypePack = {
  key: AsideTypeStrategyKey;
  Strategy: ComponentType<SidebarTypeStrategyProps>;
  styles: SidebarTypeStyles;
  /** Overlay on global `BLOCK_REGISTRY`. */
  blocks?: Partial<Record<SidebarBlockRegistryKey, ComponentType<BlockProps>>>;
  /** Menu row presentation — replaces `if (type === 'compact')` in items. */
  Item: ComponentType<SidebarItemPresentationProps>;
  itemKind: SidebarItemKind;
  HeaderLink?: ComponentType<BlockProps>;
  FooterLink?: ComponentType<BlockProps>;
  defaults: SidebarTypeTunables;
};
