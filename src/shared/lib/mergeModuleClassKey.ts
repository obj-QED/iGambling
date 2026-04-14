/**
 * Склеивает класс с одним и тем же ключом из base и variant CSS Modules.
 * Если в variant ключа нет или значение пустое — возвращается только base
 * (удобно для опциональных переопределений варианта).
 */
export function mergeModuleClassKey<
  B extends Record<string, string>,
  V extends Record<string, string>,
>(base: B, variant: V, key: keyof B & string): string {
  const b = base[key];
  const v = variant[key as keyof V];
  return typeof v === 'string' && v.length > 0 ? `${b} ${v}` : b;
}
