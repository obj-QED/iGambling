import type { SidebarTypePack } from '../types';

import { SidebarFooterLink } from '../../blocks/SidebarFooter/FooterLink';
import { SidebarHeaderLink } from '../../blocks/SidebarHeader/HeaderLink';
import { ItemButton } from '../../items/ItemButton/ItemButton';
import { SIDEBAR_TYPE_TUNABLE_DEFAULTS } from '../tunableDefaults';
import { DefaultStrategy } from './Strategy';

import defaultTypeStyles from '../../../styles/type/DefaultType.module.scss';

export const defaultTypePack: SidebarTypePack = {
  key: 'default',
  Strategy: DefaultStrategy,
  styles: { root: defaultTypeStyles.root },
  Item: ItemButton,
  itemKind: 'button',
  HeaderLink: SidebarHeaderLink,
  FooterLink: SidebarFooterLink,
  defaults: SIDEBAR_TYPE_TUNABLE_DEFAULTS.default,
};
