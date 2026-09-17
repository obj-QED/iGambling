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
 * CSS value for `--app-layout-sidebar-width` / `--aside-slideout-expanded-width`.
 * Invalid / missing → `null` (keep token).
 */
export function toSidebarWidthCss(width: SidebarWidth | undefined): string | null {
  if (width == null || width === '' || width !== width) return null;
  if (Number.isFinite(width)) return `${Math.max(0, Math.round(width as number))}px`;
  const value = `${width}`.trim();
  return value.length > 0 ? value : null;
}

/**
 * Settings supply an arbitrary CSS length, so this runtime token remains the
 * cascade boundary. Fixed structure and fallbacks stay in SCSS/theme.
 *
 * Slideout: set `--aside-slideout-expanded-width` only — phase tokens map
 * `--app-layout-sidebar-width` so collapsing still switches to the calc rail.
 */
export type SidebarRootWidthStyle = CSSProperties & {
  readonly '--app-layout-sidebar-width'?: string;
  readonly '--aside-slideout-expanded-width'?: string;
};

export type SidebarRootWidthOptions = {
  /** `aside.type` — slideout uses expanded-width token for phase switching. */
  type?: string;
};

export function toSidebarRootWidthStyle(
  width: SidebarWidth | undefined,
  options?: SidebarRootWidthOptions,
): SidebarRootWidthStyle | undefined {
  const widthCss = toSidebarWidthCss(width);
  if (widthCss === null) return undefined;
  if (options?.type === 'slideout') {
    return { '--aside-slideout-expanded-width': widthCss };
  }
  return { '--app-layout-sidebar-width': widthCss };
}
