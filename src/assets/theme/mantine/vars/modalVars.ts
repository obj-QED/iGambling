import type { CmfScope } from '../cmf/cmfCascadeResolve';

import { buildCmfModalPropToken, resolveCmfScope } from '../cmf/cmfCascadeResolve';

/** Clear Mantine Modal root inline vars before nestCssVars. */
export const CLEAR_MODAL_INLINE_VARS = {
  '--modal-radius': null,
  '--modal-size': null,
  '--modal-y-offset': null,
  '--modal-x-offset': null,
} as const;

/**
 * Modal CSS vars via CMF nest when `data-cmf-*` / `cmfComponent` is set.
 * Native Mantine: radius | size | y-offset | x-offset.
 * Extra paint (consumed by theme `.modal*` SCSS): bg | color | padding | shadow.
 */
export function resolveModalRootVars(props: Record<string, unknown>): Record<string, string> {
  const scope: CmfScope = resolveCmfScope(props);

  return {
    '--modal-radius': buildCmfModalPropToken('radius', 'var(--mantine-radius-default)', { scope }),
    '--modal-size': buildCmfModalPropToken('size', 'var(--modal-size-md, 37.5rem)', { scope }),
    '--modal-y-offset': buildCmfModalPropToken('y-offset', '5dvh', { scope }),
    '--modal-x-offset': buildCmfModalPropToken('x-offset', '5vw', { scope }),
    '--modal-bg': buildCmfModalPropToken(
      'bg',
      'light-dark(var(--mantine-color-body), var(--mantine-color-dark-7))',
      { scope },
    ),
    '--modal-color': buildCmfModalPropToken('color', 'var(--mantine-color-text)', { scope }),
    '--modal-padding': buildCmfModalPropToken('padding', 'var(--mantine-spacing-md)', { scope }),
    '--modal-shadow': buildCmfModalPropToken('shadow', 'var(--mantine-shadow-md)', { scope }),
  };
}
