import type { CmfIconControlAttrs } from './types/controlAttrs.types';

import { isSvgMediaSrc } from './icon';

/** Svg src on Button / ActionIcon root — only while menu icon is visible. */
export function cmfIconControlAttrs(
  src: string | undefined,
  showItemImg: boolean,
): CmfIconControlAttrs {
  if (showItemImg === false || src === undefined || src.length === 0) return {};
  if (isSvgMediaSrc(src) === false) return {};

  return { 'data-cmf-icon-src': src };
}
