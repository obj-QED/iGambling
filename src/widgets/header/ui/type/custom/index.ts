import type { HeaderTypePack } from '../types';

import { ClassicTypeStrategy } from '../CustomTypeStrategy';
import { HEADER_TYPE_TUNABLE_DEFAULTS } from '../tunableDefaults';

import customTypeStyles from '../../../styles/type/CustomType.module.scss';

export const customTypePack: HeaderTypePack = {
  key: 'custom',
  Strategy: ClassicTypeStrategy,
  styles: { root: customTypeStyles.root },
  defaults: HEADER_TYPE_TUNABLE_DEFAULTS.custom,
};
