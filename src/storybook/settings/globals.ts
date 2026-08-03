import {
  ASIDE_LAYOUT_KEYS,
  ASIDE_TYPE_KEYS,
  type AsideLayoutKey,
  type AsideTypeKey,
  HEADER_LAYOUT_KEYS,
  HEADER_MOCK_AUTH_KEYS,
  HEADER_TYPE_KEYS,
  type HeaderLayoutKey,
  type HeaderMockAuthKey,
  type HeaderTypeKey,
} from '@/shared/config';

import { COLOR_SCHEME_CUSTOM_BLOCK } from './defaults';

export type StorybookAsideWidthKey = '72' | '320' | '400' | '480';

export type StorybookAppSettingsGlobals = {
  headerLayout: HeaderLayoutKey;
  headerType: HeaderTypeKey;
  headerAuth: HeaderMockAuthKey;
  headerColorSchemeSlot: boolean;
  asideLayout: AsideLayoutKey;
  asideType: AsideTypeKey;
  asideMockMenu: boolean;
  asideWidth: StorybookAsideWidthKey;
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
  headerAuth: {
    name: 'Header session',
    description: 'Authenticated vs guest header menu mock (`widgets/header/mocks`)',
    defaultValue: 'authenticated' satisfies HeaderMockAuthKey,
    toolbar: {
      icon: 'user',
      items: [
        { value: 'authenticated', title: 'With token' },
        { value: 'guest', title: 'Guest' },
      ],
      dynamicTitle: true,
    },
  },
  headerColorSchemeSlot: {
    name: 'Color scheme slot',
    description: 'Inject `color_scheme` custom block into header toolbar',
    defaultValue: 'true',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'true', title: 'Slot on' },
        { value: 'false', title: 'Slot off' },
      ],
      dynamicTitle: true,
    },
  },
  asideLayout: {
    name: 'Aside layout',
    description: '`window.__SETTINGS__.aside.layout`',
    defaultValue: 'container' satisfies AsideLayoutKey,
    toolbar: {
      icon: 'component',
      items: ASIDE_LAYOUT_KEYS.map((value) => ({ value, title: value })),
      dynamicTitle: true,
    },
  },
  asideType: {
    name: 'Aside type',
    description: '`window.__SETTINGS__.aside.type`',
    defaultValue: 'default' satisfies AsideTypeKey,
    toolbar: {
      icon: 'sidebaralt',
      items: ASIDE_TYPE_KEYS.map((value) => ({ value, title: value })),
      dynamicTitle: true,
    },
  },
  asideMockMenu: {
    name: 'Aside mock menu',
    description: '`window.__SETTINGS__.aside.mockMenu` — sidebar menu from `widgets/sidebar/mocks`',
    defaultValue: 'true',
    toolbar: {
      icon: 'sidebar',
      items: [
        { value: 'true', title: 'Mock on' },
        { value: 'false', title: 'Mock off' },
      ],
      dynamicTitle: true,
    },
  },
  asideWidth: {
    name: 'Aside width',
    description: '`window.__SETTINGS__.aside.width` (px number or CSS length)',
    defaultValue: '400' satisfies StorybookAsideWidthKey,
    toolbar: {
      icon: 'ruler',
      items: [
        { value: '72', title: '72px' },
        { value: '320', title: '320px' },
        { value: '400', title: '400px' },
        { value: '480', title: '480px' },
      ],
      dynamicTitle: true,
    },
  },
};

export function readStorybookAppSettingsGlobals(
  globals: Record<string, unknown>,
): StorybookAppSettingsGlobals {
  const headerLayout = (HEADER_LAYOUT_KEYS as readonly string[]).includes(
    String(globals.headerLayout),
  )
    ? String(globals.headerLayout)
    : 'container';

  const headerType = (HEADER_TYPE_KEYS as readonly string[]).includes(String(globals.headerType))
    ? String(globals.headerType)
    : 'default';

  const headerAuth = HEADER_MOCK_AUTH_KEYS.includes(globals.headerAuth as HeaderMockAuthKey)
    ? (globals.headerAuth as HeaderMockAuthKey)
    : 'authenticated';

  return {
    headerLayout,
    headerType,
    headerAuth,
    headerColorSchemeSlot: globals.headerColorSchemeSlot !== 'false',
    asideLayout: (ASIDE_LAYOUT_KEYS as readonly string[]).includes(String(globals.asideLayout))
      ? String(globals.asideLayout)
      : 'container',
    asideType: (ASIDE_TYPE_KEYS as readonly string[]).includes(String(globals.asideType))
      ? String(globals.asideType)
      : 'default',
    asideMockMenu: globals.asideMockMenu !== 'false',
    asideWidth: (['72', '320', '400', '480'].includes(String(globals.asideWidth))
      ? globals.asideWidth
      : '400') as StorybookAsideWidthKey,
  };
}

export function buildHeaderSettingsFromGlobals(globals: Record<string, unknown>) {
  const parsed = readStorybookAppSettingsGlobals(globals);

  return {
    layout: parsed.headerLayout,
    type: parsed.headerType,
    mockMenu: true,
    mockAuth: parsed.headerAuth,
    customBlocks: parsed.headerColorSchemeSlot ? [COLOR_SCHEME_CUSTOM_BLOCK] : [],
  };
}

export function buildAsideSettingsFromGlobals(globals: Record<string, unknown>) {
  const parsed = readStorybookAppSettingsGlobals(globals);

  return {
    width: Number(parsed.asideWidth),
    layout: parsed.asideLayout,
    type: parsed.asideType,
    mockMenu: parsed.asideMockMenu,
    customBlocks: [],
  };
}
