import { BREAKPOINTS_PX } from '../src/assets/theme/breakpoints';

export const scssBreakpoints = Object.entries(BREAKPOINTS_PX)
  .map(([name, px]) => `$${name}: ${px}px;`)
  .join(' ');

const scssGlobalPreamble = `@use "assets/styles/cascade-layers" as *; @use "assets/styles/mixins" as *; ${scssBreakpoints}`;

/** Header widget mixins — see `src/widgets/header/styles/_mixins.scss`. */
export function scssAdditionalData(content: string, filename: string): string {
  const normalized = filename.replace(/\\/g, '/');
  const isHeaderStyles =
    normalized.includes('/widgets/header/styles/') &&
    !normalized.endsWith('/widgets/header/styles/_mixins.scss');
  const headerMixins = isHeaderStyles ? `@use "widgets/header/styles/mixins" as *; ` : '';

  return `${scssGlobalPreamble} ${headerMixins}${content}`;
}
