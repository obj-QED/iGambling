import { pickUnionValue, readString } from '@/shared/lib/coercion';

/** Settings / schema: how active route chrome is drawn. */
export const CMF_ACTIVE_TYPES = ['line', 'element'] as const;
export type CmfActiveType = (typeof CMF_ACTIVE_TYPES)[number];

export const CMF_ACTIVE_POSITIONS = ['top', 'right', 'bottom', 'left'] as const;
export type CmfActivePosition = (typeof CMF_ACTIVE_POSITIONS)[number];

/** Raw `header.active` / `aside.active` from `window.__SETTINGS__`. */
export type CmfActiveSettings = {
  type?: CmfActiveType | string;
  position?: CmfActivePosition | string;
};

/** Resolved active indicator (widgets put this on schema + root attrs). */
export type CmfActiveConfig = {
  /**
   * `element` (default) → CSS `::after` bar via cascade tokens (no Line DOM).
   * `line` → mount `CmfActiveLine` (settings `active.type`).
   */
  type: CmfActiveType;
  /**
   * Hint / `data-cmf-active-position` only.
   * Geometry (`inset` / size) stays in theme tokens — never inlined (would stomp SoT).
   */
  position: CmfActivePosition;
};

export const DEFAULT_CMF_ACTIVE_CONFIG: CmfActiveConfig = {
  type: 'element',
  position: 'bottom',
};

/** Sidebar omit/`element`: keep token `left` ready if settings later set `type: 'line'`. */
export const DEFAULT_SIDEBAR_CMF_ACTIVE_CONFIG: CmfActiveConfig = {
  type: 'element',
  position: 'left',
};

/**
 * Resolve `active` from settings. Omit / invalid → {@link DEFAULT_CMF_ACTIVE_CONFIG}
 * (`element` — CSS `::after`, no Line DOM).
 */
export function resolveCmfActiveConfig(
  raw: CmfActiveSettings | null | undefined,
  fallback: CmfActiveConfig = DEFAULT_CMF_ACTIVE_CONFIG,
): CmfActiveConfig {
  if (!raw || typeof raw !== 'object') return { ...fallback };

  const type = pickUnionValue(
    CMF_ACTIVE_TYPES,
    readString(raw.type).trim() || undefined,
    fallback.type,
  );
  const position = pickUnionValue(
    CMF_ACTIVE_POSITIONS,
    readString(raw.position).trim() || undefined,
    fallback.position,
  );

  return {
    type: type as CmfActiveType,
    position: position as CmfActivePosition,
  };
}
