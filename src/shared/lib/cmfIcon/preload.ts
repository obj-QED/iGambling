import { isSvgMediaSrc } from './icon';

const warmed = new Set<string>();

/** Warm browser / HTTP cache for menu icon media before dropdown open. */
export function preloadCmfIconSrc(src: string): void {
  const trimmed = src.trim();
  if (trimmed.length === 0 || warmed.has(trimmed)) return;
  warmed.add(trimmed);

  if (isSvgMediaSrc(trimmed)) {
    void fetch(trimmed, { mode: 'cors', credentials: 'same-origin', cache: 'force-cache' }).catch(
      () => undefined,
    );
    return;
  }

  if (typeof Image === 'undefined') return;
  const img = new Image();
  img.decoding = 'async';
  img.src = trimmed;
}

export function preloadCmfIconSrcs(srcs: readonly (string | undefined | null)[]): void {
  for (const src of srcs) {
    if (typeof src === 'string') preloadCmfIconSrc(src);
  }
}

type MenuImgNode = {
  img?: string;
  items?: readonly MenuImgNode[];
};

/** Collect `img` URLs from a menu subtree (dropdown children). */
export function collectMenuItemImgSrcs(items: readonly MenuImgNode[] | undefined): string[] {
  if (items === undefined || items.length === 0) return [];

  const out: string[] = [];
  const walk = (nodes: readonly MenuImgNode[]) => {
    for (const node of nodes) {
      const img = node.img?.trim();
      if (img !== undefined && img.length > 0) out.push(img);
      if (node.items !== undefined && node.items.length > 0) walk(node.items);
    }
  };
  walk(items);
  return out;
}

export function preloadMenuItemIcons(items: readonly MenuImgNode[] | undefined): void {
  preloadCmfIconSrcs(collectMenuItemImgSrcs(items));
}
