import type { RootState } from '@/store';

import { useSelector } from 'react-redux';

/**
 * Возвращает функцию-переводчик по ключу из store.words.
 * Если ключ не найден — возвращает сам ключ (безопасный fallback).
 *
 * @example
 * const t = useWord();
 * <h1>{t('menu_home')}</h1>   // → "Главная"
 * <p>{t('menu_games')}</p>    // → "Игры"
 */
export function useWord() {
  const words = useSelector((state: RootState) => state.words);
  return (key: string): string => words[key] ?? key;
}

/**
 * Возвращает объект переводов с указанным префиксом.
 *
 * @example
 * const menuWords = useWordsByPrefix('menu_');
 * // → { menu_home: 'Главная', menu_games: 'Игры' }
 */
export function useWordsByPrefix(prefix: string): Record<string, string> {
  return useSelector((state: RootState) => {
    const words = state.words;
    return Object.fromEntries(
      Object.entries(words).filter(([k]) => k.startsWith(prefix))
    );
  });
}
