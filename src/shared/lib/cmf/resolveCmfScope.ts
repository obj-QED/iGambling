import type { CmfControlAttrsInput } from './types';

/** Nested dropdown `data-cmf-role` — parent trigger / child row. */
export const CMF_DROPDOWN_ROLE_PARENT = 'parent';
export const CMF_DROPDOWN_ROLE_CHILD = 'child';

export type ResolveCmfScopeOptions = {
  /** Base widget segment (`sidebar`, `header`, …). */
  widget: string;
  /** Strip segment → `{widget}-{chrome}` (`header`, `footer`, `dropdown`, …). */
  chrome?: string;
  /** Optional `data-cmf-role` (e.g. parent / child). */
  role?: string;
  /** Cascade key override (defaults to `item.key`). */
  key?: string;
};

type CmfScopeItem = {
  key?: string;
};

/**
 * Maps widget + optional chrome/role → `{ component, key, role }` for
 * {@link controlAttrs} / {@link cmfControlAttrs}.
 *
 * Examples:
 * - `{ widget: 'sidebar' }` → `sidebar`
 * - `{ widget: 'sidebar', chrome: 'footer' }` → `sidebar-footer`
 * - `{ widget: 'sidebar', chrome: 'dropdown', role: 'parent' }` → `sidebar-dropdown` + role
 * - `{ widget: 'header', role: 'child' }` → `header-dropdown` + role (role-only default)
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

  const chrome = options.chrome?.trim();
  const role = options.role?.trim();
  const roleAttr = role && role.length > 0 ? { role } : {};

  if (chrome && chrome.length > 0) {
    return { component: `${widget}-${chrome}`, key, ...roleAttr };
  }

  if (role && role.length > 0) {
    return { component: `${widget}-dropdown`, key, role };
  }

  return { component: widget, key };
}
