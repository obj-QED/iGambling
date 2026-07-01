import { buildCmfControlToken, resolveCmfScope } from '../cmf/cmfCascadeResolve';

export type CmfVarTokenDef = {
  suffix: string;
  fallback: string;
};

/** Build Mantine `vars` map with full CMF cascade for any control kind. */
export function resolveCmfRootVars(
  control: string,
  props: Record<string, unknown>,
  tokens: Record<string, CmfVarTokenDef>,
): Record<string, string> {
  const scope = resolveCmfScope(props);

  return Object.fromEntries(
    Object.entries(tokens).map(([cssVar, { suffix, fallback }]) => [
      cssVar,
      buildCmfControlToken(control, suffix, fallback, scope),
    ]),
  );
}
