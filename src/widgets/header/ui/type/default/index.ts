import type { HeaderTypePack } from '../types';

import { HEADER_TYPE_TUNABLE_DEFAULTS } from '../tunableDefaults';
import { DefaultStrategy } from './Strategy';

import defaultTypeStyles from '../../../styles/type/DefaultType.module.scss';

export const defaultTypePack: HeaderTypePack = {
  key: 'default',
  Strategy: DefaultStrategy,
  styles: { root: defaultTypeStyles.root },
  defaults: HEADER_TYPE_TUNABLE_DEFAULTS.default,
};
