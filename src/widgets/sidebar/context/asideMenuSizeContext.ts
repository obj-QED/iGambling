import type { CmfButtonSize } from '@/assets/theme';

import { createContext } from 'react';

import { DEFAULT_ASIDE_MENU_BUTTON_SIZE } from '../lib/asideMenuSize';

export const AsideMenuSizeContext = createContext<CmfButtonSize>(DEFAULT_ASIDE_MENU_BUTTON_SIZE);
AsideMenuSizeContext.displayName = 'AsideMenuSizeContext';
