import type { Words } from '@entities/translation/types';

/**
 * Checks a "flat" string dictionary (like `state.words` after init).
 */
function isFlatWordsRecord(obj: unknown): obj is Words {
  if (!obj || typeof obj !== 'object') return false;
  return Object.values(obj).every((value) => typeof value === 'string');
}

/**
 * Translates by key from dictionary (local + server are already merged into Redux `words`).
 * @param rename if `true` and translation exists, returns the template style (legacy behavior); if missing, returns `lang->key`. If `false`, returns raw text/key without `lang->`.
 * @param lower lowercases the lookup key before searching
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
