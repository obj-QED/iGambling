import { useEffect } from 'react';

import { subscribePathname } from '@/shared/lib/routing';

/**
 * Run `close` on pathname changes without subscribing the host component to
 * React Router `useLocation` (which would re-render the whole chrome slot).
 */
export function useCloseOnPathnameChange(close: () => void): void {
  useEffect(
    () =>
      subscribePathname(() => {
        close();
      }),
    [close],
  );
}
