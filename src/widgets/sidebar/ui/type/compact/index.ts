import type { SidebarTypePack } from '../types';

import { Logo } from '../../blocks/Logo/Logo';
import { Search } from '../../blocks/Search/Search';
import { SIDEBAR_TYPE_TUNABLE_DEFAULTS } from '../tunableDefaults';
import { CompactFooterLink } from './FooterLink';
import { CompactHeaderLink } from './HeaderLink';
import { CompactItem } from './Item';
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
    /**
     * Search router (not a chrome variant) so AppSearch onActivate is wired.
     * Promo uses Block → PromoBlock + `blockVariants.promo` (icon for compact).
     */
    search_leftmenu: Search,
    aside_header_logo: Logo,
  },
  defaults: SIDEBAR_TYPE_TUNABLE_DEFAULTS.compact,
};
