import type { CmfControlAttrsInput } from './types';

/** Nested dropdown `data-cmf-role` — parent trigger / child row. */
export const CMF_DROPDOWN_ROLE_PARENT = 'parent';
export const CMF_DROPDOWN_ROLE_CHILD = 'child';

/** Chrome strip segment → `{widget}-header` / `{widget}-footer`. */
export type CmfChromeRegion = 'header' | 'footer';

export type ResolveCmfScopeOptions = {
  /** Base widget segment (`sidebar`, `header`, …). */
  widget: string;
  /** Aside/header chrome strip. */
  chrome?: CmfChromeRegion;
  /** Nested dropdown component (`{widget}-dropdown`). */
  dropdown?: boolean;
  /** Dropdown trigger → role `parent`. */
  dropdownTrigger?: boolean;
  /** Nested dropdown row → role `child`. */
  dropdownItem?: boolean;
  /** Explicit dropdown role (forces `{widget}-dropdown`). */
  role?: string;
  /** Cascade key override (defaults to `item.key`). */
  key?: string;
};

type CmfScopeItem = {
  key?: string;
};

/**
 * Maps widget UI flags → `{ component, key, role }` for {@link controlAttrs} /
 * {@link cmfControlAttrs}.
 *
 * Examples:
 * - `{ widget: 'sidebar' }` → `sidebar`
 * - `{ widget: 'sidebar', chrome: 'footer' }` → `sidebar-footer`
 * - `{ widget: 'sidebar', dropdownTrigger: true }` → `sidebar-dropdown` + role `parent`
 * - `{ widget: 'header', dropdown: true }` → `header-dropdown`
 */
export function resolveCmfScope(
  item: CmfScopeItem | null | undefined,
  options: ResolveCmfScopeOptions,
): CmfControlAttrsInput {
  const key = (options.key ?? item?.key)?.trim() || undefined;
  const widget = options.widget.trim();
  if (widget.length === 0) {
    return key ? { key } : {};
  }

  if (options.chrome === 'header' || options.chrome === 'footer') {
    return { component: `${widget}-${options.chrome}`, key };
  }

  const role = options.role?.trim();
  if (role && role.length > 0) {
    return { component: `${widget}-dropdown`, key, role };
  }
  if (options.dropdownTrigger === true) {
    return {
      component: `${widget}-dropdown`,
      key,
      role: CMF_DROPDOWN_ROLE_PARENT,
    };
  }
  if (options.dropdownItem === true) {
    return {
      component: `${widget}-dropdown`,
      key,
      role: CMF_DROPDOWN_ROLE_CHILD,
    };
  }
  if (options.dropdown === true) {
    return { component: `${widget}-dropdown`, key };
  }

  return { component: widget, key };
}
