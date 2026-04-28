import type { Words } from '@/entities/translation/types';

/**
 * Проверка «плоского» словаря строк (как `state.words` после init).
 */
function isFlatWordsRecord(obj: unknown): obj is Words {
  if (!obj || typeof obj !== 'object') return false;
  return Object.values(obj).every((value) => typeof value === 'string');
}

/**
 * Перевод по ключу из словаря (локаль + сервер уже слиты в Redux `words`).
 * @param rename если `true` и перевод найден — оборачивает в шаблон (как в legacy); если перевода нет — `lang->key`. Если `false` — сырой текст или ключ без префикса `lang->`.
 * @param lower приводить ключ к нижнему регистру перед поиском
 */
export function translateField(
  name: unknown,
  words: Words | null | undefined,
  rename = true,
  lower = true,
): string {
  let nameToString = '';
  try {
    if (name === null || name === undefined) {
      nameToString = 'alert_null_or_undefined';
    } else if (typeof name === 'object') {
      if (Object.keys(name).length === 0 && name.constructor === Object) {
        nameToString = 'alert_empty_object';
      } else {
        nameToString = JSON.stringify(name);
      }
    } else {
      nameToString = String(name || '');
    }
  } catch {
    nameToString = 'error_processing_name';
  }

  const formattedName = lower ? (nameToString || '').toLowerCase() : nameToString;

  if (words && isFlatWordsRecord(words) && words[formattedName] !== undefined) {
    const value = words[formattedName];
    return rename ? `${value}` : value;
  }

  const result = rename
    ? `lang->${formattedName}`
    : (formattedName || '').replace(/_/g, ' ');
  return result;
}
