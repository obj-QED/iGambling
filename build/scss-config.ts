import { BREAKPOINTS_PX } from '../src/assets/theme/breakpoints';

export const scssBreakpoints = Object.entries(BREAKPOINTS_PX)
  .map(([name, px]) => `$${name}: ${px}px;`)
  .join(' ');

const scssGlobalPreamble = `@use "assets/styles/mixins" as *; ${scssBreakpoints}`;

/** Global SCSS preamble — breakpoints + shared mixins. Layer order lives in `layer-order.css`. */
export function scssAdditionalData(content: string, filename: string): string {
  // Avoid circular `@use` when compiling mixin partials themselves.
  const normalized = filename.replace(/\\/g, '/');
  if (normalized.includes('/assets/styles/mixins/')) {
    return content;
  }

  // All `@use` must come first (Sass).
  return `${scssGlobalPreamble} ${content}`;
}
