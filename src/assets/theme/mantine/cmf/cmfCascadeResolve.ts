/**
 * CMF control token cascade (JS) — Button / ActionIcon naming reference + tests.
 *
 * Runtime SoT is CSS: `styles/_cmf-control-cascade.scss` (theme clears Mantine inline vars).
 * How to edit styles / winner order: `CASCADE.md` in this folder.
 *
 * With `data-cmf-component` / key / role:
 *   1. `--cmf-{control}-{component}-{key}-{prop}`
 *   2. `--cmf-{control}-{component}-{role}-{prop}` (e.g. dropdown parent|child)
 *   3. `--cmf-{control}-{component}-{prop}`
 *   4. `--cmf-{control}-{variant}-{prop}` when `tail: 'variant'` (or variant-in-shared)
 *   5. `--cmf-{control}-{prop}` when `tail: 'shared'`
 *
 * Without component scope (plain `<Button data-variant>`):
 *   1. `--cmf-{control}-{variant}-{prop}`
 *   2. `--cmf-{control}-{prop}` when `tail: 'shared'`
 *
 * Size table (`--button-height-sm`, `--ai-size-sm`, …) stays in Mantine CSS as last-resort
 * fallbacks only — never as `--cmf-{control}-{sm|md|…}-{prop}` layers.
 *
 * Icon media emit `--cmf-control-icon-*` (see `cmfIconControlVars.ts`).
 */

export type CmfScope = {
  component?: string;
  key?: string;
  /** Structural role inside a component (e.g. dropdown `parent` | `child`). */
  role?: string;
};

export type CmfControlCascadeTail = 'variant' | 'shared';

/** @deprecated Use `CmfControlCascadeTail` */
export type CmfButtonCascadeTail = CmfControlCascadeTail;

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
    key: readStringProp(props, ['data-cmf-key', 'cmfKey']),
    role: readStringProp(props, ['data-cmf-role', 'cmfRole']),
  };
}

/** Nest `var(name, …)` — `names[0]` wins (most specific). */
export function nestCssVars(names: string[], fallback: string): string {
  return names.reduceRight((inner, name) => `var(${name}, ${inner})`, fallback);
}

type CmfControlName = 'button' | 'action-icon';

function cmfControlName(control: CmfControlName, ...parts: string[]): string {
  return `--cmf-${control}-${parts.join('-')}`;
}

type BuildCmfControlPropTokenOptions = {
  scope?: CmfScope;
  variant?: string | null;
  /** After component scopes: which token family to append (scoped mode only). */
  tail?: CmfControlCascadeTail;
  /**
   * With `tail: 'shared'`, also insert `--cmf-{control}-{variant}-{prop}`
   * before the shared control token (icon-* / radius demos).
   */
  includeVariantInShared?: boolean;
};

function buildCmfControlPropToken(
  control: CmfControlName,
  prop: string,
  fallback: string,
  {
    scope,
    variant,
    tail = 'variant',
    includeVariantInShared = false,
  }: BuildCmfControlPropTokenOptions = {},
): string {
  const names: string[] = [];
  const hasComponent = scope?.component !== undefined;
  const hasVariant = typeof variant === 'string' && variant.length > 0;

  if (hasComponent && scope.key !== undefined) {
    names.push(cmfControlName(control, scope.component!, scope.key, prop));
  }
  if (hasComponent && scope.role !== undefined) {
    names.push(cmfControlName(control, scope.component!, scope.role, prop));
  }
  if (hasComponent) {
    names.push(cmfControlName(control, scope.component!, prop));
  }

  if (hasComponent === false) {
    // Plain control: data-variant only (+ shared when requested)
    if (hasVariant) {
      names.push(cmfControlName(control, variant, prop));
    }
    if (tail === 'shared') {
      names.push(cmfControlName(control, prop));
    }
  } else if (tail === 'variant' && hasVariant) {
    names.push(cmfControlName(control, variant, prop));
  } else if (tail === 'shared') {
    if (includeVariantInShared === true && hasVariant) {
      names.push(cmfControlName(control, variant, prop));
    }
    names.push(cmfControlName(control, prop));
  }

  return nestCssVars(names, fallback);
}

type BuildCmfPropTokenOptions = BuildCmfControlPropTokenOptions;

/**
 * With scope: component+key → component+role → component → variant|shared → fallback
 * Without scope: variant → (shared) → fallback
 */
export function buildCmfButtonPropToken(
  prop: string,
  fallback: string,
  options: BuildCmfPropTokenOptions = {},
): string {
  return buildCmfControlPropToken('button', prop, fallback, options);
}

/** Same cascade as Button, prefix `--cmf-action-icon-*`. */
export function buildCmfActionIconPropToken(
  prop: string,
  fallback: string,
  options: BuildCmfPropTokenOptions = {},
): string {
  return buildCmfControlPropToken('action-icon', prop, fallback, options);
}
