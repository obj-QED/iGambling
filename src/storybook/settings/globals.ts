import {
  HEADER_LAYOUT_KEYS,
  HEADER_TYPE_KEYS,
  type HeaderLayoutKey,
  type HeaderTypeKey,
} from '@/shared/config';

import { COLOR_SCHEME_CUSTOM_BLOCK } from './defaults';

export type StorybookAppSettingsGlobals = {
  headerLayout: HeaderLayoutKey;
  headerType: HeaderTypeKey;
  headerMockMenu: boolean;
  headerColorSchemeSlot: boolean;
};

export const STORYBOOK_APP_SETTINGS_GLOBAL_TYPES = {
  headerLayout: {
    name: 'Header layout',
    description: '`window.__SETTINGS__.header.layout`',
    defaultValue: 'container' satisfies HeaderLayoutKey,
    toolbar: {
      icon: 'component',
      items: HEADER_LAYOUT_KEYS.map((value) => ({ value, title: value })),
      dynamicTitle: true,
    },
  },
  headerType: {
    name: 'Header type',
    description: '`window.__SETTINGS__.header.type`',
    defaultValue: 'default' satisfies HeaderTypeKey,
    toolbar: {
      icon: 'category',
      items: HEADER_TYPE_KEYS.map((value) => ({ value, title: value })),
      dynamicTitle: true,
    },
  },
  headerMockMenu: {
    name: 'Header mock menu',
    description: '`window.__SETTINGS__.header.mockMenu` — use widgets/header mocks',
    defaultValue: true,
    toolbar: {
      icon: 'database',
      items: [
        { value: true, title: 'Mock on' },
        { value: false, title: 'Mock off' },
      ],
      dynamicTitle: true,
    },
  },
  headerColorSchemeSlot: {
    name: 'Color scheme slot',
    description: 'Inject `color_scheme` custom block into header toolbar',
    defaultValue: true,
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: true, title: 'Slot on' },
        { value: false, title: 'Slot off' },
      ],
      dynamicTitle: true,
    },
  },
} as const;

export function readStorybookAppSettingsGlobals(
  globals: Record<string, unknown>,
): StorybookAppSettingsGlobals {
  const headerLayout = HEADER_LAYOUT_KEYS.includes(globals.headerLayout as HeaderLayoutKey)
    ? (globals.headerLayout as HeaderLayoutKey)
    : 'container';

  const headerType = HEADER_TYPE_KEYS.includes(globals.headerType as HeaderTypeKey)
    ? (globals.headerType as HeaderTypeKey)
    : 'default';

  return {
    headerLayout,
    headerType,
    headerMockMenu: globals.headerMockMenu !== false,
    headerColorSchemeSlot: globals.headerColorSchemeSlot !== false,
  };
}

export function buildHeaderSettingsFromGlobals(globals: Record<string, unknown>) {
  const parsed = readStorybookAppSettingsGlobals(globals);

  return {
    layout: parsed.headerLayout,
    type: parsed.headerType,
    mockMenu: parsed.headerMockMenu,
    customBlocks: parsed.headerColorSchemeSlot ? [COLOR_SCHEME_CUSTOM_BLOCK] : [],
  };
}
