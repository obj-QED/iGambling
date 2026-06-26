/** Header blocks with dedicated UI — menu `type` does not apply. */
export const HEADER_SPECIAL_BLOCK_KEYS = [
  'search',
  'logo',
  'bonus_box',
  'wallet',
  'notification',
  'color_scheme',
] as const;

export type HeaderSpecialBlockKey = (typeof HEADER_SPECIAL_BLOCK_KEYS)[number];

const HEADER_SPECIAL_BLOCK_KEY_SET = new Set<string>(HEADER_SPECIAL_BLOCK_KEYS);

export function isHeaderSpecialBlockKey(key: string): boolean {
  return HEADER_SPECIAL_BLOCK_KEY_SET.has(key);
}
