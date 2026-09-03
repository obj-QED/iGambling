import type { HeaderCustomBlockConfig } from '@/shared/config';

/** Keep custom blocks that match the current viewport (`mobile` = ≤ tablet). */
export function filterCustomBlocksByView(
  blocks: HeaderCustomBlockConfig[] | undefined,
  isMobile: boolean,
): HeaderCustomBlockConfig[] | undefined {
  if (blocks === undefined || blocks.length === 0) return blocks;

  const filtered = blocks.filter((block) => {
    if (block.view === 'mobile') return isMobile;
    if (block.view === 'desktop') return !isMobile;
    return true;
  });

  return filtered.length > 0 ? filtered : undefined;
}
