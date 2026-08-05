import type { SidebarTypePack } from '../types';

import { Logo } from '../../blocks/Logo/Logo';
import { SIDEBAR_TYPE_TUNABLE_DEFAULTS } from '../tunableDefaults';
import { CompactFooterLink } from './FooterLink';
import { CompactHeaderLink } from './HeaderLink';
import { CompactItem } from './Item';
import { CompactPromoBlock } from './PromoBlock';
import { Search } from './Search';
import { CompactStrategy } from './Strategy';

import compactTypeStyles from '../../../styles/type/CompactType.module.scss';

export const compactTypePack: SidebarTypePack = {
  key: 'compact',
  Strategy: CompactStrategy,
  styles: { root: compactTypeStyles.root },
  Item: CompactItem,
  itemKind: 'actionIcon',
  HeaderLink: CompactHeaderLink,
  FooterLink: CompactFooterLink,
  blocks: {
    search_leftmenu: Search,
    timer: CompactPromoBlock,
    wheel_mdl: CompactPromoBlock,
    aside_header_logo: Logo,
  },
  defaults: SIDEBAR_TYPE_TUNABLE_DEFAULTS.compact,
};
