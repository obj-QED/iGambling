import type { SidebarSchema } from '../types';

import { SIDEBAR_TYPE_TUNABLE_DEFAULTS } from '../ui/type/tunableDefaults';

export {
  DEFAULT_SIDEBAR_REGIONS,
  DEFAULT_SIDEBAR_SCROLL_AREA_CONFIG,
  resolveSidebarTypeTunableDefaults,
  SIDEBAR_TYPE_TUNABLE_DEFAULTS,
} from '../ui/type/tunableDefaults';

export const DEFAULT_SIDEBAR_CONFIG: SidebarSchema = {
  version: 1,
  layout: 'container',
  type: 'default',
  openedDropdowns: [],
  regions: SIDEBAR_TYPE_TUNABLE_DEFAULTS.default.regions,
  scrollArea: SIDEBAR_TYPE_TUNABLE_DEFAULTS.default.scrollArea,
  tooltip: SIDEBAR_TYPE_TUNABLE_DEFAULTS.default.tooltip,
  wrappers: {},
  behavior: {
    sticky: false,
    transparent: false,
    hideOnScroll: false,
  },
  capabilities: {
    header: true,
    main: true,
    footer: true,
  },
};
