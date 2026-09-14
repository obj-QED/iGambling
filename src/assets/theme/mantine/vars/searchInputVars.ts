import { buildCmfSearchPropToken, resolveCmfScope } from '../cmf/cmfCascadeResolve';

/** Clear Mantine Input inline vars before nestCssVars (AppSearch TextInput). */
export const CLEAR_SEARCH_INPUT_INLINE_VARS = {
  '--input-bg': null,
  '--input-color': null,
  '--input-bd': null,
  '--input-bd-focus': null,
  '--input-radius': null,
  '--input-height': null,
  '--input-size': null,
  '--input-placeholder-color': null,
  '--input-cursor': null,
  '--input-hover': null,
  '--input-hover-color': null,
  '--input-hover-bd': null,
  '--input-bg-focus': null,
  '--input-color-focus': null,
  '--input-section-color': null,
  '--input-section-hover-color': null,
  '--input-section-focus-color': null,
  '--input-icon-size': null,
  '--input-code-bg': null,
  '--input-code-color': null,
  '--input-code-hover-bg': null,
  '--input-code-hover-color': null,
  '--input-code-focus-bg': null,
  '--input-code-focus-color': null,
  '--input-code-fz': null,
  '--input-code-radius': null,
  '--input-code-padding': null,
  '--input-clear-color': null,
  '--input-clear-bg': null,
  '--input-clear-hover-color': null,
  '--input-clear-hover-bg': null,
  '--input-clear-size': null,
  '--input-clear-radius': null,
  '--input-clear-icon-size': null,
} as const;

export type SearchInputVarsProps = {
  size?: unknown;
  radius?: unknown;
  'data-cmf-component'?: string;
  'data-cmf-key'?: string;
  'data-cmf-role'?: string;
  /** Overlay trigger — pointer cursor (modal / spotlight). */
  'data-search-overlay'?: string;
};

function resolveInputHeight(size: unknown): string {
  if (typeof size === 'string' && size.trim().length > 0) {
    return `var(--input-height-${size.trim()}, var(--input-height-md))`;
  }
  return 'var(--input-height-md)';
}

function resolveRadius(radius: unknown, cmfFallback: string): string {
  if (typeof radius === 'number' && Number.isFinite(radius)) {
    return `${radius}px`;
  }
  if (typeof radius === 'string' && radius.trim().length > 0) {
    const value = radius.trim();
    if (
      value.startsWith('var(') ||
      value.includes('rem') ||
      value.includes('px') ||
      value.includes('%')
    ) {
      return value;
    }
    return `var(--mantine-radius-${value}, var(--mantine-radius-md))`;
  }
  return cmfFallback;
}

/**
 * Code chip paints — must stay distinct from field `--mantine-color-default` /
 * `default-hover` (dark: field ≈ dark-6 / dark-5).
 */
const CODE_BG_FALLBACK = 'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-7))';
const CODE_HOVER_BG_FALLBACK =
  'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))';
const CODE_PADDING_FALLBACK = 'var(--mantine-spacing-xs) var(--mantine-spacing-sm)';

type SearchScope = ReturnType<typeof resolveCmfScope>;

function searchToken(prop: string, fallback: string, scope: SearchScope): string {
  return buildCmfSearchPropToken(prop, fallback, { scope });
}

/**
 * AppSearch TextInput cascade → Mantine `--input-*` + element paints
 * (field / icon / code / clear).
 *
 * Winner: place+key → place → `--cmf-search-*` → Mantine defaults.
 *
 * @example
 * // everywhere
 * --cmf-search-clear-color: …
 * // header only
 * --cmf-search-header-clear-color: …
 * // header search key only
 * --cmf-search-header-search-clear-color: …
 */
