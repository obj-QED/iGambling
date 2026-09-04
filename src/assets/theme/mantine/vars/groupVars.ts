import type { CmfScope } from '../cmf/cmfCascadeResolve';

import { buildCmfGroupPropToken, resolveCmfScope } from '../cmf/cmfCascadeResolve';

const CLEAR_GROUP_INLINE_VARS = {
  '--group-gap': null,
  '--group-align': null,
  '--group-justify': null,
  '--group-wrap': null,
} as const;

/** Mantine Group CSS vars via CMF nest — gap / align / justify / wrap. */
export function resolveGroupRootVars(props: Record<string, unknown>): Record<string, string> {
  const scope: CmfScope = resolveCmfScope(props);

  return {
    '--group-gap': buildCmfGroupPropToken('gap', 'var(--mantine-spacing-sm)', { scope }),
    '--group-align': buildCmfGroupPropToken('align', 'center', { scope }),
    '--group-justify': buildCmfGroupPropToken('justify', 'flex-start', { scope }),
    '--group-wrap': buildCmfGroupPropToken('wrap', 'wrap', { scope }),
  };
}

export { CLEAR_GROUP_INLINE_VARS };
