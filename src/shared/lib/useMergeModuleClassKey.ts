import { useMemo } from 'react';

import { mergeModuleClassKey } from './mergeModuleClassKey';

type ScssModule = Record<string, string>;

/** Результат хука: слияние base + variant по строковому ключу экспорта SCSS. */
export type MergeModuleClassKeyFn = (classKey: string) => string;

/**
 * Склеивает классы двух CSS Modules (base + variant) по одному ключу.
 * Вариант может не переопределять ключ — тогда остаётся только base.
 */
export function useMergeModuleClassKey<B extends ScssModule, V extends ScssModule>(
  base: B,
  variant: V,
): MergeModuleClassKeyFn {
  return useMemo(() => {
    return (classKey: string) =>
      mergeModuleClassKey(base, variant, classKey as keyof B & string);
  }, [base, variant]);
}
