import type { CmfScope } from './cmfCascadeResolve';
import type { CmfControlCascadeTail } from './cmfCascadeResolve';

type BuildIconPropToken = (
  prop: string,
  fallback: string,
  options: {
    scope?: CmfScope;
    variant?: string | null;
    tail?: CmfControlCascadeTail;
    includeVariantInShared?: boolean;
  },
) => string;

type ResolveCmfIconControlVarsOptions = {
  scope: CmfScope;
  variant: string;
  buildToken: BuildIconPropToken;
};

/**
 * Icon media on Button / ActionIcon.
 *
 * Cascade (most specific → least):
 *   1. `--cmf-{button|action-icon}-{component}-{key}-icon-{scale|aspect|width|height}`
 *   2. `--cmf-{button|action-icon}-{component}-icon-*`
 *   3. `--cmf-{button|action-icon}-{variant}-icon-*` (data-variant)
 *   4. `--cmf-{button|action-icon}-icon-*`
 *   5. `--cmf-icon-*` (theme / widget)
 *
 * Auto box sizing (`--_cmf-icon-*-auto`) lives only in SCSS on the media node.
 */
export function resolveCmfIconControlVars({
  scope,
  variant,
  buildToken,
}: ResolveCmfIconControlVarsOptions): Record<string, string> {
  const iconOpts = {
    scope,
    variant,
    tail: 'shared' as const,
    includeVariantInShared: true,
  };

  return {
    '--cmf-control-icon-scale': buildToken('icon-scale', 'var(--cmf-icon-scale, 0.7)', iconOpts),
    '--cmf-control-icon-aspect': buildToken('icon-aspect', 'var(--cmf-icon-aspect, 1)', iconOpts),
    '--cmf-control-icon-width': buildToken('icon-width', 'var(--cmf-icon-width)', iconOpts),
    '--cmf-control-icon-height': buildToken('icon-height', 'var(--cmf-icon-height)', iconOpts),
  };
}
