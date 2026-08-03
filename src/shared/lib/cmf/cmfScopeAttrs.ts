import type { CmfScopeAttrs, CmfScopeAttrsKey, CmfScopeAttrsRole } from './types';

/** CMF location + optional item key / role for Mantine Button / ActionIcon cascade. */
export function cmfScopeAttrs<TComponent extends string>(
  component: TComponent,
  key?: CmfScopeAttrsKey,
  role?: CmfScopeAttrsRole,
): CmfScopeAttrs<TComponent> {
  const attrs: CmfScopeAttrs<TComponent> = { 'data-cmf-component': component };

  if (key !== undefined && key.length > 0) {
    attrs['data-cmf-key'] = key;
  }
  if (role !== undefined && role.length > 0) {
    attrs['data-cmf-role'] = role;
  }

  return attrs;
}
