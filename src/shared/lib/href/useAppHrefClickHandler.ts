import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { getAppHrefKind, isValidAppHref } from './resolveAppHref';

/** Navigate on click — always keep `<button>` in DOM (no `AppLink` / `<a>`). */
export function useAppHrefClickHandler(href: string | undefined, enabled = true) {
  const navigate = useNavigate();

  return useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (enabled === false || href === undefined || isValidAppHref(href) === false) return;

      const kind = getAppHrefKind(href);

      if (kind === 'internal') {
        event.preventDefault();
        navigate(href);
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
    [enabled, href, navigate],
  );
}
