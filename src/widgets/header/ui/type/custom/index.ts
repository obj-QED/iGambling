import type { HeaderTypePack } from '../types';

import { HEADER_TYPE_TUNABLE_DEFAULTS } from '../tunableDefaults';
import { CustomStrategy } from './Strategy';

import customTypeStyles from '../../../styles/type/CustomType.module.scss';

export const customTypePack: HeaderTypePack = {
  key: 'custom',
  Strategy: CustomStrategy,
  styles: { root: customTypeStyles.root },
  defaults: HEADER_TYPE_TUNABLE_DEFAULTS.custom,
};
