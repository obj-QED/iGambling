/**
 * Merges classes by the same key from base and variant CSS Modules.
 * If variant key is missing or empty, returns base only
 * (useful for optional variant overrides).
 */
export function mergeModuleClassKey<
  B extends Record<string, string>,
  V extends Record<string, string>,
>(base: B, variant: V, key: keyof B & string): string {
  const b = base[key];
  const v = variant[key as keyof V];
  return typeof v === 'string' && v.length > 0 ? `${b} ${v}` : b;
}
