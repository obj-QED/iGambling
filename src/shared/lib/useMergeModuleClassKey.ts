import { useMemo } from 'react';

import { mergeModuleClassKey } from './mergeModuleClassKey';

type ScssModule = Record<string, string>;

/** Hook result: merged base + variant by exported SCSS string key. */
export type MergeModuleClassKeyFn = (classKey: string) => string;

/**
 * Merges classes from two CSS Modules (base + variant) by the same key.
 * Variant may omit a key — base class is kept in that case.
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
