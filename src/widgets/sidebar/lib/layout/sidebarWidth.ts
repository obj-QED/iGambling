import type { CSSProperties } from 'react';

/** Desktop width from settings: px number or any CSS length (`30%`, `4.5rem`). */
export type SidebarWidth = number | string;

/** Finite number (px) or non-empty CSS string; missing/invalid → omit (token owns width). */
export function resolveSidebarWidth(raw: number | string | undefined): SidebarWidth | undefined {
  if (raw == null || raw === '' || raw !== raw) return undefined;
  if (Number.isFinite(raw)) return Math.max(0, Math.round(raw as number));
  const value = `${raw}`.trim();
  return value.length > 0 ? value : undefined;
}

/**
 * CSS value for `--app-layout-sidebar-width`.
 * Invalid / missing → `null` (keep token).
 */
export function toSidebarWidthCss(width: SidebarWidth | undefined): string | null {
  if (width == null || width === '' || width !== width) return null;
  if (Number.isFinite(width)) return `${Math.max(0, Math.round(width as number))}px`;
  const value = `${width}`.trim();
  return value.length > 0 ? value : null;
}

/**
 * Live sidebar Root: settings width is the shell contract (no `max-content` growth).
 * Intersect with CSSProperties so custom props are assignable to `style`.
 */
export type SidebarRootWidthStyle = CSSProperties & {
  readonly '--app-layout-sidebar-width': string;
};

export function toSidebarRootWidthStyle(
  width: SidebarWidth | undefined,
  _type: string,
): SidebarRootWidthStyle | undefined {
  const widthCss = toSidebarWidthCss(width);
  if (widthCss == null) {
    return undefined;
  }
  return { '--app-layout-sidebar-width': widthCss };
}
