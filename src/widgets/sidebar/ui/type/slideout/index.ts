import type { SidebarTypePack } from '../types';

import { Logo } from '../../blocks/Logo/Logo';
import { Search } from '../../blocks/Search/Search';
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
    /** Search router wires AppSearch; chrome via blockVariants.search (row when expanded). */
    search_leftmenu: Search,
    aside_header_logo: Logo,
  },
  defaults: SIDEBAR_TYPE_TUNABLE_DEFAULTS.slideout,
};
