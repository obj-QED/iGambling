import { useContext } from 'react';

import { AsideMenuSizeContext } from '../context';

export function useAsideMenuButtonSize() {
  return useContext(AsideMenuSizeContext);
}
