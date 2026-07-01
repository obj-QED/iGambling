import type { HeaderMenuSizes } from '../lib/headerMenuSize';

import { createContext } from 'react';

import { DEFAULT_HEADER_MENU_SIZES } from '../lib/headerMenuSize';

export const HeaderMenuSizesContext = createContext<HeaderMenuSizes>(DEFAULT_HEADER_MENU_SIZES);
