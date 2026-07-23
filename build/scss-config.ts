import { BREAKPOINTS_PX } from '../src/assets/theme/breakpoints';

export const scssBreakpoints = Object.entries(BREAKPOINTS_PX)
  .map(([name, px]) => `$${name}: ${px}px;`)
  .join(' ');

const scssGlobalPreamble = `@use "assets/styles/mixins" as *; ${scssBreakpoints}`;

/** Global SCSS preamble — breakpoints + shared mixins. Layer order lives in `layer-order.css`. */
export function scssAdditionalData(content: string, _filename: string): string {
  // All `@use` must come first (Sass).
  return `${scssGlobalPreamble} ${content}`;
}