export function resolveSearchInputRootVars(props: SearchInputVarsProps): Record<string, string> {
  const scope = resolveCmfScope(props as Record<string, unknown>);
  const height = searchToken('height', resolveInputHeight(props.size), scope);
  const overlay = props['data-search-overlay'] === 'true';

  /* Icon color: prefer `icon-*`, keep `section-*` as legacy alias. */
  const iconColor = searchToken(
    'icon-color',
    searchToken('section-color', 'var(--mantine-color-dimmed)', scope),
    scope,
  );
  const iconHoverColor = searchToken(
    'icon-hover-color',
    searchToken('section-hover-color', 'var(--mantine-color-text)', scope),
    scope,
  );
  const iconFocusColor = searchToken(
    'icon-focus-color',
    searchToken('section-focus-color', 'var(--mantine-color-text)', scope),
    scope,
  );

  const codeBg = searchToken('code-bg', `var(--cmf-search-code-bg, ${CODE_BG_FALLBACK})`, scope);
  const codeColor = searchToken('code-color', 'var(--mantine-color-text)', scope);
  const codeHoverBg = searchToken(
    'code-hover-bg',
    `var(--cmf-search-code-hover-bg, ${CODE_HOVER_BG_FALLBACK})`,
    scope,
  );

  return {
    /* —— field —— */
    '--input-bg': searchToken('bg', 'var(--cmf-search-bg, var(--mantine-color-default))', scope),
    '--input-color': searchToken('color', 'var(--mantine-color-text)', scope),
    '--input-bd': searchToken('bd', 'var(--mantine-color-default-border)', scope),
    '--input-bd-focus': searchToken('bd-focus', 'var(--brand-color-6)', scope),
    '--input-hover': searchToken(
      'hover',
      'var(--cmf-search-hover, var(--mantine-color-default-hover))',
      scope,
    ),
    '--input-hover-color': searchToken('hover-color', 'var(--mantine-color-text)', scope),
    '--input-hover-bd': searchToken('hover-bd', 'var(--brand-color-6)', scope),
    '--input-bg-focus': searchToken('bg-focus', 'var(--input-bg)', scope),
    '--input-color-focus': searchToken('color-focus', 'var(--input-color)', scope),
    '--input-radius': resolveRadius(
      props.radius,
      /* Align with Button / ActionIcon CMF (`md`), not theme `defaultRadius` (sm). */
      searchToken('radius', 'var(--mantine-radius-md)', scope),
    ),
    '--input-height': height,
    '--input-size': height,
    '--input-placeholder-color': searchToken(
      'placeholder-color',
      'var(--mantine-color-placeholder)',
      scope,
    ),
    '--input-cursor': searchToken('cursor', overlay ? 'pointer' : 'text', scope),

    /* —— left icon (Mantine sections read `--input-section-color`) —— */
    '--input-section-color': iconColor,
    '--input-section-hover-color': iconHoverColor,
    '--input-section-focus-color': iconFocusColor,
    '--input-icon-size': searchToken('icon-size', '1rem', scope),

    /* —— hotkey Code —— */
    '--input-code-bg': codeBg,
    '--input-code-color': codeColor,
    '--input-code-hover-bg': codeHoverBg,
    '--input-code-hover-color': searchToken('code-hover-color', 'var(--mantine-color-text)', scope),
    '--input-code-focus-bg': searchToken(
      'code-focus-bg',
      'var(--cmf-search-code-focus-bg, var(--input-code-hover-bg))',
      scope,
    ),
    '--input-code-focus-color': searchToken('code-focus-color', 'var(--mantine-color-text)', scope),
    '--input-code-fz': searchToken('code-fz', 'var(--mantine-font-size-xs)', scope),
    '--input-code-radius': searchToken('code-radius', 'var(--mantine-radius-sm)', scope),
    '--input-code-padding': searchToken('code-padding', CODE_PADDING_FALLBACK, scope),

    /* —— clear (×) CloseButton —— */
    '--input-clear-color': searchToken('clear-color', 'var(--input-section-color)', scope),
    '--input-clear-bg': searchToken('clear-bg', 'transparent', scope),
    '--input-clear-hover-color': searchToken(
      'clear-hover-color',
      'var(--mantine-color-text)',
      scope,
    ),
    '--input-clear-hover-bg': searchToken(
      'clear-hover-bg',
      'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))',
      scope,
    ),
    '--input-clear-size': searchToken('clear-size', 'var(--cb-size-sm, 1.375rem)', scope),
    '--input-clear-radius': searchToken('clear-radius', 'var(--input-radius)', scope),
    '--input-clear-icon-size': searchToken('clear-icon-size', '70%', scope),
  };
}
