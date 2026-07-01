import type { RefObject } from 'react';

import { useLayoutEffect, useState } from 'react';

import {
  type CmfMenuIconStyle,
  findMenuIconScope,
  readCmfMenuIconStyle,
} from '../lib/cmfMenuIconStyle';

export function useCmfMenuIconStyle(ref: RefObject<HTMLElement | null>): CmfMenuIconStyle {
  const [style, setStyle] = useState<CmfMenuIconStyle>({});

  useLayoutEffect(() => {
    const el = ref.current;
    if (el === null) return;

    const sync = () => {
      setStyle(readCmfMenuIconStyle(findMenuIconScope(el)));
    };

    sync();

    const scope = findMenuIconScope(el);
    if (scope === null) return;

    const observer = new MutationObserver(sync);
    observer.observe(scope, { attributes: true, attributeFilter: ['style', 'class'] });

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return style;
}
