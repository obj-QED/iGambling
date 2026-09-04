/** Default special block keys when `aside.specialBlockKeys` is omitted. */
export const DEFAULT_SIDEBAR_SPECIAL_BLOCK_KEYS = [
  'search_leftmenu',
  'timer',
  'wheel_mdl',
  'aside_header_logo',
] as const;

/** @deprecated Use `DEFAULT_SIDEBAR_SPECIAL_BLOCK_KEYS`. */
export const SIDEBAR_SPECIAL_BLOCK_KEYS = DEFAULT_SIDEBAR_SPECIAL_BLOCK_KEYS;

export type SidebarSpecialBlockKey = (typeof DEFAULT_SIDEBAR_SPECIAL_BLOCK_KEYS)[number];

/**
 * Whether `key` is in the special-block allowlist.
 * Pass resolved schema keys at runtime; omit → pack defaults.
 */
export function isSidebarSpecialBlockKey(
  key: string,
  specialBlockKeys: readonly string[] = DEFAULT_SIDEBAR_SPECIAL_BLOCK_KEYS,
): boolean {
  return specialBlockKeys.includes(key);
}
