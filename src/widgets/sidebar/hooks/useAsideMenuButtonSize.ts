import { useContext } from 'react';

import { AsideMenuSizeContext } from '../context/asideMenuSizeContext';

export function useAsideMenuButtonSize() {
  return useContext(AsideMenuSizeContext);
}
