import type { SidebarTypePack } from '../types';

import { Logo } from '../../blocks/Logo/Logo';
import { PromoIconVariant } from '../../blocks/PromoBlock/variants/PromoIconVariant';
import { SearchIconVariant } from '../../blocks/Search/variants/SearchIconVariant';
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
    /** Sync adapters — avoid lazy Suspense wrapping compact `li > *` ActionIcon layout. */
    search_leftmenu: SearchIconVariant,
    timer: PromoIconVariant,
    wheel_mdl: PromoIconVariant,
    aside_header_logo: Logo,
  },
  defaults: SIDEBAR_TYPE_TUNABLE_DEFAULTS.compact,
};
