import type { RootState } from '@/store';

import { useCallback } from 'react';

import { useSelector } from 'react-redux';

import { translateField } from '@/shared/lib/translateField';

/**
 * `words` are pulled from Redux (`state.words`), so no dictionary argument is needed.
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
