export const typescriptStrictRules = {
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports',
      disallowTypeAnnotations: false,
      fixStyle: 'inline-type-imports',
    },
  ],
  '@typescript-eslint/no-unnecessary-condition': 'warn',
  '@typescript-eslint/no-confusing-void-expression': 'warn',
  /**
   * Optional data spreads use truthy guards: `...(value && { prop: value })`.
   * Kept off so `string | number | object | undefined` can short-circuit in JSX/objects.
   */
  '@typescript-eslint/strict-boolean-expressions': 'off',
};
