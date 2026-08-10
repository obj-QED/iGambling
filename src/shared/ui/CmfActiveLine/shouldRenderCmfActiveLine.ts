/**
 * Whether a Mantine control should mount {@link CmfActiveLine}.
 * Requires settings `active.type === 'line'` (via {@link useCmfActiveIndicator}).
 * Skips AppLink `button-link` (underline border) and disabled states.
 */
export function shouldRenderCmfActiveLine(props: {
  'data-active'?: unknown;
  'data-variant'?: unknown;
  disabled?: unknown;
  'data-disabled'?: unknown;
  'aria-disabled'?: unknown;
  /** From widget settings — only `line` mounts the DOM bar. */
  activeType?: 'line' | 'element' | string;
}): boolean {
  if (props.activeType !== 'line') return false;
  const active = props['data-active'];
  if (active !== true && active !== 'true') return false;
  if (props['data-variant'] === 'button-link') return false;
  if (props.disabled === true) return false;
  if (props['data-disabled'] === true || props['data-disabled'] === 'true') return false;
  if (props['aria-disabled'] === true || props['aria-disabled'] === 'true') return false;
  return true;
}
