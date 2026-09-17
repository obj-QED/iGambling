import type { SidebarTypePack } from '../types';

import { Logo } from '../../blocks/Logo/Logo';
import { Search } from '../../blocks/Search/Search';
import { SIDEBAR_TYPE_TUNABLE_DEFAULTS } from '../tunableDefaults';
import { SlideinFooterLink } from './FooterLink';
import { SlideinHeaderLink } from './HeaderLink';
import { SlideinItem } from './Item';
import { SlideinStrategy } from './Strategy';

import slideinTypeStyles from '../../../styles/type/SlideinType.module.scss';

export const slideinTypePack: SidebarTypePack = {
  key: 'slidein',
  Strategy: SlideinStrategy,
  styles: { root: slideinTypeStyles.root },
  Item: SlideinItem,
  itemKind: 'button',
  HeaderLink: SlideinHeaderLink,
  FooterLink: SlideinFooterLink,
  blocks: {
    /** Search router wires AppSearch; chrome via blockVariants.search (row when expanded). */
    search_leftmenu: Search,
    aside_header_logo: Logo,
  },
  defaults: SIDEBAR_TYPE_TUNABLE_DEFAULTS.slidein,
};
