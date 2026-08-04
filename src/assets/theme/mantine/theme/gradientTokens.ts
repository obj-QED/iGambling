/** Shared gradient strings — used by theme.scss (--app-gradient-*) and mantineTheme. */

export const APP_GRADIENT_DEG = 45;

export const APP_GRADIENT_FROM = 'var(--brand-color-6)';
export const APP_GRADIENT_TO = 'var(--brand-color-8)';

export const APP_GRADIENT_HOVER_FROM = 'var(--brand-color-7)';
export const APP_GRADIENT_HOVER_TO = 'var(--brand-color-9)';

export function buildAppGradient(from: string, to: string, deg = APP_GRADIENT_DEG): string {
  return `linear-gradient(${deg}deg, ${from} 0%, ${to} 100%)`;
}

export const APP_GRADIENT_DEFAULT = buildAppGradient(APP_GRADIENT_FROM, APP_GRADIENT_TO);
export const APP_GRADIENT_DEFAULT_HOVER = buildAppGradient(
  APP_GRADIENT_HOVER_FROM,
  APP_GRADIENT_HOVER_TO,
);
