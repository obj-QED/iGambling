import type { SidebarConfig } from '../types';

import { SIDEBAR_TYPE_TUNABLE_DEFAULTS } from '../typePacks/tunableDefaults';

export {
  DEFAULT_SIDEBAR_REGIONS,
  DEFAULT_SIDEBAR_SCROLL_AREA_CONFIG,
  resolveSidebarTypeTunableDefaults,
  SIDEBAR_TYPE_TUNABLE_DEFAULTS,
} from '../typePacks/tunableDefaults';

export const DEFAULT_SIDEBAR_CONFIG: SidebarConfig = {
  layout: 'container',
  type: 'default',
  openedDropdowns: [],
  regions: SIDEBAR_TYPE_TUNABLE_DEFAULTS.default.regions,
  scrollArea: SIDEBAR_TYPE_TUNABLE_DEFAULTS.default.scrollArea,
  tooltip: SIDEBAR_TYPE_TUNABLE_DEFAULTS.default.tooltip,
};
