/** Sidebar blocks with dedicated UI — menu `type` does not apply. */
export const SIDEBAR_SPECIAL_BLOCK_KEYS = ['search_leftmenu', 'timer', 'wheel_mdl'] as const;

export type SidebarSpecialBlockKey = (typeof SIDEBAR_SPECIAL_BLOCK_KEYS)[number];

const SIDEBAR_SPECIAL_BLOCK_KEY_SET = new Set<string>(SIDEBAR_SPECIAL_BLOCK_KEYS);

export function isSidebarSpecialBlockKey(key: string): boolean {
  return SIDEBAR_SPECIAL_BLOCK_KEY_SET.has(key);
}
