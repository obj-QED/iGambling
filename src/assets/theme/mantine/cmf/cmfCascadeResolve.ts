/**
 * CMF control token cascade (JS) — Button / ActionIcon.
 *
 * With `data-cmf-component` / key:
 *   1. `--cmf-{control}-{component}-{key}-{prop}`
 *   2. `--cmf-{control}-{component}-{prop}`
 *   3. `--cmf-{control}-{variant|size|shared}-{prop}` (by `tail`)
 *
 * Without component scope (plain `<Button variant>`):
 *   1. `--cmf-{control}-{variant}-{prop}`
 *   2. `--cmf-{control}-{size}-{prop}`
 *   3. `--cmf-{control}-{prop}` when `tail: 'shared'`
 *
 * Size table (`--button-height-sm`, `--ai-size-sm`, …) stays in Mantine CSS as last-resort fallbacks.
 *
 * Icon media (`icon-scale` | `icon-aspect` | `icon-width` | `icon-height`) emit
 * `--cmf-control-icon-*` on the control (see `cmfIconControlVars.ts`).
 */

export type CmfScope = {
  component?: string;
  key?: string;
};

export type CmfControlCascadeTail = 'variant' | 'shared' | 'size';

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
  size?: string | null;
  /** After component scopes: which token family to append (scoped mode only). */
  tail?: CmfControlCascadeTail;
  /**
   * When true and variant is `exception`, also try
   * `--cmf-{control}-exception-{key}-{prop}` first.
   */
  exceptionKeyLayer?: boolean;
  /**
   * With `tail: 'shared'` + component scope, also insert
   * `--cmf-{control}-{size}-{prop}` before the shared control token.
   * Used for icon-* so `--cmf-button-sm-icon-height` participates.
   */
  includeSizeInShared?: boolean;
};

function buildCmfControlPropToken(
  control: CmfControlName,
  prop: string,
  fallback: string,
  {
    scope,
    variant,
    size,
    tail = 'variant',
    exceptionKeyLayer = false,
    includeSizeInShared = false,
  }: BuildCmfControlPropTokenOptions = {},
): string {
  const names: string[] = [];
  const hasComponent = scope?.component !== undefined;

  if (exceptionKeyLayer === true && variant === 'exception' && scope?.key !== undefined) {
    names.push(cmfControlName(control, 'exception', scope.key, prop));
  }

  if (hasComponent && scope.key !== undefined) {
    names.push(cmfControlName(control, scope.component!, scope.key, prop));
  }
  if (hasComponent) {
    names.push(cmfControlName(control, scope.component!, prop));
  }

  if (hasComponent === false) {
    // Plain control: variant → size → (shared)
    if (variant) {
      names.push(cmfControlName(control, variant, prop));
    }
    if (size) {
      names.push(cmfControlName(control, size, prop));
    }
    if (tail === 'shared') {
      names.push(cmfControlName(control, prop));
    }
  } else if (tail === 'variant' && variant) {
    names.push(cmfControlName(control, variant, prop));
  } else if (tail === 'size' && size) {
    names.push(cmfControlName(control, size, prop));
  } else if (tail === 'shared') {
    if (includeSizeInShared === true && size) {
      names.push(cmfControlName(control, size, prop));
    }
    names.push(cmfControlName(control, prop));
  }

  return nestCssVars(names, fallback);
}

type BuildCmfPropTokenOptions = Omit<BuildCmfControlPropTokenOptions, 'exceptionKeyLayer'>;

/**
 * With scope: component+key → component → (variant | size | shared) → fallback
 * Without scope: variant → size → (shared) → fallback
 *
 * Exception + key also tries `--cmf-button-exception-{key}-{prop}` first.
 */
export function buildCmfButtonPropToken(
  prop: string,
  fallback: string,
  options: BuildCmfPropTokenOptions = {},
): string {
  return buildCmfControlPropToken('button', prop, fallback, {
    ...options,
    exceptionKeyLayer: true,
  });
}

/** Same cascade as Button, prefix `--cmf-action-icon-*`. */
export function buildCmfActionIconPropToken(
  prop: string,
  fallback: string,
  options: BuildCmfPropTokenOptions = {},
): string {
  return buildCmfControlPropToken('action-icon', prop, fallback, options);
}
