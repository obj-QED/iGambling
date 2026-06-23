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
  '@typescript-eslint/strict-boolean-expressions': [
    'warn',
    {
      allowNullableBoolean: false,
      allowNullableNumber: false,
      allowNullableObject: false,
      allowNullableString: false,
      allowNumber: false,
      allowString: false,
    },
  ],
};
