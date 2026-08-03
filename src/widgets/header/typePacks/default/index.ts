import type { HeaderTypePack } from '../types';

import { DefaultTypeStrategy } from '../../ui/type/DefaultTypeStrategy';
import { HEADER_TYPE_TUNABLE_DEFAULTS } from '../tunableDefaults';

import defaultTypeStyles from '../../styles/type/DefaultType.module.scss';

export const defaultTypePack: HeaderTypePack = {
  key: 'default',
  Strategy: DefaultTypeStrategy,
  styles: { root: defaultTypeStyles.root },
  defaults: HEADER_TYPE_TUNABLE_DEFAULTS.default,
};
