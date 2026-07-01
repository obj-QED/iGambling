/** Global media icon: `--cmf-icon-width` */
export function cmfGlobalIconVar(prop: string): string {
  return `--cmf-icon-${prop}`;
}

/** Component: `--cmf-header-icon-width` */
export function cmfComponentIconVar(component: string, prop: string): string {
  return `--cmf-${component}-icon-${prop}`;
}

/** Key + component: `--cmf-header-tournaments-icon-width` */
export function cmfComponentKeyIconVar(component: string, key: string, prop: string): string {
  return `--cmf-${component}-${key}-icon-${prop}`;
}

export function cmfIconToken(prop: string, fallback?: string): string {
  const token = cmfGlobalIconVar(prop);
  return fallback !== undefined ? `var(${token}, ${fallback})` : `var(${token})`;
}

export function cmfComponentIconToken(component: string, prop: string, fallback?: string): string {
  const token = cmfComponentIconVar(component, prop);
  const global = cmfIconToken(prop, fallback);
  return `var(${token}, ${global})`;
}
