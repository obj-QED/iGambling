import type { HeaderTypePack } from '../types';

import { DropdownTypeStrategy } from '../../ui/type/DropdownTypeStrategy';
import { HEADER_TYPE_TUNABLE_DEFAULTS } from '../tunableDefaults';

import dropdownTypeStyles from '../../styles/type/DropdownType.module.scss';

export const dropdownTypePack: HeaderTypePack = {
  key: 'dropdown',
  Strategy: DropdownTypeStrategy,
  styles: dropdownTypeStyles,
  defaults: HEADER_TYPE_TUNABLE_DEFAULTS.dropdown,
};
