import type { SidebarTypePack } from '../types';

import { Logo } from '../../blocks/Logo/Logo';
import { PromoIconVariant } from '../../blocks/PromoBlock/variants/PromoIconVariant';
import { SearchIconVariant } from '../../blocks/Search/variants/SearchIconVariant';
import { SIDEBAR_TYPE_TUNABLE_DEFAULTS } from '../tunableDefaults';
import { SlideoutFooterLink } from './FooterLink';
import { SlideoutHeaderLink } from './HeaderLink';
import { SlideoutItem } from './Item';
import { SlideoutStrategy } from './Strategy';

import slideoutTypeStyles from '../../../styles/type/SlideoutType.module.scss';

export const slideoutTypePack: SidebarTypePack = {
  key: 'slideout',
  Strategy: SlideoutStrategy,
  styles: { root: slideoutTypeStyles.root },
  Item: SlideoutItem,
  itemKind: 'button',
  HeaderLink: SlideoutHeaderLink,
  FooterLink: SlideoutFooterLink,
  blocks: {
    /** Sync adapters — icon rail for search/promo while labels clip on row items. */
    search_leftmenu: SearchIconVariant,
    timer: PromoIconVariant,
    wheel_mdl: PromoIconVariant,
    aside_header_logo: Logo,
  },
  defaults: SIDEBAR_TYPE_TUNABLE_DEFAULTS.slideout,
};
