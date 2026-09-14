import type { SidebarTypePack } from '../types';

import { Logo } from '../../blocks/Logo/Logo';
import { PromoIconVariant } from '../../blocks/PromoBlock/variants/PromoIconVariant';
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
     * Use Search router (not bare SearchIconVariant) so AppSearch onActivate
     * is wired — icon chrome comes from blockVariants.search = icon.
     */
    search_leftmenu: Search,
    timer: PromoIconVariant,
    wheel_mdl: PromoIconVariant,
    aside_header_logo: Logo,
  },
  defaults: SIDEBAR_TYPE_TUNABLE_DEFAULTS.compact,
};
