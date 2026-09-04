/** Prefer `@use "assets/theme/breakpoints"` in Sass modules loaded via `@use`
 * (those files do not receive Vite `additionalData`). Entry CSS / CSS modules
 * get the same module through this preamble.
 */
const scssGlobalPreamble = `@use "assets/styles/mixins" as *; @use "assets/theme/breakpoints" as *;`;

/** Global SCSS preamble — breakpoints + shared mixins. Layer order lives in `layer-order.css`. */
export function scssAdditionalData(content: string, filename: string): string {
  // Avoid circular `@use` when compiling mixin partials / breakpoint partial itself.
  const normalized = filename.replace(/\\/g, '/');
  if (
    normalized.includes('/assets/styles/mixins/') ||
    normalized.endsWith('/assets/theme/breakpoints.scss')
  ) {
    return content;
  }

  // All `@use` must come first (Sass).
  return `${scssGlobalPreamble} ${content}`;
}
