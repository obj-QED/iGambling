import { pickUnionValue } from '@/shared/lib/coercion';

export type PageLayoutKind = 'default' | 'info';

export type PageLayoutRouteHandle = {
  pageLayout: PageLayoutKind;
};

export const PAGE_LAYOUT_KINDS = ['default', 'info'] as const satisfies readonly PageLayoutKind[];

export const DEFAULT_PAGE_LAYOUT_HANDLE: PageLayoutRouteHandle = {
  pageLayout: 'default',
};

export const INFO_PAGE_LAYOUT_HANDLE: PageLayoutRouteHandle = {
  pageLayout: 'info',
};

export type PageLayoutMatch = { handle?: { pageLayout?: PageLayoutKind } };

export function resolvePageLayoutFromMatches(matches: PageLayoutMatch[]): PageLayoutKind {
  for (let index = matches.length - 1; index >= 0; index -= 1) {
    const layout = matches[index]?.handle?.pageLayout;
    if (layout !== undefined) {
      return pickUnionValue(PAGE_LAYOUT_KINDS, layout, 'default');
    }
  }

  return 'default';
}
