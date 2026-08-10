import type { HeaderTypePack } from '../types';

import { HEADER_TYPE_TUNABLE_DEFAULTS } from '../tunableDefaults';
import { DropdownStrategy } from './Strategy';

import dropdownTypeStyles from '../../../styles/type/DropdownType.module.scss';

export const dropdownTypePack: HeaderTypePack = {
  key: 'dropdown',
  Strategy: DropdownStrategy,
  styles: { root: dropdownTypeStyles.root },
  defaults: HEADER_TYPE_TUNABLE_DEFAULTS.dropdown,
};
