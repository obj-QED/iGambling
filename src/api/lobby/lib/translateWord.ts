/** Missing dictionary key — visible marker, no spaces. */
export function missingTranslationLabel(key: string): string {
  return `->lang ${key}`;
}

export function translateWord(words: Record<string, string> | undefined, key: string): string {
  const value = words?.[key];
  return typeof value === 'string' ? value : missingTranslationLabel(key).replace(/[-_]/g, ' ');
}
