import { useCallback, useState } from 'react';

import { cmfIconControlAttrs } from '@/shared/lib/cmfIcon';

export type MediaSource = {
  img?: string;
  name?: string;
};

/** Tracks optional image load + derived visibility for any img/name media. */
export function useMediaState(item: MediaSource) {
  const [imgFailed, setImgFailed] = useState(false);
  const onImgError = useCallback(() => {
    setImgFailed(true);
  }, []);

  const img = item.img ?? '';
  const name = item.name ?? '';
  const hasImg = img.length > 0;
  const hasName = name.length > 0;
  const isIconOnly = hasName === false && hasImg === true;
  const showItemImg = hasImg === true && imgFailed === false;

  return {
    imgFailed,
    onImgError,
    showItemImg,
    isIconOnly,
    /** Hide ActionIcon (or icon-only control) when item image load fails. */
    hideImageControl: hasImg === true && imgFailed === true,
    iconControlAttrs: cmfIconControlAttrs(img, showItemImg),
  };
}
