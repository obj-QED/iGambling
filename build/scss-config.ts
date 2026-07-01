import { BREAKPOINTS_PX } from '../src/assets/theme/breakpoints';

export const scssBreakpoints = Object.entries(BREAKPOINTS_PX)
  .map(([name, px]) => `$${name}: ${px}px;`)
  .join(' ');

const scssGlobalPreamble = `@use "assets/styles/cascade-layers" as *; @use "assets/styles/mixins" as *; ${scssBreakpoints}`;

const WIDGET_STYLES_RE = /\/widgets\/([^/]+)\/styles\//;

/** Widget menu mixins — see `src/widgets/{name}/styles/_mixins.scss`. */
export function scssAdditionalData(content: string, filename: string): string {
  const normalized = filename.replace(/\\/g, '/');
  const widgetMatch = normalized.match(WIDGET_STYLES_RE);
  const widgetKebab = widgetMatch?.[1];
  const isWidgetStyles =
    widgetKebab !== undefined &&
    !normalized.endsWith(`/widgets/${widgetKebab}/styles/_mixins.scss`);
  const widgetMixins = isWidgetStyles ? `@use "widgets/${widgetKebab}/styles/mixins" as *; ` : '';

  return `${scssGlobalPreamble} ${widgetMixins}${content}`;
}
