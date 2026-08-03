import type { HeaderTypePack } from '../types';

import { ClassicTypeStrategy } from '../../ui/type/CustomTypeStrategy';
import { HEADER_TYPE_TUNABLE_DEFAULTS } from '../tunableDefaults';

import customTypeStyles from '../../styles/type/CustomType.module.scss';

export const customTypePack: HeaderTypePack = {
  key: 'custom',
  Strategy: ClassicTypeStrategy,
  styles: customTypeStyles,
  defaults: HEADER_TYPE_TUNABLE_DEFAULTS.custom,
};
