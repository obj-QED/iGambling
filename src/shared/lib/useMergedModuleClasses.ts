import { useMemo } from 'react';

import { mergeModuleClassKey } from './mergeModuleClassKey';

type ScssModule = Record<string, string>;

export type MergedModuleClasses = Record<string, string>;

/**
 * Returns a proxy map that resolves `classes[key]` as merged `base + variant`.
 * Useful when children need bracket access like `classes[dynamicKey]`.
 */
export function useMergedModuleClasses<B extends ScssModule, V extends ScssModule>(
  base: B,
  variant: V,
): MergedModuleClasses {
  return useMemo(
    () =>
      new Proxy(
        {},
        {
          get: (_target, prop) => {
            if (typeof prop !== 'string') {
              return '';
            }

            return mergeModuleClassKey(base, variant, prop);
          },
        },
      ) as MergedModuleClasses,
    [base, variant],
  );
}

