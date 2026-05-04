export function btnCssPrefix(varsKey: string): string {
  const t = varsKey.trim();
  return t.startsWith('--') ? t.slice(2) : t;
}
