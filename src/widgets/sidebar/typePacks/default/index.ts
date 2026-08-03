import type { SidebarTypePack } from '../types';

import { SidebarFooterLink } from '../../ui/layout/SidebarFooterLink/SidebarFooterLink';
import { SidebarHeaderLink } from '../../ui/layout/SidebarHeaderLink/SidebarHeaderLink';
import { SIDEBAR_TYPE_TUNABLE_DEFAULTS } from '../tunableDefaults';
import { DefaultItem } from './Item';
import { DefaultStrategy } from './Strategy';

import defaultTypeStyles from '../../styles/type/DefaultType.module.scss';

export const defaultTypePack: SidebarTypePack = {
  key: 'default',
  Strategy: DefaultStrategy,
  styles: { root: defaultTypeStyles.root },
  Item: DefaultItem,
  itemKind: 'button',
  HeaderLink: SidebarHeaderLink,
  FooterLink: SidebarFooterLink,
  defaults: SIDEBAR_TYPE_TUNABLE_DEFAULTS.default,
};
