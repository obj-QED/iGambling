/** Any Mantine control slug — `--cmf-{slug}-*` (see `cmfControls.ts`). */
export type CmfControlKind = string;

/**
 * CMF token layers for Mantine controls (high → low among CMF; Mantine fallback after base):
 *
 * | Priority | Layer                    | CSS var pattern                           |
 * | -------- | ------------------------ | ----------------------------------------- |
 * | 1        | cmf-component-key-{ctrl} | `--cmf-{loc}-{key}-{slug}-{prop}`         |
 * | 2        | cmf-component-{ctrl}     | `--cmf-{loc}-{slug}-{prop}`               |
 * | 3        | cmf-{ctrl} (base)        | `--cmf-{slug}-{prop}` on `:root`          |
 * | 4        | Mantine                  | component vars fallbacks                  |
 *
 * Applies to every Mantine component in theme except Container.
 */
export type CmfScope = {
  component?: string;
  key?: string;
};

function readStringProp(
  props: Record<string, unknown>,
  keys: readonly string[],
): string | undefined {
  for (const key of keys) {
    const value = props[key];
    if (typeof value === 'string' && value.trim().length > 0) {
      return value.trim();
    }
  }

  return undefined;
}

/** Resolve CMF location from Mantine props / data-* attrs on the control root. */
export function resolveCmfScope(props: Record<string, unknown>): CmfScope {
  return {
    component: readStringProp(props, ['data-cmf-component', 'cmfComponent']),
    key: readStringProp(props, ['data-cmf-key', 'data-menu-key', 'cmfKey']),
  };
}

/**
 * Build Mantine `--button-*` / `--ai-*` source from CMF layers + Mantine fallback.
 *
 * Chain (outer = wins): key → component → base → mantineFallback
 */
export function buildCmfControlToken(
  control: CmfControlKind,
  suffix: string,
  mantineFallback: string,
  scope?: CmfScope,
): string {
  let chain = mantineFallback;

  chain = `var(--cmf-${control}-${suffix}, ${chain})`;

  if (scope?.component !== undefined) {
    chain = `var(--cmf-${scope.component}-${control}-${suffix}, ${chain})`;
  }

  if (scope?.component !== undefined && scope.key !== undefined) {
    chain = `var(--cmf-${scope.component}-${scope.key}-${control}-${suffix}, ${chain})`;
  }

  return chain;
}
