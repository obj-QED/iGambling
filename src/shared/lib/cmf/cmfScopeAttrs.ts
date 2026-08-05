import type { CmfScopeAttrs, CmfScopeAttrsKey, CmfScopeAttrsRole } from './types';

import { cmfControlAttrs } from './cmfControlAttrs';

/**
 * @deprecated Prefer {@link cmfControlAttrs} object form:
 * `cmfControlAttrs({ component, key, role })`.
 */
export function cmfScopeAttrs<TComponent extends string>(
  component: TComponent,
  key?: CmfScopeAttrsKey,
  role?: CmfScopeAttrsRole,
): CmfScopeAttrs<TComponent> {
  return cmfControlAttrs({ component, key, role }) as CmfScopeAttrs<TComponent>;
}
