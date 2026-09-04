import type { RefObject } from 'react';

import { useLayoutEffect, useState } from 'react';

import { type CmfIconStyle, findCmfIconScope, readCmfIconStyle } from '@/shared/lib/cmfIcon';

export function useCmfIconStyle(ref: RefObject<Element | null>): CmfIconStyle {
  const [style, setStyle] = useState<CmfIconStyle>({});

  useLayoutEffect(() => {
    const el = ref.current;
    if (el === null) return;

    const sync = () => {
      setStyle(readCmfIconStyle(findCmfIconScope(el)));
    };

    sync();

    const scope = findCmfIconScope(el);
    if (scope === null) return;

    const observer = new MutationObserver(sync);
    observer.observe(scope, { attributes: true, attributeFilter: ['style', 'class'] });

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return style;
}
