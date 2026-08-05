import type { CmfControlAttrs, CmfControlAttrsInput } from './types';

/**
 * Cascade attrs for AppButton / AppActionIcon / dropdown rows.
 * Sets `data-cmf-component` | `data-cmf-key` | `data-cmf-role` only when provided (non-empty).
 *
 * @example
 * ```tsx
 * <AppButton {...cmfControlAttrs({ component: 'sidebar-footer', key: item.key })} />
 * <AppActionIcon {...cmfControlAttrs({ component: 'sidebar-dropdown', key, role: 'parent' })} />
 * ```
 */
export function cmfControlAttrs(input: CmfControlAttrsInput = {}): CmfControlAttrs {
  const attrs: CmfControlAttrs = {};
  const component = input.component?.trim();
  const key = input.key?.trim();
  const role = input.role?.trim();

  if (component !== undefined && component.length > 0) {
    attrs['data-cmf-component'] = component;
  }
  if (key !== undefined && key.length > 0) {
    attrs['data-cmf-key'] = key;
  }
  if (role !== undefined && role.length > 0) {
    attrs['data-cmf-role'] = role;
  }

  return attrs;
}
