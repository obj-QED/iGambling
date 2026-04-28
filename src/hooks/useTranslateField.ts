import type { RootState } from '@/store';

import { useCallback } from 'react';

import { useSelector } from 'react-redux';

import { translateField } from '@/shared/lib/translateField';

/**
 * `words` подставляются из Redux (`state.words`), передавать словарь не нужно.
 *
 * @example
 * const t = useTranslateField();
 * <span>{t('logout', false)}</span>
 */
export function useTranslateField() {
  const words = useSelector((state: RootState) => state.words);
  return useCallback(
    (name: unknown, rename = true, lower = true) => translateField(name, words, rename, lower),
    [words],
  );
}
