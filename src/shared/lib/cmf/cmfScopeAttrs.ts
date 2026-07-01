import type { CmfScopeAttrs, CmfScopeAttrsKey } from './types';

/** CMF location + optional item key for Mantine Button / ActionIcon cascade. */
export function cmfScopeAttrs<TComponent extends string>(
  component: TComponent,
  key?: CmfScopeAttrsKey,
): CmfScopeAttrs<TComponent> {
  if (key !== undefined && key.length > 0) {
    return {
      'data-cmf-component': component,
      'data-cmf-key': key,
    };
  }

  return { 'data-cmf-component': component };
}
