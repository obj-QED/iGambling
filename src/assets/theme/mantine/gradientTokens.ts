/** Shared gradient strings — used by theme.scss (--app-gradient-*), mantineTheme, buttonVars fallbacks. */

export const APP_GRADIENT_DEG = 45;

export const APP_GRADIENT_FROM = 'var(--mantine-color-brand-4)';
export const APP_GRADIENT_TO = 'color-mix(in srgb, var(--mantine-color-brand-4) 70%, black)';

export const APP_GRADIENT_HOVER_FROM = 'var(--mantine-color-brand-5)';
export const APP_GRADIENT_HOVER_TO = 'color-mix(in srgb, var(--mantine-color-brand-6) 88%, black)';

export function buildAppGradient(from: string, to: string, deg = APP_GRADIENT_DEG): string {
  return `linear-gradient(${deg}deg, ${from} 0%, ${to} 100%)`;
}

export const APP_GRADIENT_DEFAULT = buildAppGradient(APP_GRADIENT_FROM, APP_GRADIENT_TO);
export const APP_GRADIENT_DEFAULT_HOVER = buildAppGradient(
  APP_GRADIENT_HOVER_FROM,
  APP_GRADIENT_HOVER_TO,
);
