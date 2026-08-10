import { useCallback } from 'react';

import { navigateAppHref } from '@/shared/lib/routing';

import { getAppHrefKind, isValidAppHref } from './resolveAppHref';

/** Navigate on click — always keep `<button>` in DOM (no `AppLink` / `<a>`). */
export function useAppHrefClickHandler(href: string | undefined, enabled = true) {
  return useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!enabled || href === undefined || !isValidAppHref(href)) return;

      const kind = getAppHrefKind(href);

      if (kind === 'internal') {
        event.preventDefault();
        navigateAppHref(href);
        return;
      }

      if (kind === 'external') {
        event.preventDefault();
        window.open(href, '_blank', 'noopener,noreferrer');
        return;
      }

      if (kind === 'hash') {
        event.preventDefault();
        const fragment = href.slice(1);
        window.location.hash = fragment;
        document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [enabled, href],
  );
}
