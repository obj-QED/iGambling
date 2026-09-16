/** Desktop slideout shell phases — drive CSS tokens / chrome. */
export type SidebarSlideoutPhase = 'expanded' | 'collapsed' | 'expanding' | 'collapsing';

/** Map open flag + transition-idle → phase (idle on mount → expanded|collapsed). */
export function resolveSidebarSlideoutPhase(
  expanded: boolean,
  settled: boolean,
): SidebarSlideoutPhase {
  if (expanded) return settled ? 'expanded' : 'expanding';
  return settled ? 'collapsed' : 'collapsing';
}
