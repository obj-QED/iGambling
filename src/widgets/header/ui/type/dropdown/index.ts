import type { HeaderTypePack } from '../types';

import { DropdownTypeStrategy } from '../DropdownTypeStrategy';
import { HEADER_TYPE_TUNABLE_DEFAULTS } from '../tunableDefaults';

import dropdownTypeStyles from '../../../styles/type/DropdownType.module.scss';

export const dropdownTypePack: HeaderTypePack = {
  key: 'dropdown',
  Strategy: DropdownTypeStrategy,
  styles: { root: dropdownTypeStyles.root },
  defaults: HEADER_TYPE_TUNABLE_DEFAULTS.dropdown,
};
