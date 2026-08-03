import { useContext } from 'react';

import { HeaderMenuSizesContext } from './menuSizesContext';

export function useHeaderMenuSizes() {
  return useContext(HeaderMenuSizesContext);
}
