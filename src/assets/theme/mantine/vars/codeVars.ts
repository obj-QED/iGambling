import type { CmfScope } from '../cmf/cmfCascadeResolve';

import { buildCmfCodePropToken, resolveCmfScope } from '../cmf/cmfCascadeResolve';

/** Clear Mantine Code root inline vars before nestCssVars. */
export const CLEAR_CODE_INLINE_VARS = {
  '--code-bg': null,
} as const;

/**
 * Code CSS vars via CMF nest when `data-cmf-*` is set.
 * Native Mantine: bg. Extra paint (theme `.code` SCSS): color | fz | radius | padding.
 * Cascade: key → component → `--cmf-code-default-*` → parent → fallback.
 */
export function resolveCodeRootVars(props: Record<string, unknown>): Record<string, string> {
  const scope: CmfScope = resolveCmfScope(props);

  return {
    '--code-bg': buildCmfCodePropToken(
      'bg',
      'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))',
      { scope },
    ),
    '--code-color': buildCmfCodePropToken('color', 'var(--mantine-color-text)', { scope }),
    '--code-fz': buildCmfCodePropToken('fz', 'var(--mantine-font-size-xs)', { scope }),
    '--code-radius': buildCmfCodePropToken('radius', 'var(--mantine-radius-sm)', { scope }),
    '--code-padding': buildCmfCodePropToken('padding', '2px calc(var(--mantine-spacing-xs) / 2)', {
      scope,
    }),
  };
}
