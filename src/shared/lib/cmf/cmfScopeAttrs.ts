/** CMF location + optional item key for Mantine Button / ActionIcon cascade. */
export function cmfScopeAttrs(
  component: string,
  key?: string,
): {
  'data-cmf-component': string;
  'data-cmf-key'?: string;
} {
  if (key !== undefined && key.length > 0) {
    return {
      'data-cmf-component': component,
      'data-cmf-key': key,
    };
  }

  return { 'data-cmf-component': component };
}
