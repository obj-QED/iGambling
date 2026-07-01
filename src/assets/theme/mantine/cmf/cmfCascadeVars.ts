/** CMF component locations — mirrors `cmf-component-registry.scss`. */
export const CMF_COMPONENTS = ['header', 'sidebar', 'footer', 'banner'] as const;

export type CmfComponent = (typeof CMF_COMPONENTS)[number];

/** Global: `--cmf-button-filled-bg` */
export function cmfGlobalButtonVar(suffix: string): string {
  return `--cmf-button-${suffix}`;
}

/** Component: `--cmf-header-button-filled-bg` */
export function cmfComponentButtonVar(component: string, suffix: string): string {
  return `--cmf-${component}-button-${suffix}`;
}

/** Key + component: `--cmf-header-tournaments-button-filled-bg` */
export function cmfComponentKeyButtonVar(component: string, key: string, suffix: string): string {
  return `--cmf-${component}-${key}-button-${suffix}`;
}

/** Global: `--cmf-action-icon-filled-bg` */
export function cmfGlobalActionIconVar(suffix: string): string {
  return `--cmf-action-icon-${suffix}`;
}

/** Component: `--cmf-header-action-icon-filled-bg` */
export function cmfComponentActionIconVar(component: string, suffix: string): string {
  return `--cmf-${component}-action-icon-${suffix}`;
}

/** Key + component: `--cmf-header-tournaments-action-icon-filled-bg` */
export function cmfComponentKeyActionIconVar(
  component: string,
  key: string,
  suffix: string,
): string {
  return `--cmf-${component}-${key}-action-icon-${suffix}`;
}
